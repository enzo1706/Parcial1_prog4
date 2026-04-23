import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export const useUpdateIngrediente = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: ({ id, nombre }: { id: number; nombre: string }) =>
    api.put(`/ingredientes/${id}`, { nombre }),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
        toast.success("Ingrediente actualizado");
    },

    onError: () => {
        toast.error("Error al actualizar ingrediente");
    },
});
};