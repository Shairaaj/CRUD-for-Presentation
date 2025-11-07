const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleForm = document.getElementById("toggle-form");

let isSignup = true; // default mode = signup

const backendURL = "http://localhost:3000/api/users/"

// toggle functionality for signup and login...
toggleForm.addEventListener("click", () => {
  isSignup = !isSignup;
  if (isSignup) {
    formTitle.textContent = "User Signup";
    submitBtn.textContent = "Sign Up";
    toggleForm.textContent = "Login here";
  } else {
    formTitle.textContent = "User Login";
    submitBtn.textContent = "Login";
    toggleForm.textContent = "Sign up here";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // logic for sending data...  
});
