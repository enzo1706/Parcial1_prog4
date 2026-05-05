import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { Categoria } from "../types/categoria";

export function useCategorias() {
    return useQuery<Categoria[]>({
    queryKey: ["categorias"],
    queryFn: async () => {
        const res = await api.get("/categorias");
        return res.data;
    },
    });
}

export function useCategoriasPadre() {
    return useQuery<Categoria[]>({
    queryKey: ["categorias", "padre"],
    queryFn: async () => {
        const res = await api.get("/categorias/raices");
        return res.data;
    },
    });
}