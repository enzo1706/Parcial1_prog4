import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

type CategoriaUpdate = {
    id: number;
    nombre: string;
    categoria_padre_id?: number | null;
};

export const useUpdateCategoria = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: ({ id, nombre, categoria_padre_id }: CategoriaUpdate) =>
        api.put(`/categorias/${id}`, { nombre, categoria_padre_id }),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });
        toast.success("Categoría actualizada");
    },

    onError: () => {
        toast.error("Error al actualizar categoría");
    },
});
};