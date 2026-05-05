from typing import List, Optional
from sqlmodel import Session, select

from app.models import Producto, Categoria, Ingrediente


class ProductoRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Producto]:
        return self.session.exec(
            select(Producto).order_by(Producto.id.desc())
        ).all()

    def get_by_id(self, producto_id: int) -> Optional[Producto]:
        return self.session.get(Producto, producto_id)

    def create(self, producto: Producto) -> Producto:
        # Si viene con categoría o ingrediente IDs, los asociamos
        if hasattr(producto, '_categoria_ids') and producto._categoria_ids:
            categorias = self.session.exec(
                select(Categoria).where(Categoria.id.in_(producto._categoria_ids))
            ).all()
            producto.categorias = categorias

        if hasattr(producto, '_ingrediente_ids') and producto._ingrediente_ids:
            ingredientes = self.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto._ingrediente_ids))
            ).all()
            producto.ingredientes = ingredientes

        self.session.add(producto)
        self.session.commit()
        self.session.refresh(producto)
        return producto

    def update(self, producto: Producto) -> Producto:
        # Actualizar categorías si viene en el update
        if hasattr(producto, '_categoria_ids') and producto._categoria_ids is not None:
            categorias = self.session.exec(
                select(Categoria).where(Categoria.id.in_(producto._categoria_ids))
            ).all()
            producto.categorias = categorias

        # Actualizar ingredientes si viene en el update
        if hasattr(producto, '_ingrediente_ids') and producto._ingrediente_ids is not None:
            ingredientes = self.session.exec(
                select(Ingrediente).where(Ingrediente.id.in_(producto._ingrediente_ids))
            ).all()
            producto.ingredientes = ingredientes

        self.session.add(producto)
        self.session.commit()
        self.session.refresh(producto)
        return producto

    def delete(self, producto: Producto) -> None:
        self.session.delete(producto)
        self.session.commit()