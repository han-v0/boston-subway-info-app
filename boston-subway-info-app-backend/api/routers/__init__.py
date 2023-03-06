from fastapi import FastAPI

from .routes import router as routers_router

__all__ = ("register_routers",)


def register_routers(app: FastAPI):
    app.include_router(routers_router)
 
