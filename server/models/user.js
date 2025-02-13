import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  rfidNumber: {
    type: String,
    required: true,
    unique: true,
  },
  issuedBooks: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", // Reference to the Book model
      },
      issueDate: {
        type: Date,
      },
      returnDate: {
        type: Date,
      },
    },
  ],
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
