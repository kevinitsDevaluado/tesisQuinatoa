from django.db import models
# Create your models here.
class evento (models.Model):
	Estado = (
        ('1', 'Activo'),
        ('0', 'Inactivo'),
    )
	nombre = models.CharField(max_length=150, blank=True, null=True)
	fechaInicio = models.DateField(blank=True, null=True)
	fechaFinal = models.DateField(blank=True, null=True)
	numeroPublicaciones = models.IntegerField(blank=True, null=True)
	estado = models.CharField(max_length=150, blank=True, null=True,choices=Estado)

	def __str__(self):
		return '{}'.format(self.nombre)
