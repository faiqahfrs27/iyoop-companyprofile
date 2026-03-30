import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "../stores/useAuth";
import axios from "../lib/axios"; // ✅ FIX import

// ==================
// Schema
// ==================
const formSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

type FormData = z.infer<typeof formSchema>;

// ==================
// Component
// ==================
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // ==================
  // Login Handler
  // ==================
  const handleLogin = async (data: FormData) => {
    try {
      const res = await axios.post("/users/login", {
        login: data.email,
        password: data.password,
      });

      const userData = {
        name: res.data.name,
        email: res.data.email,
        objectId: res.data.objectId,
        userToken: res.data["user-token"],
      };

      login(userData); // simpan ke Zustand

      navigate("/blogs");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Login gagal");
    }
  };

  // ==================
  // UI
  // ==================
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* HERO */}
      <div className="bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] py-16 px-6 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold text-[#2E2F8F]">
          Login
        </h1>
        <p className="text-black mt-2">
          Masuk untuk membuat dan mengelola blog.
        </p>
      </div>

      {/* FORM */}
      <div className="flex justify-center px-6 md:px-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="text-sm text-[#2F7FA0]">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6] outline-none"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm text-[#2F7FA0]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6] outline-none"
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REGISTER LINK */}
            <p className="text-sm text-gray-500 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#2E2F8F] text-white py-3 rounded-lg hover:scale-[1.02] transition"
            >
              Login
            </button>
          </form>

        </motion.div>
      </div>
    </div>
  );
}