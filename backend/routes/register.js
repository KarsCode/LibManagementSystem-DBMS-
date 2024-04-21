// Import necessary modules
import express from "express";
import bcrypt from "bcrypt"
import pool from "../databasepg.js"
import jwt from "jsonwebtoken"



// Create an Express router
const router = express.Router();

// Route to handle user registration
router.post('/', async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user data into the database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password, userType) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, userType]
    );


    res.status(201).json(newUser.rows[0]); // Send back the newly created user data
  } catch (err) {
    if (err.constraint === 'users_email_key') {
        // Handle the case where the email already exists
        console.error('Error during registration:', err);
        res.status(400).json({ error: 'Email is already in use' });
      } else {
        // Handle other errors
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Registration failed:( Please try again later.' });
      }
  }
});

// Export the router
export default router;