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
//

//
// router.post("/add-time", passport.authenticate("jwt"), async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const updatedTime = req.body.time;

//     const user = await User.findById(userId);

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     user.time.push(updatedTime);
//     await user.save();

//     console.log("User updated:", user);
//     return res.json({ success: true, user: user });
//   } catch (err) {
//     console.error(err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// });

// router.get(
//   "/detailed-report",
//   passport.authenticate("jwt"),
//   async (req, res) => {
//     try {
//       const userId = req.user._id;
//       const { startDate, endDate } = req.query;

//       const user = await User.findById(userId);
//       if (!user) {
//         return res
//           .status(404)
//           .json({ success: false, message: "User not found" });
//       }

//       const start = new Date(startDate);
//       start.setHours(0, 0, 0, 0);
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       start.setDate(start.getDate() + 1);
//       end.setDate(end.getDate() + 1);

//       const filteredEntries = user.time.filter((entry) => {
//         const entryDateParts = entry.date.split("/");
//         const entryDate = new Date(
//           parseInt(entryDateParts[2], 10) + 2000,
//           parseInt(entryDateParts[0], 10) - 1,
//           parseInt(entryDateParts[1], 10)
//         );

//         return entryDate >= start && entryDate <= end;
//       });

//       const entriesWithDetails = filteredEntries.map((entry) => ({
//         date: entry.date,
//         timeWorked: entry.time,
//         rate: entry.rate,
//         pay: entry.pay,
//       }));

//       res.json({ success: true, entries: entriesWithDetails });
//     } catch (err) {
//       console.error(err);
//       return res
//         .status(500)
//         .json({ success: false, message: "Internal server error" });
//     }
//   }
// );
router.get("/my-quiz", async (req, res) => {
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

const PORT = process.env.PORT;

export default router;
