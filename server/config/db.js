const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connnected successfully!`);
  } catch (err) {
    console.log(`DB connection failed: ${err.message}`);
  }
};

module.exports = connectDB;
