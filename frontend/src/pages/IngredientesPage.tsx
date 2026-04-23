import { useState } from "react";
import { useIngredientes } from "../hooks/useIngredientes";
import { useDeleteIngrediente } from "../hooks/useDeleteIngrediente";
import { useUpdateIngrediente } from "../hooks/useUpdateIngrediente";
import CreateIngredienteModal from "../components/CreateIngredienteModal";

export default function IngredientesPage() {
const { data = [], isLoading, isError } = useIngredientes();
const deleteIngrediente = useDeleteIngrediente();
const updateIngrediente = useUpdateIngrediente();

const [open, setOpen] = useState(false);

const handleEdit = (ing: any) => {
    const nuevo = prompt("Nuevo nombre", ing.nombre);
    if (!nuevo) return;

    updateIngrediente.mutate({
        id: ing.id,
        nombre: nuevo,
    });
};

if (isLoading) return <p className="p-4">Cargando...</p>;
if (isError) return <p className="p-4 text-red-500">Error al cargar</p>;

return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-5xl mx-auto">

      {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
            Ingredientes
        </h1>

        <button
            onClick={() => setOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
        >
            + Crear
        </button>
    </div>

      {/* LISTA */}
    <div className="space-y-3">
        {data.length === 0 ? (
        <p className="text-gray-500">No hay ingredientes</p>
        ) : (
        data.map((ing: any) => (
            <div
                key={ing.id}
                className="bg-white border p-3 rounded-lg flex justify-between items-center shadow-sm"
            >
            <span className="text-gray-700">{ing.nombre}</span>

            <div className="flex gap-2">
                <button
                    onClick={() => handleEdit(ing)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                    Editar
                </button>

                <button
                    onClick={() => deleteIngrediente.mutate(ing.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Eliminar
                </button>
            </div>
            </div>
        ))
        )}
    </div>

      {/* MODAL */}
    {open && <CreateIngredienteModal onClose={() => setOpen(false)} />}
    </div>
);
}