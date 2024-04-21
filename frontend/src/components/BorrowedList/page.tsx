import { useState, useEffect } from 'react';
import { BorrowedList, columns } from "./columns";
import { DataTable } from "./data-table";
import { VITE_API_URL } from '@/setupEnv';
import axios from 'axios';
import { useParams } from 'react-router';

async function getData(userId: string): Promise<BorrowedList[]> {
    // Fetch data from your API here.
    try {
      const response = await axios.get(`${VITE_API_URL}/borrowlist/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
      return [];
    }
  }

  

export default function BorrowsList() {
  const [data, setData] = useState<BorrowedList[]>([]);
  const { userId } = useParams(); // Get the user ID from URL params

  useEffect(() => {
    async function fetchData() {
      if (userId) {
        const result = await getData(userId);
        setData(result);
      }
    }

    fetchData();
  }, [userId]);

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
