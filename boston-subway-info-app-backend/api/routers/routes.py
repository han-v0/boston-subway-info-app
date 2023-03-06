from typing import List

from fastapi import APIRouter, Depends

from api import adapters
from api.models import Route, Stop
from api.schemas import FastRoute, FastStop, FastRoutes, FastStops

router = APIRouter(prefix="/routes", tags=["routes"])


@router.get("/", response_model=FastRoutes)
def get_routes() -> FastRoutes:
    routes = adapters.retrieve_all_routes()
    return {"routes": list(routes)}


@router.get("/{route_id}", response_model=FastStops)
def get_stops_of_route(route_id):
    stops = adapters.retrieve_stops_of_a_route(route_id)
    return {"stops": list(stops)}