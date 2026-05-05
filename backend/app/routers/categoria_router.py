from typing import List, Annotated
from fastapi import APIRouter, Depends, Path
from sqlmodel import Session

from app.db.database import get_session
from app.models import Categoria
from app.schemas import CategoriaCreate, CategoriaRead, CategoriaUpdate
from app.services import CategoriaService
from app.repositories import CategoriaRepository

router = APIRouter(prefix="/categorias", tags=["Categorias"])


def get_categoria_service(session: Session = Depends(get_session)) -> CategoriaService:
    repository = CategoriaRepository(session)
    return CategoriaService(repository)


# GET ALL
@router.get("", response_model=List[CategoriaRead])
def get_categorias(
    service: CategoriaService = Depends(get_categoria_service)
):
    return service.get_all()


# GET BY ID
@router.get("/{categoria_id}", response_model=CategoriaRead)
def get_categoria(
    categoria_id: Annotated[int, Path(gt=0)],
    service: CategoriaService = Depends(get_categoria_service)
):
    return service.get_by_id(categoria_id)


#.GET SUBOPCIONES (obtener las subcategorías de una categoría)
@router.get("/raices", response_model=List[CategoriaRead])
def get_categorias_raices(
    service: CategoriaService = Depends(get_categoria_service)
):
    return service.get_categorias_raices()


# CREATE
@router.post("", response_model=CategoriaRead, status_code=201)
def create_categoria(
    categoria: CategoriaCreate,
    service: CategoriaService = Depends(get_categoria_service)
):
    return service.create(categoria)


# UPDATE
@router.put("/{categoria_id}", response_model=CategoriaRead)
def update_categoria(
    categoria_id: int,
    categoria: CategoriaUpdate,
    service: CategoriaService = Depends(get_categoria_service)
):
    return service.update(categoria_id, categoria)


# DELETE
@router.delete("/{categoria_id}", status_code=204)
def delete_categoria(
    categoria_id: int,
    service: CategoriaService = Depends(get_categoria_service)
):
    service.delete(categoria_id)