import { useEffect, useRef, useState } from "react";
import Task from "./Task.js";
import Input from "./Input.js";

function App() {
  // Tham số thứ 1: (callBack) mặc định khi mới vào sẽ chạy 2 lần re-render nếu tham số thứ 2 (biến) thay đổi
  // Tham số thứ 2: [...deps]chứa những mảng biến mà , khi biến todoList đc thay đổi thì tôi sẽ cho callBack này chạy
  // Có 3 sự kiện (hay vòng đời) của component: lần đầu tiên khi 1 components đc gọi ra (khi nhấn add task) đgl Mounting và điều này luôn luôn có, khi 1 component có sự thay đổi ddgl Updating (nút edit, re-render), khi component bị tắt đi đgl (nút delete) Unmouting
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(
    JSON.parse(localStorage.getItem("todoList")) ?? []
  );
  // lấy gtri mặc định, xem xét cái bên trái có phải null or undifined, nếu có thì lấy gtri phía bên phải này ([]: mảng rỗng), nếu ko thì lấy gtri của chính nó (array or JS Object do dùng JSON.parse)
  const inputRef = useRef(); // vì useRef chỏ vào input nên đặt tên theo inputRef
  // useEffect(() => {
  //   // console.log("re-render");
  //   localStorage.setItem("todoList", JSON.stringify(todoList));
  // }, [inputValue]); // => updated
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    // LocalStorage chỉ cho phép chúng ta lưu biến với kiểu String, vì vậy để lưu Object hoặc Array ta có thể convert sang Json.
    // Khi cần sử dụng chỉ cần JSON.parse() để convert về giá trị ban đầu.
  }, [todoList]); // => updated
  // localStorage.setItem("todoList", todoList);
  // data type của key và value: String
  // nên khi truyền CTDL là mảng (array là kiểu mở rộng, thực chất kiểu dữ liệu Object) todoList thì JS tự chuyển đổi mảng này thành String => kiểu JSON (lên mạng search: Sử dụng JSON trong JS)
  // convert JS Object thành JSON string, giống convert JS Array thành JSON string, dùng "JSON.stringify([todoList])"
  // convert JSON string thành JS Object,
  // useEffect(() => {
  //   // console.log("re-render");
  //   console.log(
  //     JSON.parse(localStorage.getItem("todoList", JSON.stringify(todoList)))
  //   );
  // }, []); // => trả về String rồi gắn cho biến, mà t dùng biến state todoList nên dùng set setTodoList
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.length > 0) {
      setTodoList([...todoList, inputValue]);
      setInputValue(""); // sau khi gắn giá trị inputValue (task) vào todoList thì chúng ta ko cần giá trị inputValue trong ô Input nữa, vậy xóa nó bằng cách gắn cho inputValue (giá trị trong ô Input) bằng chuỗi rỗng "" thông qua setInputValue. Nhưng điều này phải cần thêm 1 ý nữa là chúng ta phải có thuộc tính "value={tên_biến_cần_sử_dụng}" chứa giá trị inputValue này để xóa chữ của giá trị inputValue trong ô input. Vì nếu ko có thuộc tính "value={}" (trong React) này thì chúng ta chỉ xóa đc giá trị bên trong inputValue rồi in ra task rỗng chớ ko xóa đc chữ trong ô input => Cả 2 ý trên giúp t vừa xóa giá trị inputValue bên trong state sau khi gắn nó cho todoList, vừa xóa đc chữ trong ô Input mỗi khi nhấn "Add Task"
      inputRef.current.focus();

      // console.log(typeof JSON.stringify([todoList])); // => in ra kiểu dữ liệu của "JSON.stringify([todoList])" là String
    } else {
      // TH khi length <= 0, thì ko in gì cả
      alert("Bạn ko nhập gì cả!");
      // return "";
    }
  };
  const handleDeleteTask = (index) => {
    const newTodoList = todoList.filter((value, id) => id !== index);
    setTodoList(newTodoList);
  };
  const handleEnterPress = (e) => {
    if (e.code === "Enter") handleAddTask();
    // khi gọi thuộc tính onKeyDown thì nó trả về Event (e), muốn biết trong (e) có tất cả cái gì thì t console.log (e) ra
    // Nhận thấy rằng khi ấn "Enter" xuống rồi thì nó trả về (e) của "Enter", trong đó có code:"Enter" và key:"Enter"
    // từ đây t sẽ làm đk dựa vào code hoặc key để khi ấn "Enter" thì nó gọi hàm "handleAddTask" để Add task, đỡ phải nhấn nút Add task
    // console.log(e);
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
          {/* <input
            type="text"
            className="border-[1px] border-[#666] rounded-lg w-full h-12 py-2 px-4 text-lg mb-4 outline-[#ff8e35]"
            placeholder="Task name"
            // khi onChange thì nhận đc event (e) trả về rồi truyền vào hàm "handleOnChange(e)" để thực việc công việc trong hàm đó
            onChange={(e) => handleOnChange(e)}
            value={inputValue}
            // vì useRef chỏ vào input nên đặt tên theo inputRef
            ref={inputRef}
            // vì khi chúng t ấn nút "Enter" xuống nó sẽ trả ta cái event (e) rồi truyền nó vào cái Hàm "handleEnter(e)" để thực việc công việc trong hàm đó
            onKeyDown={(e) => handleEnterPress(e)}
          ></input> */}
          <button
            className="text-lg p-2 w-full bg-orange-400 rounded-lg text-white font-semibold"
            onClick={handleAddTask}
          >
            Add task
          </button>
          <div className="flex flex-col flex-1 justify-start mt-4 gap-4">
            {/* Trả về trong Arrow function là khối UI ko có ";" thì dùng ngoặc tròn, còn ngoặc nhọn là trả về hàm có dấu ";" phía sau */}
            {todoList.map((task, index) => (
              <Task
                key={index}
                info={task}
                index={index}
                functionDelete={() => handleDeleteTask(index)}
              ></Task>
              //
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
