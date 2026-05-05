import { useState, useEffect } from "react";
import type { Categoria } from "../types/categoria";
import type { Ingrediente } from "../types/ingrediente";

type EntityModalProps = {
    isOpen: boolean;
    onClose: () => void;
    entity?: {
        id?: number;
        nombre: string;
        categoria_padre_id?: number | null;
        precio?: number;
        categorias?: Categoria[];
        ingredientes?: Ingrediente[];
    } | null;
    mode: "create" | "edit";
    entityType: "categoria" | "producto" | "ingrediente";
    onSubmit: (data: any) => void;
    isLoading?: boolean;
    categoriasPadre?: Categoria[]; // Para seleccionar categoría padre en categorías
    categorias?: Categoria[]; // Para asignar a productos
    ingredientes?: Ingrediente[]; // Para asignar a productos
};

export default function EntityModal({
    isOpen,
    onClose,
    entity,
    mode,
    entityType,
    onSubmit,
    isLoading = false,
    categoriasPadre = [],
    categorias = [],
    ingredientes = [],
}: EntityModalProps) {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [categoriaPadreId, setCategoriaPadreId] = useState<number | null>(null);
    const [categoriaIds, setCategoriaIds] = useState<number[]>([]);
    const [ingredienteIds, setIngredienteIds] = useState<number[]>([]);

    useEffect(() => {
        if (entity) {
            setNombre(entity.nombre || "");
            setPrecio(entity.precio?.toString() || "");
            setCategoriaPadreId(entity.categoria_padre_id ?? null);
            
            // Para productos - extraer IDs de categorías e ingredientes
            if (entity.categorias) {
                setCategoriaIds(entity.categorias.map((c) => c.id));
            }
            if (entity.ingredientes) {
                setIngredienteIds(entity.ingredientes.map((i) => i.id));
            }
        } else {
            setNombre("");
            setPrecio("");
            setCategoriaPadreId(null);
            setCategoriaIds([]);
            setIngredienteIds([]);
        }
    }, [entity, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!nombre) return;

        const data: any = { nombre };

        if (entityType === "producto") {
            data.precio = Number(precio);
            data.categoria_ids = categoriaIds;
            data.ingrediente_ids = ingredienteIds;
        }

        if (entityType === "categoria") {
            data.categoria_padre_id = categoriaPadreId;
        }

        if (mode === "edit" && entity?.id) {
            data.id = entity.id;
        }

        onSubmit(data);
        onClose();
    };

    const title =
        mode === "create"
            ? `Crear ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`
            : `Editar ${entityType.charAt(0).toUpperCase() + entityType.slice(1)}`;

    // Funciones para togglear categorías/ingredientes en productos
    const toggleCategoria = (id: number) => {
        setCategoriaIds((prev) =>
            prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
        );
    };

    const toggleIngrediente = (id: number) => {
        setIngredienteIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">{title}</h2>

                {/* Nombre field - for all entities */}
                <input
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="border p-2 w-full mb-3 rounded"
                />

                {/* Precio field - only for productos */}
                {entityType === "producto" && (
                    <input
                        placeholder="Precio"
                        type="number"
                        step="0.01"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="border p-2 w-full mb-3 rounded"
                    />
                )}

                {/* Categoria Padre - only for categorias */}
                {entityType === "categoria" && (
                    <select
                        value={categoriaPadreId ?? ""}
                        onChange={(e) =>
                            setCategoriaPadreId(
                                e.target.value ? Number(e.target.value) : null
                            )
                        }
                        className="border p-2 w-full mb-4 rounded"
                    >
                        <option value="">Sin categoría padre</option>
                        {categoriasPadre.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                )}

                {/* Categorías del producto - only for productos */}
                {entityType === "producto" && categorias.length > 0 && (
                    <div className="mb-4">
                        <p className="font-semibold mb-2 text-sm">Categorías</p>
                        <div className="flex flex-wrap gap-2">
                            {categorias.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => toggleCategoria(cat.id)}
                                    className={`px-2 py-1 rounded text-xs ${
                                        categoriaIds.includes(cat.id)
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {cat.nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Ingredientes del producto - only for productos */}
                {entityType === "producto" && ingredientes.length > 0 && (
                    <div className="mb-4">
                        <p className="font-semibold mb-2 text-sm">Ingredientes</p>
                        <div className="flex flex-wrap gap-2">
                            {ingredientes.map((ing) => (
                                <button
                                    key={ing.id}
                                    onClick={() => toggleIngrediente(ing.id)}
                                    className={`px-2 py-1 rounded text-xs ${
                                        ingredienteIds.includes(ing.id)
                                            ? "bg-green-600 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {ing.nombre}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="text-gray-500 px-4 py-2"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        {isLoading ? "Guardando..." : "Guardar"}
                    </button>
                </div>
            </div>
        </div>
    );
}