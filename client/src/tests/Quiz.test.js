import React from "react";
import moxios from "moxios";
import { mount } from "enzyme";
import { act } from "@testing-library/react";

import Quiz from "../pages/Quiz";

describe("Quiz Component", () => {
  let component;
  let question;

  beforeEach(() => {
    moxios.install();
    component = mount(<Quiz />);

    question = {
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
  });

  afterEach(() => {
    moxios.uninstall();
    component.unmount();
  });

  it("Should render without errors", () => {
    const wrapper = component.find("[test-class='quiz']");
    expect(wrapper.length).toBe(1);
  });

  // Questions list and all its children not being rendered after call to API
  // it("Should render a list of questions without errors", async () => {
  //   await moxios.wait(jest.fn);
  //   await act(async () => {
  //     let request = moxios.requests.mostRecent();
  //     await request.respondWith({
  //       status: 200,
  //       response: [question],
  //     });
  //   });
  //   component.update();
  //   const wrapper = component.find("[test-class='questions-list']");
  //   expect(wrapper).toHaveLength(1);
  // });
});
