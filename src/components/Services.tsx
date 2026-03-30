import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../lib/axios";

type Service = {
  objectId?: string;
  id?: string;
  title: string;
  desc: string;
  image?: string;
};

export default function Services() {
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

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="px-6 md:px-10 py-16 bg-gray-50">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Our Services
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((item, i) => (
            <Link
              key={item.objectId ?? item.id ?? i}
              to={`/services/${item.objectId ?? item.id}`}
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition h-full"
              >
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

                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
