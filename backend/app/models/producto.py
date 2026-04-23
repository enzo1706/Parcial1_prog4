from typing import List, Optional, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship

from .producto_categoria import ProductoCategoria
from .producto_ingrediente import ProductoIngrediente

if TYPE_CHECKING:
    from .categoria import Categoria
    from .ingrediente import Ingrediente

class Producto(SQLModel, table=True):
    __tablename__ = "producto"

    id: Optional[int] = Field(default=None, primary_key=True)
    nombre: str = Field(nullable=False, index=True)
    precio: float = Field(nullable=False)

    categorias: List["Categoria"] = Relationship(
        back_populates="productos",
        link_model=ProductoCategoria
    )

    ingredientes: List["Ingrediente"] = Relationship(
        back_populates="productos",
        link_model=ProductoIngrediente
    )