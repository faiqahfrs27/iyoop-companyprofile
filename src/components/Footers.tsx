import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div
      className="bg-linear-to-l from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] 
relative overflow-hidden text-white px-6 md:px-10 py-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="font-bold text-[#2E2F8F] text-lg">IYOOP</h2>
          <p className="text-white text-sm">
            Creating confident smiles with modern orthodontics.
          </p>
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Quick Links</h3>

          <div className="flex flex-col gap-1 text-sm ">
            <Link to="/" className="text-[#2E2F8F] hover:underline active:scale-95 transition">
              Home
            </Link>

            <Link to="/about" className="text-[#2E2F8F] hover:underline active:scale-95 transition">
              About
            </Link>

            <Link to="/services" className="text-[#2E2F8F] hover:underline active:scale-95 transition">
              Services
            </Link>

            <Link to="/blogs" className="text-[#2E2F8F] hover:underline active:scale-95 transition">
              Blog
            </Link>
          </div>
        </div>
        <div>
          <h3 className="text-gray-800 font-semibold mb-2">Contact</h3>
          <p className="text-white text-sm">Email: contact@iyoop.com</p>
          <p className="text-white text-sm">Phone: 123456789</p>
        </div>
      </div>
    </div>
  );
}
