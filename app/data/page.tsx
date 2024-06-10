'use client';

import { useEffect, useState } from 'react';

interface DynamoDBItem {
  id: number;
  name: string;
}

export default function Home() {
  const [data, setData] = useState<DynamoDBItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data/'); // Ensure this is correct
      if (response.ok) {
        const result: DynamoDBItem[] = await response.json();
        setData(result);
      } else {
        console.error('Failed to fetch data from the API');
      }
    }
  
    fetchData();
  }, []);  

  return (
    <div>
      <h1>DynamoDB Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
