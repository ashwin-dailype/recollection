import { useState, useEffect } from "react";

const API = import.meta.env.VITE_FETCH_DATA_API;

const useFetchData = () => {
  const [data, setData] = useState([]);

  const fetchLoanDetails = async (token) => {
    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query_type: "all_user_loan_collection_details",
        }),
      });

      const result = await response.json();

      if (result && result.response) {
        setData(result.response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authorizationToken");

    if (storedToken) {
      fetchLoanDetails(storedToken);
    } else {
      const userToken = prompt("Enter Authorization Token:");

      if (userToken) {
        localStorage.setItem("authorizationToken", userToken);

        setTimeout(() => {
          localStorage.removeItem("authorizationToken");
        }, 24 * 60 * 60 * 1000);

        fetchLoanDetails(userToken);
      }
    }
  }, []);

  return data;
};

export default useFetchData;
