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
        parser.add_argument(
            "--delete",
            action="store_true",
        )

    def handle(self, *args, **options):

        if options["delete"]:
            Route.objects.all().delete()
            Stop.objects.all().delete()
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
            stop.save()
            
        

        logging.info(f"Successfully import routes and stops into DB")
