import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductos } from "../hooks/useProductos";
import { useDeleteProducto } from "../hooks/useDeleteProducto";
import CreateProductoModal from "../components/CreateProductoModal";
import EditProductoModal from "../components/EditProductoModal";

export default function ProductosPage() {
const { data, isLoading, isError } = useProductos();
const deleteProducto = useDeleteProducto();

const [openCreate, setOpenCreate] = useState(false);
const [productoEdit, setProductoEdit] = useState<any>(null);

if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

if (isError)
    return <p className="text-center mt-10 text-red-500">Error al cargar</p>;

return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">

      {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
            Productos
        </h1>

        <button
            onClick={() => setOpenCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
            + Crear
        </button>
    </div>

      {/* LISTA */}
    <div className="grid gap-4">
        {data?.map((prod: any) => (
        <div
            key={prod.id}
            className="bg-white border rounded-xl p-4 shadow-sm"
        >
            <Link to={`/productos/${prod.id}`}>
            <h2 className="text-lg font-semibold hover:underline">
                {prod.nombre}
            </h2>
            </Link>

            <p className="text-gray-600">${prod.precio}</p>

            {/* CATEGORÍAS */}
            <div className="mt-2">
            <p className="text-sm text-gray-500">Categorías</p>
            <div className="flex flex-wrap gap-2 mt-1">
                {prod.categorias?.map((c: any) => (
                <span
                    key={c.id}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                >
                    {c.nombre}
                </span>
                ))}
            </div>
            </div>

            {/* INGREDIENTES */}
            <div className="mt-2">
            <p className="text-sm text-gray-500">Ingredientes</p>
            <div className="flex flex-wrap gap-2 mt-1">
                {prod.ingredientes?.map((i: any) => (
                <span
                    key={i.id}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs"
                >
                    {i.nombre}
                </span>
                ))}
            </div>
            </div>

            {/* BOTONES */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
                onClick={() => setProductoEdit(prod)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition w-full"
            >
                Editar
            </button>

            <button
                onClick={() => deleteProducto.mutate(prod.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition w-full"
            >
                Eliminar
            </button>
            </div>
        </div>
        ))}
    </div>

      {/* MODALES */}
    {openCreate && (
        <CreateProductoModal onClose={() => setOpenCreate(false)} />
    )}

    {productoEdit && (
        <EditProductoModal
            producto={productoEdit}
            onClose={() => setProductoEdit(null)}
        />
    )}
    </div>
);
}