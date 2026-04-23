from typing import Optional, List
from sqlmodel import SQLModel
from pydantic import Field

from .categoria import CategoriaRead
from .ingrediente import IngredienteRead


class ProductoBase(SQLModel):
    nombre: str = Field(min_length=2, max_length=50)
    precio: float = Field(gt=0)


class ProductoCreate(ProductoBase):
    categoria_ids: List[int] = []
    ingrediente_ids: List[int] = []


class ProductoRead(ProductoBase):
    id: int
    categorias: List[CategoriaRead] = []
    ingredientes: List[IngredienteRead] = []


class ProductoUpdate(SQLModel):
    nombre: Optional[str] = None
    precio: Optional[float] = None
    categoria_ids: Optional[List[int]] = None
    ingrediente_ids: Optional[List[int]] = None