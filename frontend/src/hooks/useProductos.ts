import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Producto } from "../types/producto";

export function useProductos() {
    return useQuery<Producto[]>({
    queryKey: ["productos"],
    queryFn: async () => {
        const res = await api.get("/productos");
        return res.data;
    },
});
}