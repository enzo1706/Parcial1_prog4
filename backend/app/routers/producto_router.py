from typing import List, Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlmodel import Session, select

from app.db.database import get_session
from app.models import Producto
from app.schemas import ProductoCreate, ProductoRead, ProductoUpdate
from app.models import  Categoria, Ingrediente
router = APIRouter(prefix="/productos", tags=["Productos"])


# GET ALL
@router.get("/", response_model=List[ProductoRead])
def get_productos(
    session: Session = Depends(get_session)
):
    productos = session.exec(
        select(Producto).order_by(Producto.id.desc())
    ).all()
    return productos


# GET BY ID
@router.get("/{producto_id}", response_model=ProductoRead)
def get_producto(
    producto_id: Annotated[int, Path(gt=0)],
    session: Session = Depends(get_session)
):
    producto = session.get(Producto, producto_id)
    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return producto


# CREATE
@router.post("/", response_model=ProductoRead, status_code=201)
def create_producto(
    producto: ProductoCreate,
    session: Session = Depends(get_session)
):
    db_producto = Producto.model_validate(producto)

    session.add(db_producto)
    session.commit()
    session.refresh(db_producto)

    return db_producto


# UPDATE
@router.put("/{producto_id}", response_model=Producto)
def update_producto(
    producto_id: int,
    data: ProductoUpdate,
    session=Depends(get_session)
):
    producto = session.get(Producto, producto_id)

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    
    if data.nombre is not None:
        producto.nombre = data.nombre

    if data.precio is not None:
        producto.precio = data.precio

    if data.categoria_ids is not None:
        categorias = session.exec(
            select(Categoria).where(Categoria.id.in_(data.categoria_ids))
        ).all()
        producto.categorias = categorias

    if data.ingrediente_ids is not None:
        ingredientes = session.exec(
            select(Ingrediente).where(Ingrediente.id.in_(data.ingrediente_ids))
        ).all()
        producto.ingredientes = ingredientes

    session.add(producto)
    session.commit()
    session.refresh(producto)

    return producto

# DELETE
@router.delete("/{producto_id}", status_code=204)
def delete_producto(
    producto_id: int,
    session: Session = Depends(get_session)
):
    producto = session.get(Producto, producto_id)

    if not producto:
        raise HTTPException(status_code=404, detail="Producto no encontrado")

    session.delete(producto)
    session.commit()