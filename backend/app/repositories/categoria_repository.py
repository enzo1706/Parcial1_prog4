from typing import List, Optional
from sqlmodel import Session, select

from app.models import Categoria


class CategoriaRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all(self) -> List[Categoria]:
        return self.session.exec(
            select(Categoria).order_by(Categoria.id.desc())
        ).all()

    def get_by_id(self, categoria_id: int) -> Optional[Categoria]:
        return self.session.get(Categoria, categoria_id)

    def get_subcategorias(self, categoria_padre_id: int) -> List[Categoria]:
        return self.session.exec(
            select(Categoria).where(Categoria.categoria_padre_id == categoria_padre_id)
        ).all()

    def get_categorias_raices(self) -> List[Categoria]:
        """Obtiene categorías sin padre (raíz)"""
        return self.session.exec(
            select(Categoria).where(Categoria.categoria_padre_id == None)
        ).all()

    def create(self, categoria: Categoria) -> Categoria:
        self.session.add(categoria)
        self.session.commit()
        self.session.refresh(categoria)
        return categoria

    def update(self, categoria: Categoria) -> Categoria:
        self.session.add(categoria)
        self.session.commit()
        self.session.refresh(categoria)
        return categoria

    def delete(self, categoria: Categoria) -> None:
        self.session.delete(categoria)
        self.session.commit()