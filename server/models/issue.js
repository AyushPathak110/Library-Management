import mongoose from "mongoose";

const issuedBookSchema = new mongoose.Schema({
  userRfid: { type: String, required: true },
  bookRfid: { type: String, required: true },
  issueDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
}, { timestamps: true });

const IssuedBook = mongoose.model("IssuedBook", issuedBookSchema);

export default IssuedBook;
