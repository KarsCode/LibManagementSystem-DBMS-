import { useContext, useState } from 'react';
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserContext } from '@/UserContext';
import { VITE_API_URL } from '@/setupEnv';
import axios from 'axios';
import {  useToast } from "@/components/ui/use-toast"


const BorrowInput = () => {
  const { user,setUser } = useContext(UserContext)
  const { toast } = useToast()

  const [isbn, setIsbn] = useState('');

  const handleBorrow = async () => {
    const borrowDate = new Date().toISOString();
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);// Add 7 days for return date
    console.log(user)

    try {
      await axios.post(`${VITE_API_URL}/borrow`, {
        user_id: user.userId, // Assuming user object has an id property
        book_isbn: isbn,
        borrow_date: borrowDate,
        return_date: returnDate.toISOString(),
      });

      toast({
        title: 'Success!',
        description: 'Book successfully borrowed.',
      });
      // Optionally, you can update the UI or show a success message
    } catch (error) {
      console.error('Error borrowing book:', error);
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong.",
        description: "There was an error borrowing the book.",
      })
      // Handle error appropriately
    }
  };

  if(user==null)
    return

  return (
    <div className='flex gap-7'>
        <div>
            Borrow a book:
        </div>
        <div className='w-[1050px]'>
            <Input placeholder="Enter ISBN of book to Borrow" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
            
        </div>

        <div>
            <Button type="submit" onClick={handleBorrow}>Borrow</Button>
        </div>
      
    </div>
  )
}

export default BorrowInput
