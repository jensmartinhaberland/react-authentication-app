import { connect } from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { User } from "./User";
import bcrypt from "bcryptjs";

try {
  const connection = async () => {
    await connect(
      "mongodb+srv://db:db@reactauthenticationapp.pqr8q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
  };
  console.log("CONNECTED TO MONGODB!");
} catch (error) {
  console.error(error);
}

// Middleware
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post("/register", async (req: Request, res: Response) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
  });
  await newUser.save();
  res.send("SUCCESS!");
});