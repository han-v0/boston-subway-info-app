from typing import List

from fastapi import APIRouter, Depends

from api.adapters import retrieve_stops_of_a_route, retrieve_all_routes
from api.models import Route, Stop
from api.schemas import RouteBase, StopBase, Stops
from fastapi_pagination import Page, Params, paginate

router = APIRouter(prefix="/routes", tags=["routes"])

@router.get("/", response_model=Page[RouteBase])
def get_routes(params: Params = Depends()):
    routes = retrieve_all_routes()
    return paginate(routes, params)


@router.get("/{route_id}", response_model=Stops)
def get_stops_of_route(route_id):
    stops = retrieve_stops_of_a_route(route_id)
    return {"stops": stops}