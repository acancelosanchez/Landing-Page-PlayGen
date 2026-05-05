# Documentacion tecnica - Landing Page Play Generation

## 1. Instrucciones de inicio y ejecucion

La landing page de Play Generation esta desarrollada con HTML, CSS y JavaScript en el frontend. Ademas, incorpora un servidor Node.js con Express para servir la web localmente y gestionar peticiones de registro e inicio de sesion.

### Requisitos previos

- Tener instalado Node.js.
- Tener instalado npm.
- Ejecutar los comandos desde la raiz del proyecto.

### Instalacion de dependencias

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`, principalmente:

```json
"dependencies": {
  "cors": "^2.8.6",
  "express": "^5.2.1"
}
```

### Ejecucion local

```bash
npm start
```

El script definido en `package.json` ejecuta el servidor principal:

```json
"scripts": {
  "start": "node server.js"
}
```

Una vez iniciado, el proyecto queda disponible en:

```text
http://localhost:3000
```

El servidor sirve `index.html`, `Style.css`, `Animation.js` y los recursos de la carpeta `Img` mediante `express.static(__dirname)`.

## 2. Enumeracion de funcionalidades principales

Las cinco funcionalidades principales implementadas en la landing page son:

1. Menu hamburguesa.
2. Animacion de particulas.
3. Contadores animados.
4. Sticky Stack Cards.
5. Ticker-Wrap.

## 3. Menu hamburguesa

### Descripcion

El menu hamburguesa permite mostrar y ocultar la navegacion interna de la landing desde un boton compacto. Esta funcionalidad mejora la usabilidad de la cabecera porque agrupa los enlaces principales sin ocupar espacio permanente en pantalla.

El menu contiene accesos a las secciones `Nosotros`, `Eventos`, `Servicios`, `Partners` y `Contacto`.

### Funcionamiento

En `index.html`, el menu se implementa dentro de la barra de navegacion mediante un boton con clase `.nav-menu-toggle`. El boton controla la lista `.nav-contact-menu` usando los atributos `aria-expanded` y `aria-controls`, lo que permite indicar si el menu esta abierto o cerrado.

### Codigo

Fragmento HTML del boton hamburguesa y del menu desplegable:

```html
<li class="nav-contact-item">
  <button
    type="button"
    class="nav-cta nav-menu-toggle"
    aria-expanded="false"
    aria-controls="nav-contact-menu"
  >
    <span class="nav-menu-icon" aria-hidden="true">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>

  <ul class="nav-contact-menu" id="nav-contact-menu">
    <li><a href="#about">Nosotros</a></li>
    <li><a href="#events">Eventos</a></li>
    <li><a href="#services">Servicios</a></li>
    <li><a href="#partners">Partners</a></li>
    <li><a href="#cta">Contacto</a></li>
  </ul>
</li>
```

El icono hamburguesa se construye con tres `span` internos. Estos elementos representan las tres lineas visuales del icono. No se usa imagen externa, sino CSS.

```css
.nav-menu-icon {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 16px;
}

.nav-menu-icon span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  transition: transform 0.25s ease, opacity 0.25s ease;
}
```

Cuando el menu esta abierto, `Animation.js` anade la clase `.menu-open` al contenedor `.nav-contact-item`. Esta clase transforma las tres lineas del icono en una cruz: la primera rota 45 grados, la segunda se oculta y la tercera rota -45 grados.

```css
.nav-contact-item.menu-open .nav-menu-icon span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.nav-contact-item.menu-open .nav-menu-icon span:nth-child(2) {
  opacity: 0;
}

.nav-contact-item.menu-open .nav-menu-icon span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}
```

La apertura y cierre se controlan desde `Animation.js`:

```javascript
const navMenuItem = document.querySelector(".nav-contact-item");
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const navMenuLinks = document.querySelectorAll(".nav-contact-menu a");

if (navMenuItem && navMenuToggle) {
  const closeNavMenu = () => {
    navMenuItem.classList.remove("menu-open");
    navMenuToggle.setAttribute("aria-expanded", "false");
  };

  navMenuToggle.addEventListener("click", () => {
    const isOpen = navMenuItem.classList.toggle("menu-open");
    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}
```

La sintaxis `classList.toggle("menu-open")` alterna la clase CSS y devuelve un booleano. Ese valor se convierte a texto con `String(isOpen)` para mantener sincronizado el atributo `aria-expanded`.

Tambien se cierran los menus al hacer clic fuera, al pulsar un enlace o al presionar la tecla `Escape`:

```javascript
document.addEventListener("click", (event) => {
  if (navMenuItem.contains(event.target)) {
    return;
  }

  closeNavMenu();
});

navMenuLinks.forEach((link) => {
  link.addEventListener("click", closeNavMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavMenu();
  }
});
```

## 4. Animacion de particulas

### Descripcion

La animacion de particulas genera piezas flotantes decorativas en el hero de la landing. Estas particulas refuerzan la estetica gaming y retro del proyecto mediante formas inspiradas en bloques geometricos.

### Funcionamiento

En `index.html`, el hero contiene un contenedor vacio con identificador `particles`. Este contenedor actua como punto de insercion para los elementos generados desde JavaScript.

### Codigo

Contenedor HTML:

```html
<section id="hero">
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>
  <div class="particles" id="particles"></div>
</section>
```

En `Animation.js`, se declara el contenedor y dos arrays: uno para las formas y otro para los colores disponibles.

```javascript
const particlesContainer = document.getElementById("particles");

const tetriminoShapes = ["shape-i", "shape-o", "shape-t", "shape-l", "shape-z"];
const tetriminoColors = ["#ff8a00", "#ff5e5b", "#4db6ff", "#8a7dff", "#ff9ed6"];
```

La generacion se realiza con un bucle `for`. En cada iteracion se crea un `div`, se le asignan clases CSS y se configuran propiedades dinamicas mediante variables CSS personalizadas.

```javascript
if (particlesContainer) {
  for (let index = 0; index < 14; index += 1) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.classList.add(tetriminoShapes[Math.floor(Math.random() * tetriminoShapes.length)]);
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
    particle.style.setProperty("--piece-size", `${Math.random() * 8 + 10}px`);
    particle.style.setProperty("--piece-rotation", `${Math.floor(Math.random() * 4) * 90}deg`);
    particle.style.setProperty("--particle-color", tetriminoColors[Math.floor(Math.random() * tetriminoColors.length)]);
    particlesContainer.appendChild(particle);
  }
}
```

La instruccion `document.createElement("div")` crea cada particula en memoria. Despues, `appendChild(particle)` la inserta dentro del contenedor real del DOM.

El CSS base posiciona las particulas de forma absoluta dentro del hero e interpreta las variables definidas desde JavaScript.

```css
.particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: calc(var(--piece-size, 14px) * 4);
  height: calc(var(--piece-size, 14px) * 4);
  animation: float linear infinite;
  opacity: 0;
}

.particle::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--particle-color, var(--neon));
}
```

Cada forma se define mediante `clip-path`. Por ejemplo, la pieza `shape-i` genera una barra horizontal y `shape-o` genera un bloque cuadrado.

```css
.particle.shape-i::before {
  clip-path: polygon(0% 25%, 100% 25%, 100% 50%, 0% 50%);
}

.particle.shape-o::before {
  clip-path: polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%);
}
```

La animacion `float` desplaza cada particula desde la parte inferior de la ventana hasta una zona superior, aplicando tambien deriva horizontal y rotacion.

```css
@keyframes float {
  0% {
    transform: translateY(100vh) translateX(0) rotate(var(--piece-rotation, 0deg));
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(-10vh) translateX(var(--drift)) rotate(calc(var(--piece-rotation, 0deg) + 90deg));
    opacity: 0;
  }
}
```

## 5. Contadores

### Descripcion

Los contadores animan las cifras de la seccion informativa de la landing. Se aplican a datos como eventos organizados, anos de experiencia, ciudades alcanzadas y marcas colaboradoras.

### Funcionamiento

En `index.html`, los valores numericos estan dentro de elementos con clase `.stat-number`, agrupados en el contenedor `.about-stats`.

### Codigo

Fragmento HTML:

```html
<div class="about-stats reveal reveal-delay-1">
  <div class="stat-card reveal">
    <span class="stat-number">+150</span>
    <span class="stat-label">Eventos organizados</span>
  </div>
  <div class="stat-card reveal reveal-delay-1">
    <span class="stat-number">7</span>
    <span class="stat-label">Anos de experiencia</span>
  </div>
</div>
```

La funcion `animateCounter` obtiene el texto original, separa prefijo, numero y sufijo mediante una expresion regular, y actualiza el contenido de forma incremental.

```javascript
const animateCounter = (element) => {
  const original = element.textContent.trim();
  const match = original.match(/^(\D*)(\d+)(.*)$/);

  if (!match) {
    return;
  }

  const [, prefix, digits, suffix] = match;
  const target = Number(digits);
  let current = 0;
  const step = target / 60;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    element.textContent = `${prefix}${Math.round(current)}${suffix}`;
  }, 16);
};
```

La expresion regular `/^(\D*)(\d+)(.*)$/` divide el texto en tres grupos:

- `(\D*)`: caracteres no numericos iniciales, como `+`.
- `(\d+)`: cifra principal que se va a animar.
- `(.*)`: texto final opcional.

La animacion se lanza solo cuando `.about-stats` entra en pantalla. Para ello se usa `IntersectionObserver` con un umbral del 50%.

```javascript
const aboutStats = document.querySelector(".about-stats");

if (aboutStats) {
  const statObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach(animateCounter);
        statObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  statObserver.observe(aboutStats);
}
```

La llamada `statObserver.unobserve(entry.target)` evita que los contadores se reinicien cada vez que el usuario vuelve a pasar por la seccion.

## 6. Sticky Stack Cards

### Descripcion

Las Sticky Stack Cards presentan los servicios o experiencias de Play Generation mediante tarjetas apiladas. Durante el scroll, cada tarjeta permanece fija temporalmente y se superpone visualmente a las anteriores, creando una lectura secuencial.

### Funcionamiento

En `index.html`, las tarjetas estan dentro de `.services-stack`. Cada tarjeta usa la clase `.service-stack-card` y contiene una zona de texto y una zona visual con imagen.

### Codigo

Estructura HTML:

```html
<div class="services-stack">
  <article class="service-stack-card reveal">
    <div class="service-stack-copy">
      <h3>Festivales que se sienten vivos</h3>
    </div>
    <div class="service-stack-visual">
      <div class="service-stack-media media-placeholder">
        <img src="img/imgplaygen4.webp" alt="Experiencia Play Generation">
      </div>
    </div>
  </article>
</div>
```

El contenedor usa `display: flex` en columna y una separacion vertical amplia. Esa separacion permite que el efecto sticky tenga recorrido suficiente durante el desplazamiento.

```css
.services-stack {
  display: flex;
  flex-direction: column;
  gap: 16rem;
  padding-bottom: 4rem;
}
```

Cada tarjeta usa `position: sticky`. Esta propiedad mantiene el elemento dentro del flujo del documento, pero lo fija respecto al viewport cuando alcanza la distancia indicada por `top`.

```css
.service-stack-card {
  position: sticky;
  top: 7.5rem;
  display: grid;
  grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
  gap: 2rem;
  align-items: center;
  min-height: 72vh;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(circle at top left, rgba(0, 255, 178, 0.12), transparent 35%),
    linear-gradient(135deg, rgba(16, 16, 28, 0.98), rgba(10, 10, 18, 0.98));
}
```

Las tarjetas posteriores tienen un `top` distinto para reforzar el efecto de apilado.

```css
.service-stack-card:nth-child(2) {
  top: 9rem;
}

.service-stack-card:nth-child(3) {
  top: 10.5rem;
}

.service-stack-card:nth-child(4) {
  top: 12rem;
}
```

La imagen ocupa todo el contenedor visual gracias a `position: absolute` y `object-fit: cover`.

```css
.service-stack-media {
  position: relative;
  width: 100%;
  min-height: 56vh;
  overflow: hidden;
}

.service-stack-media img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

## 7. Ticker-Wrap

### Descripcion

El Ticker-Wrap es una cinta horizontal animada que muestra conceptos y cifras relevantes de la marca. Funciona como refuerzo visual entre el hero y el contenido principal.

### Funcionamiento

En `index.html`, la funcionalidad se estructura con un contenedor externo `.ticker-wrap` y una fila interna `.ticker`. Los textos se repiten para que la animacion parezca continua.

### Codigo

Fragmento HTML:

```html
<div class="ticker-wrap">
  <div class="ticker">
    <span class="ticker-item">+150 Eventos</span>
    <span class="ticker-item">Gaming</span>
    <span class="ticker-item">Esports</span>
    <span class="ticker-item">Torneos</span>
    <span class="ticker-item">Tecnologia</span>
    <span class="ticker-item">+40 Partners</span>
  </div>
</div>
```

El contenedor externo oculta el desbordamiento horizontal y define el fondo de la cinta.

```css
.ticker-wrap {
  position: relative;
  z-index: 10;
  overflow: hidden;
  padding: 0.7rem 0;
  background: var(--neon);
}
```

La fila interna se muestra en horizontal con `display: flex`, evita saltos de linea con `white-space: nowrap` y ejecuta la animacion `ticker`.

```css
.ticker {
  display: flex;
  white-space: nowrap;
  animation: ticker 30s linear infinite;
}

.ticker-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 3rem;
  color: var(--dark);
  font-family: "Bebas Neue", sans-serif;
  font-size: 1rem;
  letter-spacing: 0.2em;
}
```

Cada elemento incluye un separador visual generado con `::before`.

```css
.ticker-item::before {
  content: "◆";
  font-size: 0.5rem;
}
```

La animacion desplaza la fila completa hacia la izquierda hasta `-50%`. Al estar el contenido duplicado en HTML, el movimiento se percibe como un bucle continuo.

```css
@keyframes ticker {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
```

## 8. Funcionalidad Backend

### Descripcion

El backend permite ejecutar la landing desde un servidor local y gestionar el registro e inicio de sesion del formulario de identificacion. Los datos se guardan en `data/credentials.json`.

### Funcionamiento

`server.js` crea una aplicacion Express, habilita CORS, activa el parseo JSON y sirve los archivos estaticos del proyecto. Tambien define los endpoints `POST /api/register` y `POST /api/login`.

### Codigo

Configuracion principal del servidor:

```javascript
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
```

Creacion y lectura de la base de datos local:

```javascript
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
```

La contrasena se transforma a hash SHA-256 antes de almacenarse:

```javascript
const hashPassword = (password) =>
  crypto.createHash("sha256").update(password).digest("hex");
```

Endpoint de registro:

```javascript
app.post("/api/register", async (req, res) => {
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
});
```

Endpoint de inicio de sesion:

```javascript
app.post("/api/login", async (req, res) => {
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
});
```

## 9. Responsividad

### Descripcion

La landing se adapta a escritorio, tablet y movil mediante CSS nativo. Se usan media queries, layouts con `grid` y `flex`, tamanos fluidos con `clamp()` y restricciones con `min()` y `calc()`.

### Funcionamiento

En escritorio, las secciones principales mantienen composiciones amplias: el hero usa una distribucion visual centrada, `#about` se organiza en dos columnas y las tarjetas de servicios usan dos columnas internas.

### Codigo

Tipografia fluida del hero:

```css
h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(5rem, 15vw, 14rem);
  line-height: 0.9;
}
```

Layout de escritorio para la seccion informativa:

```css
#about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
```

A partir de `1024px`, se reducen paddings y varias composiciones pasan a una sola columna.

```css
@media (max-width: 1024px) {
  nav {
    padding: 1rem 2rem;
  }

  section,
  #events,
  #partners,
  #services,
  .cta-inner {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  #about {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .service-stack-card {
    grid-template-columns: 1fr;
    min-height: auto;
  }
}
```

En pantallas de hasta `900px`, el menu hamburguesa despliega los enlaces en columna para facilitar la interaccion tactil.

```css
@media (max-width: 900px) {
  .nav-contact-menu {
    top: calc(100% + 0.85rem);
    right: 0;
    flex-direction: column;
    align-items: stretch;
    min-width: min(14rem, calc(100vw - 4rem));
    max-width: calc(100vw - 4rem);
    transform: translateY(-8px);
  }
}
```

En pantallas de hasta `640px`, el hero se apila verticalmente, las tarjetas de eventos pasan a una columna y las Sticky Stack Cards dejan de usar `position: sticky` para evitar problemas de lectura en movil.

```css
@media (max-width: 640px) {
  .hero-title-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .events-grid,
  .services-grid,
  .about-stats,
  .footer-inner,
  .footer-bottom {
    grid-template-columns: 1fr;
  }

  .service-stack-card,
  .service-stack-card:nth-child(2),
  .service-stack-card:nth-child(3),
  .service-stack-card:nth-child(4) {
    position: relative;
    top: auto;
    padding: 1.2rem;
  }

  .event-card:first-child {
    grid-column: span 1;
  }
}
```

La responsividad prioriza evitar desbordamientos horizontales, conservar la jerarquia visual y mantener accesibles los controles principales en dispositivos tactiles.
