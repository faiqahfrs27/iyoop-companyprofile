import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../lib/axios";
import Footer from "../components/Footers";

type Blog = {
  objectId?: string;
  id?: string;
  title: string;
  content: string;
  author: string;
  publish_date?: string;
  date?: string;
  image?: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("/data/blogs");
      const data = res.data.data ?? res.data;

      setBlogs(data);
    } catch (err) {
      console.log("ERROR FETCH BLOG:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date?: string | number) => {
    if (!date) return "-";

    const d = new Date(date);
    if (isNaN(d.getTime())) return "-";

    return d.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="bg-linear-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0]
      relative overflow-hidden text-gray-800 py-16 px-6 md:px-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog & Articles</h1>

        <p className="max-w-2xl text-[#2E2F8F]">
          Informasi dan tips terbaru seputar kesehatan gigi dan mulut.
        </p>
      </div>

      {/* BLOG LIST */}
      <div className="px-6 md:px-10 py-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.objectId ?? blog.id ?? i}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                {blog.image && (
                  <img
                    src={
                      blog.image?.includes("console")
                        ? blog.image.replace(
                            /https:\/\/develop\.backendless\.com\/.*\/console\/files\/view/,
                            "https://toughangle-us.backendless.app/api/files",
                          )
                        : blog.image
                    }
                    alt={blog.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                {/* CONTENT */}
                <div className="p-6">
                  {/* TITLE */}
                  <h3 className="text-lg font-semibold text-[#2E2F8F] mb-2">
                    {blog.title}
                  </h3>

                  {/* META */}
                  <p className="text-xs text-gray-500 mb-2">
                    {blog.author} • {formatDate(blog.publish_date ?? blog.date)}
                  </p>

                  {/* CONTENT PREVIEW */}
                  <p className="text-sm text-gray-600 mb-4">
                    {blog.content?.slice(0, 120)}...
                  </p>

                  {/* BUTTON */}
                  <Link
                    to={`/blog/${blog.objectId ?? blog.id}`}
                    className="inline-block text-[#2F7FA0] font-medium hover:underline"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
