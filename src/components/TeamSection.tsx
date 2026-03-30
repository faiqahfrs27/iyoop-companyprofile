import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type User = {
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  };
};

export default function TeamSection() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=6")
      .then((res) => res.json())
      .then((data) => setUsers(data.results));
  }, []);

  return (
    <div className="bg-gray-100 px-6 md:px-10 py-12 md:py-16">
      <h2 className="text-black text-3xl font-bold text-center mb-10">
        Meet Our Team
      </h2>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {users.map((user, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center"
          >
            <img
              src={user.picture.large}
              className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
            />

            <h3 className="text-[#2E2F8F] font-semibold text-lg">
              {user.name.first} {user.name.last}
            </h3>

            <p className="text-[#2F7FA0] text-sm mb-2">
              Dentist Specialist
            </p>

            <p className="text-gray-500 text-sm">
              Passionate about creating confident smiles and providing the best dental care experience.
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}