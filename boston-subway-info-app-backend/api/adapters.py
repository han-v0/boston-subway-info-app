from typing import Type, TypeVar

from django.db import models
from fastapi import HTTPException, Path

from api.models import Route, Stop

ModelT = TypeVar("ModelT", bound=models.Model)


async def retrieve_object(model_class: Type[ModelT], id: int) -> ModelT:
    instance = await model_class.objects.filter(pk=id).afirst()
    if not instance:
        raise HTTPException(status_code=404, detail="Object not found.")
    return instance


def retrieve_all_routes():
    routes = Route.objects.all()
    return routes


def retrieve_stops_of_a_route(route_id: str = Path(..., description="get stops of a route from db")):
    route = Route.objects.filter(route_id=route_id)
    if not route or not route[0].stops:
        raise HTTPException(status_code=404, detail=f"Error in retrieving routes for {route_id}")
    return route[0].stops.all()
