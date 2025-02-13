import express from "express";
import IssuedBook from "../models/issue.js";
import Book from "../models/book.js"; // Import Book model

const router = express.Router();

router.get("/:rfidNumber", async (req, res) => {
  try {
    const { rfidNumber } = req.params;

    // Find all issued books for the user
    const issuedBooks = await IssuedBook.find({ userRfid: rfidNumber });

    if (!issuedBooks.length) {
      return res.status(404).json({ message: "No issued books found for this user." });
    }

    // Fetch book titles manually
    const formattedBooks = await Promise.all(
      issuedBooks.map(async (book) => {
        const bookDetails = await Book.findOne({ rfid: book.bookRfid }); // Find book by RFID
        return {
          _id: book._id,
          title: bookDetails ? bookDetails.title : "Unknown Book", // Use title if found
          issueDate: book.issueDate,
          returnDate: book.returnDate,
        };
      })
    );

    res.json(formattedBooks);
  } catch (error) {
    console.error("Error fetching issued books:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
