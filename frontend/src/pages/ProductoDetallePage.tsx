import { useParams, useNavigate } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";

export default function ProductoDetallePage() {
const { id } = useParams();
const navigate = useNavigate();

const { data, isLoading, isError } = useProductos();

if (isLoading)
    return (
    <p className="text-center mt-10 text-gray-500">
        Cargando...
    </p>
    );

if (isError)
    return (
    <p className="text-center mt-10 text-red-500">
        Error al cargar
    </p>
    );

const producto = data?.find((p: any) => p.id === Number(id));

if (!producto)
    return (
    <p className="text-center mt-10 text-gray-500">
        Producto no encontrado
    </p>
    );

return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* BOTÓN VOLVER */}
    <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:text-gray-800 transition"
    >
        ← Volver
    </button>

      {/* CARD PRINCIPAL */}
    <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">

        {/* NOMBRE */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {producto.nombre}
        </h1>

        {/* PRECIO */}
        <p className="text-xl text-blue-600 font-semibold mb-6">
            ${producto.precio}
        </p>

        {/* CATEGORÍAS */}
        <div className="mb-6">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Categorías
        </h2>

        <div className="flex flex-wrap gap-2">
            {producto.categorias?.map((c: any) => (
            <span
                key={c.id}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium"
            >
                {c.nombre}
            </span>
            ))}
        </div>
        </div>

        {/* INGREDIENTES */}
        <div>
        <h2 className="text-sm uppercase tracking-wide text-gray-500 mb-2">
            Ingredientes
        </h2>

        <div className="flex flex-wrap gap-2">
            {producto.ingredientes?.map((i: any) => (
            <span
                key={i.id}
                className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
            >
                {i.nombre}
            </span>
            ))}
        </div>
        </div>

    </div>
    </div>
);
}