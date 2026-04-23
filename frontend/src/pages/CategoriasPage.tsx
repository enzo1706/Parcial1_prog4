import { useState } from "react";
import { useCategorias } from "../hooks/useCategorias";
import { useDeleteCategoria } from "../hooks/useDeleteCategoria";
import { useUpdateCategoria } from "../hooks/useUpdateCategoria";
import CreateCategoriaModal from "../components/CreateCategoriaModal";

export default function CategoriasPage() {
const { data, isLoading, isError } = useCategorias();
const deleteCategoria = useDeleteCategoria();
const updateCategoria = useUpdateCategoria();

const [open, setOpen] = useState(false);

const handleEdit = (cat: any) => {
    const nuevo = prompt("Nuevo nombre:", cat.nombre);
    if (!nuevo) return;

    updateCategoria.mutate({ id: cat.id, nombre: nuevo });
};

if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Cargando...</p>;

if (isError)
    return <p className="text-center mt-10 text-red-500">Error al cargar</p>;

return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-6xl mx-auto">

      {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
            Categorías
        </h1>

        <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
            + Crear
        </button>
    </div>

      {/* LISTA */}
    <div className="grid gap-3">
        {data?.map((cat: any) => (
        <div
            key={cat.id}
            className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm"
        >
            <span className="text-gray-800">{cat.nombre}</span>

            <div className="flex gap-2">
            <button
                onClick={() => handleEdit(cat)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition text-sm"
            >
                Editar
            </button>

            <button
                onClick={() => deleteCategoria.mutate(cat.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
            >
                Eliminar
            </button>
            </div>
        </div>
        ))}
    </div>

      {/* MODAL */}
    {open && (
        <CreateCategoriaModal onClose={() => setOpen(false)} />
    )}
    </div>
);
}