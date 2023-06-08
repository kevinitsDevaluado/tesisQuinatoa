from django.db import models
from django import forms
class parametroslibro(models.Model):
    estadop = (
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
    )
    tipop = (
        ('Autor', 'Autor'),
        ('Capitulo', 'Capitulo'),
    )
    descripcionp = models.CharField(max_length=100, null=True, blank=True)
    valorp = models.IntegerField(blank=True, null=True)
    estadop = models.CharField(max_length=30, blank=True, null=True, choices=estadop)
    tipop = models.CharField(max_length=50, null=True, blank=True, choices=tipop)

    def __str__(self):
        return '{}'.format(self.descripcionp)
