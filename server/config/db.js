const mongoose = require("mongoose");

<<<<<<< HEAD
module.exports = async function dbConnect() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in env");

  await mongoose.connect(uri);

  console.log("Connected to MongoDB");
};
=======
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connnected successfully!`);
  } catch (err) {
    console.log(`DB connection failed: ${err.message}`);
  }
};

module.exports = connectDB;
>>>>>>> a6c4b7647cb9f99c95950d2f1f194fdf53a94fce
