class AgentService {
  static getToken() {
    try {
      const storedToken = localStorage.getItem("authorizationToken");

      return storedToken;
    } catch (error) {
      console.error(error);
    }
  }

  static storeToken(token){
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return midnight - now;
    };
    localStorage.setItem("authorizationToken", token);

    const timeRemaining = calculateTimeUntilMidnight();

    setTimeout(() => {
      localStorage.removeItem("authorizationToken");
    }, timeRemaining);
  }

  static async checkToken(api, token, query_params) {
    try {
      const res = await fetch(api, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query_params),
      });

      const result = await res.json();
      return [1, result.response];
      
    } catch (error) {
      return [0];
    }
  }
}

export default AgentService;
