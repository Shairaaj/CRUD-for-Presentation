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
      {
        name: req.body.name, email: req.body.email, age: req.body.age,
        // $inc:{__v:1} 
        // -- increments the version..
      },
      // { new: true} 
      // -- returns updated user.
    );
    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Usage of pre 
const updateUserBySave = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    user.name = "updated user auto increment of version using pre... "+ req.body.name;
    await user.save();
    res.status(200).json({ message: "Updated successfully", data: user });
  } catch (err) {
    if (err.name === 'VersionError') {
      return res.status(409).json({
        message: 'Concurrent update detected! Please retry.',
        error: err.message
      });
    }
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
      return res.status(400).json({ message: "User not found", data: deletedUser });
    res.status(400).json({ message: "User deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message, data: deletedUser });
  }
};

//METHOD FUNCTION ASSOCIATION

const getStudentDetailsWithTeacher = async (req, res) => {
  try {
    const { name, age } = req.body;

    // Find the student by name and age
    const student = await userModel.findOne({ name:name});
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Call the instance method defined in the schema
    const teacher = await student.findTeacher();

    // Respond with combined data
    res.status(200).json({
      message: "Student and teacher fetched successfully",
      student,
      teacher
    });

  } catch (error) {
    console.error("Error fetching student with teacher:", error);
    res.status(500).json({ message: error.message });
  }
};

const getStudentDetailsUsingPopulate = async (req, res) => {
  try {

    // Find the student and populate the referenced teachers
    const student = await userModel
      .find()
      .populate("teacherIds", "name email -_id"); // populate name & email only

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student and teacher fetched successfully",
      student,
    });
  } catch (error) {
    console.error("Error fetching student with teacher:", error);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  updateUserBySave,
  getStudentDetailsWithTeacher,
  getStudentDetailsUsingPopulate
};
