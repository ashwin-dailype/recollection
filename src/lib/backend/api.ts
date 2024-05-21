// ============================================================
// AUTH
// ============================================================

// ============================== SIGN IN
export async function signInAccount(user: { authToken: string }) {
  try {
    // const session = await account.createEmailSession(user.email, user.password);
    const response = await fetch(import.meta.env.VITE_GET_LOAN_DETAILS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Pass the authToken in the Authorization header
        'Authorization': `Bearer ${user.authToken}`,
      },
      body: JSON.stringify({
        query_type: "all_user_loan_collection_details"
      }),
    });

    console.log(response)

    if (response.ok){
      console.log("hiii")
      return response;
    }

  } catch (error) {
    console.log(error);
  }
}