import { useState } from "react";

function App() {
  
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-[#ffc482] to-[#ff8e35]">
        <div className="bg-white w-full  rounded-lg p-4 max-w-2xl drop-shadow-xl min-h-[32rem] flex flex-col">
          <h1 className="text-4xl font-semibold text-[#333] text-center mb-4">
            Todo App
          </h1>
          <input
            type="text"
            className="border-[1px] border-[#666] rounded-lg w-full h-12 py-2 px-4 text-lg mb-4 outline-[#ff8e35]"
            placeholder="Task name"
          ></input>
          <button
            className="text-lg p-2 w-full bg-orange-400 rounded-lg text-white font-semibold"
          >
            Add task
          </button>
          <div className="flex flex-col flex-1 justify-start mt-4 gap-4">
            
              <div className="flex flex-row items-center gap-4" >
                <div className="text-lg py-2 px-4 bg-orange-400 text-white rounded-lg">
                  1
                </div>
                <p className="text-lg flex-1">Nau com</p>
                <button
                  className="text-lg text-[#da1414]"
                >
                  DELETE
                </button>
              </div>
            
          </div>
          <p className="text-end text-lg">You have 1 tasks</p>
        </div>
      </div>
    </>
  );
}

export default App;
