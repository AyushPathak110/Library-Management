import express from "express";
import User from "../models/user.js";
import Book from "../models/book.js";
import mongoose from "mongoose";
const router = express.Router();

// Return book route with RFID for both user and book
router.post("/return-book", async (req, res) => {
  try {
    const { userRfid, bookRfid } = req.body;

    if (!userRfid || !bookRfid) {
      return res.status(400).json({ message: "User RFID and Book RFID are required" });
    }

    // Find user by RFID
    const user = await User.findOne({ rfidNumber: userRfid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the book in the user's issuedBooks array
    const bookIndex = user.issuedBooks.findIndex(
      (book) => book.bookId.rfid === bookRfid
    );
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in user's issued list" });
    }

    // Remove the book from the user's issuedBooks array
    user.issuedBooks.splice(bookIndex, 1);
    await user.save();

    // Find the book in the Book model and increment its quantity
    const book = await Book.findOne({ rfid: bookRfid });
    if (book) {
      book.quantity += 1;
      await book.save();
    }

    res.status(200).json({ message: "Book returned successfully", user });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST route to add a new user
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

// PUT route to update issued books by user's RFID
router.put("/update-issued-books/:rfidNumber", async (req, res) => {
  try {
    const { rfidNumber } = req.params;
    const { bookId, issueDate, returnDate } = req.body;

    if (!bookId || !issueDate) {
      return res.status(400).json({ message: "Book ID and Issue Date are required" });
    }

    // Find the book by bookId (case-insensitive)
    const book = await Book.findOne({ rfid: { $regex: bookId,} });
    if (!book) {
      return res.status(404).json({ message: `Book with RFID ${bookId} not found` });
    }

    // Find the user by RFID number
    const user = await User.findOne({ rfidNumber });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the book ObjectId to issuedBooks
    user.issuedBooks.push({
      bookId: book._id, // Store as ObjectId reference
      issueDate,
      returnDate: returnDate || null,
    });

    await user.save();
    res.status(200).json({ message: "Issued books updated successfully", user });
  } catch (error) {
    console.error("Error updating issued books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET route to fetch all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .populate("issuedBooks.bookId", "bookName"); // Populating bookName from Book model

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
