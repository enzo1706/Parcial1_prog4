from typing import List, Annotated
from fastapi import APIRouter, Depends, Path
from sqlmodel import Session

from app.db.database import get_session
from app.models import Producto
from app.schemas import ProductoCreate, ProductoRead, ProductoUpdate
from app.services import ProductoService
from app.repositories import ProductoRepository

router = APIRouter(prefix="/productos", tags=["Productos"])


def get_producto_service(session: Session = Depends(get_session)) -> ProductoService:
    repository = ProductoRepository(session)
    return ProductoService(repository, session)


# GET ALL
@router.get("", response_model=List[ProductoRead])
def get_productos(
    service: ProductoService = Depends(get_producto_service)
):
    return service.get_all()


# GET BY ID
@router.get("/{producto_id}", response_model=ProductoRead)
def get_producto(
    producto_id: Annotated[int, Path(gt=0)],
    service: ProductoService = Depends(get_producto_service)
):
    return service.get_by_id(producto_id)


# CREATE
@router.post("", response_model=ProductoRead, status_code=201)
def create_producto(
    producto: ProductoCreate,
    service: ProductoService = Depends(get_producto_service)
):
    return service.create(producto)


# UPDATE
@router.put("/{producto_id}", response_model=ProductoRead)
def update_producto(
    producto_id: int,
    producto: ProductoUpdate,
    service: ProductoService = Depends(get_producto_service)
):
    return service.update(producto_id, producto)


# DELETE
@router.delete("/{producto_id}", status_code=204)
def delete_producto(
    producto_id: int,
    service: ProductoService = Depends(get_producto_service)
):
    service.delete(producto_id)