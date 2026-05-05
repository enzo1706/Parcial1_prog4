import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export const useCreateIngrediente = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (data: { nombre: string }) => {
        const res = await api.post("/ingredientes", data);
        return res.data;
    },

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["ingredientes"] });
    },
});
};