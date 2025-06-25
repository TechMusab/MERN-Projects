import Tasks from "./components/Tasks";
function App() {
  return (
    <>
      <h1 className="text-center text-bold bg-green-700 text-white text-2xl p-6 ">
        TODO APP
      </h1>
      <div className="w-full flex justify-center items-center gap-6 my-8">
        <input
          type="text"
          className="p-4 w-1/2 border border-green-900 outline-none text-black"
          placeholder="Enter Task"
        />
        <button className="p-4 bg-green-600  rounded-2xl text-white hover:bg-green-800 cursor-pointer  ">
          Add Task
        </button>
      </div>
        <Tasks />
    </>
  );
}

export default App;
