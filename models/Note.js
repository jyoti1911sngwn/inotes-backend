const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, //like foreign id in sql - we are taking user from other database(Users)
    ref: "user",
  },
  title: { type: String, required: true }, // String is shorthand for {type: String}
  description: { type: String, required: true },
  tag: { type: String , default: "general"},
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", UserSchema);
