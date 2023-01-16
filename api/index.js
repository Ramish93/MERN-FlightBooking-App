import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
  }
};

// this method of mongoose will try to reconnect if somthing happens with connection.
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB is Disconnected!");
});

app.get("/", (req, res) => {
  res.send("hello");
});

// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// error handlers middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Sorry!! something went wrong";

  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    stack: err.stack,
    status: err.status,
  });
});

app.listen(8080, () => {
  connect();
  console.log("listening on port 8080");
});
