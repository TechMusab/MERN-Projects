import blog from "../Models/blog.js";
import express from "express";
import multer from "multer";
const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.post("/createblog", upload.single("image"), async (req, res) => {
   const { title, content } = req.body;
  const image = req.file ? req.file.path : "";
  if (!title || !content || !image) {
    res.status(400).json({
      message: "All fields are required",
    });
  } else {
    const newBlog = new blog({
      title,
      content,
      image,
    });
    await newBlog.save();
    res.status(200).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  }
});
router.get("/getblogs", async (req, res) => {
  try {
    const blogs = await blog.find();
    res.status(200).json({
      blogs: blogs,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching blogs",
      error: err.message,
    });
  }
});
export default router;
