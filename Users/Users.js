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

Users.post("/newQuiz", async (req, res) => {
  try {
    const { title, qArray, username, views } = req.body;

    const newQuiz = new Quiz({
      title,
      author: username,
      quiz: qArray,
      views: views,
    });

    const savedQuiz = await newQuiz.save();

    console.log("Quiz saved successfully:", savedQuiz);

    res.json({
      success: true,
      message: "Your quiz has been saved",
      quiz: savedQuiz,
    });
  } catch (error) {
    console.error("Save error:", error);
    res.json({
      success: false,
      message: "Failed to save quiz. Error: " + error.message,
    });
  }
});

Users.post("/edit-quiz-title", async (req, res) => {
  try {
    const { quizId, newTitle } = req.body;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title: newTitle },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error editing quiz title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Users.delete("/delete-question", async (req, res) => {
  try {
    const { quizId, questionIndex } = req.body;
    const quiz = await Quiz.findById(quizId);
    quiz.quiz.splice(questionIndex, 1);
    const updatedQuiz = await quiz.save();
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Users.delete("/delete-quiz/", async (req, res) => {
  try {
    const { quizId } = req.body;
    await Quiz.findByIdAndDelete(quizId);
    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quiz:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Users.post("/add-question", async (req, res) => {
  try {
    const { Question, A, B, C, D, Answer, quizIndex } = req.body;

    const quiz = await Quiz.findById(quizIndex);

    const newQuestion = {
      Question,
      A,
      B,
      C,
      D,
      Answer,
    };
    quiz.quiz.push(newQuestion);

    const updatedQuiz = await quiz.save();

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Users.post("/add-view", async (req, res) => {
  try {
    const { quizId, newViews } = req.body;
    const updatedQuizView = await Quiz.findByIdAndUpdate(
      quizId,
      { views: newViews },
      { new: true }
    );
    res.status(200).json(updatedQuizView);
  } catch (error) {
    console.error("Error editing quiz title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Users;
