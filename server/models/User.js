const mongoose = require("mongoose");
<<<<<<< HEAD

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { type: String, enum: ["teacher", "student"], required: true },
});

module.exports = mongoose.model("authUser", userSchema);
=======
const fs = require("node:fs/promises");

// ✅ Import the Teacher model before using it in refs or methods
require("./teacherModel");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  age: Number,
  teacherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "teachers" }],
},
  {
    // Inside schema Options..
    
    // methods
    methods: {
      findTeacher(callback) {
        return mongoose.model("teachers").find({ _id: {$in: this.teacherIds} }, callback);
      }
    },
    
    // statics
    statics:{
      findCaseInsensitiveName(name){
        return this.find({name:new RegExp(name, 'i')});
      }
    },

    // query
    query:{
      byAge(age){
        return this.where({age:age});
      }
    }

  }
)

// pre middleware -- runs before 'SAVE' function
studentSchema.pre('save', function (next) {
  this.__v++;
  next();
})

// post middleware -- runs after 'SAVE' function
studentSchema.post("save", async function (doc) {
  const filePath = "./post-log.txt";
  try {
    await fs.appendFile(filePath, doc.name + "\n");
  } catch (err) {
    if (err.code === "ENOENT") { //ENOENT - file is not there
      await fs.writeFile(filePath, doc.name + "\n");
    } else {
      console.error("Error writing to log:", err);
    }
  }
});



const studentModel = new mongoose.model("users", studentSchema);

module.exports = studentModel;
>>>>>>> a6c4b7647cb9f99c95950d2f1f194fdf53a94fce
