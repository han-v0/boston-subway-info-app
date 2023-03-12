from typing import List
from fastapi import HTTPException, Path

from api.models import Route, Stop


def retrieve_all_routes() -> List[Route]:
    routes = list(Route.objects.all())
    return routes


def retrieve_stops_of_a_route(route_id: str = Path(..., description="get stops of a route from db")) -> List[Stop]:
    route = Route.objects.filter(route_id=route_id)
    if not route or not route[0].stops:
        raise HTTPException(status_code=404, detail=f"Error in retrieving stops for {route_id}")
    stops_of_a_route = list(route[0].stops.all())
    return stops_of_a_route
