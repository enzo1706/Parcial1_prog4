"""
Service de Producto - Lógica de negocio para Productos.
Utiliza el repositorio para acceder a datos.
"""
from typing import List, Optional
from fastapi import HTTPException

from app.models import Producto, Categoria, Ingrediente
from app.schemas import ProductoCreate, ProductoUpdate
from app.repositories import ProductoRepository
from sqlmodel import Session, select


class ProductoService:
    def __init__(self, repository: ProductoRepository, session: Session):
        self.repository = repository
        self.session = session

    def get_all(self) -> List[Producto]:
        return self.repository.get_all()

    def get_by_id(self, producto_id: int) -> Producto:
        producto = self.repository.get_by_id(producto_id)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return producto

    def create(self, producto_data: ProductoCreate) -> Producto:
        """Crea un nuevo producto con categorías e ingredientes."""
        #Crear el producto sin relaciones primero
        producto = Producto(
            nombre=producto_data.nombre,
            precio=producto_data.precio
        )
        
        #Asignar categorías si vienen
        if producto_data.categoria_ids:
            categorias = self.session.exec(
                select(Categoria).where(Categoria.id.in_(producto_data.categoria_ids))
            ).all()
            producto.categorias = categorias

        #Asignar ingredientes si vienen
        if producto_data.ingrediente_ids:
            ingredientes = self.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto_data.ingrediente_ids))
            ).all()
            producto.ingredientes = ingredientes

        return self.repository.create(producto)

    def update(self, producto_id: int, producto_data: ProductoUpdate) -> Producto:
        """Actualiza un producto existente."""
        producto = self.repository.get_by_id(producto_id)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        #Actualizar campos básicos
        if producto_data.nombre is not None:
            producto.nombre = producto_data.nombre
        if producto_data.precio is not None:
            producto.precio = producto_data.precio

        #Actualizar categorías
        if producto_data.categoria_ids is not None:
            categorias = self.session.exec(
                select(Categoria).where(Categoria.id.in_(producto_data.categoria_ids))
            ).all()
            producto.categorias = categorias

        #Actualizar ingredientes
        if producto_data.ingrediente_ids is not None:
            ingredientes = self.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto_data.ingrediente_ids))
            ).all()
            producto.ingredientes = ingredientes

        return self.repository.update(producto)

    def delete(self, producto_id: int) -> None:
        """Elimina un producto."""
        producto = self.repository.get_by_id(producto_id)
        if not producto:
            raise HTTPException(status_code=404, detail="Producto no encontrado")

        self.repository.delete(producto)