"""
Unit of Work - Gestiona las transacciones de base de datos y proporciona acceso a los repositorios.
Patrón UoW: Agrupa operaciones que deben ejecutarse atómicamente.
"""
from typing import Optional
from sqlmodel import Session

from app.repositories import (
    CategoriaRepository,
    ProductoRepository,
    IngredienteRepository,
)


class UnitOfWork:
    """Unit of Work que gestiona una sesión de base de datos y provee repositorios."""

    def __init__(self, session: Session):
        self.session = session
        self.categorias: Optional[CategoriaRepository] = None
        self.productos: Optional[ProductoRepository] = None
        self.ingredientes: Optional[IngredienteRepository] = None

    def __enter__(self):
        self.categorias = CategoriaRepository(self.session)
        self.productos = ProductoRepository(self.session)
        self.ingredientes = IngredienteRepository(self.session)
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            # Rollback en caso de error
            self.session.rollback()
        else:
            # Commit si no hay errores
            self.session.commit()

    def commit(self):
        """Confirma la transacción actual."""
        self.session.commit()

    def rollback(self):
        """Revierte la transacción actual."""
        self.session.rollback()