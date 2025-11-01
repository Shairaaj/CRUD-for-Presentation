const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/User");


                               //Connection to MONGODB
try {
  mongoose.connect(
    "mongodb+srv://shairaaj:Shai007@cluster0.8npjdpw.mongodb.net/CRUD"
  );
} catch (err) {
  console.log(`DB connection failed: ${err.message}`);
}
                                 //CREATING SERVER
const app = express();
app.use(express.json());
PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

                                   // Retrieving all Users
app.get("/getUser", (req, res) => {
  userModel
    .find()
    .then((details) => {
      res.json(details);
    })
    .catch((err) => console.log(`The error is: ${err.message}`));
});

                                   // Creating a Single Document
app.post("/createUser", (req, res) => {
  userModel
    .create(req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => console.log(`The error is: ${err.message}`));
});

                                    // Retrieving a Single Document
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  userModel
    .findOne({ _id: id })
    .then((laptop) => res.json(laptop))
    .catch((err) => console.log(`The error is: ${err.message}`));
});

                                    // Updating a Single Document
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndUpdate(
    { _id: id },
    { name: req.body.name, email: req.body.email, age: req.body.age }
  )
  .then((details)=>res.json(details))
  .catch((err)=>console.log(`the error is ${err}`));
});

                                    // Deleting a Single Document
app.delete("/deleteUser/:id", (req,res)=>{
    const id= req.params.id;
    userModel
      .findByIdAndDelete({ _id: id })
      .then((details) => res.json(details))
      .catch((err) => console.log(`the error is ${err}`));
})