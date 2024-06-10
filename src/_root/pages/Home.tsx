import { useState, useEffect } from 'react';
import { Payment, columns } from "@/components/users/columns";
import { DataTable } from "@/components/users/data-table";

async function getData(): Promise<Payment[]> {
  try {
    const token = localStorage.getItem('authToken');
    if (token) {
      const response = await fetch(import.meta.env.VITE_GET_LOAN_DETAILS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({
          query_type: "all_user_loan_collection_details"
        }),
      });

      if (response.ok) {
        const data = await response.json();
        var modified_data = [];
        for (var x of data.response) {
          x.name = x.fname;
          if (x.mname) {
            x.name += " " + x.mname
          }
          if (x.lname) {
            x.name += " " + x.lname
          }
          modified_data.push(x);
        }
        return modified_data;
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } else {
      throw new Error("Token not found in local storage");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch data");
  }
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
