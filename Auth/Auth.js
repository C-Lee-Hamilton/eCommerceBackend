import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Quiz from "../Models/Quiz.js";

import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY;

const router = express.Router();

router.post("/login", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" });
  } else {
    passport.authenticate("local", function (err, user, info) {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({
            success: false,
            message: "username or password incorrect",
          });
        } else {
          const token = jwt.sign(
            { userId: user._id, username: user.username },
            secretKey,
            { expiresIn: "24h" }
          );
          res.json({
            success: true,
            message: "successful",
            token: token,
            user: user,
          });
        }
      }
    })(req, res);
  }
});
//logout

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res
        .status(500)
        .json({ message: "Internal server error during logout." });
    }

    res.clearCookie("loggedIn");
    return res.status(200).json({ message: "Logged out successfully." });
  });
});
//get Quizzes
router.get("/my-quiz", async (req, res) => {
  const { username } = req.query;

  try {
    let myQuizzes = await Quiz.find({ author: username });

    res.status(200).json(myQuizzes);
  } catch (err) {
    console.error("Error in /my-quiz route:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/edit-question", async (req, res) => {
  try {
    const { quizId, questionIndex, newData } = req.body;
    const quiz = await Quiz.findById(quizId);
    quiz.quiz[questionIndex] = newData;
    const updatedQuiz = await quiz.save();
    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error("Error editing question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT;

export default router;
