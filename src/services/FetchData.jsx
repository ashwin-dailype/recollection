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
      // If there's an error, prompt the user again for the token
      promptUserForToken();
    }
  };

  const calculateTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight - now;
  };

  const promptUserForToken = () => {
    const userToken = prompt("Error fetching data. Enter Authorization Token:");

    if (userToken) {
      localStorage.setItem("authorizationToken", userToken);

      const timeRemaining = calculateTimeUntilMidnight();

      setTimeout(() => {
        localStorage.removeItem("authorizationToken");
      }, timeRemaining);

      fetchLoanDetails(userToken);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("authorizationToken");

    if (storedToken) {
      fetchLoanDetails(storedToken);
    } else {
      promptUserForToken();
    }
  }, []);

  return data;
};

export default useFetchData;
