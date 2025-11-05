const announcementService = require("../services/announcementService");

async function listAnnouncements(req, res) {
  try {
    const announcements = await announcementService.getAll();
    return res.json({ announcements });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function createAnnouncement(req, res) {
  try {
    // verifyUser middleware will attach req.authorizedUser (DB user object)
    const user = req.authorizedUser;
    if (!user) return res.status(401).json({ error: "not authorized" });
    if (user.role !== "teacher")
      return res.status(403).json({ error: "only teachers can create" });

    const { title, data } = req.body;
    if (!title || !data)
      return res.status(400).json({ error: "title and data required" });

    const a = await announcementService.createOne({ title, data });
    return res.status(201).json(a);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function updateAnnouncement(req, res) {
  try {
    const user = req.authorizedUser;
    if (!user) return res.status(401).json({ error: "not authorized" });
    if (user.role !== "teacher")
      return res.status(403).json({ error: "only teachers can update" });

    const id = req.params.id;
    const { title, data } = req.body;
    if (!title || !data)
      return res.status(400).json({ error: "title and data required" });

    const updated = await announcementService.updateOne(id, { title, data });
    if (!updated)
      return res.status(404).json({ error: "announcement not found" });

    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

async function deleteAnnouncement(req, res) {
  try {
    const user = req.authorizedUser;
    if (!user) return res.status(401).json({ error: "not authorized" });
    if (user.role !== "teacher")
      return res.status(403).json({ error: "only teachers can delete" });

    const id = req.params.id;
    const deleted = await announcementService.deleteOne(id);
    if (!deleted)
      return res.status(404).json({ error: "announcement not found" });

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "internal server error" });
  }
}

module.exports = {
  listAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
