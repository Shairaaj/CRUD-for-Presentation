const API_URL = "http://localhost:3000/api/articles/"; // adjust backend URL if needed
const role = localStorage.getItem("role") || "user"; // get role (default 'user')

// Elements
const createForm = document.getElementById("create-form");
const titleInput = document.getElementById("title");
const descInput = document.getElementById("description");
const createBtn = document.getElementById("createBtn");
const articlesContainer = document.getElementById("articles-container");
const roleInfo = document.getElementById("role-info");

// Set role info
roleInfo.textContent = `Current Role: ${role.toUpperCase()}`;
if (role === "admin") createForm.classList.remove("hidden");

// Load all articles
async function loadArticles() {
  try {
    const res = await fetch(API_URL);
    const articles = await res.json();

    articlesContainer.innerHTML = "";
    articles.forEach(article => renderCard(article));
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
}

// Render each article card
function renderCard(article) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3 contenteditable="false">${article.title}</h3>
    <p contenteditable="false">${article.description}</p>
  `;

  if (role === "admin") {
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete";

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save";
    saveBtn.style.display = "none";

    editBtn.onclick = () => {
      const title = card.querySelector("h3");
      const desc = card.querySelector("p");
      title.contentEditable = "true";
      desc.contentEditable = "true";
      title.focus();
      editBtn.style.display = "none";
      saveBtn.style.display = "inline-block";
    };

    saveBtn.onclick = async () => {
      const updatedTitle = card.querySelector("h3").textContent;
      const updatedDesc = card.querySelector("p").textContent;

      await fetch(`${API_URL}/${article._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: updatedTitle, description: updatedDesc })
      });

      alert("Article updated successfully!");
      loadArticles();
    };

    deleteBtn.onclick = async () => {
      if (confirm("Are you sure to delete this article?")) {
        await fetch(`${API_URL}/${article._id}`, { method: "DELETE" });
        alert("Article deleted!");
        loadArticles();
      }
    };

    card.appendChild(editBtn);
    card.appendChild(saveBtn);
    card.appendChild(deleteBtn);
  }

  articlesContainer.appendChild(card);
}

// Create new article
createBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const description = descInput.value.trim();

  if (!title || !description) {
    alert("Please fill in all fields!");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  });

  titleInput.value = "";
  descInput.value = "";
  loadArticles();
});

// Initial load
loadArticles();
