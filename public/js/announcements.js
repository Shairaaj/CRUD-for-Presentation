// announcements.js - frontend logic to list/create/edit/delete announcements
// uses localStorage key "user" to keep logged-in user { id, name, role }

const userKey = "user";
const userInfoEl = document.getElementById("user-info");
const logoutBtn = document.getElementById("logout-btn");
const announcementsList = document.getElementById("announcements-list");

const fab = document.getElementById("fab");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const annTitleInput = document.getElementById("ann-title");
const annDataInput = document.getElementById("ann-data");
const modalCancel = document.getElementById("modal-cancel");
const modalSubmit = document.getElementById("modal-submit");

let appUser = null;
let editMode = false;
let editId = null;

function loadUserOrRedirect() {
  const raw = localStorage.getItem(userKey);
  if (!raw) {
    window.location.href = "/auth.html";
    return;
  }
  try {
    appUser = JSON.parse(raw);
    if (!appUser || !appUser.id) throw new Error("invalid user");
    userInfoEl.textContent = `${appUser.name} (${appUser.role})`;
    // show fab only for teacher
    if (appUser.role === "teacher") fab.classList.remove("hidden");
    else fab.classList.add("hidden");
  } catch (err) {
    localStorage.removeItem(userKey);
    window.location.href = "/auth.html";
  }
}

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem(userKey);
  window.location.href = "/auth.html";
});

async function fetchAnnouncements() {
  const res = await fetch("/api/announcements");
  const data = await res.json();
  if (!res.ok) {
    announcementsList.innerHTML =
      '<div class="card">Failed to load announcements.</div>';
    return;
  }
  renderAnnouncements(data.announcements || []);
}

function renderAnnouncements(list) {
  // list assumed ascending by createdAt (oldest first)
  announcementsList.innerHTML = "";
  if (!list.length) {
    announcementsList.innerHTML =
      '<div class="card">No announcements yet.</div>';
    return;
  }

  list.forEach((item) => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
      <div><strong>${escapeHtml(item.title)}</strong></div>
      <div style="margin-top:8px; white-space:pre-wrap;">${escapeHtml(
        item.data
      )}</div>
      <div style="margin-top:8px; color:#666; font-size:12px;">${new Date(
        item.createdAt
      ).toLocaleString()}</div>
    `;

    if (appUser.role === "teacher") {
      const actions = document.createElement("div");
      actions.className = "actions";
      const editBtn = document.createElement("button");
      editBtn.className = "";
      editBtn.textContent = "Edit";
      editBtn.addEventListener("click", () => openEditModal(item));
      const delBtn = document.createElement("button");
      delBtn.className = "btn-danger";
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => onDelete(item._id));
      actions.appendChild(editBtn);
      actions.appendChild(delBtn);
      el.appendChild(actions);
    }

    announcementsList.appendChild(el);
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/* ---------- FAB / modal handlers ---------- */

fab.addEventListener("click", () => {
  openCreateModal();
});

modalCancel.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function openCreateModal() {
  editMode = false;
  editId = null;
  modalTitle.textContent = "Create Announcement";
  annTitleInput.value = "";
  annDataInput.value = "";
  showModal();
}

function openEditModal(item) {
  editMode = true;
  editId = item._id;
  modalTitle.textContent = "Edit Announcement";
  annTitleInput.value = item.title;
  annDataInput.value = item.data;
  showModal();
}

function showModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

/* ---------- Create / Update / Delete ---------- */

modalSubmit.addEventListener("click", async () => {
  const title = annTitleInput.value.trim();
  const data = annDataInput.value.trim();
  if (!title || !data) {
    alert("title and content required");
    return;
  }

  try {
    if (editMode) {
      // PUT
      const res = await fetch("/api/announcements/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": appUser.id,
        },
        body: JSON.stringify({ title, data }),
      });
      const payload = await res.json();
      if (!res.ok) {
        alert(payload.error || "update failed");
        return;
      }
      closeModal();
      await fetchAnnouncements();
    } else {
      // POST
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": appUser.id,
        },
        body: JSON.stringify({ title, data }),
      });
      const payload = await res.json();
      if (!res.ok) {
        alert(payload.error || "create failed");
        return;
      }
      closeModal();
      // fetch again so new announcement appears at the end (ascending)
      await fetchAnnouncements();
    }
  } catch (err) {
    console.error(err);
    alert("network or server error");
  }
});

async function onDelete(id) {
  if (!confirm("Delete this announcement?")) return;
  try {
    const res = await fetch("/api/announcements/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": appUser.id,
      },
    });
    const payload = await res.json();
    if (!res.ok) {
      alert(payload.error || "delete failed");
      return;
    }
    await fetchAnnouncements();
  } catch (err) {
    console.error(err);
    alert("network or server error");
  }
}

/* ---------- init ---------- */
loadUserOrRedirect();
fetchAnnouncements();
