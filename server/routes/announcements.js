const express = require("express");
const router = express.Router();
const announcementController = require("../controllers/announcementController");
const verifyUser = require("../middleware/verifyUser");

// GET /api/announcements
router.get("/", announcementController.listAnnouncements);

// The following are protected: create/update/delete. Use verifyUser first.
router.post("/", verifyUser, announcementController.createAnnouncement);
router.put("/:id", verifyUser, announcementController.updateAnnouncement);
router.delete("/:id", verifyUser, announcementController.deleteAnnouncement);

module.exports = router;
