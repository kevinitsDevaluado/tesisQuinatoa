from django.db import models
from django.contrib.auth.models import User
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion

class textmining(models.Model):

    tipo = models.IntegerField(null=True, blank=True)

    texto = models.TextField(blank=True, null=True)

    textoAtributo = models.TextField(blank=True, null=True)

    status = models.BooleanField(blank=True, default=False)

    statusClasificacion = models.BooleanField(blank=True, default=False)

    sublineaClasificacion = models.ForeignKey(sub_lin_investigacion, max_length=150, blank=True, null=True)

    class Meta:
        db_table = 'TextMining'
    #def __str__(self): return '{}'.format(self.Termino)