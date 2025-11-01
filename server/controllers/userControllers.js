const userModel = require("../models/User");

//GET ALL DOCUMENTS
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (!users) return res.status(404).json({ message: "User not found" });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

//GET SINGLE DOCUMENT
const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CREATE A DOCUMENT
const createUser = async (req, res) => {
  try {
    const newUser = await userModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//UPDATE DOCUMENT
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      { _id: req.params.id },
      { name: req.body.name, email: req.body.email, age: req.body.age }
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//DELETE DOCUMENT
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deletedUser)
      return res.status(400).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
