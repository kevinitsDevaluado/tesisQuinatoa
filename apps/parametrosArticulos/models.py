from django.db import models
from django import forms

class parametrosArticulo(models.Model):
    Estado = (
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
    )
    TipoIntReg = (
        ('Internacional', 'Internacional'),
        ('Regional', 'Regional'),
    )
    descripcion = models.CharField(max_length=100, null=True, blank=True)
    valor = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=30, blank=True, null=True, choices=Estado)
    tipoIntReg = models.CharField(max_length=50, null=True, blank=True, choices=TipoIntReg)

    def __str__(self):
        return '{}'.format(self.descripcion)