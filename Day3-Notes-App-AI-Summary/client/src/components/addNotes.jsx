import React, { useEffect, useState } from "react";

import Notes from "./Notes";
import axios from "axios";
export default function AddNotes() {
  const [note, setnote] = useState("");
  const [notes, setNotes] = useState([]);
  const [edit, setedit] = useState(null);
  const fetchNotes = async () => {
    try {
      const data = await axios.get("http://localhost:3000/api/users/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.data.notes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      alert("Failed to fetch notes. Please try again later.");
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (note.trim() === "") {
      alert("Please enter a note before adding it.");
      return;
    }
    if (edit) {
      const updatedNote = {
        description: note,
      };
      await axios.put(
        `http://localhost:3000/api/users/notes/${edit}`,
        updatedNote,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setedit(null);
      setnote("");
      fetchNotes();
    } else {
      const newNote = {
        description: note,
      };
      await axios.post("http://localhost:3000/api/users/notes", newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchNotes();
    }
  };
  const ondelete=async (id)=>{
    await axios.delete(`http://localhost:3000/api/users/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    fetchNotes();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center pt-20 px-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-8">My Notes</h1>

      <div className="flex gap-4 mb-12 w-full max-w-md">
        <input
          value={note}
          onChange={(e) => setnote(e.target.value)}
          type="text"
          placeholder="Write a note..."
          className="flex-1 p-4 rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-md bg-white"
        />
        <button
          onClick={addNote}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
          Add
        </button>
      </div>

      <div className="w-full max-w-2xl">
        <Notes notes={notes} setnote={setnote} setedit={setedit} ondelete={ondelete}  />
      </div>
    </div>
  );
}
