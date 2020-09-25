import React from "react";
import { mount } from "enzyme";
import { BrowserRouter as Router } from "react-router-dom";

import Auth from "../pages/Auth";
import { AuthRoute } from "../utils/customRoutes";

describe("Auth Form", () => {
  let component;

  beforeEach(() => {
    component = mount(
      <Router>
        <AuthRoute exact path="/login" component={Auth} />
      </Router>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it("Should render the form without errors", () => {
    const wrapper = component.find("[test-class='auth-form']");
    // Expect 2 wrappers due to Semantic UI
    expect(wrapper.length).toBe(2);
  });

  it("Should render the form header without errors", () => {
    const wrapper = component.find("[test-class='auth-form-header']");
    // Expect 2 wrappers due to Semantic UI
    expect(wrapper.length).toBe(2);
  });

  it("Should render the email input without errors", () => {
    const wrapper = component.find("[test-class='email']");
    // Expect 4 wrappers due to Semantic UI
    expect(wrapper.length).toBe(4);
  });

  it("Should render the password input without errors", () => {
    const wrapper = component.find("[test-class='password']");
    // Expect 4 wrappers due to Semantic UI
    expect(wrapper.length).toBe(4);
  });

  // Confirm password input is not being rendered when path="/register"
  // it("Should render the confirm password input without errors", () => {
  //   component = mount(
  //     <Router>
  //       <AuthRoute exact path="/register" component={Auth} />
  //     </Router>
  //   );
  //   console.log(component.debug());
  //   const wrapper = component.find("[test-class='confirm-password']");
  //   // Expect 4 wrappers due to Semantic UI
  //   expect(wrapper.length).toBe(4);
  // });

  it("Should render the auth button without errors", () => {
    const wrapper = component.find("[test-class='auth-button']");
    // Expect 2 wrappers due to Semantic UI
    expect(wrapper.length).toBe(2);
  });
});
