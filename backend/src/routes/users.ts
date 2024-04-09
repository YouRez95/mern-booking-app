import { Router, Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { registerValidation } from "../utils/validation";
import { validationResult } from "express-validator";

const router = Router();

/**
 @method POST
 @route /api/users/register
 @responses
    400: Bad request "validation failed"
    201: user created succesfully
    500: server error
 */
router.post(
  "/register",
  registerValidation,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      const { email, firstName, lastName, password } = req.body;
      const user = new User({ email, firstName, lastName, password });
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });
      res.status(201).json({ message: "Created successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "something went wrong" });
    }
  }
);

export default router;
