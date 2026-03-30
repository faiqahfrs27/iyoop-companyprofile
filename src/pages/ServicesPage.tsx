import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import axios from "../lib/axios";
import Footer from "../components/Footers";

type Service = {
  objectId?: string;
  id?: string;
  title: string;
  desc: string;
  price?: string;
  image?: string;
  testimonial?: string;
  user?: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await axios.get("/data/services");
      const data = res.data.data ?? res.data;
      setServices(data);
    } catch (err) {
      console.log("ERROR FETCH SERVICES:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* HERO */}
      <div
        className="bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0]
      relative overflow-hidden text-gray-800 py-16 px-6 md:px-10"
      >
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="max-w-2xl text-[#2E2F8F]">
          Temukan berbagai layanan terbaik untuk kesehatan dan estetika gigi
          Anda.
        </p>
      </div>

      {/* LIST SERVICES */}
      <div className="px-6 md:px-10 py-16">
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, i) => (
              <motion.div
                key={item.objectId ?? item.id ?? i}
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                {/* IMAGE */}
                {item.image && (
                  <img
                    src={
                      item.image.includes("console")
                        ? item.image.replace(
                            /https:\/\/develop\.backendless\.com\/.*\/console\/files\/view/,
                            "https://toughangle-us.backendless.app/api/files",
                          )
                        : item.image
                    }
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-6">
                  {/* TITLE */}
                  <h3 className="text-xl font-semibold text-[#2F7FA0] mb-2">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-gray-600 text-sm mb-4">{item.desc}</p>

                  {/* PRICE */}
                  {item.price && (
                    <p className="text-[#2E2F8F] font-bold mb-4">
                      {formatRupiah(Number(item.price))}
                    </p>
                  )}

                  {/* TESTIMONIAL */}
                  {item.testimonial && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm italic text-gray-600">
                        "{item.testimonial}"
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        - {item.user}
                      </p>
                    </div>
                  )}
                </div>

                <button className="w-full bg-[#2E2F8F] text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Book Now
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
