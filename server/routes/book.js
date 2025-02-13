import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// GET: Fetch all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST: Add a new book
router.post("/add", async (req, res) => {
  try {
    const { bookName, rfid, author, quantity, section, publication } = req.body;

    // Validate required fields
    if (!bookName || !rfid || !author || quantity === undefined || !section || !publication) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if book with the same RFID already exists
    const existingBook = await Book.findOne({ rfid });
    if (existingBook) {
      return res.status(400).json({ message: "Book with this RFID already exists" });
    }

    // Create a new book
    const newBook = new Book({ bookName, rfid, author, quantity, section, publication });
    await newBook.save();

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
