const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserBySave,
  getStudentDetailsWithTeacher,
  getStudentDetailsUsingPopulate
} = require("../controllers/userControllers");

router.get("/getDetailsPopulate",getStudentDetailsUsingPopulate);
router.get("/getDetails",getStudentDetailsWithTeacher);
router.get("/",getUsers);
router.get("/:id",getUserById);
router.put("/save/:id",updateUserBySave);
router.post("/createUser",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

module.exports= router;