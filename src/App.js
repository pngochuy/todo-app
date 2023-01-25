import { useEffect, useRef, useState } from "react";
import Task from "./Task.js";
import Input from "./Input.js";

function App() {

  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) ?? []
  );
  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]); 
  
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.length > 0) {
      setTodoList([...todoList, inputValue]);
      setInputValue("");
      inputRef.current.focus();

    } else {
      alert("Bạn ko nhập gì cả!");
    }
  };
  const handleDeleteTask = (index) => {
    const newTodoList = todoList.filter((value, id) => id !== index);
    setTodoList(newTodoList);
  };
  const handleEnterPress = (e) => {
    if (e.code === "Enter") handleAddTask();
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#ffc482] to-[#ff8e35]">
        <div className="bg-white w-full  rounded-lg p-4 max-w-2xl drop-shadow-xl min-h-[32rem] flex flex-col">
          <h1 className="text-4xl font-semibold text-[#333] text-center mb-4">
            Todo App
          </h1>
          <Input
            functionOnChange={(a) => handleOnChange(a)}
            value={inputValue}
            ref={inputRef}
            functionEnter={(e) => handleEnterPress(e)}
          ></Input>
          <button
            className="text-lg p-2 w-full bg-orange-400 rounded-lg text-white font-semibold"
            onClick={handleAddTask}
          >
            Add task
          </button>
          <div className="flex flex-col flex-1 justify-start mt-4 gap-4">
            {todoList.map((task, index) => (
              <Task
                key={index}
                info={task}
                index={index}
                functionDelete={() => handleDeleteTask(index)}
              ></Task>
            ))}
          </div>
          <p className="text-end text-lg">
            You have {todoList.length} {todoList.length >= 2 ? "tasks" : "task"}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
