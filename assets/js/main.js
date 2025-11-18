document.addEventListener("DOMContentLoaded", function () {
  const loadingBar = document.createElement("div");
  loadingBar.className = "loading-bar";
  document.body.appendChild(loadingBar);

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 20;
    loadingBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(loadingInterval);
      setTimeout(() => {
        loadingBar.style.opacity = "0";
        setTimeout(() => loadingBar.remove(), 300);
      }, 200);
    }
  }, 100);

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("slide-in");
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const offset = 80;
        const targetPosition = target.offsetTop - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll("[data-count]");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count"));
          const duration = 2500;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              clearInterval(timer);
              current = target;
            }
            counter.textContent =
              Math.floor(current).toLocaleString("id-ID") +
              (counter.getAttribute("data-suffix") || "");
          }, 16);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll("[data-count]").forEach((counter) => {
    observer.observe(counter.closest("section"));
  });

  function createParticles() {
    const particlesContainer = document.createElement("div");
    particlesContainer.className = "fixed inset-0 pointer-events-none z-0";
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 100 + 50;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const delay = Math.random() * 20;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}vw`;
      particle.style.top = `${posY}vh`;
      particle.style.opacity = "0.1";
      particle.style.animation = `float ${15 + delay}s ease-in-out infinite`;
      particle.style.animationDelay = `${delay}s`;

      particlesContainer.appendChild(particle);
    }
  }

  createParticles();

  const cards = document.querySelectorAll(".interactive-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateY = (x - centerX) / 25;
      const rotateX = (centerY - y) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    });
  });

  const progressCircle = document.getElementById("progress-circle");
  if (progressCircle) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      progressCircle.style.strokeDashoffset = 100 - scrollPercent;
    });
  }

  const typewriterElement = document.getElementById("typewriter");
  if (typewriterElement) {
    const texts = [
      "Hutan Indonesia",
      "Laut Nusantara",
      "Bumi Pertiwi",
      "Masa Depan Hijau",
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
      const currentText = texts[textIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
      }

      setTimeout(typeWriter, isDeleting ? 50 : 100);
    }

    typeWriter();
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML =
        '<i class="fas fa-spinner fa-spin mr-2"></i>Mendaftarkan...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Terdaftar!';
        submitBtn.classList.remove("bg-green-600", "hover:bg-green-700");
        submitBtn.classList.add("bg-green-500");

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove("bg-green-500");
          submitBtn.classList.add("bg-green-600", "hover:bg-green-700");
          this.reset();
        }, 2000);
      }, 1500);
    });
  }

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", function () {
  const successCard = document.querySelector(".success-card");

  if (window.innerWidth < 768) {
    successCard.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }

  const bgImage = new Image();
  bgImage.src =
    "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80";
});

const statItems = document.querySelectorAll(".stat-item");
statItems.forEach((item, index) => {
  setTimeout(() => {
    item.classList.add("visible");
  }, index * 200 + 800);
});

const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
document.body.appendChild(scrollToTopBtn);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const cards = document.querySelectorAll('.comparison-card, [class*="card"]');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
  card.classList.add("card-entrance");
});

const statItemsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  }
);

document.querySelectorAll(".stat-item").forEach((item) => {
  statItemsObserver.observe(item);
});

const headings = document.querySelectorAll("h1, h2, h3");
headings.forEach((heading, index) => {
  if (
    !heading.classList.contains("card-entrance") &&
    !heading.classList.contains("slide-in")
  ) {
    heading.style.animation = `fadeInUp 0.8s ease-out ${
      index * 0.1
    }s backwards`;
  }
});

const paragraphs = document.querySelectorAll("p");
paragraphs.forEach((para, index) => {
  if (!para.classList.contains("fade-in-up")) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(para);
  }
});

const buttons = document.querySelectorAll(
  "button:not(.bg-color-btn):not(.bg-switcher):not(.scroll-to-top)"
);
buttons.forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    if (!this.classList.contains("wobble")) {
      this.classList.add("wobble");
      setTimeout(() => this.classList.remove("wobble"), 600);
    }
  });
});

const links = document.querySelectorAll('a:not([href*="javascript"])');
links.forEach((link) => {
  link.addEventListener("mouseenter", function () {
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "";
    }, 10);
  });
});

const lists = document.querySelectorAll("ul, ol");
lists.forEach((list) => {
  list.classList.add("animate-stagger");
});
