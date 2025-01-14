const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String, required: true },
  picture: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
