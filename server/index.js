import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import userRoute from "./src/routes/userRoute.js";
import taskRoute from "./src/routes/taskRoute.js";

const app = express();
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO, () => {
      console.log("mongodb connected");
    });
  } catch (err) {
    console.log(err);
  }
};
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

app.use(cors());
app.use(express.json());

app.use("/task", taskRoute);
app.use("/user", userRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("backend connected");
});
