// ============================================================
// AUTH
// ============================================================

// ============================== SIGN IN
export async function signInAccount(user: { authToken: string }) {
  try {
    const response = await fetch(import.meta.env.VITE_GET_LOAN_DETAILS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${user.authToken}`,
      },
      body: JSON.stringify({
        query_type: "all_user_loan_collection_details"
      }),
    });

    if (response.ok) {
      // Save the authToken to localStorage if the response is ok
      localStorage.setItem('authToken', user.authToken);
    }

    return response;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to sign in");
  }
}
