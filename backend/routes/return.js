import express from "express";
import pool from "../databasepg.js";

const router = express.Router();

router.post('/', async (req, res) => {
    const { user_id, book_isbn } = req.body;

    try {
        // Check if the book was borrowed by the user
        const borrowQuery = 'SELECT * FROM borrowed_books WHERE user_id = $1 AND book_id = $2';
        const borrowResult = await pool.query(borrowQuery, [user_id, book_isbn]);

        if (borrowResult.rows.length === 0) {
            return res.status(404).json({ error: 'Book not borrowed by user' });
        }



        // Update the availability of the book
        const updateBookQuery = 'UPDATE books SET inventory = inventory + 1 WHERE isbn = $1';
        await pool.query(updateBookQuery, [book_isbn]);

        const borrow = borrowResult.rows[0];
        const borrowDate = new Date(borrow.borrow_date).getTime(); // Borrow date in milliseconds
        const returnDate = new Date().getTime(); // Current date in m   illiseconds
        const expectedReturnDate = new Date(borrow.return_date).getTime(); // Expected return date in milliseconds
    
        // Calculate the fine amount
        const overdueDays = Math.max(0, (Math.floor(returnDate - expectedReturnDate)) / (1000 * 60 * 60 * 24));
        const newOverdueDays = parseInt(overdueDays); // Difference in days, capped at 0
        // Base fine + additional fine for each extra day
        console.log(newOverdueDays);
        const baseFine = 150;
        const additionalFinePerDay = 20;
        let fineAmount = newOverdueDays >= 1 ? baseFine + additionalFinePerDay * (newOverdueDays  ) : 0;
        console.log(fineAmount);
        const fineAmountString = fineAmount.toFixed(2);
        console.log(fineAmountString)
        const fineAmountNumeric = parseFloat(fineAmountString);;

        // Insert fine record into fines table using a nested query to fetch user's name
      
       if(fineAmount>0)
       {
        await pool.query(`
        INSERT INTO fines (user_id, user_name, borrow_id, book_name, fine_amount)
        SELECT $1, u.name, b.borrow_id, bk.name, $2
        FROM borrowed_books b
        JOIN users u ON b.user_id = u.id
        JOIN books bk ON b.book_id = bk.isbn
        WHERE b.user_id = $1 AND b.book_id = $3
    `, [user_id, fineAmountString, book_isbn]);
       }

                // Delete the borrow record
        const deleteQuery = 'DELETE FROM borrowed_books WHERE user_id = $1 AND book_id = $2';
        await pool.query(deleteQuery, [user_id, book_isbn]);

        res.status(200).json({ message: 'Book returned successfully', fine_amount: fineAmountString });
    } catch (error) {
        console.error('Error returning book:', error);
        res.status(500).json({ error: 'Failed to return book. Please try again later.' });
    }
});

export default router;
