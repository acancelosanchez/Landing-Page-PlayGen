// Referencias a elementos del DOM que se usan en las animaciones y efectos dinámicos.
const navbar = document.getElementById("navbar");
const particlesContainer = document.getElementById("particles");
const reveals = document.querySelectorAll(".reveal");
const heroLogo = document.getElementById("hero-logo");

// Catálogo de formas y colores para generar partículas con estilo retro.
const tetriminoShapes = ["shape-i", "shape-o", "shape-t", "shape-l", "shape-z"];
const tetriminoColors = ["#ff8a00", "#ff5e5b", "#4db6ff", "#8a7dff", "#ff9ed6"];

if (navbar) {
  // Cambia el aspecto del navbar al hacer scroll y muestra el logo del menú
  // cuando el logo grande del hero ya ha quedado oculto por la navegación.
  const updateNavbarState = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);

    if (!heroLogo) {
      return;
    }

    const logoBottom = heroLogo.getBoundingClientRect().bottom;
    const navBottom = navbar.getBoundingClientRect().bottom;
    document.body.classList.toggle("logo-docked", logoBottom <= navBottom + 12);
  };

  window.addEventListener("scroll", updateNavbarState);
  window.addEventListener("resize", updateNavbarState);
  updateNavbarState();
}

if (particlesContainer) {
  // Crea partículas flotantes aleatorias para dar movimiento al fondo del hero.
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

if (reveals.length > 0) {
  // Hace visibles los elementos con animación cuando entran en pantalla.
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
}

// Anima números contadores incrementándolos progresivamente hasta su valor final.
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

const aboutStats = document.querySelector(".about-stats");

if (aboutStats) {
  // Lanza la animación de estadísticas solo la primera vez que la sección aparece.
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
