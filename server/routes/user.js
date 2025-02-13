import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET route to fetch a single user by RFID number
router.get("/:rfidNumber", async (req, res) => {
    try {
      const { rfidNumber } = req.params;
  
      // Find user by RFID number
      const user = await User.findOne({ rfidNumber });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal Server Error" });
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



export default router;
