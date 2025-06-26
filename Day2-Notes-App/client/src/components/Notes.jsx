import React from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
export default function Notes({ notes }) {
  return (
    <>
      <ul className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        {notes.map((note) => {
          return (
            <li className="flex justify-between">
              <p className="text-gray-800 text-lg">{note.description}</p>
              <div className="flex gap-2">
                <MdDelete
                size={24}
              className="text-red-600 cursor-pointer hover:text-red-800"
                  />
                <FaEdit 
                 size={24}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
                 />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
