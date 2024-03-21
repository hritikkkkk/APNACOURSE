const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

module.exports = mongoose.model("Admin", adminSchema);
