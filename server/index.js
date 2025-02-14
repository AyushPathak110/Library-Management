import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import book from "./routes/book.js";
import user from "./routes/user.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/book", book);
app.use("/api/user", user);

mongoose
  .connect("mongodb://127.0.0.1:27017/library-management")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) =>
    console.error("Error connecting to the database:", err)
  );

app.listen(8080, () => console.log("Server running on port 8080"));
