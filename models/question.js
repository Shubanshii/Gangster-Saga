const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  choices: {
    type: [String],
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  youtubeLink: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account"
  }
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
