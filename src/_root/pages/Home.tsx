import { useState, useEffect } from 'react';
import { Payment, columns } from "@/components/users/columns";
import { DataTable } from "@/components/users/data-table";

async function getData(): Promise<Payment[]> {
  // Simulate fetching data from an API
  return [
    {
      "id": "728ed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Gyanchith Hari"
    },
    {
      "id": "728sfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Madan lal Hari"
    },
    {
      "id": "728sfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Akhil Hari"
    },
    {
      "id": "728gded52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Sarath Hari"
    },
    {
      "id": "728hfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Ravi Hari"
    },
    {
      "id": "728ifed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Vijay Hari"
    },
    {
      "id": "728jfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Naveen Hari"
    },
    {
      "id": "728kfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Prakash Hari"
    },
    {
      "id": "728lfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Kumar Hari"
    },
    {
      "id": "728mfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Rajesh Hari"
    },
    {
      "id": "728nfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Mahesh Hari"
    },
    {
      "id": "728ofed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Ram Hari"
    },
    {
      "id": "728pfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Krishna Hari"
    },
    {
      "id": "728qfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Lakshman Hari"
    },
    {
      "id": "728rfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Bharata Hari"
    },
    {
      "id": "728sfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Duryodhana Hari"
    },
    {
      "id": "728tfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Yudhistira Hari"
    },
    {
      "id": "728ufed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Arjuna Hari"
    },
    {
      "id": "728vfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Bheema Hari"
    },
    {
      "id": "728wfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Nakula Hari"
    },
    {
      "id": "728xfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Sahadeva Hari"
    },
    {
      "id": "728yfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Satyaki Hari"
    },
    {
      "id": "728zfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Abhimanyu Hari"
    },
    {
      "id": "729afed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Parikshit Hari"
    },
    {
      "id": "729bfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Janamejaya Hari"
    },
    {
      "id": "729cfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Drupada Hari"
    },
    {
      "id": "729dfed52f",
      "amount": 100,
      "status": "pending",
      "email": "m@example.com",
      "name": "Virata Hari"
    },
    {
      "id": "729efed52f",
      "amount": 201,
      "status": "pending",
      "email": "m@example.com",
      "name": "Karna Hari"
    },
    {
      "id": "729ffed52f",
      "amount": 101,
      "status": "pending",
      "email": "m@example.com",
      "name": "Ashwatthama Hari"
    }
  ];  
}

export const Home = () => {
  const [data, setData] = useState<Payment[]>([]); // Initialize state for data

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(); // Fetch data
      setData(result); // Update state with fetched data
    };

    fetchData(); // Call the async function
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};
