const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  answers: [
    {
      body: {
        type: String,
        required: true,
      },
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: false,
  },
});

const Question = model("Question", QuestionSchema);

module.exports = Question;
