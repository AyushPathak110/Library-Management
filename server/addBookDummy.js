import mongoose from 'mongoose';
import Book from './models/book.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch(err => console.error('Database connection error:', err));

const dummyBooks = [
  { bookName: "The Great Indian Novel", rfid: "RFID1000001", author: "Shashi Tharoor", quantity: 5, section: "Shelf A", publication: "Viking" },
  { bookName: "Wings of Fire", rfid: "RFID1000002", author: "A.P.J. Abdul Kalam", quantity: 3, section: "Shelf B", publication: "Universities Press" },
  { bookName: "The White Tiger", rfid: "RFID1000003", author: "Aravind Adiga", quantity: 4, section: "Shelf C", publication: "HarperCollins" },
  { bookName: "Train to Pakistan", rfid: "RFID1000004", author: "Khushwant Singh", quantity: 6, section: "Shelf D", publication: "Grove Press" },
  { bookName: "The Guide", rfid: "RFID1000005", author: "R.K. Narayan", quantity: 2, section: "Shelf E", publication: "Indian Thought Publications" },
  { bookName: "God of Small Things", rfid: "RFID1000006", author: "Arundhati Roy", quantity: 5, section: "Shelf F", publication: "Random House" },
  { bookName: "I Too Had a Love Story", rfid: "RFID1000007", author: "Ravinder Singh", quantity: 7, section: "Shelf G", publication: "Penguin India" },
  { bookName: "Half Girlfriend", rfid: "RFID1000008", author: "Chetan Bhagat", quantity: 8, section: "Shelf H", publication: "Rupa Publications" },
  { bookName: "You Can Win", rfid: "RFID1000009", author: "Shiv Khera", quantity: 3, section: "Shelf I", publication: "Macmillan" },
  { bookName: "India After Gandhi", rfid: "RFID1000010", author: "Ramachandra Guha", quantity: 4, section: "Shelf J", publication: "HarperCollins" },
  { bookName: "The Immortals of Meluha", rfid: "RFID1000011", author: "Amish Tripathi", quantity: 6, section: "Shelf K", publication: "Westland" },
  { bookName: "Rich Dad Poor Dad", rfid: "RFID1000012", author: "Robert Kiyosaki", quantity: 5, section: "Shelf L", publication: "Plata Publishing" },
  { bookName: "Atomic Habits", rfid: "RFID1000013", author: "James Clear", quantity: 3, section: "Shelf M", publication: "Penguin Random House" },
  { bookName: "Sapiens", rfid: "RFID1000014", author: "Yuval Noah Harari", quantity: 4, section: "Shelf N", publication: "Harper" },
  { bookName: "Zero to One", rfid: "RFID1000015", author: "Peter Thiel", quantity: 5, section: "Shelf O", publication: "Crown Business" },
];

Book.insertMany(dummyBooks)
  .then(() => {
    console.log('Dummy books added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting books:', err);
    mongoose.disconnect();
  });
