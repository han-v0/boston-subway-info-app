import logging
import requests
import json

from django.core.management.base import BaseCommand

from api.models import Route, Stop


logger = logging.getLogger(__name__)


class Command(BaseCommand):
    def add_arguments(self, parser):
        super(Command, self).add_arguments(parser)

    def handle(self, *args, **options):
        
        try:
            routes = json.loads(requests.get(f"{settings.V3_HOST}/routes?api_key={settings.V3_API_KEY}").text)
        except Exception as err:
            logger.error(f"Error with getting data of stops from V3 API. Full details: {err}")
            exit
        for data in routes["data"]:
            [route, _] = Route.objects.get_or_create(route_id=data["id"])
            route.name = data["attributes"]["long_name"]
            route.save()
        
        try:
            stops = json.loads(requests.get(f"{settings.V3_HOST}/stops?api_key={settings.V3_API_KEY}").text)
        except Exception as err:
            logger.error(f"Error with getting data of stops from V3 API. Full details: {err}")
            exit

        for data in stops["data"]:
            [stop, _] = Stop.objects.get_or_create(stop_id=data["id"])
            stop.name = data["attributes"]["name"]
            stop.save()
            
            try:
                test = json.loads(requests.get(f"{settings.V3_HOST}/routes?filter[stop]={stop.stop_id}?api_key={settings.V3_API_KEY}").text)
            except Exception as err:
                logger.error(f"Error with getting data of stops from V3 API. Full details: {err}")
                exit

            if "data" in test and len(test["data"]):
                for item in test["data"]:
                    [route, _] = Route.objects.get_or_create(route_id=item["id"])
                    route.stops.set(list(route.stops.all()) + [stop])
                    route.save()
        

        logger.info(f"Successfully import routes and stops into DB")
