from django.db import models

# Create your models here.
class campoAmplio(models.Model):
    Nombre = models.CharField(max_length=250, null=True, blank=True)
    def __str__(self): return '{}'.format(self.Nombre)
    class Meta:
        ordering = ("Nombre",)
