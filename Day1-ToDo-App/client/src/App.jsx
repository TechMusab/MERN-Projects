import { useEffect, useState } from "react";
import Tasks from "./components/Tasks";
import axios from "axios";
function App() {
  const [input, setinput] = useState("");
  const [tasks, settask] = useState([]);
  const [edit, setedit] = useState(null);
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/todos");
      console.log(res.data)
      settask(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const addtask =async () => {
    if (input.trim() === "") {
      alert("Please enter a task");
      return;
    }

    if (edit) {
      await axios.put(`http://localhost:3000/todos/${edit}`,{description:input})
      // const updatedTasks = tasks.map((task) =>
      //   task.id === edit ? { ...task, description: input } : task
      // );
      setedit(null);
    } else {
      await axios.post(`http://localhost:3000/todos/`,{description:input})
      // const newtask = {
      //   id: Date.now(),
      //   description: input,
      // };
      // how can i integrate with backend
      // settask([...tasks, newtask]);
    }
    setinput("");
    fetchTasks()
  
  };

  const onDelete = async (id) => {
    console.log(id)
    // const updatedTasks = tasks.filter((task) => task.id != id);
    // settask(updatedTasks);
    try{
    await axios.delete(`http://localhost:3000/todos/${id}`)
    fetchTasks()
    }
    catch(err){
      console.error("Error deleting task:", err);
    }
  };
  const seteditid=(id)=>{
    const task = tasks.find((t) => t._id === id);
          if (task) {
            setinput(task.description);
            setedit(id);
          }
  }

  return (
    <>
      <h1 className="text-center text-bold bg-green-700 text-white text-2xl p-6 ">
        TODO APP
      </h1>
      <div className="w-full flex justify-center items-center gap-6 my-8">
        <input
          value={input}
          onChange={(e) => setinput(e.target.value)}
          type="text"
          className="p-4 w-1/2 border border-green-900 outline-none text-black"
          placeholder="Enter Task"
        />
        <button
          onClick={addtask}
          className="p-4 bg-green-600  rounded-2xl text-white hover:bg-green-800 cursor-pointer  "
        >
          Add Task
        </button>
      </div>
      <Tasks
        tasklist={tasks}
        onDelete={onDelete}
        seteditid={seteditid}
        setinput={setinput}
      />
    </>
  );
}

export default App;
