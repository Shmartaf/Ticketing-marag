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
      // const { data } = await supabase.auth.updateUser({
      //   id: user.id,
      //   data,

      // })
      // if (updateUserError) {
      //   throw updateUserError;
      // }
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
      const { user, session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // if (user) {
      //   // Fetch additional user data
      //   const { data: userDataFromSupabase, error: userError } = await supabase
      //     .from("users")
      //     .select("phone", "role")
      //     .eq("id", user.id)
      //     .single();

      //   if (userError) {
      //     throw userError;
      //   }

      //   user.phone = userDataFromSupabase.phone;
      //   user.role = userDataFromSupabase.role;
      // }

      setAuthState({
        user,
        session,
        loading: false,
        isAuthenticated: true,
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
