import { check } from "express-validator";
import User from "../models/user";

export const registerValidation = [
  check("firstName", "firstName is required").notEmpty(),
  check("lastName", "lastName is required").notEmpty(),
  check("email", "email is required")
    .isEmail()
    .withMessage("Not a valid e-mail address")
    .custom(async (value) => {
      const emailExist = await User.findOne({ email: value });
      if (emailExist) throw new Error("email already exists");
    }),
  check("password", "password with 6 characters or more is required").isLength({
    min: 6,
  }),
];

export const loginValidation = [
  check("email", "Not a valid e-mail address").isEmail(),
  check("password", "password with 6 characters or more is required").isLength({
    min: 6,
  }),
];
