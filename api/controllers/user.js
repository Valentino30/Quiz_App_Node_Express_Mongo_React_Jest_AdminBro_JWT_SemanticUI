const { hash, compare } = require("bcryptjs");

const User = require("../../models/User");
const { validateCredentials, generateToken } = require("../../utils/utils");

const register = async (req, res, next) => {
  try {
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
      throw error;
    }

    const user = await User.findOne({ email });
    if (user) {
      const error = new Error();
      error.message = { email: "Email already registered" };
      throw error;
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
  } catch (error) {
    res.status(400);
    res.json({
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { valid, errors } = validateCredentials({
      email,
      password,
    });

    if (!valid) {
      const error = new Error();
      error.message = errors;
      throw error;
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error();
      error.message = { email: "Email not registered" };
      throw error;
    }

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      const error = new Error();
      error.message = { password: "Invalid password" };
      throw error;
    }

    const token = generateToken(user);

    res.json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(400);
    res.json({
      error: error.message,
    });
  }
};

module.exports = { register, login };
