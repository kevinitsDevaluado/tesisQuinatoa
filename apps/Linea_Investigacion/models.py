from django.db import models
from apps.carrera.models import carrera
from apps.universidad.models import universidad
# Create your models here.
class linea_investigacion(models.Model):
    Nombre = models.CharField(max_length=500)
    universidad = models.ForeignKey(universidad, null=True, blank=True, on_delete=models.CASCADE)
    def __str__(self): return '{}'.format(self.Nombre)
    class Meta:
        ordering = ("Nombre",)