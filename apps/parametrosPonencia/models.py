from django.db import models

# Create your models here.
class parametrosponencia(models.Model):
    Estado = (
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
    )
    Tipop = (
        ('Internacional', 'Internacional'),
        ('Nacional', 'Nacional'),
    )
    descripcion = models.CharField(max_length=100, null=True, blank=True)
    valor = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=30, blank=True, null=True, choices=Estado)
    Tipop = models.CharField(max_length=50, null=True, blank=True, choices=Tipop)

    def __str__(self):
        return '{}'.format(self.descripcion)