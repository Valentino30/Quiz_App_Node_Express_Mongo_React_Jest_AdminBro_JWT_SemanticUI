import React from "react";
import { Header, List, Button } from "semantic-ui-react";

export default function Question({ question, answers, handleClick }) {
  return (
    <div test-class="question">
      <Header size="large" className="question" test-class="question-header">
        {question.body}
      </Header>
      <List className="answers" test-class="answers-list">
        {question.answers.map((answer) => (
          <List.Item key={answer._id} test-class="answer">
            <Button
              fluid
              type="button"
              test-class={`answer-button-${answer._id}`}
              className={
                answers.find((a) => a.id === answer._id) ? "selected" : ""
              }
              onClick={(e) => handleClick(e, question, answer)}
            >
              {answer.body}
            </Button>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
