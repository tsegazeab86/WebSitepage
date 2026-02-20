document.addEventListener("DOMContentLoaded", function () {
  // ==================== TYPING ANIMATION ====================
  const typedTextElement = document.getElementById("typed-text");
  const cursorElement = document.getElementById("cursor"); // not used but kept
  const typedItems = ["CS Student", "Front End Dev"];

  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentItem = typedItems[itemIndex];
    if (isDeleting) {
      typedTextElement.textContent = currentItem.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextElement.textContent = currentItem.substring(0, charIndex + 1);
      charIndex++;
    }

    // Word complete
    if (!isDeleting && charIndex === currentItem.length) {
      isDeleting = true;
      setTimeout(type, 2000);
      return;
    }

    // Word fully deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      itemIndex = (itemIndex + 1) % typedItems.length; // loop
      setTimeout(type, 50);
      return;
    }

    const typeSpeed = isDeleting ? 50 : 100;
    const randomSpeed = Math.random() * 50 + typeSpeed;
    setTimeout(type, randomSpeed);
  }
  type();

  // ==================== SOCIAL LINKS HOVER ====================
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i");
      if (icon) icon.style.transform = "scale(1.2)";
    });
    link.addEventListener("mouseleave", function () {
      const icon = this.querySelector("i");
      if (icon) icon.style.transform = "scale(1)";
    });
  });

  // ==================== PROFILE IMAGE CLICK ====================
  const profileImage = document.getElementById("profile-image");
  if (profileImage) {
    profileImage.addEventListener("click", function () {
      this.style.transform = "scale(1.05)";
      this.style.boxShadow = "0 0 50px rgba(56, 189, 248, 0.8)";
      setTimeout(() => {
        this.style.transform = "scale(1.03)";
        this.style.boxShadow = "0 0 40px rgba(204, 204, 204, 0.6)";
      }, 300);
    });
  }

  // ==================== HEADER SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ==================== HEADER HIDE/SHOW ON SCROLL ====================
  let lastScroll = 0;
  const header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 50) {
        header.style.transform = "translateY(-100%)";
      } else {
        header.style.transform = "translateY(0)";
      }
      lastScroll = currentScroll;
    });
  }

  // ==================== CONTACT FORM ====================
  const contactForm = document.getElementById("contact-Form");
  if (contactForm) {
    emailjs.init("PASTE_YOUR_REAL_PUBLIC_KEY_HERE");

    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.getElementById("name")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";
      const formMessage = document.getElementById("formMessage");

      if (!formMessage) return;

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill all required fields.";
        formMessage.style.backgroundColor = "red";
        formMessage.style.color = "white";
        formMessage.style.border = "1px solid red";
        // Remove innerHTML override unless needed
        return;
      }

      formMessage.textContent = "Message sent successfully!";
      formMessage.style.color = "green";
      formMessage.style.fontSize = "24px";
      formMessage.style.border = "4px solid yellow";
      formMessage.style.backgroundColor = "aqua";
      this.reset();
    });
  }

  // ==================== SERVICES MODAL ====================
  const serviceModal = document.getElementById("serviceModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalText = document.getElementById("modalText");
  const closeBtn = document.querySelector(".modal .close");

  // Use both .box (if present) and .service-card for compatibility
  const serviceTriggers = document.querySelectorAll(
    "#services .box, .service-card",
  );
  serviceTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      if (serviceModal && modalTitle && modalText) {
        modalTitle.textContent =
          trigger.getAttribute("data-title") || "Service";
        modalText.textContent =
          trigger.getAttribute("data-text") || "Details not available.";
        serviceModal.style.display = "flex";
      }
    });
  });

  if (closeBtn && serviceModal) {
    closeBtn.addEventListener("click", () => {
      serviceModal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === serviceModal) {
      serviceModal.style.display = "none";
    }
  });

  // ==================== SERVICE CARDS HOVER & SCROLL ANIMATION ====================
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });
    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });

  // Intersection Observer for scroll animation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
  );

  serviceCards.forEach((card) => observer.observe(card));

  // ==================== PROJECT FILTERING ====================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filterValue === "all") {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          const category = card.getAttribute("data-category");
          if (category === filterValue) {
            card.style.display = "block";
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, 10);
          } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }
      });
    });
  });

  // ==================== PROJECT MODAL ====================
  const projectModal = document.getElementById("projectModal");
  const modalClose = document.querySelector(".modal-close");
  const modalBody = document.querySelector(".modal-body");
  const infoButtons = document.querySelectorAll(".project-info-btn");

  const projectData = {
    calculator: {
      title: "Simple Calculator",
      description:
        "A fully functional calculator built with vanilla JavaScript that performs basic arithmetic operations. Features include responsive design, keyboard support, and error handling.",
      features: [
        "Basic operations (+, -, ×, ÷)",
        "Keyboard support",
        "Responsive design",
        "Clear and delete functions",
        "Error handling",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript"],
      liveLink: "calculator/calculater.html",
    },
    login: {
      title: "Modern Login Page",
      description:
        "A clean and responsive login interface with form validation and smooth animations. Implements modern UI design principles.",
      features: [
        "Form validation",
        "Password visibility toggle",
        "Remember me feature",
        "Responsive design",
        "Smooth animations",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Form Validation"],
      liveLink: "loginpage.html",
    },
    calendar: {
      title: "Interactive Calendar",
      description:
        "A dynamic calendar application that allows users to navigate through months and view dates. Includes current day highlighting.",
      features: [
        "Month navigation",
        "Current day highlighting",
        "Responsive design",
        "Clean interface",
        "Date selection",
      ],
      technologies: ["JavaScript", "Date API", "CSS Grid", "DOM Manipulation"],
      liveLink: "/WebSitepage/Calender/calender.html",
    },
    snake: {
      title: "Classic Snake Game",
      description:
        "A retro snake game built with HTML5 Canvas. Features score tracking, increasing difficulty, and responsive controls.",
      features: [
        "Score tracking",
        "Increasing difficulty",
        "Game over detection",
        "Responsive controls",
        "Canvas rendering",
      ],
      technologies: [
        "HTML5 Canvas",
        "JavaScript",
        "Game Logic",
        "Event Handling",
      ],
      liveLink: "/WebSitepage/Snakegame/index.html",
    },
    music: {
      title: "Web Music Player",
      description:
        "A fully functional music player with playlists, volume control, and visual feedback. Implements the Web Audio API.",
      features: [
        "Playlist management",
        "Volume control",
        "Progress bar",
        "Play/pause/skip",
        "Visual feedback",
      ],
      technologies: [
        "HTML5 Audio API",
        "JavaScript",
        "CSS Animations",
        "DOM Manipulation",
      ],
      liveLink: "music/music.html",
    },
    portfolio: {
      title: "Personal Portfolio",
      description:
        "A responsive portfolio website showcasing skills, projects, and contact information. Built with modern web technologies.",
      features: [
        "Responsive design",
        "Project showcase",
        "Contact form",
        "Smooth scrolling",
        "Modern UI",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      liveLink: "portfolio.html",
    },
    squarespace: {
      title: "Squarespace Website",
      description:
        "A professional website built using the Squarespace platform, featuring modern design and content management capabilities.",
      features: [
        "CMS integration",
        "Responsive design",
        "Content management",
        "SEO optimized",
        "Custom styling",
      ],
      technologies: ["Squarespace", "CSS", "JavaScript", "Web Design"],
      liveLink: "https://tsegaezeab.mystrikingly.com/1",
    },
    alarm: {
      title: "Python Alarm App",
      description:
        "A desktop alarm application with custom time settings, sound notifications, and repeat functionality.",
      features: [
        "Custom alarm times",
        "Sound notifications",
        "Repeat functionality",
        "GUI interface",
        "System integration",
      ],
      technologies: ["Python", "Tkinter", "GUI Development", "System Sounds"],
      liveLink: "/WebSitepage/alarm.py",
    },
  };

  if (projectModal && modalClose && modalBody) {
    infoButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const projectId = button.getAttribute("data-project");
        const data = projectData[projectId];
        if (data) {
          modalBody.innerHTML = `
            <div class="modal-header">
              <h3>${data.title}</h3>
              <div class="modal-tech-tags">
                ${data.technologies.map((tech) => `<span class="modal-tech-tag">${tech}</span>`).join("")}
              </div>
            </div>
            <div class="modal-description">
              <h4>Description</h4>
              <p>${data.description}</p>
            </div>
            <div class="modal-features">
              <h4>Features</h4>
              <ul>
                ${data.features.map((feature) => `<li>${feature}</li>`).join("")}
              </ul>
            </div>
            <div class="modal-actions">
              <a href="${data.liveLink}" target="_blank" class="modal-link">
                <span>View Project</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </div>
          `;
          projectModal.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      });
    });

    modalClose.addEventListener("click", () => {
      projectModal.classList.remove("active");
      document.body.style.overflow = "auto";
    });

    window.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && projectModal.classList.contains("active")) {
        projectModal.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
});
