const API_URL = "http://localhost:3000/api/articles";
const role = localStorage.getItem("role") || "user";

// Element references
const roleInfo = document.getElementById("role-info");
const form = document.getElementById("create-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const createBtn = document.getElementById("createBtn");
const container = document.getElementById("articles-container");
const template = document.getElementById("article-template");

// Show current role and toggle admin features
roleInfo.textContent = `Current Role: ${role.toUpperCase()}`;
form.hidden = role !== "admin";

/* -------------------------------
   Helper Function: Fetch Wrapper
--------------------------------*/
async function apiRequest(path = "", method = "GET", body = null) {
  const options = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_URL}${path}`, options);
  if (!response.ok) {
    console.error("API error:", response.statusText);
  }

  return response.json().catch(() => ({}));
}

/* -------------------------------
   Function: Render One Article
--------------------------------*/
function renderArticle(article) {
  const clone = template.content.cloneNode(true);
  const card = clone.querySelector(".card");
  const h3 = clone.querySelector("h3");
  const p = clone.querySelector("p");
  const actions = clone.querySelector(".admin-actions");

  card.dataset.id = article._id;
  h3.textContent = article.title;
  p.textContent = article.description;

  // Show admin actions if role = admin
  if (role === "admin") actions.hidden = false;

  container.appendChild(clone);
}

/* -------------------------------
   Function: Load All Articles
--------------------------------*/
async function loadArticles() {
  container.innerHTML = "";
  const articles = await apiRequest();

  articles.forEach((article) => renderArticle(article));
}

/* -------------------------------
   Function: Handle Admin Actions
--------------------------------*/
async function handleAdminAction(e) {
  const card = e.target.closest(".card");
  if (!card || role !== "admin") return;

  const id = card.dataset.id;
  const h3 = card.querySelector("h3");
  const p = card.querySelector("p");
  const editBtn = card.querySelector(".edit");
  const saveBtn = card.querySelector(".save");

  if (e.target.classList.contains("edit")) {
    h3.contentEditable = p.contentEditable = "true";
    editBtn.hidden = true;
    saveBtn.hidden = false;
  } else if (e.target.classList.contains("save")) {
    await apiRequest(`/${id}`, "PUT", {
      title: h3.textContent,
      description: p.textContent,
    });
    alert("✅ Article updated!");
    loadArticles();
  } else if (e.target.classList.contains("delete")) {
    if (confirm("Are you sure you want to delete this article?")) {
      await apiRequest(`/${id}`, "DELETE");
      alert("🗑️ Article deleted!");
      loadArticles();
    }
  }
}

/* -------------------------------
   Function: Create New Article
--------------------------------*/
async function createArticle() {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) {
    alert("⚠️ Please fill out both fields.");
    return;
  }

  await apiRequest("", "POST", { title, description });
  titleInput.value = descInput.value = "";
  alert("✅ Article created!");
  loadArticles();
}

/* -------------------------------
   Event Listeners
--------------------------------*/
container.addEventListener("click", handleAdminAction);
createBtn.addEventListener("click", createArticle);

// Initial load
loadArticles();
