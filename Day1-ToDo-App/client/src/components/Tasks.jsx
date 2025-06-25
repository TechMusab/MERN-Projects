import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
export default function Tasks() {
  const Tasks = [
    {
      id: 1,
      title: "Task 1",
      description: "This is the first task",
      completed: false,
    },
    {
      id: 2,
      title: "Task 2",
      description: "This is the second task",
      completed: true,
    },
    {
      id: 3,
      title: "Task 3",
      description: "This is the third task",
      completed: false,
    },
  ];

  return (
    <>
      <div className="bg-green-500 w-1/2 m-auto h-auto flex flex-col justify-center items-center rounded-2xl p-4">
        <h1 className="text-4xl text-white text-bold font-bold">Tasks</h1>
        <ul className="my-4">
          {Tasks.map((task) => {
            return (
              <li className="flex min-w-[500px] w-fit bg-gray-300 rounded-2x p-6 mt-4 rounded-lg justify-between items-center text-black">
                <p className=" text-2xl">{task.description}</p>
                <div className="flex gap-2">
                <FaEdit className="cursor-pointer" size={28} color="black" />
                  <MdDeleteOutline className="cursor-pointer" size={28} color="red" />
                 
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
