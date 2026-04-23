from typing import List, Annotated
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlmodel import Session, select

from app.db.database import get_session
from app.models import Ingrediente
from app.schemas import IngredienteCreate, IngredienteRead, IngredienteUpdate

router = APIRouter(prefix="/ingredientes", tags=["Ingredientes"])


# GET ALL (SIN LIMIT)
@router.get("/", response_model=List[IngredienteRead])
def get_ingredientes(
    session: Session = Depends(get_session)
):
    ingredientes = session.exec(
        select(Ingrediente).order_by(Ingrediente.id.desc())
    ).all()
    return ingredientes


# GET BY ID
@router.get("/{ingrediente_id}", response_model=IngredienteRead)
def get_ingrediente(
    ingrediente_id: Annotated[int, Path(gt=0)],
    session: Session = Depends(get_session)
):
    ingrediente = session.get(Ingrediente, ingrediente_id)
    if not ingrediente:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return ingrediente


# CREATE
@router.post("/", response_model=IngredienteRead, status_code=201)
def create_ingrediente(
    ingrediente: IngredienteCreate,
    session: Session = Depends(get_session)
):
    db_ingrediente = Ingrediente.model_validate(ingrediente)

    session.add(db_ingrediente)
    session.commit()
    session.refresh(db_ingrediente)

    return db_ingrediente


# UPDATE
@router.put("/{ingrediente_id}", response_model=IngredienteRead)
def update_ingrediente(
    ingrediente_id: int,
    ingrediente: IngredienteUpdate,
    session: Session = Depends(get_session)
):
    db_ingrediente = session.get(Ingrediente, ingrediente_id)

    if not db_ingrediente:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

    ingrediente_data = ingrediente.model_dump(exclude_unset=True)

    for key, value in ingrediente_data.items():
        setattr(db_ingrediente, key, value)

    session.add(db_ingrediente)
    session.commit()
    session.refresh(db_ingrediente)

    return db_ingrediente


# DELETE
@router.delete("/{ingrediente_id}", status_code=204)
def delete_ingrediente(
    ingrediente_id: int,
    session: Session = Depends(get_session)
):
    ingrediente = session.get(Ingrediente, ingrediente_id)

    if not ingrediente:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

    session.delete(ingrediente)
    session.commit()