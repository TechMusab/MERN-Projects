import React, { useState } from "react";
import axios from 'axios'


export default function Main() {
  const [Modal, setModal] = useState(false);
  const [blog, setblog] = useState({
    title: "",
    content: "",
    image: "",
  });
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData=new FormData()
    formData.append("title",blog.title)
    formData.append("content",blog.content)
    formData.append("image",blog.image)
    await axios.post('http://localhost:5000/createblog',formData)
    setblog({ title: "", content: "", image: "" });
    setModal(false);
  };
  return (
    <>
      <div className="h-[89vh] w-screen flex justify-center items-center bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="w-[28vw] min-w-[300px] h-[50vh] bg-white p-8 flex flex-col justify-center items-center gap-8 rounded-2xl shadow-2xl transition-all duration-300">
          <h1 className="text-4xl font-semibold text-gray-800 text-center">
            Welcome to <span className="text-green-600">Blog App</span>
          </h1>
          <button
            onClick={() => setModal(true)}
            className="px-8 py-3 bg-green-500 rounded-xl text-white text-lg font-medium shadow-md hover:bg-green-600 hover:scale-105 transition duration-300"
          >
            Create Blog
          </button>
        </div>
      </div>
      {Modal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-black text-2xl font-bold mb-4 ">Create Blog</h1>
            <form onSubmit={handleSubmit}>
             <input
              onChange={(e)=>setblog({...blog,title:e.target.value})}
                value={blog.title}
                className="w-full border p-2 mb-4 rounded"
                placeholder="Title"
                type="text"
              />
              <textarea
              onChange={(e)=>setblog({...blog,content:e.target.value})}
                value={blog.content}
                className="w-full border p-2 mb-4 rounded h-32"
                placeholder="Write Content in Markdown"
                type="text"
              ></textarea>
              <input
               onChange={(e) =>setblog({ ...blog, image: e.target.files[0] })}
                type="file"
                accept="image/*"
                className="w-full border p-2 mb-4 rounded"
              /> 
             <div className="flex justify-between items-center">
              <button onClick={()=>setModal(false)} className="bg-gray-200 rounded-lg text-black px-6 py-2">
                Cancel
              </button>
              <button onClick={handleSubmit} className="bg-green-500 rounded-lg text-black px-6 py-2 ">
                Post
              </button>
              </div>
              
            </form>
          </div>
        </div>
      )}
    </>
  );
}
