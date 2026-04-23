import type { Categoria } from "./categoria";

export interface Ingrediente {
    id: number;
    nombre: string;
}

export interface Producto {
    id: number;
    nombre: string;
    precio: number;
    categorias: Categoria[];
    ingredientes: Ingrediente[];
}