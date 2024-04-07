/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import StyledTooltip from "../assets/StyledTooltip";
import DynamicBoard from "../components/Dashboard/DynamicBoard";
import Search from "../components/Dashboard/DashboardIndex/Search";
import Sort from "../components/Dashboard/DashboardIndex/Sort";
import { get, post, put, deleteRequest, BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
// const { fetchData } = useData();


export default function DashboardIndex() {
  // console.log(boardsData);
  const [teamsData, setTeamsData] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(0);
  const { user } = useAuth();
  const [boardsData, setBoardsData] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);


  async function fetchBoards() {
    const data = await get(`boards/user/${user.id}`);
    console.log(data);
    setBoardsData(data);
    setLoading(false);
  }

  async function fetchTeams() {
    const data = await get(`teams/users/${user.id}`);
    console.log(data);
    setTeams(data);
    setLoading(false);
  }

  const onUpdate = (updatedBoard) => {
    console.log("Updating board");
    // const boards = fetchBoards();
    // const teams = fetchTeams();
    // setBoardsData(boards);
    // setTeams(teams);
    console.log(updatedBoard);
    // setBoardsData(updatedBoard);
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  const filteredBoards = boardsData
    .filter((board) => {
      const boardName = board.board_name.toLowerCase();
      const searchQuery = search.toLowerCase();
      return boardName.includes(searchQuery);
    })
    .sort((a, b) => {
      if (sort === 1) {
        return a.board_name.localeCompare(b.board_name);
      } else {
        return b.board_name.localeCompare(a.board_name);
      }
    });

  useEffect(() => {
    setTimeout(() => {
      fetchBoards();
      fetchTeams();
    }, 20000);

  }
    , [user, teamsData, boardsData]);



  async function createBoard() {
    console.log("trying to create board");
    const newBoard = {
      board_name: "New Board",
      team: teamsData, //
      incidents: [
        {
          complete: true,
          data: [null],
        },
      ],
      color: "#3B82F6",
      columns: [
        {
          name: "New Column",
          type: "text",
        },
        {
          name: "Date",
          type: "Date",
        },
        {
          name: "number",
          type: "number",
        }
      ],
    };
    console.log(newBoard);
    const res = await post("boards", newBoard);
    console.log(res);
    setBoardsData([...boardsData, newBoard]);
    console.log(boardsData);
  }

  async function updateBoards(index) {
    console.log(index);
    const res = await fetch(
      `http://localhost:5005/boards/${boardsData[index]._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(boardsData),
      }
    );

    console.log(res);
    const data = await put(`boards/${boardsData[index]._id}`, boardsData[index]);
    console.log(data);
  }



  return user ? (
    <div className="dashboard-viewer overflow-hidden overscroll-none">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Boards List
        <StyledTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </StyledTooltip>
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Welcome back, {user.name} |{" "}
        {new Date().toLocaleString("default", {
          month: "long",
          day: "numeric",
        })}
      </h6>

      <Divider sx={{ m: "20px 0" }} />

      <div className="dashboard-nav-menu">
        <button
          onClick={() => {
            createBoard();
          }}
          className="bg-gradient-to-t from-blue-600 to-blue-500 text-white gap-1.5 font-[550] mr-5 group"
        >
          Create Board
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.2}
            stroke="currentColor"
            className="w-4 -mr-1 transition-all duration-[400ms] group-hover:rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>

        <Divider orientation="vertical" flexItem sx={{ m: "5px 0" }} />

        <Search current={search} onChange={(value) => setSearch(value)} />

        <Sort current={sort} onChange={(value) => setSort(value)} />
      </div>

      <div className="mt-14 grid grid-cols-1 gap-14">
        {filteredBoards.map((board, i) => (
          <DynamicBoard
            board={board}
            key={i}
            updateFunction={onUpdate}
          />
        ))}

        {filteredBoards.length === 0 && (
          <div className="text-xl">No boards found.</div>
        )}
      </div>
    </div>
  ) : null;

}
