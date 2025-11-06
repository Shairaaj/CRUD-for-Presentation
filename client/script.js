const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleForm = document.getElementById("toggle-form");

let isSignup = true; // default mode = signup

const backendURL = "http://localhost:3000/api/users/"

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

  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !password) {
    alert("Please fill all fields");
    return;
  }

  const url = isSignup ? "createUser" : "findUser";
  const payload = { name, password, role: "user" };

  try {
    const res = await fetch(backendURL+url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      const {role} = data.user;
      alert(isSignup ? "Signup successful!" : "Login successful!");
      localStorage.setItem("role",role);
      window.location.href = "./article.html";
    } else {
      alert(data.message || "Something went wrong");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error connecting to server");
  }
});
