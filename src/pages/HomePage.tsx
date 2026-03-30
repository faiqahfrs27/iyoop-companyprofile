import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Overview from "../components/Overview";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footers";
import { motion } from "framer-motion";
import Services from "../components/Services";

export default function HomePage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <Hero />
      <Stats />
      <Overview />
      <Services />
      <Testimonials />
      <Footer />
    </div>
  );
}
