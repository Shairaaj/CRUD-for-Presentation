<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const dbConnect = require("./config/db");
const authRoutes = require("./routes/auth");
const announcementRoutes = require("./routes/announcements");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static frontend
app.use(express.static("public"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/announcements", announcementRoutes);

const PORT = process.env.PORT || 5173;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
    process.exit(1);
  });
=======
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const bodyParser = require("body-parser");

dotenv.config();
connectDB();

const app= express();

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/api/users",userRoutes);

app.get("/",(req,res)=>{
  res.send("Hello developer");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`)
})
>>>>>>> a6c4b7647cb9f99c95950d2f1f194fdf53a94fce
