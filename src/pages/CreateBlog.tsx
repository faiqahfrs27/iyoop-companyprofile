import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../lib/axios";
import { useAuth } from "../stores/useAuth";

export default function CreateBlog() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(user?.name || "");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newBlog = {
        title,
        content,
        excerpt: content.slice(0, 100) + "...",
        author: user?.name,
        ownerId: user?.objectId,
        publish_date: date,
        image,
      };

      //debug
      console.log("NEW BLOG:", newBlog);

      await axios
        .post("/data/blogs", newBlog)
        .then((res) => console.log("SUCCESS:", res))
        .catch((err) => console.log("ERROR:", err.response?.data || err));

      alert("Blog berhasil dibuat!");
      navigate("/blogs");
    } catch (err: any) {
      console.log(err);
      alert("Gagal membuat blog");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-linear-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] py-16 px-6 md:px-10">
        <h1 className="text-[#2E2F8F] text-3xl md:text-5xl font-bold mb-4">
          Create Blog
        </h1>
        <p className="text-black">
          Bagikan insight, tips, atau pengalaman seputar kesehatan gigi.
        </p>
      </div>

      {/* FORM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="px-6 md:px-10 py-16 flex justify-center"
      >
        <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            New Article
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* TITLE */}
            <div>
              <label className="text-sm text-[#2E2F8F]">Title</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* AUTHOR */}
            <div>
              <label className="text-sm text-[#2E2F8F]">Author</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6]"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>

            {/* DATE */}
            <div>
              <label className="text-sm text-[#2E2F8F]">Date</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="text-sm text-[#2E2F8F]">
                Image URL (optional)
              </label>
              <input
                type="text"
                placeholder="https://image-url.com"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6]"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>

            {/* CONTENT */}
            <div>
              <label className="text-sm text-[#2E2F8F]">Content</label>
              <textarea
                className="w-full p-3 border rounded-lg h-40 focus:ring-2 focus:ring-[#4FA9C6]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* BUTTON */}
            <button
              className="w-full bg-[#2E2F8F] text-white py-3 rounded-lg 
              hover:bg-[#3a3bb5] transition"
            >
              Publish Article
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
