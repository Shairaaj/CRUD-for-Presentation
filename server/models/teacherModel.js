const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String
}
)


const teacherModel = new mongoose.model("teachers",teacherSchema);

module.exports = teacherModel;
