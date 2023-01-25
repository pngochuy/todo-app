import React from "react";
// props là Object chứa tất cả thông tin mình truyền vào (key: value)
// mỗi Object chứa key và info (do mình đặt tên key để truyền vào)
//
function Task({ index, info, functionDelete }) {
  // function Task(props) {...}
  // console.log(props);
  return (
    <div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="text-lg py-2 px-4 bg-orange-400 text-white rounded-lg"
          //   key={index}
        >
          {/* {index + 1} */}
          {/* {props.index + 1} */}
          {index + 1}
        </div>
        <p className="text-lg flex-1">
          {/* {task} */}
          {/* {props.info} */}
          {info}
        </p>
        <button
          className="text-lg text-[#da1414]"
          onClick={() => {
            // props.delete();
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
// cho input thành Component con
