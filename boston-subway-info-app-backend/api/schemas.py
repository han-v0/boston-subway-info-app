from typing import List
from django.db import models
from pydantic import BaseModel

class StopBase(BaseModel):
    stop_id: str = None
    name: str = None

    class Config:
        orm_mode = True

class Stops(BaseModel):
    stops: List[StopBase] = []

class RouteBase(BaseModel):
    route_id: str = None
    name: str = None

    class Config:
        orm_mode = True


    
