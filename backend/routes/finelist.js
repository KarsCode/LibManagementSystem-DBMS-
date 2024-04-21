//to return the list of books from the database
import express from "express";
import bcrypt from "bcrypt"
import pool from "../databasepg.js"


// Route to handle fetching books
const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT user_name as name,book_name,fine_amount from fines'); // Replace 'books' with your actual table name
    res.json(rows);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch fine list' });
  }
});

export default router;
