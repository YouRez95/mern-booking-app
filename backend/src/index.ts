import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";

// Create the app
const app = express();

// Middelwares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// Test Route
app.get("/api/test", async (req: Request, res: Response) => {
  res.json({ message: "hello from server" });
});

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Connect to Database & Start the server
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("database connected");
    app.listen(7000, () => {
      console.log("server running on port 7000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
