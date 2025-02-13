import express from "express";
import User from "../models/user.js";
import Book from "../models/book.js"
import mongoose from "mongoose";
const router = express.Router();

router.get("/:rfidNumber", async (req, res) => {
  try {
    const { rfidNumber } = req.params;

    const user = await User.findOne({ rfidNumber });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST: Add a new user
router.post("/add", async (req, res) => {
  try {
    const { name, email, phoneNumber, rfidNumber } = req.body;

    if (!name || !email || !phoneNumber || !rfidNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }, { rfidNumber }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email, phone, or RFID already exists" });
    }

    const newUser = new User({ name, email, phoneNumber, rfidNumber });

    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




router.put("/update-issued-books/:rfidNumber", async (req, res) => {
  try {
    const { rfidNumber } = req.params;
    const { bookId, issueDate, returnDate } = req.body;

    console.log("Received PUT request for RFID:", rfidNumber);
    console.log("Request body:", req.body);

    if (!bookId || !issueDate) {
      return res.status(400).json({ message: "Book ID and Issue Date are required" });
    }

    // Debugging: Print all books in the database
    const allBooks = await Book.find();
    console.log("Books in DB:", allBooks);

    // Find the book by bookId (case-insensitive)
    const book = await Book.findOne({ rfid: { $regex: bookId,} });
    console.log("Found book:", book);

    if (!book) {
      return res.status(404).json({ message: `Book with ID ${bookId} not found` });
    }

    // Find the user by RFID
    const user = await User.findOne({ rfidNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User found:", user);

    // Add the book ObjectId to issuedBooks
    user.issuedBooks.push({
      bookId: book._id, // Store as ObjectId reference
      issueDate,
      returnDate: returnDate || null,
    });

    await user.save();

    console.log("Issued book updated successfully!");
    res.status(200).json({ message: "Issued books updated successfully", user });
  } catch (error) {
    console.error("Error updating issued books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});




export default router;
