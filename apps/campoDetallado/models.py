from django.db import models
from apps.campoEspecifico.models import campoEspecifico
# Create your models here.
class campoDetallado(models.Model):
    especifico = models.ForeignKey(campoEspecifico, null=True, blank=True)
    Nombre = models.CharField(max_length=250, null=True, blank=True)
    def __str__(self): return '{}'.format(self.Nombre)
    class Meta:
        ordering = ("Nombre",)
