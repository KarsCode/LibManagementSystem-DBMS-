import express from "express";
import bcrypt from "bcrypt"
import pool from "../databasepg.js"

const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id, book_isbn, borrow_date, return_date } = req.body;
    console.log(user_id)
  
    try {
      // Check if the book exists and is available for borrowing
      const bookQuery = 'SELECT * FROM books WHERE isbn = $1 AND inventory > 0';
      const bookResult = await pool.query(bookQuery, [book_isbn]);
  
      if (bookResult.rows.length === 0) {
        return res.status(404).json({ error: 'Book not found or not available for borrowing' });
      }
  
      // Insert a new borrow record
      const borrowQuery = 'INSERT INTO borrowed_books (user_id, book_id, borrow_date, return_date) VALUES ($1, $2, $3, $4)';
      await pool.query(borrowQuery, [user_id, book_isbn, borrow_date, return_date]);
  
      // Update the availability of the book
      const updateBookQuery = 'UPDATE books SET inventory = inventory - 1 WHERE isbn = $1';
      await pool.query(updateBookQuery, [book_isbn]);
  
      res.status(200).json({ message: 'Book borrowed successfully' });
    } catch (error) {
      console.error('Error borrowing book:', error);
      res.status(500).json({ error: 'Failed to borrow book. Please try again later.' });
    }
  });

export default router