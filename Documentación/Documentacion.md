# Documentacion tecnica - Landing Page Play Generation

## 1. Instrucciones de inicio y ejecucion

La landing page esta desarrollada con HTML, CSS y JavaScript en el cliente, y un servidor Node.js con Express para servir archivos estaticos y gestionar el registro/inicio de sesion.

### Requisitos previos

- Node.js instalado.
- npm instalado.
- Dependencias del proyecto instaladas mediante `npm install`.

### Instalacion

Desde la raiz del proyecto:

```bash
npm install
```

Este comando instala las dependencias declaradas en `package.json`, principalmente `express` y `cors`.

### Ejecucion local

```bash
npm start
```

El script ejecuta:

```json
"scripts": {
  "start": "node server.js",
  "test": "echo \"Sin pruebas automaticas configuradas\""
}
```

Al iniciar correctamente, el servidor queda disponible en:

```text
http://localhost:3000
```

El archivo principal `index.html` se sirve desde Express mediante archivos estaticos y tambien mediante la ruta raiz `/`.

## 2. Enumeracion de funcionalidades principales

Las cinco funcionalidades mas relevantes implementadas son:

1. Navegacion fija con menu desplegable, anclas internas y panel de identificacion.
2. Hero visual animado con logo, efecto glitch, particulas y llamadas a la accion.
3. Animaciones progresivas al hacer scroll y contadores numericos.
4. Secciones comerciales de eventos, servicios apilados y partners en carrusel.
5. Backend Express para registro e inicio de sesion con persistencia local.

## 3. Navegacion fija, menu y panel de identificacion

### Descripcion

La landing incorpora una barra de navegacion fija en la parte superior. Permite acceder a las secciones internas mediante enlaces de ancla, abrir un menu desplegable de navegacion y mostrar un formulario de identificacion para login o registro. Tambien muestra el correo del usuario cuando la sesion queda almacenada en `localStorage`.

### Funcionamiento

En `index.html`, la barra de navegacion se define mediante un elemento `nav` con identificador `navbar`. El menu usa un boton con `aria-expanded` y `aria-controls` para indicar su estado accesible. El panel de identificacion es un formulario que contiene campos `email` y `password` y dos botones de envio diferenciados por el valor del atributo `value`.

### Codigo

```html
<button
  type="button"
  class="nav-cta nav-identify-button"
  aria-expanded="false"
  aria-controls="nav-identify-panel"
>
  Identificate
</button>

<form class="nav-identify-panel" id="nav-identify-panel">
  <input type="email" name="email" autocomplete="email" required>
  <input type="password" name="password" autocomplete="current-password" required minlength="4">
  <button type="submit" class="nav-identify-submit" name="action" value="login">Entrar</button>
  <button type="submit" class="nav-identify-submit" name="action" value="register">Registrarme</button>
  <p class="nav-identify-status" id="nav-identify-status" aria-live="polite"></p>
</form>
```

El archivo `Animation.js` obtiene referencias del DOM con `document.querySelector` y `document.getElementById`. El estado visual del menu y del formulario se controla mediante clases CSS (`menu-open` y `form-open`) y actualizacion del atributo `aria-expanded`.

```javascript
navMenuToggle.addEventListener("click", () => {
  const isOpen = navMenuItem.classList.toggle("menu-open");
  navMenuToggle.setAttribute("aria-expanded", String(isOpen));
});

navIdentifyButton.addEventListener("click", () => {
  const isOpen = navIdentifyItem.classList.toggle("form-open");
  navIdentifyButton.setAttribute("aria-expanded", String(isOpen));
});
```

El cierre del menu y del panel se realiza al hacer clic fuera del componente o al pulsar `Escape`, evitando que elementos flotantes permanezcan abiertos accidentalmente.

```javascript
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeIdentifyPanel();
  }
});
```

En `Style.css`, el panel se oculta inicialmente con `opacity`, `visibility` y `pointer-events`. Al aplicar la clase `form-open`, se habilita la interaccion y se ejecuta una transicion visual.

```css
.nav-identify-panel {
  position: absolute;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transform: translateY(-8px);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s ease;
}

.nav-identify-item.form-open .nav-identify-panel {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  transform: translateY(0);
}
```

## 4. Hero animado con identidad visual y llamadas a la accion

### Descripcion

La seccion principal presenta la marca Play Generation con un logo, titulo de gran impacto, fondo con cuadricula animada, resplandor, efecto glitch y particulas flotantes. Incluye dos llamadas a la accion que redirigen a las secciones de eventos e informacion corporativa.

### Funcionamiento

La estructura del hero esta definida en `index.html` dentro de la seccion `#hero`. Las capas visuales (`hero-grid`, `hero-glow` y `particles`) se colocan antes del contenido para actuar como fondo.

### Codigo

```html
<section id="hero">
  <div class="hero-grid"></div>
  <div class="hero-glow"></div>
  <div class="particles" id="particles"></div>

  <div class="hero-title-group">
    <img src="Img/PACO 3.1.png" alt="Play Generation" class="hero-logo-img" id="hero-logo">
    <h1>
      <span class="line1 glitch" data-text="PLAY">PLAY</span>
      <span class="line2">GENERATION</span>
    </h1>
  </div>
</section>
```

El efecto glitch se apoya en el atributo `data-text`. En CSS, los pseudo-elementos `::before` y `::after` duplican el texto y aplican recortes (`clip-path`), desplazamientos y animaciones independientes.

```css
.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.glitch::before {
  color: var(--fire);
  clip-path: polygon(0 30%, 100% 30%, 100% 50%, 0 50%);
  animation: glitch1 4s infinite;
}

.glitch::after {
  color: var(--neon);
  clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
  animation: glitch2 4s infinite;
}
```

Las particulas se generan dinamicamente desde `Animation.js`. El script crea catorce elementos `div`, les asigna clases de forma aleatoria y define variables CSS personalizadas para color, tamano, rotacion y desplazamiento.

```javascript
for (let index = 0; index < 14; index += 1) {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  particle.classList.add(tetriminoShapes[Math.floor(Math.random() * tetriminoShapes.length)]);
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
  particle.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
  particle.style.setProperty("--particle-color", tetriminoColors[Math.floor(Math.random() * tetriminoColors.length)]);
  particlesContainer.appendChild(particle);
}
```

El CSS interpreta esas variables en la animacion `float`, que desplaza cada particula desde la parte inferior del viewport hasta una posicion superior.

```css
.particle {
  width: calc(var(--piece-size, 14px) * 4);
  height: calc(var(--piece-size, 14px) * 4);
  animation: float linear infinite;
}

@keyframes float {
  0% {
    transform: translateY(100vh) translateX(0) rotate(var(--piece-rotation, 0deg));
    opacity: 0;
  }

  100% {
    transform: translateY(-10vh) translateX(var(--drift)) rotate(calc(var(--piece-rotation, 0deg) + 90deg));
    opacity: 0;
  }
}
```

## 5. Animaciones al hacer scroll y contadores

### Descripcion

La web aplica animaciones de entrada a los bloques informativos y anima las cifras de la seccion "Quienes somos" cuando el usuario llega a esa zona. Esta funcionalidad mejora la percepcion de dinamismo sin cargar todos los efectos al inicio.

### Funcionamiento

Los elementos que deben aparecer progresivamente incluyen la clase `.reveal` en `index.html`. En CSS, esta clase define un estado inicial desplazado y transparente.

### Codigo

```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

`Animation.js` utiliza `IntersectionObserver`, API nativa del navegador que detecta cuando un elemento entra en el viewport. Al cumplirse el umbral de visibilidad, se agrega la clase `visible`.

```javascript
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("visible");
    });
  },
  { threshold: 0.12 }
);

reveals.forEach((element) => revealObserver.observe(element));
```

Los contadores se aplican a los elementos `.stat-number`. La funcion `animateCounter` conserva prefijos y sufijos del texto original, extrae la parte numerica mediante expresion regular y actualiza el contenido progresivamente con `setInterval`.

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

Para evitar que la animacion se repita indefinidamente, el observador de estadisticas deja de observar el bloque tras ejecutarse una vez.

```javascript
statNumbers.forEach(animateCounter);
statObserver.unobserve(entry.target);
```

## 6. Secciones de eventos, servicios y partners

### Descripcion

La landing presenta contenido comercial organizado en tres bloques principales: eventos destacados, servicios/experiencias y partners. Estas secciones estructuran la propuesta de valor de la marca y facilitan que el usuario entienda que ofrece Play Generation.

### Funcionamiento

La seccion de eventos usa una cuadricula CSS. El primer evento ocupa dos columnas en escritorio para destacar el festival principal, mientras que el resto quedan en tarjetas secundarias.

### Codigo

```html
<div class="events-grid">
  <div class="event-card reveal">
    <div class="event-visual">
      <div class="event-bg event-bg-1"></div>
      <div class="event-grid-pattern"></div>
    </div>
    <div class="event-info">
      <div class="event-tag">Festival principal 2026</div>
      <h3>PLAY CORDOBA #GAME-FEST</h3>
    </div>
  </div>
</div>
```

```css
.events-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.event-card:first-child {
  grid-column: span 2;
}

.event-bg-1 {
  background-image: url("Img/CARTELES-WEB-HORIZONTAL1.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
```

La seccion de servicios utiliza tarjetas con `position: sticky`, lo que permite que cada bloque permanezca fijado temporalmente durante el desplazamiento. Cada tarjeta combina un texto breve con una imagen real del proyecto.

```css
.service-stack-card {
  position: sticky;
  top: 7.5rem;
  display: grid;
  grid-template-columns: minmax(260px, 360px) minmax(0, 1fr);
  gap: 2rem;
  align-items: center;
  min-height: 72vh;
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

El carrusel de partners se implementa duplicando elementos visuales dentro de una fila horizontal. La animacion `scrollPartners` mueve la fila hacia la izquierda de forma lineal e infinita.

```html
<div class="partners-row">
  <div class="partner-pill">Red Bull</div>
  <div class="partner-pill">Nintendo</div>
  <div class="partner-pill">Sony</div>
  <div class="partner-pill">GAME</div>
</div>
```

```css
.partners-row {
  display: flex;
  width: max-content;
  animation: scrollPartners 25s linear infinite;
}

@keyframes scrollPartners {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
```

## 7. Backend Express para registro e inicio de sesion

### Descripcion

El backend permite registrar usuarios e iniciar sesion desde el formulario de la barra de navegacion. Los datos se almacenan localmente en formato JSON dentro de `data/credentials.json`. Las contrasenas no se guardan en texto plano, sino como hash SHA-256.

### Funcionamiento

El servidor se define en `server.js`. Se importan Express, CORS, utilidades de rutas, el modulo de sistema de archivos con promesas y `crypto` para generar hashes e identificadores.

### Codigo

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
```

El middleware habilita CORS, parseo automatico de JSON en el cuerpo de las peticiones y servicio de archivos estaticos desde la raiz del proyecto.

```javascript
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
```

La funcion `ensureDatabase` garantiza que exista el directorio `data` y el archivo `credentials.json`. Si el archivo no existe, lo inicializa como array JSON vacio.

```javascript
const ensureDatabase = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    await fs.access(DB_FILE);
  } catch {
    await fs.writeFile(DB_FILE, "[]", "utf8");
  }
};
```

La validacion de credenciales normaliza el correo a minusculas, comprueba campos obligatorios, verifica el formato mediante expresion regular y exige una longitud minima de cuatro caracteres para la contrasena.

```javascript
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
```

El endpoint `POST /api/register` valida la entrada, comprueba duplicados, genera un identificador unico con `crypto.randomUUID()`, calcula el hash de la contrasena y persiste el nuevo registro.

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

  credentials.push({
    id: crypto.randomUUID(),
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  await writeCredentials(credentials);
  return res.status(201).json({ message: "Registro completado correctamente." });
});
```

El endpoint `POST /api/login` valida la entrada, busca el usuario por correo y compara el hash calculado de la contrasena recibida con el hash almacenado.

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

En el cliente, `Animation.js` determina el endpoint segun el boton pulsado y envia una peticion `fetch` con metodo `POST`, cabecera `Content-Type: application/json` y cuerpo serializado con `JSON.stringify`.

```javascript
const action = submitButton?.value === "register" ? "register" : "login";
const endpoint =
  action === "register"
    ? `${apiBaseUrl}/api/register`
    : `${apiBaseUrl}/api/login`;

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email, password }),
});
```

Cuando el login es correcto, el correo se guarda en `localStorage` y se actualiza la interfaz mediante `updateLoggedUserDisplay`.

```javascript
if (action === "login") {
  window.localStorage.setItem(sessionStorageKey, email);
  updateLoggedUserDisplay(email);
}
```

## 8. Responsividad

### Descripcion

La landing esta adaptada a escritorio, tablet y movil. La responsividad se consigue con CSS nativo, principalmente `grid`, `flex`, `clamp()`, unidades relativas y media queries en los puntos de corte `1024px`, `900px` y `640px`.

### Funcionamiento tecnico

En escritorio, varias secciones trabajan en dos columnas, como `#about` y `.events-grid`. El titulo principal usa `clamp()` para limitar el crecimiento y decrecimiento tipografico segun el ancho de pantalla.

### Codigo

```css
h1 {
  font-family: "Bebas Neue", sans-serif;
  font-size: clamp(5rem, 15vw, 14rem);
  line-height: 0.9;
}

#about {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}
```

Para pantallas de hasta `1024px`, se reducen paddings, el bloque `#about` pasa a una sola columna y las tarjetas sticky de servicios se simplifican para evitar composiciones demasiado estrechas.

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

Para pantallas de hasta `900px`, el menu desplegable cambia de disposicion horizontal a vertical. El ancho se limita con `min()` y `calc()` para impedir que el panel salga del viewport.

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

En movil, hasta `640px`, el hero cambia de grid a columna, la cuadricula de eventos queda en una sola columna, las estadisticas se apilan y las tarjetas de servicios dejan de ser sticky para mejorar la lectura tactil.

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

  .service-stack-card {
    position: relative;
    top: auto;
    padding: 1.2rem;
  }

  .event-card:first-child {
    grid-column: span 1;
  }
}
```

La estrategia responsive prioriza mantener visibles los controles principales, evitar desbordamientos horizontales y conservar la jerarquia visual de la landing en dispositivos tactiles.
