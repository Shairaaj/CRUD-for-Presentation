const User = require("../models/User");

async function createUser({ name, passwordHash, role }) {
  const user = new User({ name, password: passwordHash, role });
  await user.save();
  return { id: user._id.toString(), name: user.name, role: user.role };
}

async function findByName(name) {
  return User.findOne({ name });
}

async function findById(id) {
  return User.findById(id);
}

module.exports = {
  createUser,
  findByName,
  findById,
};
