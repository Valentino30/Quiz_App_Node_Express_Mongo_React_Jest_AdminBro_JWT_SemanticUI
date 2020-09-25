const Question = require("../../models/Question");

const createQuestion = async (req, res, next) => {
  try {
    const { body, answers, correctAnswer, published } = req.body;

    const question = await new Question({
      body,
      answers,
      correctAnswer,
      published,
    }).save();

    res.json({
      id: question._id,
      body: question.body,
      answers: question.answers,
      correctAnswer: question.correctAnswer,
      published: question.published,
    });
  } catch (error) {
    next(error);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();
    res.json({
      questions,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createQuestion, getQuestions };
