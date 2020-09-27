const { hash, compare } = require("bcryptjs");

const User = require("../../models/User");
const { validateCredentials, generateToken } = require("../../utils/utils");

const register = async (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  const { valid, errors } = validateCredentials({
    action: "register",
    email,
    password,
    confirmPassword,
  });

  if (!valid) {
    const error = new Error();
    error.message = errors;
    return next(error);
  }

  const user = await User.findOne({ email });
  if (user) {
    const error = new Error();
    error.message = { email: "Email already registered" };
    return next(error);
  }

  const hashedPassword = await hash(password, 12);

  const newUser = await new User({
    email,
    password: hashedPassword,
  }).save();

  const token = generateToken(newUser);

  res.json({
    id: newUser._id,
    email: newUser.email,
    token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { valid, errors } = validateCredentials({
    email,
    password,
  });

  if (!valid) {
    const error = new Error();
    error.message = errors;
    return next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error();
    error.message = { email: "Email not registered" };
    return next(error);
  }

  const isPasswordCorrect = await compare(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error();
    error.message = { password: "Invalid password" };
    return next(error);
  }

  const token = generateToken(user);

  res.json({
    id: user._id,
    email: user.email,
    token,
  });
};

module.exports = { register, login };
