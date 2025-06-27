import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
export default function Notes({ notes, setedit, setnote, ondelete }) {
  const [summary,setSummary]=useState("")
  const getSummary = async (notes) => {
    const res=await axios.post(
      "http://localhost:3000/api/users/notes/ai/summary",
      { notes },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
      setSummary(res.data.summary); 

  };
  return (
    <>
      <ul className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
        {notes.map((note) => {
          return (
            <li className="flex justify-between">
              <p className="text-gray-800 text-lg">{note.description}</p>
              <div className="flex gap-2 justify-center items-center">
                <MdDelete
                  onClick={() => {
                    ondelete(note._id);
                  }}
                  size={24}
                  className="text-red-600 cursor-pointer hover:text-red-800"
                />
                <FaEdit
                  onClick={() => {
                    setedit(note._id);
                    setnote(note.description);
                  }}
                  size={24}
                  className="text-blue-600 cursor-pointer hover:text-blue-800"
                />
                <button
                  onClick={() => getSummary(note.description)}
                  className="bg-green-400 px-6 py-2 rounded-2xl cursor-pointer"
                >
                  Summarize
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {summary && (
        <div className="mt-4 p-4 bg-yellow-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}
    </>
  );
}
