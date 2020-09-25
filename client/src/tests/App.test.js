import React from "react";
import { shallow } from "enzyme";
import App from "../App";

describe("App Component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<App />);
  });

  afterEach(() => {
    component.unmount();
  });

  it("Should render a navbar without errors", () => {
    const wrapper = component.find("[test-class='navbar']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a container without errors", () => {
    const wrapper = component.find("[test-class='container']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a switch without errors", () => {
    const wrapper = component.find("[test-class='switch']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a quiz route without errors", () => {
    const wrapper = component.find("[test-class='quiz-route']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a register route without errors", () => {
    const wrapper = component.find("[test-class='register-route']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a login route without errors", () => {
    console.log(component.debug());
    const wrapper = component.find("[test-class='login-route']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a redirect route without errors", () => {
    const wrapper = component.find("[test-class='redirect-route']");
    expect(wrapper.length).toBe(1);
  });
});
