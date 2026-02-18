document.addEventListener("DOMContentLoaded", function () {
  // ==================== LOADER ====================
  window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
  });

  // ==================== TYPING ANIMATION ====================
  const typedText = document.getElementById("typed-text");
  const words = ["CS Student", "Frontend Developer", "Web Designer"];
  let wordIndex = 0,
    charIndex = 0,
    deleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (deleting) {
      typedText.textContent = currentWord.substring(0, charIndex--);
    } else {
      typedText.textContent = currentWord.substring(0, charIndex++);
    }

    if (!deleting && charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deleting ? 50 : 100);
  }
  if (typedText) typeEffect();

  // ==================== DARK MODE TOGGLE ====================
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
    });
  }

  // ==================== SCROLL REVEAL FOR CARDS ====================
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 },
  );

  document
    .querySelectorAll(".card")
    .forEach((card) => cardObserver.observe(card));

  // ==================== SKILL PROGRESS BARS ====================
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = bar.dataset.width;
        }
      });
    },
    { threshold: 0.5 },
  );

  document
    .querySelectorAll(".progress-bar")
    .forEach((bar) => skillObserver.observe(bar));

  // ==================== PROJECT MODAL ====================
  const projectModal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModal = document.getElementById("closeModal");

  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.parentElement;
      if (!card || !projectModal) return;
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      projectModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // ==================== EMAILJS CONTACT FORM ====================
  if (typeof emailjs !== "undefined") {
    emailjs.init("jvC2s8tA-LE6u-zDU"); // <-- Replace with your EmailJS public key
  }

  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm && formMessage && typeof emailjs !== "undefined") {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const message = document.getElementById("message")?.value.trim();

      if (!name || !email || !message) {
        formMessage.textContent = "Please fill in all required fields.";
        formMessage.style.color = "white";
        formMessage.style.backgroundColor = "red";
        formMessage.style.padding = "10px";
        formMessage.style.borderRadius = "5px";
        return;
      }

      const submitBtn = contactForm.querySelector("button");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";

      emailjs
        .send("service_8iatqlq", "template_1234567890", {
          from_name: name,
          from_email: email,
          message: message,
        })
        .then(() => {
          formMessage.textContent = "Message sent successfully!";
          formMessage.style.color = "white";
          formMessage.style.backgroundColor = "green";
          formMessage.style.padding = "10px";
          formMessage.style.borderRadius = "5px";
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          formMessage.textContent =
            "Failed to send message. Please try again later.";
          formMessage.style.color = "white";
          formMessage.style.backgroundColor = "red";
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        });
    });
  }
});
