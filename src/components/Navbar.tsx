import { useState } from "react";
import { useAuth } from "../stores/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const menus = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Teams", path: "/teams" },
    { name: "Blog", path: "/blogs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="relative">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-6 md:px-10 py-4 
      bg-gradient-to-r from-white via-[#8FD3CF] to-[#4FA9C6] 
      backdrop-blur shadow-sm sticky top-0 z-50">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-xl text-[#2E2F8F] cursor-pointer"
        >
          IYOOP
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center text-sm">
          {menus.map((menu) => (
            <button
              key={menu.path}
              onClick={() => navigate(menu.path)}
              className={`transition ${
                isActive(menu.path)
                  ? "text-[#2E2F8F] font-semibold"
                  : "text-gray-700 hover:text-[#2E2F8F]"
              }`}
            >
              {menu.name}
            </button>
          ))}

          {user && (
            <button
              onClick={() => navigate("/create-blog")}
              className="bg-green-500 text-white px-4 py-2 rounded-full"
            >
              Create Blog
            </button>
          )}

          {!user ? (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#2E2F8F] text-white px-5 py-2 rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                navigate("/");
              }}
              className="bg-red-500 text-white px-5 py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* MOBILE MENU */}
      <div
        className={`absolute top-full left-0 w-full bg-white shadow-md z-50 flex flex-col items-center py-6 gap-5 md:hidden transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-5 pointer-events-none"
        }`}
      >
        {menus.map((menu) => (
          <button
            key={menu.path}
            onClick={() => {
              navigate(menu.path);
              setOpen(false);
            }}
          >
            {menu.name}
          </button>
        ))}

        {user && (
          <button
            onClick={() => {
              navigate("/create-blog");
              setOpen(false);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Create Blog
          </button>
        )}

        {!user ? (
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="bg-[#2E2F8F] text-white px-5 py-2 rounded-full"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              logout();
              navigate("/");
              setOpen(false);
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-full"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}