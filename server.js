require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connect } = require("mongoose");

const app = express();
const user = require("./api/routes/user");
const question = require("./api/routes/question");
const adminPanel = require("./api/routes/admin");

const db = process.env.MONGO_URI;
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/admin", adminPanel);
app.use("/api/users", user);
app.use("/api/questions", question);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
