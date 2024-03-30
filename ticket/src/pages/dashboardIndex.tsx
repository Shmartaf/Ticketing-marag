
import React, { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Divider } from "@mui/material";
import StyledTooltip from "../assets/StyledTooltip";
import Board from "../components/Dashboard/Board";

const boards = [
  {
    color: "#F59E0B",
    columns: [
      { name: "Column One", type: "text" },
      { name: "Column Two", type: "text" },
    ],

    name: "Board Two",
  },
  {
    color: "#3B82F6",
    columns: [
      { name: "Column One", type: "text" },
      { name: "Column Two", type: "text" },
    ],
    name: "Board One",
  },
];

export default function DashboardIndex() {
  const [boardsData, setBoardsData] = useState(boards);


import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";
import styled from "@emotion/styled";

export default function DashboardIndex() {

  return (
    <div className="dashboard-viewer">
      <h3 className="text-[32px] leading-10 font-semibold tracking-[-0.01em] flex items-center gap-4">
        Boards List

        <StyledTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </StyledTooltip>

        <BootstrapTooltip arrow title="Complete view of all of your boards.">
          <InfoOutlinedIcon sx={{ width: 20, mt: "4px" }} />
        </BootstrapTooltip>

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
        <button className="bg-gradient-to-t from-blue-600 to-blue-500 text-white gap-1.5 font-[550] mr-5 group">
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

        <button className="gap-1.5 outline-none">
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

        <button className="gap-1.5 outline-none">
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

        <button className="gap-1.5 outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-[18px] -ml-1 mb-px scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          Person
        </button>

        <button className="gap-1.5 outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="w-[18px] -ml-1 mb-px scale-110"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          Group By
        </button>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-14">
        {boardsData.map((board, i) => (
          <Board board={board} key={i} />
        ))}
      </div>
    </div>
  );
}
    </div>
  );
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: "black",
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "black",
    fontSize: 14,
    padding: "5px 10px",
    borderRadius: 8,
  },
}));
