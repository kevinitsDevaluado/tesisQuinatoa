from django.db import models

# Create your models here.
class tipoBaseDatos(models.Model):
    Nombre = models.CharField(max_length=300, null=True, blank=True)
    def __str__(self): return '{}'.format(self.Nombre)
