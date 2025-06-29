import React, { useState } from "react";
import Modal from "./Modal";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function Main() {
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();
  const [blog, setblog] = useState({
    title: "",
    content: "",
    image: "",
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!blog.title || !blog.content || !blog.image) {
      alert("Please fill all fields before submitting.");
      return;
    }
    const formData=new FormData()
    formData.append("title",blog.title)
    formData.append("content",blog.content)
    formData.append("image",blog.image)
    await axios.post('http://localhost:5000/createblog',formData)
    setblog({ title: "", content: "", image: "" });
    setshowModal(false);
    navigate('/blogs')
  };
  return (
    <>
      <div className="h-[89vh] w-screen flex justify-center items-center bg-gray-100">
        <div className="w-[28vw] min-w-[300px] h-[50vh] bg-white p-8 flex flex-col justify-center items-center gap-8 rounded-2xl shadow-2xl transition-all duration-300">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">
            Welcome to <span className="text-green-600">Blog App</span>
          </h1>
          <button
            onClick={() => setshowModal(true)}
            className="px-8 py-3 bg-green-500 rounded-xl text-white text-lg font-medium shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
          >
            Create Blog
          </button>
        </div>
      </div>
      {showModal &&<Modal setblog={setblog} blog={blog} setModal={setshowModal} handleSubmit={handleSubmit} /> }
    </>
  );
}
