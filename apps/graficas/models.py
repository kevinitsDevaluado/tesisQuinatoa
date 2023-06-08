from django.db import models
from apps.Investigador.models import Investigador
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
# Create your models here.
class similitud_autores (models.Model):
    coordenadax=models.IntegerField()
    coordenaday=models.IntegerField()
    area = models.ForeignKey(sub_lin_investigacion, on_delete=models.CASCADE, blank=True, null=True)
    investigator = models.ForeignKey(Investigador, on_delete=models.CASCADE, blank=True, null=True)
    
    def __str__(self):
        return '{}'.format(self.investigator.user.first_name,self.investigator.user.last_name)

