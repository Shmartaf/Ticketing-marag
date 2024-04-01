import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "./lib/supabaseClient";
import { BASE_URL } from "./api";

const findUser = async (user) => {
  try {
    // Ensure BASE_URL is correctly formatted without leading or trailing slashes if needed
    const url = `${BASE_URL}/users/${user.id}`;
    const response = await fetch(url);
    console.log(`Response:`, response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Correctly parse the JSON body
    console.log(`Data:`, data);
    if (data.userType === "babysitter") {
      const response = await fetch(`${BASE_URL}/babysitters/${user.id}`);
      const data = await response.json();
      console.log(data);
      return data;
    }
    if (data.userType === "parent") {
      const response = await fetch(`${BASE_URL}/parents/${user.id}`);
      const data = await response.json();
      console.log(data);
      return data;
    }

    return data; // Adjust this according to the actual structure of your data
  } catch (error) {
    console.error("Failed to find user:", error);
    return null;
  }
};

// Create an AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const supabase = createSupabaseClient(); // Make sure to replace with your actual function
  const initialAuthState = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const session = supabase.auth.session();
      const isAuthenticated = !!user && !!session;

      return {
        user: isAuthenticated ? user : null,
        session: isAuthenticated ? session : null,
        loading: false,
        isAuthenticated,
      };
    } catch (error) {
      console.error("Error checking initial authentication:", error);
      return {
        user: null,
        session: null,
        loading: false,
        isAuthenticated: false,
      };
    }
  };

  const [authState, setAuthState] = useState({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const init = async () => {
    if (!isPageLoaded) {
      // Set a flag to indicate that the page is loaded
      setIsPageLoaded(true);

      // Perform the initial authentication check only when the page is loaded
      const initialState = await initialAuthState();
      setAuthState(initialState);

      // Redirect to login if not authenticated
      if (!initialState.isAuthenticated) {
        window.location.href = "/login"; // Adjust the path according to your routes
      }
    }
  };
  // init();

  useEffect(() => {
    // init();
    if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/signup')) {
      if (!authState.isAuthenticated) {
        window.location.href = "/login";
      }
    }
    setTimeout(() => {
      findUser(authState.user);
    }
      , 1000);
  });

  const signUp = async ({ email, password }) => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        throw error;
      }

      setAuthState((prevState) => ({
        ...prevState,
        user,
      }));
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      const userData = await findUser(data.user);
      console.log("userData:", userData);
      data.user.userData = userData;

      setAuthState({
        user: data.user,
        session: data.session,
        loading: false,
        isAuthenticated: true,
      });

      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed" + error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await supabase.auth.signOut();
      setAuthState({
        user: null,
        session: null,
        loading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error("Logout failed", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
