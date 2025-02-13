import mongoose from 'mongoose';
import User from './models/user.js';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/library-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Database connected');
}).catch(err => console.error('Database connection error:', err));

const dummyUsers = [
  {
    name: "Aarav Patel",
    email: "aarav.patel@example.com",
    phoneNumber: "9876543210",
    rfidNumber: "RFID1234567890",
  },
  {
    name: "Diya Sharma",
    email: "diya.sharma@example.com",
    phoneNumber: "9123456789",
    rfidNumber: "RFID9876543210",
  },
  {
    name: "Vivaan Gupta",
    email: "vivaan.gupta@example.com",
    phoneNumber: "9876123456",
    rfidNumber: "RFID1122334455",
  },
  {
    name: "Isha Reddy",
    email: "isha.reddy@example.com",
    phoneNumber: "9988776655",
    rfidNumber: "RFID5566778899",
  },
  {
    name: "Arjun Nair",
    email: "arjun.nair@example.com",
    phoneNumber: "8899775566",
    rfidNumber: "RFID9988776655",
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
