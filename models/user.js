const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    purchasedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
    
});

module.exports = mongoose.model("User", userSchema);