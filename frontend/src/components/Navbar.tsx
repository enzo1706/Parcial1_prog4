import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
const location = useLocation();
const [open, setOpen] = useState(false);

const linkClass = (path: string) =>
    `block px-3 py-2 rounded-md text-sm font-medium transition ${
    location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-600 hover:bg-gray-100"
    }`;

return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">

          {/* LOGO */}
        <div className="flex items-center gap-2">
            <span className="text-lg">🍔</span>
            <span className="text-sm font-semibold text-gray-800">
                Food App
            </span>
        </div>

          {/* DESKTOP */}
        <div className="hidden md:flex gap-2">
            <Link to="/productos" className={linkClass("/productos")}>
                Productos
            </Link>
            <Link to="/categorias" className={linkClass("/categorias")}>
                Categorías
            </Link>
            <Link to="/ingredientes" className={linkClass("/ingredientes")}>
                Ingredientes
            </Link>
        </div>

          {/* BOTÓN HAMBURGUESA */}
        <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-8 h-8"
        >
            <div className="flex flex-col gap-1">
                <span className="block w-5 h-[2px] bg-black"></span>
                <span className="block w-5 h-[2px] bg-black"></span>
                <span className="block w-5 h-[2px] bg-black"></span>
            </div>
        </button>
        </div>
    </div>

      {/* MOBILE MENU */}
    {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-white border-t">
        <Link to="/productos" onClick={() => setOpen(false)} className={linkClass("/productos")}>
            Productos
        </Link>
        <Link to="/categorias" onClick={() => setOpen(false)} className={linkClass("/categorias")}>
            Categorías
        </Link>
        <Link to="/ingredientes" onClick={() => setOpen(false)} className={linkClass("/ingredientes")}>
            Ingredientes
        </Link>
        </div>
    )}
    </nav>
);
}