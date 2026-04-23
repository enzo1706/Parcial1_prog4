import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

interface ProductoPayload {
    nombre: string;
    precio: number;
    categoria_ids: number[];
    ingrediente_ids: number[];
}

export function useCreateProducto() {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (data: ProductoPayload) => {
    const res = await api.post("/productos/", data);
    return res.data;
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
});
}