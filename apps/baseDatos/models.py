from django.db import models
from django.contrib.auth.models import User
from apps.tipoBaseDatos.models import tipoBaseDatos


# Create your models here.
class baseDatos(models.Model):
    tipoBaseDatos = models.ForeignKey(tipoBaseDatos, null=True,blank=True)
    BaseDatos=models.CharField(max_length=500, null=True, blank=True)
    Url = models.URLField(null=True, blank=True)
    validar = models.CharField(max_length=200, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    estado = models.IntegerField(blank=True, null=True)
    def __str__(self): return '{}'.format(self.BaseDatos)
    class Meta:
        ordering = ("BaseDatos",)