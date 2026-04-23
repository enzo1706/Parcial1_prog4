import { useState } from "react";
import { useUpdateProducto } from "../hooks/useUpdateProducto";
import { useCategorias } from "../hooks/useCategorias";
import { useIngredientes } from "../hooks/useIngredientes";

type Props = {
    producto: any;
    onClose: () => void;
};

export default function EditProductoModal({ producto, onClose }: Props) {
const updateProducto = useUpdateProducto();
const { data: categorias } = useCategorias();
const { data: ingredientes } = useIngredientes();

const [nombre, setNombre] = useState(producto.nombre);
const [precio, setPrecio] = useState(producto.precio);

const [categoriaIds, setCategoriaIds] = useState<number[]>(
    producto.categorias?.map((c: any) => c.id) || []
);

const [ingredienteIds, setIngredienteIds] = useState<number[]>(
    producto.ingredientes?.map((i: any) => i.id) || []
);

const toggleCategoria = (id: number) => {
    setCategoriaIds((prev) =>
    prev.includes(id)
        ? prev.filter((c) => c !== id)
        : [...prev, id]
    );
};

const toggleIngrediente = (id: number) => {
    setIngredienteIds((prev) =>
    prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
};

const handleSubmit = () => {
    updateProducto.mutate({
        id: producto.id,
        nombre,
        precio: Number(precio),
        categoria_ids: categoriaIds,
        ingrediente_ids: ingredienteIds,
    });

    onClose();
};

return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">

        <h2 className="text-lg font-bold mb-4">Editar Producto</h2>

        <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
        />

        <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
        />

        {/* Categorías */}
        <div className="mb-4">
        <p className="font-semibold mb-2">Categorías</p>
        <div className="flex flex-wrap gap-2">
            {categorias?.map((c) => (
            <button
                key={c.id}
                onClick={() => toggleCategoria(c.id)}
                className={`px-2 py-1 rounded text-sm ${
                categoriaIds.includes(c.id)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
            >
                {c.nombre}
            </button>
            ))}
        </div>
        </div>

        {/* Ingredientes */}
        <div className="mb-4">
        <p className="font-semibold mb-2">Ingredientes</p>
        <div className="flex flex-wrap gap-2">
            {ingredientes?.map((i: any) => (
            <button
                key={i.id}
                onClick={() => toggleIngrediente(i.id)}
                className={`px-2 py-1 rounded text-sm ${
                ingredienteIds.includes(i.id)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200"
                }`}
            >
                {i.nombre}
            </button>
            ))}
        </div>
        </div>

        <div className="flex justify-end gap-2">
        <button onClick={onClose} className="text-gray-500">
            Cancelar
        </button>

        <button
            onClick={handleSubmit}
            className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
            Guardar
        </button>
        </div>

    </div>
    </div>
);
}