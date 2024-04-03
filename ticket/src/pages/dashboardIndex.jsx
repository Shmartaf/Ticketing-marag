/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import StyledTooltip from "../assets/StyledTooltip";
// import Board from "../components/Dashboard/Board";
import DynamicTable from "../components/tableTickets";
import DynamicBoard from "../components/Dashboard/DynamicBoard";
import Search from "../components/Dashboard/DashboardIndex/Search";
import Sort from "../components/Dashboard/DashboardIndex/Sort";
import anitherBoard from '../anotherBoardFromDb.json';
import { get, post, put, deleteRequest, BASE_URL } from "../api";
import { useAuth } from "../context/AuthContext";
// import DynamicBoard from "../components/Board/DynamicBoard";

export default function DashboardIndex() {
  const [boardsData, setBoardsData] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(0);
  const { user } = useAuth();
  console.log(user);
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

  async function getBoards() {
    const res = await get("boards")
    console.log(res);
    setBoardsData(res);
  }

  async function createBoard() {
    const newBoard = {
      account_id: "65fda85762fb9b8527c7e4bf",
      username: "admin", //
      board_name: "test board create 2",
      users: [user._id],
      team: "65fd90dcc254096623474ecc", //
      incidents: [
        {
          complete: true,
          data: [null],
        },
      ],
      __v: 0,
      color: "#3B82F6",
      columns: [
        {
          name: "New Column",
          type: "text",
        },
      ],
    };
    const res = await post("boards", newBoard);
    setBoardsData([...boardsData, newBoard]);
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

  useEffect(() => {
    getBoards();
  }, []);


  return (
    <div className="dashboard-viewer overflow-hidden overscroll-none">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Boards List
        <StyledTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </StyledTooltip>
      </h3>
      <h6 className="text-[17px] font-medium text-gray-500 tracking-[-0.01em]">
        Welcome back, User Name |{" "}
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
          // <DynamicTable board={board} key={i} />
          // <DynamicTable board={anitherBoard} key={i} />
          <DynamicBoard
            onDelete={() => {
              // setBoardsDemo((prevBoards) => {
              //   return prevBoards.filter((_, index) => index !== i);
              // });
            }}
            board={board}
            key={i}
            onAddColumn={() => {
              setBoardsData((prev) => {
                const updatedBoards = [...prev];
                const updatedBoard = { ...updatedBoards[i] };

                updatedBoard.columns.push({
                  name: `Column ${updatedBoard.columns.length + 1}`, // Update to use updatedBoard instead of board
                  type: "text",
                });

                updatedBoard.incidents.forEach((row) => {
                  row.data.push("");
                });

                updatedBoards[i] = updatedBoard;

                return updatedBoards;
              });

              updateBoards(i);
            }}
            onColumnRemove={(index) => {
              setBoardsData((prev) => {
                const updatedBoards = [...prev];
                const updatedBoard = { ...updatedBoards[i] };

                updatedBoard.columns.splice(index, 1);

                updatedBoard.incidents.forEach((row) => {
                  row.data.splice(index, 1);
                });

                updatedBoards[i] = updatedBoard;

                return updatedBoards;
              });

              updateBoards(i);
            }}
            onAddRow={() => {
              setBoardsData((prev) => {
                const updatedBoards = [...prev];
                const updatedBoard = { ...updatedBoards[i] };

                const newEmptyRow = updatedBoard.columns.map(() => null);

                updatedBoard.incidents.push({
                  complete: false,
                  data: newEmptyRow,
                });
                updatedBoards[i] = updatedBoard;

                return updatedBoards;
              });

              updateBoards(i);
            }}
            onUpdate={(update) => {
              setBoardsData((prev) => {
                const newData = [...prev];
                //@ts-ignore
                newData[i] = { ...update };
                return newData;
              });

              updateBoards(i);
            }}
          />
        ))}

        {filteredBoards.length == 0 && (
          <div className="text-xl">No boards found.</div>
        )}
      </div>
    </div>
  );
}

