import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import TeamSection from "../components/TeamSection";
import Footer from "../components/Footers";

export default function AboutUs() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] 
relative overflow-hidden px-6 md:px-10 py-16 text-center"
      >
        <h1 className="text-gray-800 text-3xl md:text-5xl font-bold mb-4">About IYOOP</h1>
        <p className="text-[#2E2F8F] max-w-2xl mx-auto">
          Learn more about our journey, our people, and what makes us different.
        </p>
      </motion.div>

      {/* Company History */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 py-12 md:py-16 max-w-4xl mx-auto"
      >
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 mb-4">
          IYOOP was founded with a vision to redefine orthodontic care using
          modern technology and personalized treatment. Starting as a small
          clinic, we have grown into a trusted dental provider serving thousands
          of patients.
        </p>
        <p className="text-gray-600">
          Over the years, we have introduced innovative solutions such as
          invisible aligners and digital smile design, making treatments more
          comfortable and effective.
        </p>
      </motion.div>

      {/* Team */}
      <div className=" px-6 md:px-10 py-12 md:py-16">
        <TeamSection />
      </div>

      {/* Culture */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="px-6 md:px-10 py-12 md:py-16 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Our Culture</h2>
        <p className="text-gray-600 mb-4">
          At IYOOP, we believe in creating a positive and supportive environment
          for both our patients and team members. We value innovation,
          compassion, and excellence in everything we do.
        </p>
        <p className="text-gray-600">
          Our workplace encourages continuous learning, teamwork, and delivering
          the best possible experience for every patient.
        </p>
      </motion.div>
      <Footer/>
    </div>
  );
}
