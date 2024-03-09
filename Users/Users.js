import express from "express";
const Users = express.Router();
import User from "../Models/User.js";
import Quiz from "../Models/Quiz.js";
Users.post("/register", function (req, res) {
  const { email, password, username } = req.body;
  User.register(
    new User({ email: email, username: username }),
    password,
    function (err, user) {
      if (err) {
        console.error("Registration error:", err);
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        console.log("User registered successfully:", user);

        res.json({
          success: true,
          message: "Your account has been saved",
          user: user,
        });
      }
    }
  );
});

Users.get("/my-quiz", async (req, res) => {
  const { username } = req.body.username;

  try {
    let myQuizzes = await Quiz.find({ username: username });

    // const filteredquiz = myQuizzes.map((entry) => ({
    //   title: entry.title,
    // }));

    res.status(200).json(myQuizzes);
  } catch (err) {
    res.status(500).json(err);
  }
});

Users.post("/newQuiz", function (req, res) {
  const { newQuiz, username, title, password } = req.body;
  Quiz.register(
    new Quiz({ username: username, quiz: newQuiz, title: title }),
    password,

    function (err, user) {
      if (err) {
        console.error("Registration error:", err);
        res.json({
          success: false,
          message: "Failed to save quiz Error: " + err,
        });
      } else {
        console.log("Quiz registered successfully:", user);

        res.json({
          success: true,
          message: "Your quiz has been saved",
          user: user,
        });
      }
    }
  );
});

export default Users;
