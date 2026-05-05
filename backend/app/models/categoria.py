from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

from .producto_categoria import ProductoCategoria

if TYPE_CHECKING:
    from .producto import Producto


class Categoria(SQLModel, table=True):
    __tablename__ = "categoria"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(nullable=False, index=True)
    # Relación reflexiva: una categoría puede tener una categoría padre (subcategoría)
    categoria_padre_id: Optional[int] = Field(default=None, foreign_key="categoria.id", nullable=True)

    productos: List["Producto"] = Relationship(
        back_populates="categorias",
        link_model=ProductoCategoria
    )