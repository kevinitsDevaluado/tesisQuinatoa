from django.db import models
from django.contrib.auth.models import User
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
from apps.Investigador.models import Investigador
# Create your models here.
class palabraClave(models.Model):
 Termino=models.CharField(max_length=500)
 user = models.ForeignKey(User, on_delete=models.CASCADE)

 PCMtermino=models.CharField(max_length=500, null=True, blank=True)

 def __str__(self): return '{}'.format(self.Termino)