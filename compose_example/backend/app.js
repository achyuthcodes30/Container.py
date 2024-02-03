import dotenv from "dotenv"; // To pass and use environment variables from compose file.
dotenv.config();

//Imports
import mongoose from "mongoose";
import taskroutes from "./src/routes/taskroutes.js";
import express from "express";
import cors from "cors";
// DB connection

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env["WHICH_DB"], {});
    console.log("Connected to db!");
  } catch (e) {
    console.log("Server crashed!");
  }
};

await dbConnect();

const app = express();

app.use(cors());

// Parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Using taks routes
app.use("/", taskroutes);

app.all("*", (req, res) => {
  res.status(404).send("Oops! Resource not found.");
});

// Set network port that the container will listen on
app.listen(process.env["PORT"], () => {
  console.log(
    `Listening on container port ${process.env["PORT"]} and host port 4000`
  );
});
