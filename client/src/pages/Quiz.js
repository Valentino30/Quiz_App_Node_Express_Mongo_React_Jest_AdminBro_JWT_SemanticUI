import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { List, Button, Header, Message } from "semantic-ui-react";
import Question from "../components/Question";

export default function Quiz() {
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/questions");
        setQuestions(response.data.questions);
      } catch (error) {
        setError(error);
      }
    };
    getQuestions();
    setLoading(false);
  }, []);

  const handleClick = (event, question, answer) => {
    // Prevent answering a question twice
    const filteredAnswers = answers.filter(
      (answer) => answer.questionId !== question._id
    );
    setAnswers([
      ...filteredAnswers,
      {
        id: answer._id,
        questionId: question._id,
        body: event.target.innerHTML,
        correct: question.correctAnswer === answer.body,
      },
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswers = answers.filter((answer) => answer.correct === true);
    setResult(
      `You have answered ${correctAnswers.length}/${questions.length} correctly`
    );
  };

  return (
    <div test-class="quiz">
      {loading ? (
        <Header size="large" className="loading" test-class="loading-header">
          Loading...{" "}
        </Header>
      ) : error ? (
        <Header size="large" className="error" test-class="error-header">
          Oops! Something went wrong, try refresh the page
        </Header>
      ) : (
        questions && (
          <Fragment>
            <List test-class="questions-list">
              {questions.map((question) => (
                <List.Item
                  key={question._id}
                  className="question"
                  test-class="question"
                >
                  <Question
                    question={question}
                    answers={answers}
                    handleClick={handleClick}
                  />
                </List.Item>
              ))}
            </List>
            <Button
              fluid
              className="submit"
              onClick={handleSubmit}
              test-class="submit-button"
              disabled={answers.length !== questions.length}
            >
              Submit
            </Button>
            {result && (
              <Message
                success
                content={result}
                className="result"
                header="Quiz Completed!"
                test-class="quiz-result-message"
              />
            )}
          </Fragment>
        )
      )}
    </div>
  );
}
