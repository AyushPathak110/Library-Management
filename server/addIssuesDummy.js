import mongoose from 'mongoose';
import IssuedBook from './models/issue.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch(err => console.error('Database connection error:', err));

const dummyIssuedBooks = [
  { userRfid: "RFID1234567890", bookRfid: "RFID1000001", issueDate: new Date("2025-02-01"), returnDate: new Date("2025-02-10") },
  { userRfid: "RFID9876543210", bookRfid: "RFID1000002", issueDate: new Date("2025-02-02"), returnDate: new Date("2025-02-12") },
  { userRfid: "RFID1122334455", bookRfid: "RFID1000003", issueDate: new Date("2025-02-03"), returnDate: new Date("2025-02-13") },
  { userRfid: "RFID5566778899", bookRfid: "RFID1000004", issueDate: new Date("2025-02-04"), returnDate: new Date("2025-02-14") },
  { userRfid: "RFID9988776655", bookRfid: "RFID1000005", issueDate: new Date("2025-02-05"), returnDate: new Date("2025-02-15") },
  { userRfid: "RFID1234567890", bookRfid: "RFID1000006", issueDate: new Date("2025-02-06"), returnDate: new Date("2025-02-16") },
  { userRfid: "RFID9876543210", bookRfid: "RFID1000007", issueDate: new Date("2025-02-07"), returnDate: new Date("2025-02-17") },
  { userRfid: "RFID1122334455", bookRfid: "RFID1000008", issueDate: new Date("2025-02-08"), returnDate: new Date("2025-02-18") },
];

IssuedBook.insertMany(dummyIssuedBooks)
  .then(() => {
    console.log('Dummy issued books added');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error inserting issued books:', err);
    mongoose.disconnect();
  });
