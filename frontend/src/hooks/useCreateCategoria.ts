import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

type CategoriaCreate = {
    nombre: string;
    categoria_padre_id?: number | null;
};

export const useCreateCategoria = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (data: CategoriaCreate) => {
    const res = await api.post("/categorias", data);
    return res.data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
});
};