import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Initial state for the context
const INITIAL_STATE = {
  authToken: "",
  isLoading: false,
  isAuthenticated: false,
  setAuthToken: (token: string) => {
    console.log("Initializing setAuthToken with token:", token);
    // Here you would typically update the state or perform other actions
  },
  checkAuthUser: async () => false as boolean,
};

// Type for the context
type IContextType = {
  authToken: string;
  isLoading: boolean;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  checkAuthUser: () => Promise<boolean>;
};

// Creating the context with initial values
const AuthContext = createContext<IContextType>(INITIAL_STATE);

// Helper function to validate the token by sending a POST request
const validateAuthToken = async (token: string) => {
  try {
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

    return response.status === 200;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
};

// AuthProvider component to provide the context to its children
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to check if the user is authenticated
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const isValid = await validateAuthToken(token);
        if (isValid) {
          setAuthToken(token);
          setIsAuthenticated(true);
          return true;
        } else {
          setIsAuthenticated(false);
          return false;
        }
      }
      setIsAuthenticated(false);
      return false;
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const isAuth = await checkAuthUser();
      if (!isAuth) {
        navigate("/sign-in");
      }
    };

    initializeAuth();
  }, [navigate]);

  const value = {
    authToken,
    isLoading,
    isAuthenticated,
    setAuthToken: (token: string) => {
      localStorage.setItem('authToken', token);
      setAuthToken(token);
      setIsAuthenticated(true);
    },
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export const useUserContext = () => useContext(AuthContext);
