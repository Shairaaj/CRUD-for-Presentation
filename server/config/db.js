const mongoose = require("mongoose");

module.exports = async function dbConnect() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set in env");

  await mongoose.connect(uri);

  console.log("Connected to MongoDB");
};
