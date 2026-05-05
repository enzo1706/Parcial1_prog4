from typing import Optional
from sqlmodel import SQLModel


class CategoriaBase(SQLModel):
    nombre: str
    categoria_padre_id: Optional[int] = None


class CategoriaCreate(CategoriaBase):
    pass


class CategoriaRead(CategoriaBase):
    id: int


class CategoriaUpdate(SQLModel):
    nombre: Optional[str] = None
    categoria_padre_id: Optional[int] = None