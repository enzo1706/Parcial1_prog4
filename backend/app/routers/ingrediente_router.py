from typing import List, Annotated
from fastapi import APIRouter, Depends, Path
from sqlmodel import Session

from app.db.database import get_session
from app.models import Ingrediente
from app.schemas import IngredienteCreate, IngredienteRead, IngredienteUpdate
from app.services import IngredienteService
from app.repositories import IngredienteRepository

router = APIRouter(prefix="/ingredientes", tags=["Ingredientes"])


def get_ingrediente_service(session: Session = Depends(get_session)) -> IngredienteService:
    repository = IngredienteRepository(session)
    return IngredienteService(repository)


# GET ALL
@router.get("", response_model=List[IngredienteRead])
def get_ingredientes(
    service: IngredienteService = Depends(get_ingrediente_service)
):
    return service.get_all()


# GET BY ID
@router.get("/{ingrediente_id}", response_model=IngredienteRead)
def get_ingrediente(
    ingrediente_id: Annotated[int, Path(gt=0)],
    service: IngredienteService = Depends(get_ingrediente_service)
):
    return service.get_by_id(ingrediente_id)


# CREATE
@router.post("", response_model=IngredienteRead, status_code=201)
def create_ingrediente(
    ingrediente: IngredienteCreate,
    service: IngredienteService = Depends(get_ingrediente_service)
):
    return service.create(ingrediente)


# UPDATE
@router.put("/{ingrediente_id}", response_model=IngredienteRead)
def update_ingrediente(
    ingrediente_id: int,
    ingrediente: IngredienteUpdate,
    service: IngredienteService = Depends(get_ingrediente_service)
):
    return service.update(ingrediente_id, ingrediente)


# DELETE
@router.delete("/{ingrediente_id}", status_code=204)
def delete_ingrediente(
    ingrediente_id: int,
    service: IngredienteService = Depends(get_ingrediente_service)
):
    service.delete(ingrediente_id)