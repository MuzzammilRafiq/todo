import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const userPresent = await UserModel.find({ username: req.body.username });

    if (userPresent.lenght == []) {
      console.log(userPresent);
      return next(createError(400, "username unavailable"));
    }
    const newUser = UserModel({ ...req.body, password: hash });

    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "no user found"));
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return next(createError(400, "incorrect username or password"));
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ details: { ...otherDetails }, access_token: token });
  } catch (err) {
    next(err);
  }
};

export const checkAuthorized = async (req, res, next) => {
  const token = await req.headers["access_token"];

  jwt.verify(token, process.env.JWT_KEY, async (err, verifiedJwt) => {
    if (err) return next(err);
    try {
      const user = await UserModel.findById(verifiedJwt.id);
      const { password, ...details } = user;
      res.status(200).json({ ...details });
    } catch (error) {
      next(error);
    }
  });
};
