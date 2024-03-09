import express from "express";
const quizzer = express.Router();
import Quiz from "../Models/Quiz.js";

quizzer.post("/register", function (req, res) {
  const { newQuiz, username, title } = req.body;
  Quiz.register(
    new Quiz({ username: username, newQuiz: newQuiz, title: title }),

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
