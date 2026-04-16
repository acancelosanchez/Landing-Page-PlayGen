// Referencias a elementos del DOM que se usan en las animaciones y efectos dinámicos.
const navbar = document.getElementById("navbar");
const particlesContainer = document.getElementById("particles");
const reveals = document.querySelectorAll(".reveal");
const heroLogo = document.getElementById("hero-logo");
const navMenuItem = document.querySelector(".nav-contact-item");
const navMenuToggle = document.querySelector(".nav-menu-toggle");
const navMenuLinks = document.querySelectorAll(".nav-contact-menu a");
const navIdentifyItem = document.querySelector(".nav-identify-item");
const navIdentifyButton = document.querySelector(".nav-identify-button");
const navIdentifyForm = document.getElementById("nav-identify-panel");
const navIdentifyStatus = document.getElementById("nav-identify-status");

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

if (navMenuItem && navMenuToggle) {
  const closeNavMenu = () => {
    navMenuItem.classList.remove("menu-open");
    navMenuToggle.setAttribute("aria-expanded", "false");
  };

  navMenuToggle.addEventListener("click", () => {
    const isOpen = navMenuItem.classList.toggle("menu-open");
    navMenuToggle.setAttribute("aria-expanded", String(isOpen));
  });

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
}

if (navIdentifyItem && navIdentifyButton) {
  const closeIdentifyPanel = () => {
    navIdentifyItem.classList.remove("form-open");
    navIdentifyButton.setAttribute("aria-expanded", "false");
  };

  navIdentifyButton.addEventListener("click", () => {
    const isOpen = navIdentifyItem.classList.toggle("form-open");
    navIdentifyButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (navIdentifyItem.contains(event.target)) {
      return;
    }

    closeIdentifyPanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeIdentifyPanel();
    }
  });
}

if (navIdentifyForm && navIdentifyStatus) {
  const setIdentifyStatus = (message, type = "") => {
    navIdentifyStatus.textContent = message;
    navIdentifyStatus.classList.remove("is-error", "is-success");

    if (type) {
      navIdentifyStatus.classList.add(type);
    }
  };

  navIdentifyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(navIdentifyForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "").trim();
    const submitButton = navIdentifyForm.querySelector(".nav-identify-submit");

    if (!email || !password) {
      setIdentifyStatus("Introduce un correo y una contrasena validos.", "is-error");
      return;
    }

    setIdentifyStatus("Guardando datos...", "");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Enviando...";
    }

    try {
      const response = await fetch("/api/identify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "No se pudieron guardar los datos.");
      }

      setIdentifyStatus("Datos guardados correctamente.", "is-success");
      navIdentifyForm.reset();
    } catch (error) {
      setIdentifyStatus(error.message || "Ha ocurrido un error al guardar los datos.", "is-error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "Entrar";
      }
    }
  });
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
