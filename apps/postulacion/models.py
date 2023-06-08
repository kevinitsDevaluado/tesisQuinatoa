from django.db import models
from apps.incentivo.models import incentivo
from apps.Investigador.models import Investigador
class postulacion (models.Model):
	Estado = (
		('2', 'Rechazado'),
        ('1', 'Aceptado'),
        ('0', 'Pendiente'),
        )
	fecha = models.DateField(blank=True, null=True)
	incentivo = models.ForeignKey(incentivo, on_delete=models.CASCADE, blank=True, null=True)
	investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE, blank=True, null=True)
	estado = models.CharField(max_length=150, blank=True, null=True,choices=Estado)
	calificacion = models.CharField(max_length=500, null=True, blank=True)

	def __str__(self):
		return '{}'.format(self.investigador.user.first_name,self.investigador.user.last_name)