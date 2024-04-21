//to return the list of books from the database
import express from "express";
import bcrypt from "bcrypt"
import pool from "../databasepg.js"


// Route to handle fetching books
const router = express.Router();
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const { rows } = await pool.query(`
      SELECT bb.book_id, 
             b.name AS book_name, 
             to_char(bb.borrow_date, 'DD/MM/YYYY') AS borrowDate, 
             to_char(bb.return_date, 'DD/MM/YYYY') AS returnDate
      FROM borrowed_books bb 
      JOIN books b ON bb.book_id = b.isbn
      WHERE bb.user_id = $1
    `, [userId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    res.status(500).json({ error: 'Failed to fetch borrowed books' });
  }
});

export default router;
