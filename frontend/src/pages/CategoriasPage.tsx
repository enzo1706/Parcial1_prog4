import { useState } from "react";
import { useCategorias, useCategoriasPadre } from "../hooks/useCategorias";
import { useCreateCategoria } from "../hooks/useCreateCategoria";
import { useUpdateCategoria } from "../hooks/useUpdateCategoria";
import { useDeleteCategoria } from "../hooks/useDeleteCategoria";
import EntityModal from "../components/EntityModal";

export default function CategoriasPage() {
    const { data, isLoading, isError } = useCategorias();
    const { data: categoriasPadre } = useCategoriasPadre();
    const [open, setOpen] = useState(false);
    const [entity, setEntity] = useState<any>(null);
    const [mode, setMode] = useState<"create" | "edit">("create");
    
    const createCategoria = useCreateCategoria();
    const updateCategoria = useUpdateCategoria();
    const deleteCategoria = useDeleteCategoria();

    const handleCreate = () => {
        setEntity(null);
        setMode("create");
        setOpen(true);
    };

    const handleEdit = (cat: any) => {
        setEntity(cat);
        setMode("edit");
        setOpen(true);
    };

    const handleSubmit = (data: { id?: number; nombre: string; categoria_padre_id?: number | null }) => {
        if (mode === "create") {
            createCategoria.mutate(data);
        } else {
            updateCategoria.mutate({ id: data.id!, nombre: data.nombre, categoria_padre_id: data.categoria_padre_id });
        }
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
                    onClick={handleCreate}
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
                        <div>
                            <span className="text-gray-800 font-medium">{cat.nombre}</span>
                            {cat.categoria_padre_id && (
                                <span className="text-gray-400 text-sm ml-2">
                                    (Subcategoría)
                                </span>
                            )}
                        </div>
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

            {/* MODAL ÚNICO */}
            <EntityModal
                isOpen={open}
                onClose={() => setOpen(false)}
                entity={entity}
                mode={mode}
                entityType="categoria"
                onSubmit={handleSubmit}
                isLoading={createCategoria.isPending || updateCategoria.isPending}
                categoriasPadre={categoriasPadre}
            />
        </div>
    );
}