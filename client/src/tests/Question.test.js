import React from "react";
import { shallow } from "enzyme";
import Question from "../components/Question";

describe("Question Component", () => {
  const question = {
    _id: "728df0b5-cdf1-4688-b222-4ab02a6f9520",
    body: "What is the capital of France",
    answers: [
      {
        _id: "5f5245a7a812cd7a7442ad9c",
        body: "Nice",
      },
      {
        _id: "5f5245a7a812cd7a7442ad9d",
        body: "Paris",
      },
      {
        _id: "5f5245a7a812cd7a7442ad9e",
        body: "Marseille",
      },
    ],
  };

  const answers = [
    {
      id: "728df0b5-cdf1-4688-b222-4ab02a6f9520",
      questionId: "728df0b5-cdf1-4688-b222-4ab02a6f9520",
      body: "Paris",
    },
  ];

  const component = shallow(<Question question={question} answers={answers} />);

  it("Should render a question without errors", () => {
    const wrapper = component.find("[test-class='question']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a question header without errors", () => {
    const wrapper = component.find("[test-class='question-header']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render an answers list without errors", () => {
    const wrapper = component.find("[test-class='answers-list']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render three answers without errors", () => {
    const wrapper = component.find("[test-class='answer']");
    expect(wrapper.length).toBe(3);
  });
});
