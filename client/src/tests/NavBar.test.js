import React from "react";
import { mount, shallow } from "enzyme";

import NavBar from "../components/NavBar";
import { AuthContext } from "../context/auth";
import { BrowserRouter as Router } from "react-router-dom";

describe("NavBar Component", () => {
  let component;

  beforeEach(() => {
    component = shallow(<NavBar />);
  });
  afterEach(() => {
    component.unmount();
  });

  it("Should render a navbar component as <navbar/> without errors", () => {
    const wrapper = component.find("[test-class='navbar']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a quiz navbar item as <a/> without errors", () => {
    const wrapper = component.find("[test-class='navbar-item-quiz']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a register navbar item as <a/> without errors", () => {
    const wrapper = component.find("[test-class='navbar-item-register']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a login navbar item as <a/> without errors", () => {
    const wrapper = component.find("[test-class='navbar-item-login']");
    expect(wrapper.length).toBe(1);
  });

  it("Should render a logout navbar item as <a/> without errors", () => {
    const user = {
      id: 1,
      email: "email@gmail.com",
      token: "1q2w3e",
    };

    component = mount(
      <AuthContext.Provider
        value={{ user }}
      >
        <Router>
          <NavBar />
        </Router>
      </AuthContext.Provider>
    );
    const wrapper = component.find("[test-class='navbar-item-logout']");
    // Expect 4 wrappers instead of 1 due to the HTML produced by Semantic UI
    // The other tests expect only 1 wrapper because they're shallow rendering
    // Here mount is needed for the provider to have an effect on the NavBar component
    expect(wrapper.length).toBe(4);
  });
});
