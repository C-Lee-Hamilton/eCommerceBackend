import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import Quiz from "../Models/Order.js";

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

router.post("/register", function (req, res) {
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
const PORT = process.env.PORT;

export default router;
