import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";
import toast from "react-hot-toast";

export function useDeleteProducto() {
const queryClient = useQueryClient();

return useMutation({
    mutationFn: async (id: number) => {
    await api.delete(`/productos/${id}`);
    },

    onSuccess: () => {
    toast.success("Producto eliminado correctamente");
    
    queryClient.invalidateQueries({ queryKey: ["productos"] });
    },

    onError: () => {
    toast.error("Error al eliminar el producto");
    },
});
}