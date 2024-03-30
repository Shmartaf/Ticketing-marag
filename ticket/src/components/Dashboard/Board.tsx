import { Checkbox } from "@mui/material";
import React from "react";
import StyledCheckbox from "../../assets/StyledCheckbox";
import StyledTooltip from "../../assets/StyledTooltip";

// interface Board {
//   color: string;
//   name: string;
// }

export default function Board({ board }: { board: any }) {
  return (
    <div>
      <div style={{ color: board.color }} className="flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 scale-x-90"
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
            clipRule="evenodd"
          />
        </svg>
        <h3 className="font-semibold text-2xl">{board.name}</h3>
      </div>

      <div
        className="mt-4 border-l-4 rounded-md shadow-md shadow-black/[0.06] overflow-hidden w-full max-w-full"
        style={{ borderColor: board.color }}
      >
        <div className="border border-gray-200 border-l-0 w-full rounded-r-md max-w-full overflow-x-auto">
          <table className="board-table">
            <tr className="board-header">
              <th>
                <StyledCheckbox />
              </th>
              {Array.isArray(board.columns) &&
                board.columns.map((col, i) => <th key={i}>{col.name}</th>)}

              <th>
                <StyledTooltip title="Add new column">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 scale-110 stroke-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </StyledTooltip>
              </th>
            </tr>

            <tr className="board-row">
              <td>
                <StyledCheckbox />
              </td>
              <td>Value</td>
              <td>Value</td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}
