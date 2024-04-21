import { useContext, useState } from 'react';
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { UserContext } from '@/UserContext';
import { VITE_API_URL } from '@/setupEnv';
import axios from 'axios';
import { useToast } from "@/components/ui/use-toast"

const ReturnInput = () => {
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const [isbn, setIsbn] = useState('');

  const handleReturn = async () => {
    const returnDate = new Date().toISOString();

    try {
      const response = axios.post(`${VITE_API_URL}/return`, {
        user_id: user.userId, // Assuming user object has an id property
        book_isbn: isbn,
        return_date: returnDate,
      });

      const fineAmt = (await response).data.fine_amount;

      if (fineAmt > 0) {
        toast({
          title: 'Fine Owed!',
          description: `Book successfully returned with a fine of $${fineAmt}.`,
        });
      } else {
        toast({
          title: 'Success!',
          description: 'Book successfully returned.',
        });
      }
      // Optionally, you can update the UI or show a success message
    } catch (error) {
      console.error('Error returning book:', error);
      toast({
        variant: "destructive",
        title: "Uh Oh! Something went wrong.",
        description: "There was an error returning the book.",
      })
      // Handle error appropriately
    }
  };

  if(user==null)
    return;

  return (
    <div className='flex gap-7'>
        <div>
            Return a book:
        </div>
        <div className='w-[1050px]'>
            <Input placeholder="Enter ISBN of book to Return" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </div>
        <div>
            <Button type="submit" onClick={handleReturn}>Return</Button>
        </div>
    </div>
  )
}

export default ReturnInput;
