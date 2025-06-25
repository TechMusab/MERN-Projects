import { useState } from "react";
import Tasks from "./components/Tasks";
function App() {
  const[input,setinput]=useState("")
  const[tasks,settask]=useState([]);
  const[edit,setedit]=useState(null)

  const addtask = () => {
    if (input.trim() === "") {
      alert("Please enter a task");
      return;
    }
  
    if (edit !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === edit ? { ...task, description: input } : task
      );
      settask(updatedTasks);
      setedit(null); 
    } else {
      const newtask = {
        id: Date.now(),
        description: input,
      };
      settask([...tasks, newtask]);
    }
    setinput(""); 
  };


  const onDelete=(id)=>{
    const updatedTasks=tasks.filter((task)=> task.id!=id)
    settask(updatedTasks);
  }

  
  return (
    <>
      <h1 className="text-center text-bold bg-green-700 text-white text-2xl p-6 ">
        TODO APP
      </h1>
      <div className="w-full flex justify-center items-center gap-6 my-8">
        <input
        value={input}
        onChange={(e)=>setinput(e.target.value)}
          type="text"
          className="p-4 w-1/2 border border-green-900 outline-none text-black"
          placeholder="Enter Task"
        />
        <button onClick={addtask} className="p-4 bg-green-600  rounded-2xl text-white hover:bg-green-800 cursor-pointer  ">
          Add Task
        </button>
      </div>
        <Tasks tasklist={tasks} onDelete={onDelete} setedit={setedit} setinput={setinput}  />
    </>
  );
}

export default App;
