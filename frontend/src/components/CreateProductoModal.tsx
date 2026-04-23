import { useState } from "react";
import { useCreateProducto } from "../hooks/useCreateProducto";

type Props = {
    onClose: () => void;
};

export default function CreateProductoModal({ onClose }: Props) {
const createProducto = useCreateProducto();

const [nombre, setNombre] = useState("");
const [precio, setPrecio] = useState("");

const handleSubmit = () => {
    if (!nombre || !precio) return;

    createProducto.mutate({
        nombre,
        precio: Number(precio),
        categoria_ids: [],
        ingrediente_ids: [],
    });

    onClose();
};

return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

        <h2 className="text-lg font-semibold mb-4">Crear Producto</h2>

        <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
        />

        <input
            placeholder="Precio"
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
        />

        <div className="flex justify-end gap-2">
        <button onClick={onClose} className="text-gray-500">
            Cancelar
        </button>

        <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            Crear
        </button>
        </div>

    </div>
    </div>
);
}