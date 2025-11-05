// auth.js - handles signup/login and localStorage user handling

const formTitle = document.getElementById("form-title");
const toggleLoginBtn = document.getElementById("toggle-login");
const toggleSignupBtn = document.getElementById("toggle-signup");
const roleRow = document.getElementById("role-row");
const authForm = document.getElementById("auth-form");
const submitBtn = document.getElementById("submit-btn");
const messageEl = document.getElementById("message");

let mode = "login"; // or 'signup'

toggleLoginBtn.addEventListener("click", () => setMode("login"));
toggleSignupBtn.addEventListener("click", () => setMode("signup"));

function setMode(m) {
  mode = m;
  if (m === "login") {
    formTitle.textContent = "Login";
    roleRow.style.display = "none";
    submitBtn.textContent = "Login";
  } else {
    formTitle.textContent = "Signup";
    roleRow.style.display = "block";
    submitBtn.textContent = "Signup";
  }
  messageEl.textContent = "";
}

authForm.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  messageEl.textContent = "";

  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value;
  if (!name || !password) {
    messageEl.textContent = "name and password required";
    return;
  }

  try {
    if (mode === "signup") {
      const role = document.querySelector('input[name="role"]:checked').value;
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password, role }),
      });
      const data = await res.json();
      if (!res.ok) {
        messageEl.textContent = data.error || "signup failed";
        return;
      }
      // server returns { id, name, role }
      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/announcements.html";
    } else {
      // login
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        messageEl.textContent = data.error || "login failed";
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.location.href = "/announcements.html";
    }
  } catch (err) {
    console.error(err);
    messageEl.textContent = "network or server error";
  }
});

// default mode
setMode("login");
