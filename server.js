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

const getValidatedCredentials = (body) => {
  const email = String(body?.email || "").trim().toLowerCase();
  const password = String(body?.password || "").trim();

  if (!email || !password) {
    return { message: "El correo y la contrasena son obligatorios." };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return { message: "El correo no tiene un formato valido." };
  }

  if (password.length < 4) {
    return { message: "La contrasena debe tener al menos 4 caracteres." };
  }

  return { email, password };
};

app.post("/api/register", async (req, res) => {
  try {
    const { email, password, message } = getValidatedCredentials(req.body);

    if (message) {
      return res.status(400).json({ message });
    }

    const credentials = await readCredentials();
    const existingUser = credentials.find((user) => user.email === email);

    if (existingUser) {
      return res.status(409).json({ message: "Ya existe una cuenta con ese correo." });
    }

    const timestamp = new Date().toISOString();

    credentials.push({
      id: crypto.randomUUID(),
      email,
      passwordHash: hashPassword(password),
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await writeCredentials(credentials);

    return res.status(201).json({ message: "Registro completado correctamente." });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "No se pudieron guardar los datos en la base de datos." });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password, message } = getValidatedCredentials(req.body);

    if (message) {
      return res.status(400).json({ message });
    }

    const credentials = await readCredentials();
    const existingUser = credentials.find((user) => user.email === email);

    if (!existingUser) {
      return res.status(401).json({ message: "No existe ninguna cuenta con ese correo." });
    }

    if (existingUser.passwordHash !== hashPassword(password)) {
      return res.status(401).json({ message: "La contrasena es incorrecta." });
    }

    return res.status(200).json({ message: "Inicio de sesion correcto." });
  } catch (error) {
    console.error("Error al iniciar sesion:", error);
    return res.status(500).json({ message: "No se pudo completar el inicio de sesion." });
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
