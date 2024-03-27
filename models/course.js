const mongoose = require("mongoose");
const { Schema } = mongoose;


const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published:Boolean
})

module.exports = mongoose.model('Course', courseSchema);