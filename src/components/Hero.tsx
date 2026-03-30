import { motion } from "framer-motion";
import dentalImg from "../assets/dental-braces.jpg";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
     <div className="grid md:grid-cols-2 items-center px-6 md:px-10 py-16 bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] 
relative overflow-hidden gap-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-gray-800 text-2xl md:text-5xl font-bold leading-tight">
          Klinik Gigi Terdekat untuk
          <span className="text-[#2E2F8F] block">Senyum Sehat dan Percaya Diri</span>
        </h1>

        <p className="text-white mt-4 max-w-md">
          45+ klinik gigi terdekat, dokter berpengalaman
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button className="bg-[#2E2F8F] text-white px-6 py-3 rounded-full w-full sm:w-auto">
            Book Consultation
          </button>
          <button 
          onClick={() => navigate("/services")}
          className="border px-6 py-3 rounded-full border-[#2E2F8F] text-white w-full sm:w-auto">
            View Services
          </button>
        </div>
      </motion.div>

      <motion.img
        src={dentalImg}
        className="rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] w-full h-[250px] md:h-auto object-cover"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      />
    </div>
  );
}
