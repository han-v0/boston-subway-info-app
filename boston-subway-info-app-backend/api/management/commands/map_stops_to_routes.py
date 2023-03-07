import logging
import requests
import json

from django.core.management.base import BaseCommand

from django.conf import settings
from envs import env

from api.models import Route, Stop

class Command(BaseCommand):
  
    def handle(self, *args, **options):   

        stops = list(Stop.objects.all())

        for stop in stops:      
            try:
                routes_of_stop = requests.get(f"{settings.V3_HOST}/routes?filter[stop]={stop.stop_id}?api_key={settings.V3_API_KEY}").json()
            except Exception as err:
                logging.error(f"Error with getting data of stops from V3 API. Full details: {err}")
                exit
            if "data" in routes_of_stop and len(routes_of_stop["data"]):
                for item in routes_of_stop["data"]:
                    [route, _] = Route.objects.get(route_id=item["id"])
                    route.stops.set(list(route.stops.all()) + [stop])
                    route.save()
            stop.save()
        

    logging.info(f"Successfully import routes and stops into DB")
