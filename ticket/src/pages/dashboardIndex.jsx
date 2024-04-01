/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import StyledTooltip from "../assets/StyledTooltip";
import Board from "../components/Dashboard/Board";
import DynamicBoard from "../components/Dashboard/DynamicBoard";

export default function DashboardIndex() {
  const [boardsData, setBoardsData] = useState([]);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(0);

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
    const res = await fetch("http://localhost:5005/boards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setBoardsData(await res.json());
  }

  async function createBoard() {
    const newBoard = {
      account_id : "65fda85762fb9b8527c7e4bf",
      username: "admin", //
      board_name: "test board create 2",
      users: [],
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

    const res = await fetch("http://localhost:5005/boards", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBoard),
    });


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
  }

  useEffect(() => {
    getBoards();
  }, []);

  // useEffect(() => {
  //   updateBoards();
  // }, [boardsData]);

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

const Search = ({ current, onChange }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (open !== false) {
      const handleClickOutside = (event) => {
        if (!modalRef.current?.contains(event.target)) setOpen(false);
      };

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open, modalRef]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="gap-1.5 outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="w-4 -ml-0.5 mb-px"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        Search
      </button>

      <ul
        ref={modalRef}
        className={`${
          open
            ? `opacity-100 visible translate-y-0 scale-100`
            : `opacity-0 invisible scale-95 -translate-y-1`
        } absolute left-4 top-12 whitespace-nowrap min-w-[230px] bg-white border rounded-xl origin-top-left grid grid-cols-1 shadow-lg shadow-black/[0.07] gap-2 px-2.5 py-2.5 transition-all duration-200`}
      >
        <input
          value={current}
          onChange={(e) => onChange(e.target.value)}
          className="px-1 outline-none"
          placeholder="Search..."
        />
      </ul>
    </div>
  );
};

const Sort = ({ current, onChange }) => {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    if (open !== false) {
      const handleClickOutside = (event) => {
        if (!modalRef.current?.contains(event.target)) setOpen(false);
      };

      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [open, modalRef]);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="gap-1.5 outline-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.9}
          stroke="currentColor"
          className="w-[18px] -ml-1 mb-px -mr-0.5 scale-110"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
          />
        </svg>
        Sort
      </button>

      <ul
        ref={modalRef}
        className={`${
          open
            ? `opacity-100 visible translate-y-0 scale-100`
            : `opacity-0 invisible scale-95 -translate-y-1`
        } absolute left-4 top-12 whitespace-nowrap min-w-[140px] bg-white border rounded-xl origin-top-left grid grid-cols-1 shadow-md shadow-black/5 gap-2 px-2.5 py-2.5 transition-all duration-200`}
      >
        <li
          onClick={() => {
            onChange(0);
            setOpen(false);
          }}
          aria-checked={current == 0}
          className="flex aria-checked:text-blue-500 items-center gap-1 whitespace-nowrap min-w-0 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.65}
            stroke="currentColor"
            className="w-[17px] translate-y-[0.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
            />
          </svg>
          Ascending
        </li>
        <Divider orientation="horizontal" />
        <li
          onClick={() => {
            onChange(1);
            setOpen(false);
          }}
          aria-checked={current == 1}
          className="flex aria-checked:text-blue-500 items-center gap-1 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.65}
            stroke="currentColor"
            className="w-[17px] translate-y-[0.5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
            />
          </svg>
          Descending
        </li>
      </ul>
    </div>
  );
};
