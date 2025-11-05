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
