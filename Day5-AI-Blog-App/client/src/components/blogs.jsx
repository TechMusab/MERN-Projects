import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import Modal from "./Modal";

const Blogs = () => {
  const [blogs, setblogs] = useState([]);
  const [blog, setblog] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [showModal, setshowModal] = useState(false);
  const fetchBlogs = async () => {
    const response = await axios.get("http://localhost:5000/getblogs");
    if (response.status === 200) {
      setblogs(response.data.blogs);
    } else {
      console.error("Failed to fetch blogs:", response.statusText);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  const onEdit = (blog) => {
    setshowModal(true);
    setblog(blog);
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    formData.append("image", blog.image);
    
    axios.put(`http://localhost:5000/blog/${blog._id}`, formData)
      .then(() => {
        fetchBlogs();
        setshowModal(false);
        setblog({ title: "", content: "", image: "" });
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
      });

  }
  const onDelete=(id)=>{
    axios.delete(`http://localhost:5000/blog/${id}`)
      .then(() => {
        fetchBlogs();
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          📚 Blog Posts
        </h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {blog.image && (
                <img
                  src={`http://localhost:5000/${blog.image}`}
                  alt={blog.title}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>

                <div className="prose max-w-none text-gray-700 mb-4 overflow-hidden">
                  <ReactMarkdown>{blog.content}</ReactMarkdown>
                </div>

                <div className="mt-auto flex justify-between items-center">
                  <button
                    onClick={() => onEdit(blog)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showModal && <Modal blog={blog} setModal={setshowModal} setblog={setblog} handleSubmit={handleSubmit} />}
    </>
  );
};

export default Blogs;
