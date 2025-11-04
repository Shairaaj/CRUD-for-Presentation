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