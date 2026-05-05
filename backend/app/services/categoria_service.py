"""
Service de Categoria - Lógica de negocio para Categorías.
Utiliza el repositorio para acceder a datos.
"""
from typing import List, Optional
from fastapi import HTTPException

from app.models import Categoria
from app.schemas import CategoriaCreate, CategoriaUpdate
from app.repositories import CategoriaRepository


class CategoriaService:
    def __init__(self, repository: CategoriaRepository):
        self.repository = repository

    def get_all(self) -> List[Categoria]:
        return self.repository.get_all()

    def get_by_id(self, categoria_id: int) -> Categoria:
        categoria = self.repository.get_by_id(categoria_id)
        if not categoria:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")
        return categoria

    def get_subcategorias(self, categoria_padre_id: int) -> List[Categoria]:
        """Obtiene las subcategorías de una categoría padre."""
        return self.repository.get_subcategorias(categoria_padre_id)

    def get_categorias_raices(self) -> List[Categoria]:
        """Obtiene categorías raíz (sin padre)."""
        return self.repository.get_categorias_raices()

    def create(self, categoria_data: CategoriaCreate) -> Categoria:
        """Crea una nueva categoría."""
        categoria = Categoria.model_validate(categoria_data)
        return self.repository.create(categoria)

    def update(self, categoria_id: int, categoria_data: CategoriaUpdate) -> Categoria:
        """Actualiza una categoría existente."""
        categoria = self.repository.get_by_id(categoria_id)
        if not categoria:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")

        # Actualizar campos
        update_data = categoria_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(categoria, key, value)

        return self.repository.update(categoria)

    def delete(self, categoria_id: int) -> None:
        """Elimina una categoría."""
        categoria = self.repository.get_by_id(categoria_id)
        if not categoria:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")

        # Si tiene subcategorías, no permitir eliminar (o cascade delete)
        subcategorias = self.repository.get_subcategorias(categoria_id)
        if subcategorias:
            raise HTTPException(
                status_code=400,
                detail="No se puede eliminar categoría con subcategorías"
            )

        self.repository.delete(categoria)