const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DB_FILE = path.join(DATA_DIR, "credentials.json");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const ensureDatabase = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]", "utf8");
  }
};

const readCredentials = async () => {
  await ensureDatabase();
  const raw = await fs.readFile(DB_FILE, "utf8");

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCredentials = async (credentials) => {
  await fs.writeFile(DB_FILE, JSON.stringify(credentials, null, 2), "utf8");
};

const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");

app.post("/api/identify", async (req, res) => {
  try {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "").trim();

    if (!email || !password) {
      return res.status(400).json({ message: "El correo y la contrasena son obligatorios." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "El correo no tiene un formato valido." });
    }

    if (password.length < 4) {
      return res.status(400).json({ message: "La contrasena debe tener al menos 4 caracteres." });
    }

    const credentials = await readCredentials();
    const existingUserIndex = credentials.findIndex((user) => user.email === email);
    const timestamp = new Date().toISOString();
    const userRecord = {
      email,
      passwordHash: hashPassword(password),
      updatedAt: timestamp,
    };

    if (existingUserIndex >= 0) {
      credentials[existingUserIndex] = {
        ...credentials[existingUserIndex],
        ...userRecord,
      };
    } else {
      credentials.push({
        id: crypto.randomUUID(),
        createdAt: timestamp,
        ...userRecord,
      });
    }

    await writeCredentials(credentials);

    return res.status(201).json({ message: "Datos guardados correctamente." });
  } catch (error) {
    console.error("Error al guardar las credenciales:", error);
    return res.status(500).json({ message: "No se pudieron guardar los datos en la base de datos." });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

ensureDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor disponible en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("No se pudo iniciar la base de datos local:", error);
    process.exit(1);
  });
