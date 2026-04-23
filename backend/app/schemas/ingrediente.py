from typing import Optional
from sqlmodel import SQLModel

class IngredienteBase(SQLModel):
    nombre: str

class IngredienteCreate(IngredienteBase):
    pass

class IngredienteRead(IngredienteBase):
    id: int

class IngredienteUpdate(SQLModel):
    nombre: Optional[str] = None