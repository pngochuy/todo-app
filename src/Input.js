import React from "react";

function Input({ functionOnChange, value, ref, functionEnter }) {
  return (
    <div>
      <input
        type="text"
        className="border-[1px] border-[#666] rounded-lg w-full h-12 py-2 px-4 text-lg mb-4 outline-[#ff8e35]"
        placeholder="Task name"
        // khi onChange thì nhận đc event (e) trả về rồi truyền vào hàm "handleOnChange(e)" để thực việc công việc trong hàm đó
        // onChange={(e) => handleOnChange(e)}
        onChange={(e) => functionOnChange(e)}
        value={value}
        // vì useRef chỏ vào input nên đặt tên theo inputRef
        ref={ref}
        // vì khi chúng t ấn nút "Enter" xuống nó sẽ trả ta cái event (e) rồi truyền nó vào cái Hàm "handleEnter(e)" để thực việc công việc trong hàm đó
        onKeyDown={(e) => functionEnter(e)}
      ></input>
    </div>
  );
}

export default Input;
