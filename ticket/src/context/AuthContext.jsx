import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "../lib/supabaseClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = createSupabaseClient();
  const [authState, setAuthState] = useState({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
    role: "guest",
  });

  useEffect(() => {
    const initialAuthState = async () => {
      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        const session = supabase.auth.session;

        if (userError) {
          throw userError;
        }

        let fetchedUser = null;
        let fetchedSession = null;
        let fetchedRole = "guest";

        if (!!userData && !!session) {
          // Fetch additional user data
          const { data: userDataFromSupabase, error: userDataError } = await supabase
            .from("users")
            .select("phone", "role")
            .eq("id", userData.id)
            .single();

          if (userDataError) {
            throw userDataError;
          }

          fetchedUser = { ...userData, ...userDataFromSupabase };
          fetchedSession = session;
          fetchedRole = userDataFromSupabase?.role || "guest";
        }

        setAuthState({
          user: fetchedUser,
          session: fetchedSession,
          loading: false,
          isAuthenticated: !!fetchedUser && !!fetchedSession,
          role: fetchedRole,
        });
      } catch (error) {
        console.error("Error checking initial authentication:", error);
        setAuthState({
          user: null,
          session: null,
          loading: false,
          isAuthenticated: false,
          role: "guest",
        });
      }
    };
    console.log("arrived here")
    console.log(sessionStorage.getItem("authState"));
    console.log(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("authState")) {
      const session = sessionStorage.getItem("token");
      const user = sessionStorage.getItem("authState");
      setAuthState({
        user,
        session,
        loading: false,
        isAuthenticated: true,
        role: user.role,
      });
      console.log(session);
      console.log(user);
      return;
    }




    initialAuthState();
  }, []);

  const signUp = async ({ email, password, data }) => {
    try {
      const res = await supabase.auth.signUp({ email, password });
      const resiv = await supabase.auth.updateUser({
        id: res.data.user.id,
        data: data,
      });

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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }

      const user = data.user;
      const session = data.session;
      const role = user.user_metadata.userType;

      setAuthState({
        user,
        session,
        loading: false,
        isAuthenticated: true,
        role,
      });

      sessionStorage.setItem("token", session.access_token);
      sessionStorage.setItem("authState", authState);
      console.log("Logged in successfully");
      console.log(user);
      return { user, session };
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const updateUser = async (id, data) => {
    try {
      const response = await supabase.auth.updateUser({ id, data });
      if (response.error) {
        throw response.error;
      }
      return response;
    } catch (error) {
      console.error("Error updating user", error);
      throw error;
    }
  }

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
  const fetchUser = async (id) => {
    try {
      const data = await supabase.from("users").select("*").eq("id", id).single();
      console.log(data);
      if (data.error) {
        throw data.error;
      }
      return data.data;
    } catch (error) {
      console.error("Error fetching user", error);
      throw error;
    }
  };

  const inviteMember = async (email) => {
    try {
      const { data, error } = await supabase.auth.api.inviteUserByEmail(email);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error inviting member", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, signUp, fetchUser, updateUser, inviteMember }}>
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
