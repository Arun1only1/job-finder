import express from "express";
import bcrypt from "bcrypt";
import { User } from "./user.model.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register user
// TODO:Joi validation
// TODO:check email uniqueness
router.post("/user/register", async (req, res) => {
  let newUser = req.body;

  const user = await User.findOne({ email: newUser.email });

  if (user) {
    return res
      .status(409)
      .send({ message: "User with this email already exists in our system." });
  }

  newUser.password = await bcrypt.hash(newUser.password, 8);

  await User.create(newUser);

  return res.status(201).send({ message: "User is registered successfully." });
});

// login user
// TODO:validation
router.get("/user/login", async (req, res) => {
  const loginCredentials = req.body;
  //   check if user exists using email
  const user = await User.findOne({ email: loginCredentials.email });

  if (!user) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  const passwordMatch = await bcrypt.compare(
    loginCredentials.password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(401).send({ message: "Invalid credentials." });
  }

  //   remove password from response
  user.password = undefined;

  //   generate access token
  const accesstoken = jwt.sign({ _id: user._id }, "djakfadfakv1234dfjkad", {
    expiresIn: "1d",
  });

  return res.status(200).send({ user, accesstoken });
});
export default router;
