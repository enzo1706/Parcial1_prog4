import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export function useDeleteIngrediente() {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (id: number) => {
    await api.delete(`/ingredientes/${id}`);
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
});
}