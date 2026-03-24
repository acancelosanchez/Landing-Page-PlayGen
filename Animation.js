const navbar = document.getElementById("navbar");
const particlesContainer = document.getElementById("particles");
const reveals = document.querySelectorAll(".reveal");

if (navbar) {
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

if (particlesContainer) {
  for (let index = 0; index < 30; index += 1) {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 15 + 8}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    particle.style.setProperty("--drift", `${Math.random() * 100 - 50}px`);
    particle.style.width = `${Math.random() * 3 + 1}px`;
    particle.style.height = particle.style.width;
    particlesContainer.appendChild(particle);
  }
}

if (reveals.length > 0) {
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
