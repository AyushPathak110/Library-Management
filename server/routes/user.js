import express from "express";
import User from "../models/user.js";
import Book from "../models/book.js";

const router = express.Router();

// Return book route
router.post("/return-book", async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ message: "User ID and Book ID are required" });
    }

    // Find user and remove book from issuedBooks
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const bookIndex = user.issuedBooks.findIndex((book) => book.bookId.toString() === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in issued list" });
    }

    user.issuedBooks.splice(bookIndex, 1); // Remove book from issuedBooks
    await user.save();

    // Increment book quantity
    const book = await Book.findById(bookId);
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

    // Check if required fields are missing
    if (!name || !email || !phoneNumber || !rfidNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user with the same email, phone, or RFID number
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber }, { rfidNumber }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email, phone, or RFID already exists" });
    }

    // Create a new user
    const newUser = new User({ name, email, phoneNumber, rfidNumber });

    // Save user to database
    await newUser.save();
    res.status(201).json({ message: "User added successfully", user: newUser });

  } catch (error) {
    console.error("Error adding user:", error);
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
