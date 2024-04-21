import { useState, useEffect } from 'react';
import { FineList, columns } from "./columns";
import { DataTable } from "./data-table";
import { VITE_API_URL } from '@/setupEnv';
import axios from 'axios';

async function getData(): Promise<FineList[]> {
    // Fetch data from your API here.
    try {
      const response = await axios.get(`${VITE_API_URL}/finelist`);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
      return [];
    }
  }

  

export default function FinesList() {
  const [data, setData] = useState<FineList[]>([]);

  useEffect(() => {
    async function fetchData() {
      
        const result = await getData();
        setData(result);
      
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-2">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
