import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "../lib/supabaseClient";
// import { BASE_URL } from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = createSupabaseClient();
  const initialAuthState = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      const session = supabase.auth.session();
      const isAuthenticated = !!user && !!session;

      if (error) {
        throw error;
      }

      let userData = {};

      if (isAuthenticated) {
        // Fetch additional user data
        const { data: userDataFromSupabase, error: userError } = await supabase
          .from("users")
          .select("phone", "role")
          .eq("id", user.id)
          .single();

        if (userError) {
          throw userError;
        }

        userData = userDataFromSupabase;
      }

      return {
        user: isAuthenticated ? { ...user, ...userData } : null,
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
        role: "guest"
      };
    }
  };

  const [authState, setAuthState] = useState({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
    role: "guest"
  });

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const init = async () => {
    if (!isPageLoaded) {
      setIsPageLoaded(true);

      const initialState = await initialAuthState();
      setAuthState(initialState);

      if (!initialState.isAuthenticated) {
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    // init();
    console.log(authState);
  }, []);

  const signUp = async ({ email, password, data }) => {
    try {
      const res = await supabase.auth.signUp({ email, password });
      console.log(res);
      const resiv = await supabase.auth.updateUser({
        id: res.data.user.id,
        data: data,
      });
      console.log(resiv);

      if (res.error) {
        throw error;
      }

      setAuthState((prevState) => ({
        ...prevState,
        user: res.data.user,
      }));
    } catch (error) {
      console.error("Sign up failed", error);
      throw error;
    }
  };

  const login = async ({ email, password }) => {
    try {
      console.log({
        email,
        password,
      });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data, error);
      const user = data.user;
      const session = data.session;
      const role = user.user_metadata.userType;



      if (error) {
        throw error;
      }



      setAuthState({
        user,
        session,
        loading: false,
        isAuthenticated: true,
        role: role
      });

      return { user, session };
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed:" + error);
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
        role: "guest"
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
