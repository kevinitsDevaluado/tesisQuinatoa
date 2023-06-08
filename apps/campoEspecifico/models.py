from django.db import models
from apps.campoAmplio.models import campoAmplio
# Create your models here.
class campoEspecifico(models.Model):
    amplio = models.ForeignKey(campoAmplio, null=True,blank=True)
    Nombre = models.CharField(max_length=250, null=True, blank=True)
    def __str__(self): return '{}'.format(self.Nombre)
    class Meta:
        ordering = ("Nombre",)