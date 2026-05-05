export interface Categoria {
    id: number;
    nombre: string;
    categoria_padre_id?: number | null;
    subcategorias?: Categoria[];
}