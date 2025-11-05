const Announcement = require("../models/Announcement");

async function getAll() {
  return Announcement.find().sort({ createdAt: 1 }); // ascending
}

async function createOne({ title, data }) {
  const a = new Announcement({ title, data });
  await a.save();
  return a;
}

async function updateOne(id, { title, data }) {
  return Announcement.findByIdAndUpdate(id, { title, data }, { new: true });
}

async function deleteOne(id) {
  return Announcement.findByIdAndDelete(id);
}

async function findById(id) {
  return Announcement.findById(id);
}

module.exports = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
  findById,
};
