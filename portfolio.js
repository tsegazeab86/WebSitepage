const form = document.getElementById("formid");
const error = document.getElementById("errordisaply");
const fname = document.getElementById("fullname");
const email = document.getElementById("email");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop form refresh

  error.textContent = ""; // clear old error

  if (fname.value.trim() === "" || email.value.trim() === "") {
    error.textContent = "Please fill required fields";
    error.style.color = "red";
     // return;
  } else {
    // if everything is ok
    error.textContent = "Form submitted successfully ✅";
    error.style.color = "green";
   }
  form.reset();
});
