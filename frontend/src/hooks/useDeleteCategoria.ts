import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useDeleteCategoria() {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (id: number) => {
    await api.delete(`/categorias/${id}`);
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
});
}