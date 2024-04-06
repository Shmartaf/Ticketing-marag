import React, { createContext, useContext, useEffect, useState } from "react";
import { createSupabaseClient } from "../lib/supabaseClient";
import { get, post, put, deleteRequest, BASE_URL } from "../api";
import { useAuth } from "./AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const supabase = createSupabaseClient();
    const { user } = useAuth();
    const [boards, setBoards] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [teams, setTeams] = useState([]);

    const InitialDataState = async () => {
        try {
            const boards = await get("boards");
            const accounts = await get("accounts");
            const teams = await get("teams");
            return {
                boards,
                accounts,
                teams,
            };
        } catch (error) {
            console.error("Error checking initial data:", error);
            return {
                boards: [],
                accounts: [],
                teams: [],
            };
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await InitialDataState();
            setBoards(data.boards);
            setAccounts(data.accounts);
            setTeams(data.teams);
        };
        fetchData();
        console.log("Data fetched");
        console.log("Boards:", boards);
        console.log("Accounts:", accounts);
        console.log("Teams:", teams);
    }, []);

    const fetchUsersBoard = async () => {
        const res = await get(`boards/user/${user.id}`);
        setBoards(res);
        return boards;
    }

    const fetchUsersTeams = async () => {
        const res = await get(`teams/users/${user.id}`);
        setTeams(res);
        return teams;
    }

    const fetchUserAccounts = async () => {
        const res = await get(`accounts/users/${user.id}`);
        setAccounts(res);
        return accounts;
    }





    return (
        <DataContext.Provider value={{ boards, accounts, teams, fetchUsersBoard, fetchUsersTeams, fetchUserAccounts }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

