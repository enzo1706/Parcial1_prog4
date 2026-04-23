from typing import Optional
from sqlmodel import SQLModel

class CategoriaBase(SQLModel):
    nombre: str

class CategoriaCreate(CategoriaBase):
    pass

class CategoriaRead(CategoriaBase):
    id: int

class CategoriaUpdate(SQLModel):
    nombre: Optional[str] = None