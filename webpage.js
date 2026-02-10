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

// Open modal
viewMore.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.add("show");
});

// Close modal
closePopup.addEventListener("click", function () {
  popup.classList.remove("show");
});

// Close when clicking outside modal-box
window.addEventListener("click", function (e) {
  if (e.target === popup) {
    popup.classList.remove("show");
  }
});


  window.addEventListener('load', function() {
    document.getElementById('viewProject').click();
  });