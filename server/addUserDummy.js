import mongoose from 'mongoose';
import User from './models/User.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library-management').then(() => {
  console.log('Database connected');
}).catch(err => console.error('Database connection error:', err));

const dummyUsers = [
  {
    name: "Aarav Patel", 
    email: "aarav.patel@example.com",
    phoneNumber: "9876543210",
    rfidNumber: "RFID1234567890",
    issuedBooks: [
      {
        bookId: "67ae35b6e5c50a42b4024687", // The Great Indian Novel
        issueDate: new Date("2025-02-01"),
        returnDate: new Date("2025-02-15"),
      },
      {
        bookId: "67ae35b6e5c50a42b4024688", // The White Tiger
        issueDate: new Date("2025-02-05"),
        returnDate: new Date("2025-02-20"),
      },
    ],
  },
  {
    name: "Diya Sharma",
    email: "diya.sharma@example.com",
    phoneNumber: "9123456789",
    rfidNumber: "RFID9876543210",
    issuedBooks: [
      {
        bookId: "67ae35b6e5c50a42b4024689", // Wings of Fire
        issueDate: new Date("2025-02-03"),
        returnDate: new Date("2025-02-17"),
      },
    ],
  },
  {
    name: "Vivaan Gupta",
    email: "vivaan.gupta@example.com",
    phoneNumber: "9876123456",
    rfidNumber: "RFID1122334455",
    issuedBooks: [
      {
        bookId: "67ae35b6e5c50a42b4024690", // Train to Pakistan
        issueDate: new Date("2025-02-07"),
        returnDate: new Date("2025-02-21"),
      },
    ],
  },
  {
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    phoneNumber: "8899775566",
    rfidNumber: "RFID9988776655",
    issuedBooks: [
      {
        bookId: "67ae35b6e5c50a42b4024694", // God of Small Things
        issueDate: new Date("2025-02-06"),
        returnDate: new Date("2025-02-20"),
      }
    ],
  },
];


User.insertMany(dummyUsers)
  .then(() => {
    console.log('Dummy users added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting users:', err);
    mongoose.disconnect();
  });
