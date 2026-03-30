import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "../lib/axios";
import { motion } from "framer-motion";
import { useAuth } from "../stores/useAuth";

// ==================
// SCHEMA
// ==================
const formSchema = z
  .object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak sama",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

// ==================
//COMPONENT
// ==================
export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth(); // PINDAH KE SINI
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // ==================
  // SUBMIT
  // ==================
  const onSubmit = async (data: FormData) => {
    setIsPending(true);

    try {
      // 🔥 register
      await axios.post("/users/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // 🔥 auto login
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
      alert(err?.response?.data?.message || "Register gagal");
    } finally {
      setIsPending(false);
    }
  };

  // ==================
  // ✅ UI
  // ==================
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div className="bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] py-16 px-6 md:px-10">
        <h1 className="text-3xl md:text-5xl font-bold text-[#2E2F8F]">
          Register
        </h1>
        <p className="text-black mt-2">
          Buat akun untuk mulai menulis blog.
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
            Create Account ✨
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* NAME */}
            <div>
              <label className="text-sm text-[#2F7FA0]">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6] outline-none"
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm text-[#2F7FA0]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#4FA9C6] outline-none"
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#2E2F8F] text-white py-3 rounded-lg hover:scale-[1.02] transition"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

        </motion.div>
      </div>
    </div>
  );
}