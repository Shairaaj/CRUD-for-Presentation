const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createAdmin } = require("./controllers/userConroller");

dotenv.config();
connectDB();


// createAdmin();
const app= express();

//MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//CORS
app.use(cors());

app.use("/api/users",userRoutes);
app.use("/api/articles",articleRoutes);

app.get("/",(req,res)=>{
  res.send("Hello developer");
})

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server is listening on PORT ${PORT}`)
})
