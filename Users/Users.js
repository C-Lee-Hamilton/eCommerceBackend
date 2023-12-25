import express from "express";
const Users = express.Router();
import User from "../Models/User.js";

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

        // Send user data back to the frontend
        res.json({
          success: true,
          message: "Your account has been saved",
          user: user,
        });
      }
    }
  );
});

export default Users;
