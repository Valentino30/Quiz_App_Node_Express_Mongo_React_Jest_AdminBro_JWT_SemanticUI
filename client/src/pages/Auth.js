import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Form, Header, Button } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import { capitalizeFirstLetter } from "../utils/utils";

export default function Auth({ history }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { login } = useContext(AuthContext);
  const action = history.location.pathname.substring(1);

  // Clean up errors when switching from Register to Login
  useEffect(() => {
    setErrors({});
  }, [history.location]);

  const handleChange = (event, { name }) => {
    setCredentials({ ...credentials, [name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/users/${action}`,
        credentials
      );
      login(response.data);
      setErrors({});
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
    setLoading(false);
  };

  return (
    <Form
      noValidate
      test-class="auth-form"
      onSubmit={handleSubmit}
      className={loading ? "loading auth" : "auth"}
    >
      <Header size="large" className="auth" test-class="auth-form-header">
        {capitalizeFirstLetter(action)}
      </Header>
      <Form.Input
        fluid
        type="email"
        name="email"
        test-class="email"
        placeholder="Email"
        onChange={handleChange}
        error={errors.response && errors.response.data.error.message.email}
      />
      <Form.Input
        fluid
        type="password"
        name="password"
        test-class="password"
        placeholder="Password"
        onChange={handleChange}
        error={errors.response && errors.response.data.error.message.password}
      />
      {action === "register" && (
        <Form.Input
          fluid
          type="password"
          name="confirmPassword"
          test-class="confirm-password"
          placeholder="Confirm Password"
          onChange={handleChange}
          error={errors.response && errors.response.data.error.message.password}
        />
      )}
      <Button fluid className="submit" test-class="auth-button">
        {capitalizeFirstLetter(action)}
      </Button>
    </Form>
  );
}
