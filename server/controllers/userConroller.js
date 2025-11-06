const userModel = require("../models/userModel"); // adjust the path as needed
const bcrypt = require("bcryptjs");

// Create a new user

const createAdmin = async () =>{
  try {
    const name = "admin";
    const password = await bcrypt.hash("admin",10);
    await userModel.create({name:name,password:password,role:"admin"});
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const createUser = async (req, res) => {
  try {

    const {name,password,role} = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        role: newUser.role
      }
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
    const user = await userModel.findOne({ name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
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