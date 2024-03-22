import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DynamicTable from './components/tableTickets'
import DynamicForm from './components/DynamicForm'
import ExampleBoard from './board.json'
import DynamicBoardForm from './components/DynamicBoardForm'
import anotherExample from './anotherBoardFromDb.json'
import MessageBlock from './components/MessageBlock'


const onCreateBoard = (schema) => {
  console.log(schema);
  fetch('http://localhost:5005/boards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(schema)
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="App-header">

        {/* <MessageBlock /> */}
        {/* <DynamicTable data={boardWithLessColumns} /> */}
        <DynamicTable board={anotherExample} />
        {/* <DynamicForm board={board_json_form} /> */}
        {/* <DynamicBoardForm onCreateBoard={onCreateBoard} /> */}

      </header>

    </>
  )
}

export default App
