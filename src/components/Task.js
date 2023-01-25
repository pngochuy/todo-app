import React from "react";

function Task({ index, info, functionDelete }) {
  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <div className="text-lg py-2 px-4 bg-orange-400 text-white rounded-lg">
          {index + 1}
        </div>
        <p className="text-lg flex-1">{info}</p>
        <button
          className="text-lg text-[#da1414]"
          onClick={() => {
            functionDelete(index);
          }}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default Task;
