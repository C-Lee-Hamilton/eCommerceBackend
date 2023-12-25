import dotenv from "dotenv";
dotenv.config();



import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Users from "./Users/Users.js";
import auth from "./Auth/Auth.js";
import mongoose from "mongoose";
import passport from "passport";
import User from "./Models/User.js";
//session test
import session from "express-session";
import jwtstuff from "passport-jwt";
const JwtStrategy = jwtstuff.Strategy;
const ExtractJwt = jwtstuff.ExtractJwt;
//end of session test
import LocalStrategy1 from "passport-local";
const LocalStrategy = LocalStrategy1.Strategy;
const secretKey = process.env.SECRET_KEY;
//session test
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
  secretOrKey: secretKey,
};

//end of session test
passport.use(new LocalStrategy(User.authenticate()));
//session passport.use

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId); // Use await here

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

//end of session passport.use

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// express-session
app.use(
  session({
    secret: secretKey,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/Users", Users);
app.use("/Auth", auth);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
