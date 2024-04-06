/* eslint-disable no-unused-vars */
import {
  Avatar,
  Checkbox,
  Divider,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import StyledCheckbox from "../../assets/StyledCheckbox";
import StyledTooltip from "../../assets/StyledTooltip";
import BoardDropdown from "../Dashboard/Board/BoardDropdown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StyledDialog from "../../assets/StyledDialog";
import InputBase from "@mui/material/InputBase";

export default function DynamicBoard({
  board,
  hideTitle,
  onUpdate,
  onColumnRemove,
  onAddColumn,
  onAddRow,
  onDelete,
}) {
  const [selected, setSelected] = useState([]);

  return (
    <div className="">
      <div className="flex items-center justify-between h-[34px] w-full">
        <div
          style={{ color: board.color }}
          className="flex items-center gap-1.5"
        >
          <h3 className="font-semibold text-2xl">{board.board_name}</h3>
        </div>

        <div className="flex items-center gap-2 relative">
          {selected.length > 0 && (
            <div>
              <button
                onClick={() => {
                  const Rows = [...board.rows];

                  selected.forEach((i) => {
                    Rows.splice(i, 1);
                  });

                  onUpdate({ ...board, rows: Rows });

                  setSelected([]);
                }}
                className="border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-black/[0.05] active:scale-[0.975] text-red-600 shadow-sm flex items-center gap-2 py-1.5 px-3 text-[14px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 -ml-px"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete Rows
              </button>
            </div>
          )}
          <BoardDropdown
            onRemove={() => {
              if (onDelete) onDelete();
            }}
            onNameChange={(newName) => {
              onUpdate({ ...board, board_name: newName });
            }}
            onColorChange={(newColor) => {
              onUpdate({ ...board, color: newColor });
            }}
          />
        </div>
      </div>
      <div
        className="mt-4 border-l-4 border rounded-md shadow-md shadow-black/[0.06] w-full min-w-full overflow-x-auto no-scrollbar"
        style={{ borderLeftColor: board.color }}
      >
        <div className=" w-full min-w-full rounded-r-md">
          <table className="board-table">
            <thead>
              <tr className="board-header">
                <th>
                  <StyledCheckbox disabled />
                </th>
                {Array.isArray(board.columns) &&
                  board.columns.map((col, i) => (
                    <th className="group relative" key={i}>
                      {col.name}{" "}
                      <span className="absolute hover:delay-200 inset-0 bg-gradient-to-r from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-end">
                        <ColumnDropdown
                          onRemove={() => {
                            onColumnRemove(i);
                          }}
                          onChange={(columnType, newName) => {
                            const updatedColumns = [...board.columns];
                            console.log(columnType, newName);
                            updatedColumns[i].type = columnType;
                            updatedColumns[i].name = newName;
                            onUpdate({ ...board, columns: updatedColumns });
                          }}
                          key={i}
                        />
                      </span>
                    </th>
                  ))}

                <th>Complete</th>
                <th>Logs</th>

                <th
                  className="cursor-pointer"
                  onClick={() => {
                    onAddColumn();
                  }}
                >
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
            </thead>

            <tbody>
              {board.incidents.map((row, i) => (
                <tr key={i} className="board-row border-t">
                  <td>
                    <StyledCheckbox
                      checked={selected.includes(i)}
                      onChange={(e) => {
                        if (selected.includes(i)) {
                          setSelected(selected.filter((value) => value !== i));
                        } else {
                          setSelected([...selected, i]);
                        }
                      }}
                    />
                  </td>
                  {row.data.map((col, ic) => (
                    // <td key={ic}>{board.columns[ic].type}</td>

                    <td key={ic} className="px-1">
                      {board.columns[ic] &&
                        board.columns[ic].type == "String" && (
                          <input
                            onChange={(e) => {
                              const updatedBoard = { ...board };
                              updatedBoard.incidents[i].data[ic] =
                                e.target.value;
                              onUpdate(updatedBoard);
                            }}
                            value={col}
                            placeholder="Empty"
                            className="text-center w-auto h-[36px]"
                          />
                        )}

                      {board.columns[ic] &&
                        board.columns[ic].type == "Date" && (
                          <input
                            onChange={(e) => {
                              const updatedBoard = { ...board };
                              updatedBoard.incidents[i].data[ic] =
                                e.target.value;
                              onUpdate(updatedBoard);
                            }}
                            value={new Date(col)}
                            type="date"
                            placeholder="Empty"
                            className="text-center w-auto h-[36px]"
                          />
                        )}

                      {board.columns[ic] &&
                        board.columns[ic].type == "Number" && (
                          <input
                            onChange={(e) => {
                              const updatedBoard = { ...board };
                              updatedBoard.incidents[i].data[ic] =
                                e.target.value;
                              onUpdate(updatedBoard);
                            }}
                            value={col}
                            type="number"
                            placeholder="Empty"
                            className="text-center w-auto h-[36px]"
                          />
                        )}

                      {board.columns[ic] &&
                        board.columns[ic].type == "Boolean" && (
                          <button
                            onClick={() => {
                              const updatedBoard = { ...board };

                              console.log(updatedBoard.incidents[i].data[ic]);
                              if (updatedBoard.incidents[i].data[ic] !== true) {
                                updatedBoard.incidents[i].data[ic] = true;
                              } else {
                                updatedBoard.incidents[i].data[ic] = false;
                                console.log("false");
                              }
                              onUpdate(updatedBoard);
                            }}
                            aria-checked={col}
                            className="aria-checked:bg-green-500 w-full bg-red-500 text-white capitalize cursor-pointer transition-all duration-200 active:scale-90"
                          >
                            {col ? "true" : "false"}
                          </button>
                        )}
                    </td>
                  ))}
                  <td
                    onClick={() => {
                      const updatedBoard = { ...board };

                      updatedBoard.incidents[i].complete =
                        !updatedBoard.incidents[i].complete;
                      onUpdate(updatedBoard);
                    }}
                    aria-checked={row.complete}
                    className="aria-checked:bg-green-500 bg-red-500 text-white capitalize cursor-pointer transition-all duration-200 active:scale-90"
                  >
                    {row.complete.toLocaleString()}
                  </td>
                  <td>
                    <StyledDialog
                      title={"Task's Logs"}
                      model={
                        <div className="mt-4">
                          <div className="flex gap-2.5">
                            <Avatar sx={{ height: 30, width: 30 }} />
                            <div>
                              <p className="font-medium">User Name</p>
                              <p className="opacity-80">Comment...</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-[5fr_1fr] items-center gap-2 mt-5">
                            <input
                              placeholder="Message"
                              rows={1}
                              className="border border-gray-300 text-[15px] px-3.5 py-2 rounded-lg shadow-sm w-full"
                            />
                            <button className="bg-blue-500 py-3 text-white flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 scale-125"
                              >
                                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      }
                      button={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 mx-auto"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                          />
                        </svg>
                      }
                    ></StyledDialog>
                  </td>

                  <td></td>
                </tr>
              ))}
              <tr className="board-row border-t">
                <span className="px-3 py-1.5 block">
                  <svg
                    onClick={onAddRow}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 stroke-gray-400 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </span>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const ColumnDropdown = ({ onRemove, onChange }) => {
  const [open, setOpen] = useState(false);
  const [columnType, setColumnType] = useState("String"); // Default column type
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
    <>
      <button
        onClick={() => setOpen(!open)}
        className="p-0 pr-1.5 pb-0.5 outline-none"
      >
        <MoreVertIcon sx={{ height: 20, color: "#6B7280" }} />
      </button>

      <ul
        ref={modalRef}

        className={`${
          open
            ? `opacity-100 visible translate-y-0 scale-100`
            : `opacity-0 invisible scale-95 -translate-y-1`
        } ul-modal absolute right-0 top-10 bg-white border rounded-xl origin-top-right flex items-center shadow-lg gap-2 px-2.5 py-1.5 transition-all duration-200`}
      >
        <li
          onClick={() => {
            onRemove();
            setOpen(false);
          }}
          className="flex items-center gap-1 text-sm cursor-pointer hover:text-red-500 transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.6}
            stroke="currentColor"
            className="w-4 -translate-y-px"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          Remove
        </li>

        <Divider orientation="vertical" flexItem />

        <StyledDialog
          onClose={() => {}}
          button={
            <li className="flex items-center gap-1 text-sm cursor-pointer hover:text-blue-500 transition-all duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.6}
                stroke="currentColor"
                className="w-4 -translate-y-px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit
            </li>
          }
          model={
            <div className="mt-2">
              <input
                id="col-name"
                placeholder="Column's name"
                className="border-[1.5px] mt-1.5 mb-4 border-gray-300 text-[17px] px-3.5 py-2 rounded-xl shadow-sm w-full"
              />
              <Select
                value={columnType}
                onChange={(e) => setColumnType(e.target.value)}
                displayEmpty
                className="w-full mt-4"
              >
                <MenuItem value="String">String</MenuItem>
                <MenuItem value="Number">Number</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="Boolean">Boolean</MenuItem>
              </Select>
            </div>
          }
          title={"Edit Column"}
          closeTrigger={
            <button
              onClick={(e) => {
                const inputElement = document.getElementById("col-name");
                if (inputElement instanceof HTMLInputElement) {
                  if (inputElement.value.length == 0) {
                    e.stopPropagation();
                    e.preventDefault();
                  } else onChange(columnType, inputElement.value);
                }
              }}
              className="text-white font-medium py-[7px] mt-1 bg-gradient-to-t from-[#467ae9] to-blue-500 border border-black/10 text-[15px]"
            >
              Update
            </button>
          }
        />
      </ul>
    </>
  );
};
