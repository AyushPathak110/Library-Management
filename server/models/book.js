import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    bookName: { type: String, required: true },
    rfid: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    quantity: { type: Number, required: true },
    section: { type: String, required: true },
    publication: { type: String, required: true },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
