const mongoose = require("mongoose");


const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})


const articleModel = new mongoose.model("articles",articleSchema);

module.exports = articleModel;
