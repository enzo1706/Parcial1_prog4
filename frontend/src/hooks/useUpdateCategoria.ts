import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export const useUpdateCategoria = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: ({ id, nombre }: { id: number; nombre: string }) =>
        api.put(`/categorias/${id}`, { nombre }),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });
        toast.success("Categoría actualizada");
    },

    onError: () => {
        toast.error("Error al actualizar categoría");
    },
});
};