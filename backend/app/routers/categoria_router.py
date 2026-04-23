from typing import List, Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlmodel import Session, select

from app.db.database import get_session
from app.models import Categoria
from app.schemas import CategoriaCreate, CategoriaRead, CategoriaUpdate

router = APIRouter(prefix="/categorias", tags=["Categorias"])


# GET ALL
@router.get("/", response_model=List[CategoriaRead])
def get_categorias(
    session: Session = Depends(get_session)
):
    categorias = session.exec(
        select(Categoria).order_by(Categoria.id.desc())
    ).all()
    return categorias


# GET BY ID
@router.get("/{categoria_id}", response_model=CategoriaRead)
def get_categoria(
    categoria_id: Annotated[int, Path(gt=0)],
    session: Session = Depends(get_session)
):
    categoria = session.get(Categoria, categoria_id)
    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return categoria


# CREATE
@router.post("/", response_model=CategoriaRead, status_code=201)
def create_categoria(
    categoria: CategoriaCreate,
    session: Session = Depends(get_session)
):
    db_categoria = Categoria.model_validate(categoria)

    session.add(db_categoria)
    session.commit()
    session.refresh(db_categoria)

    return db_categoria


# UPDATE
@router.put("/{categoria_id}", response_model=CategoriaRead)
def update_categoria(
    categoria_id: int,
    categoria: CategoriaUpdate,
    session: Session = Depends(get_session)
):
    db_categoria = session.get(Categoria, categoria_id)

    if not db_categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    categoria_data = categoria.model_dump(exclude_unset=True)

    for key, value in categoria_data.items():
        setattr(db_categoria, key, value)

    session.add(db_categoria)
    session.commit()
    session.refresh(db_categoria)

    return db_categoria


# DELETE
@router.delete("/{categoria_id}", status_code=204)
def delete_categoria(
    categoria_id: int,
    session: Session = Depends(get_session)
):
    categoria = session.get(Categoria, categoria_id)

    if not categoria:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")

    session.delete(categoria)
    session.commit()