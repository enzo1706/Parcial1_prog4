"""
Service de Ingrediente - Lógica de negocio para Ingredientes.
Utiliza el repositorio para acceder a datos.
"""
from typing import List
from fastapi import HTTPException

from app.models import Ingrediente
from app.schemas import IngredienteCreate, IngredienteUpdate
from app.repositories import IngredienteRepository


class IngredienteService:
    def __init__(self, repository: IngredienteRepository):
        self.repository = repository

    def get_all(self) -> List[Ingrediente]:
        return self.repository.get_all()

    def get_by_id(self, ingrediente_id: int) -> Ingrediente:
        ingrediente = self.repository.get_by_id(ingrediente_id)
        if not ingrediente:
            raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
        return ingrediente

    def create(self, ingrediente_data: IngredienteCreate) -> Ingrediente:
        """Crea un nuevo ingrediente."""
        ingrediente = Ingrediente.model_validate(ingrediente_data)
        return self.repository.create(ingrediente)

    def update(self, ingrediente_id: int, ingrediente_data: IngredienteUpdate) -> Ingrediente:
        """Actualiza un ingrediente existente."""
        ingrediente = self.repository.get_by_id(ingrediente_id)
        if not ingrediente:
            raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

        update_data = ingrediente_data.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(ingrediente, key, value)

        return self.repository.update(ingrediente)

    def delete(self, ingrediente_id: int) -> None:
        """Elimina un ingrediente."""
        ingrediente = self.repository.get_by_id(ingrediente_id)
        if not ingrediente:
            raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

        self.repository.delete(ingrediente)