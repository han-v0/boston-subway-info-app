import logging
import requests
import json

from django.core.management.base import BaseCommand

from django.conf import settings
from envs import env

from api.models import Route, Stop


class Command(BaseCommand):
    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)

    def handle(self, *args, **options):
        try:
            routes = requests.get(f"{settings.V3_HOST}/routes").json()
        except Exception as err:
            logging.error(f"Error with getting data of stops from V3 API. Full details: {err}")
            exit
        for data in routes["data"]:
            [route, _] = Route.objects.get_or_create(route_id=data["id"])
            route.name = data["attributes"]["long_name"]
            route.save()
        
        
        try:
            stops = requests.get(f"{settings.V3_HOST}/stops").json()
        except Exception as err:
            logging.error(f"Error with getting data of stops from V3 API. Full details: {err}")
            exit

        for data in stops["data"]:
            [stop, _] = Stop.objects.get_or_create(stop_id=data["id"])
            stop.name = data["attributes"]["name"]
            
            
            try:
                routes_of_stop = requests.get(f"{settings.V3_HOST}/routes?filter[stop]={stop.stop_id}").json()
            except Exception as err:
                logging.error(f"Error with getting data of stops from V3 API. Full details: {err}")
                exit
            if "data" in routes_of_stop and len(routes_of_stop["data"]):
                for item in routes_of_stop["data"]:
                    [route, _] = Route.objects.get_or_create(route_id=item["id"])
                    route.stops.set(list(route.stops.all()) + [stop])
                    route.save()
            stop.save()
        

        logging.info(f"Successfully import routes and stops into DB")
