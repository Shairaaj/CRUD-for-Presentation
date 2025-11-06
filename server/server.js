const express = require("express");
const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const articleRoutes = require("./routes/articleRoutes");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { createAdmin } = require("./controllers/userConroller");

dotenv.config();
// connectDB();


// createAdmin() //-- use this if you don't already inserted admin;

const app= express();

//MIDDLEWARES -- hint bodyparser



//CORS // -- hint use cors()



// app.use("/api/users",userRoutes);
// app.use("/api/articles",articleRoutes);

app.get("/",(req,res)=>{
  res.send("Hello developer");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`)
})
