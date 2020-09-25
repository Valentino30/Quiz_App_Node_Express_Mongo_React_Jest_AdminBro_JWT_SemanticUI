const express = require("express");
const router = express.Router();

const { createQuestion, getQuestions } = require("../controllers/question");

router.post("/", createQuestion);
router.get("/", getQuestions);

module.exports = router;
