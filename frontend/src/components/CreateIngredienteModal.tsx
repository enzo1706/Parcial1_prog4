import { useState } from "react";
import { useCreateIngrediente } from "../hooks/useCreateIngrediente";

type Props = {
    onClose: () => void;
};

export default function CreateIngredienteModal({ onClose }: Props) {
const [nombre, setNombre] = useState("");
const createIngrediente = useCreateIngrediente();

const handleSubmit = () => {
    if (!nombre) return;

    createIngrediente.mutate(
        { nombre },
        {
        onSuccess: () => {
            setNombre("");
            onClose();
        },
    }
    );
};

return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">

        <h2 className="text-lg font-semibold mb-4">
            Nuevo Ingrediente
        </h2>

        <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
        />

        <div className="flex justify-end gap-2">
        <button onClick={onClose} className="text-gray-500">
            Cancelar
        </button>

        <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-3 py-1 rounded"
        >
            Crear
        </button>
        </div>
    </div>
    </div>
);
}