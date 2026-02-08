// Home button click
document.getElementById("homeBtn").addEventListener("click", function () {
  // Scroll to top (or redirect)
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  // Simple validation
  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    formMessage.style.color = "red";
    return;
  }

  // If all fields filled
  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";

  // Reset form
  this.reset();
});

// Optional: Services hover modal (if you want popups)
const serviceBoxes = document.querySelectorAll('.service-box');
serviceBoxes.forEach(box => {
  box.addEventListener('mouseenter', () => {
    box.style.backgroundColor = '#00cc00'; // change color on hover
    box.style.transform = 'translateY(-5px)';
  });
  box.addEventListener('mouseleave', () => {
    box.style.backgroundColor = '#00ff22';
    box.style.transform = 'translateY(0)';
  });
});
