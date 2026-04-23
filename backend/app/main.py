from fastapi import FastAPI
from app.db.database import create_db_and_tables
from app.routers import categoria_router
from app.routers import producto_router
from app.routers import ingrediente_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="API Parcial Programación 4")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(categoria_router)
app.include_router(producto_router)
app.include_router(ingrediente_router)

@app.get("/")
def root():
    return {"message": "API funcionando "}