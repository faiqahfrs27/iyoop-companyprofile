import { useEffect, useState } from "react";
import axios from "../lib/axios";

type Testimonial = {
  user: string;
  testimonial: string;
};

export default function Testimonials() {
  const [data, setData] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("/data/services");

        console.log("RAW DATA:", res.data);

        const mapped = res.data.map((item: any) => ({
          user: item.user,
          testimonial: item.testimonial,
        }));

        setData(mapped);
      } catch (err) {
        console.error("ERROR FETCH TESTIMONIAL:", err);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="px-6 md:px-10 py-12 md:py-16 bg-gray-100">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8 md:mb-10">
        Patient Success Stories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item, i) => (
          <div key={i} className="p-6 bg-gray-50 rounded-2xl">
            <p className="text-gray-500 mb-4 text-sm md:text-base">
              "{item.testimonial}"
            </p>
            <h4 className="font-semibold">{item.user}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}