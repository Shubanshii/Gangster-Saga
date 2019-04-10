const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");
const Question = require("./question");

const Account = new Schema({
  username: String,
  password: String,
  points: Number
});

Account.virtual("questions", {
  ref: "Question",
  localField: "_id",
  foreignField: "owner"
});

Account.pre("remove", async function(next) {
  const user = this;
  await Question.deleteMany({ owner: user._id });
  next();
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model("accounts", Account);
