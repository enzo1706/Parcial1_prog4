from typing import List, Optional
from sqlmodel import Session, select

from app.models import Ingrediente


class IngredienteRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Ingrediente]:
        return self.session.exec(
            select(Ingrediente).order_by(Ingrediente.id.desc())
        ).all()

    def get_by_id(self, ingrediente_id: int) -> Optional[Ingrediente]:
        return self.session.get(Ingrediente, ingrediente_id)

    def create(self, ingrediente: Ingrediente) -> Ingrediente:
        self.session.add(ingrediente)
        self.session.commit()
        self.session.refresh(ingrediente)
        return ingrediente

    def update(self, ingrediente: Ingrediente) -> Ingrediente:
        self.session.add(ingrediente)
        self.session.commit()
        self.session.refresh(ingrediente)
        return ingrediente

    def delete(self, ingrediente: Ingrediente) -> None:
        self.session.delete(ingrediente)
        self.session.commit()