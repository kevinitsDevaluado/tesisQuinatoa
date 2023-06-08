from django.db import models
from apps.evento.models import evento
# Create your models here.
class incentivo (models.Model):
	Nivel = (
        ('Alto', 'Alto'),
        ('Medio', 'Medio'),
        ('Bajo', 'Bajo'),
    )
	nivel = models.CharField(max_length=150, blank=True, null=True ,choices=Nivel)
	numeroCupos = models.IntegerField(blank=True, null=True)
	descripcion = models.CharField(max_length=250, blank=True, null=True)
	evento = models.ForeignKey(evento, on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return '{}'.format(self.nivel)