// // Import necessary modules
// import express from "express";
// import bcrypt from "bcrypt"
// import pool from "../databasepg.js"
// import jwt from "jsonwebtoken"

// // Create an Express router
// const router = express.Router();

// // Route to handle user login
// router.post('/', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user with the provided email exists
//     const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     if (user.rows.length === 0) {
//       // If user not found, return error response
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     // Verify the password
//     const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
//     if (!passwordMatch) {
//       // If password does not match, return error response
//       return res.status(401).json({ error: 'Invalid password.' });
//     }

//     // If email and password are correct, return success response
//     res.status(200).json({ message: 'Login successful.', user: user.rows[0] });
//   } catch (err) {
//     console.error('Error during login:', err);
//     res.status(500).json({ error: 'Login failed. Please try again later.' });
//   }
// });

// // Export the router
// export default router


import express from "express";
import bcrypt from "bcrypt"
import pool from "../databasepg.js"
import jwt from "jsonwebtoken"

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      // If user not found, return error response
      return res.status(404).json({ error: 'User not found.' });
    }

    // Verify the password
    const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
    if (!passwordMatch) {
      // If password does not match, return error response
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, 'LOGIN');
    res.cookie('token', token, { httpOnly: true });

    // Return success response with JWT token
    res.status(200).json({ message: 'Login successful.', token, user: user.rows[0]  });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Login failed. Please try again later.' });
  }
});

export default router;
