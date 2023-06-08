from django.db import models
from django.contrib.auth.models import User

from apps.Investigador.models import Investigador
from apps.Libro.models import libro
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Ponencia.models import ponencia


class certificacion (models.Model):
	OpValidacion = (
		('Aprobado','Aprobado'),
		('Denegado','Denegado'),
	)
	asunto = models.CharField(max_length=350, null=True, blank=True, default='Necesito un certificado')
	fecha_envio = models.DateField(auto_now_add=True, null=True, blank=True)
	hora_envio = models.CharField(max_length=50, null=True,blank=True, default='')
	libros_varios = models.ManyToManyField(libro, null=True, blank=True)
	articulos_varios = models.ManyToManyField(articulos_cientificos, null=True, blank=True)
	ponencias_varios = models.ManyToManyField(ponencia, null=True, blank=True)
	estado = models.CharField(max_length=50, null=True,blank=True, default='Enviado')
	nota = models.CharField(max_length=350,null=True,blank=True, default='En espera')
	validar = models.CharField(max_length=50, null=True,blank=True, choices=OpValidacion, default='')
	notificacion = models.CharField(max_length=50, null=True,blank=True, default='0')
	fecha_actualizacion = models.DateField(auto_now=True, null=True, blank=True)
	hora_actualizacion = models.CharField(max_length=50, null=True,blank=True, default='')
	user = models.ForeignKey(User, null=True ,blank=True, on_delete=models.CASCADE)
	investigador = models.ForeignKey(Investigador, on_delete=models.CASCADE)
	def __str__(self):
		return '{}'.format(self.asunto)
	class Meta:
		permissions = (
			("ver_certificado", "ver certificado"),
		)