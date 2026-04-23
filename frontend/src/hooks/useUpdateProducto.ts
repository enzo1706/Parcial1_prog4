import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

type UpdateProductoInput = {
    id: number;
    nombre: string;
    precio: number;
    categoria_ids: number[];
    ingrediente_ids: number[];
};

export const useUpdateProducto = () => {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: ({ id, ...data }: UpdateProductoInput) =>
    api.put(`/productos/${id}`, data),

    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["productos"] });
        toast.success("Producto actualizado");
    },

    onError: () => {
        toast.error("Error al actualizar");
    },
});
};