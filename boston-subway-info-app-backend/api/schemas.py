from datetime import datetime
from typing import List

from django.db import models
from pydantic import BaseModel


class FastStop(BaseModel):
    stop_id: str = None
    name: str = None

    class Config:
        orm_mode = True

class FastStops(BaseModel):
    stops: List[FastStop] = []

class FastRoute(BaseModel):
    route_id: str = None
    name: str = None

    class Config:
        orm_mode = True

class FastRoutes(BaseModel):
    routes: List[FastRoute] = []

    
