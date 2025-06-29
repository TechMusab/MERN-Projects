import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Modal({ setblog, handleSubmit, blog,setModal }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 ">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-black text-2xl font-bold mb-4 ">Create Blog</h1>
          <form>
            <input
              onChange={(e) => setblog({ ...blog, title: e.target.value })}
              value={blog.title}
              className="w-full border p-2 mb-4 rounded"
              placeholder="Title"
              type="text"
            />
            <textarea
              onChange={(e) => setblog({ ...blog, content: e.target.value })}
              value={blog.content}
              className="w-full border p-2 mb-4 rounded h-32"
              placeholder="Write Content in Markdown"
              type="text"
            ></textarea>
            <input
              onChange={(e) => setblog({ ...blog, image: e.target.files[0] })}
              type="file"
              accept="image/*"
              className="w-full border p-2 mb-4 rounded"
            />
            <div className="flex justify-between items-center">
              <button
                onClick={() => setModal(false)}
                className="bg-gray-200 rounded-lg text-black px-6 py-2"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  handleSubmit();
                  navigate('/blogs')
                }
                  }
                className="bg-green-500 rounded-lg text-black px-6 py-2 "
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

