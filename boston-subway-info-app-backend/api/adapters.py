from fastapi import HTTPException, Path

from api.models import Route, Stop
from api.schemas import FastStops, FastRoutes


def retrieve_all_routes():
    routes = Route.objects.all()
    return routes


def retrieve_stops_of_a_route(route_id: str = Path(..., description="get stops of a route from db")):
    route = Route.objects.filter(route_id=route_id)
    print(route[0].stops.all())
    if not route or not route[0].stops:
        raise HTTPException(status_code=404, detail=f"Error in retrieving stops for {route_id}")
    return route[0].stops.all()
