import "dotenv/config";
import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import postsRoutes from "./routes/postsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type"],
  })
);

app.get("/", (req, res) => {
  console.log(req);
  return res.status(200).send("Posts api");
});

app.use("/posts", postsRoutes);
app.use("/users", userRoutes);
app.use("/comments", commentRoutes);
app.use("/ratings", ratingRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to db");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
