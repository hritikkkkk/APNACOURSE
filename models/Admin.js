const mongoose = require("mongoose");
const { Schema } = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");


const adminSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password:String,
})

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);