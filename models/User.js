const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true }, // String is shorthand for {type: String}
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  
  // time: { type: Time, default: Time.now },
});
const User = mongoose.model('user', UserSchema);
User.createIndexes()
module.exports = User;
