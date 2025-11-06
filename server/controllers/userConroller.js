const userModel = require("../models/userModel"); // adjust the path as needed

// Create a new user

const createAdmin = async () =>{
  try {
    const name = "admin";
    await userModel.create({name:name,password:"admin",role:"admin"});
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const createUser = async (req, res) => {
  try {
    const newUser = new userModel.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user: newUser
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Get single user by ID
const getUserById = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find the user by name
    const user = await userModel.findOne({ name:name,password:password });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User authenticated successfully",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports =  {getUserById, createUser, createAdmin};