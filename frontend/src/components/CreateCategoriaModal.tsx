import { useState } from "react";
import { useCreateCategoria } from "../hooks/useCreateCategoria";

type Props = {
  onClose: () => void;
};

export default function CreateCategoriaModal({ onClose }: Props) {
  const createCategoria = useCreateCategoria();

  const [nombre, setNombre] = useState("");

  const handleSubmit = () => {
    if (!nombre) return;

    createCategoria.mutate({ nombre });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

        <h2 className="text-lg font-semibold mb-4">Crear Categoría</h2>

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancelar</button>

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