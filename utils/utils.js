const { sign } = require("jsonwebtoken");
const validator = require("email-validator");

const validateCredentials = ({ action, email, password, confirmPassword }) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else if (!validator.validate(email)) {
    errors.email = "Email must be a valid email address";
  }

  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  } else if (action === "register" && password !== confirmPassword) {
    errors.password = "Passwords must match";
  }

  return { valid: Object.keys(errors).length === 0, errors };
};

const generateToken = (user) => {
  const token = sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return token;
};

module.exports = { validateCredentials, generateToken };
