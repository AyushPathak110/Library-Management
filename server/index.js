import express from "express"
import 'express-async-errors'
import mongoose from "mongoose"

const tasks = require("./routes/tasks");

const app = express()


mongoose
  .connect("mongodb://127.0.0.1:27017/library-management")
  .then(() => console.log("Connected!"))
  .catch(() =>
    console.log("Some error was encountered while connecting with the database")
  );

app.listen(8080)