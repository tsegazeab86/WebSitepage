// Add this to your existing JavaScript file or in a <script> tag

//home section

document.addEventListener("DOMContentLoaded", function () {
  // Typing animation functionality
  const typedTextElement = document.getElementById("typed-text");
  const cursorElement = document.getElementById("cursor");
  const typedItems = ["Cs Student", "Front End Dev"];

  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentItem = typedItems[itemIndex];

    if (isDeleting) {
      // Remove character
      typedTextElement.textContent = currentItem.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add character
      typedTextElement.textContent = currentItem.substring(0, charIndex + 1);
      charIndex++;
    }

    // When word is complete
    if (!isDeleting && charIndex === currentItem.length) {
      isEnd = true;
      isDeleting = true;
      // Pause at the end of the word
      setTimeout(type, 1500);
      return;
    }

    // When word is fully deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      itemIndex++;

      // Loop back to first item
      if (itemIndex === typedItems.length) {
        itemIndex = 0;
      }

      // Pause before starting next word
      setTimeout(type, 500);
      return;
    }

    // Set typing speed
    const typeSpeed = isDeleting ? 50 : 100;
    // Randomize speed slightly for more natural feel
    const randomSpeed = Math.random() * 50 + typeSpeed;

    setTimeout(type, randomSpeed);
  }

  // Start the typing animation immediately
  type();

  // Social links hover effect
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      const icon = this.querySelector("i");
      icon.style.transform = "scale(1.2)";
    });

    link.addEventListener("mouseleave", function () {
      const icon = this.querySelector("i");
      icon.style.transform = "scale(1)";
    });
  });

  // Profile image click effect
  const profileImage = document.getElementById("profile-image");
  profileImage.addEventListener("click", function () {
    this.style.transform = "scale(1.05)";
    this.style.boxShadow = "0 0 50px rgba(56, 189, 248, 0.8)";

    setTimeout(() => {
      this.style.transform = "scale(1.03)";
      this.style.boxShadow = "0 0 40px rgba(204, 204, 204, 0.6)";
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  const mobileToggle = document.querySelector(".mobile-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const progressBar = document.querySelector(".progress-bar");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  // Mobile menu toggle
  mobileToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    mobileNav.classList.toggle("active");
    mobileNav.setAttribute("aria-hidden", isExpanded);

    // Toggle body scroll
    document.body.style.overflow = isExpanded ? "" : "hidden";
  });

  // Close mobile menu when clicking links
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("active");
      mobileNav.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    // Add scrolled class
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Update progress bar
    const winHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / winHeight) * 100;
    progressBar.style.width = `${scrolled}%`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Active link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// Initialize header when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ModernHeader();

  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});

// Add parallax effect on scroll
window.addEventListener("scroll", function () {
  var header = document.querySelector(".header");
  if (window.scrollY > lastScroll) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  lastScroll = window.scrollY;
});
// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";
  this.reset();
});

// Services modal
const serviceBoxes = document.querySelectorAll("#services .box");
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeBtn = document.querySelector(".modal .close");

serviceBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    modalTitle.textContent = box.getAttribute("data-title");
    modalText.textContent = box.getAttribute("data-text");
    modal.style.display = "flex";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
const viewMore = document.getElementById("viewMore");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

viewMore.addEventListener("click", function (e) {
  e.preventDefault();
  popup.style.display = "flex";
});

closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});

popup.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

// servixes
// Add hover animation to service cards
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.zIndex = "10";
  });

  card.addEventListener("mouseleave", function () {
    this.style.zIndex = "1";
  });
});

// Add scroll animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
  observer.observe(card);
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
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

// Project Modal
// const modal = document.getElementById('projectModal');
const modalClose = document.querySelector(".modal-close");
const modalBody = document.querySelector(".modal-body");
const infoButtons = document.querySelectorAll(".project-info-btn");

// Modal content data
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

// Show modal when info button is clicked
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

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
});

// Close modal
modalClose.addEventListener("click", () => {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});
