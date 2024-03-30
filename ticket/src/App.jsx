/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DynamicTable from "./components/tableTickets";
import DynamicForm from "./components/DynamicForm";
import ExampleBoard from "./board.json";
import DynamicBoardForm from "./components/DynamicBoardForm";
import anotherExample from "./anotherBoardFromDb.json";
import MessageBlock from "./components/MessageBlock";
import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import DashboardIndex from "./pages/dashboardIndex";
import Login from "./pages/login";
import Register from "./pages/register";

const onCreateBoard = (schema) => {
  console.log(schema);
  fetch("http://localhost:5005/boards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schema),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
};

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardIndex />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
