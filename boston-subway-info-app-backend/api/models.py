from django.db import models


class Stop(models.Model):
    stop_id = models.CharField(max_length=200, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)

class Route(models.Model):
    route_id = models.CharField(max_length=200, blank=True, null=True)
    name = models.CharField(max_length=200, blank=True, null=True)
    stops = models.ManyToManyField(Stop)