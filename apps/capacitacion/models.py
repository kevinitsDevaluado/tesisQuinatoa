from django.db import models
from django.contrib.auth.models import User
class capacitacion (models.Model):
    TipoCap = (
        ('Capacitación pedagógica','Capacitación pedagógica'),
        ('Capacitación técnica', 'Capacitación técnica'),
    )
    areaConocimiento=models.CharField(max_length=500, null=True, blank=True)
    horas=models.IntegerField()
    institucion = models.CharField(max_length=500, null=True, blank=True)
    descripcion = models.CharField(max_length=500, null=True, blank=True)
    evidencias = models.FileField(upload_to='capacitaciones/', null=True, blank=True)
    tipoCapacitacion = models.CharField(max_length=500, null=True, blank=True, choices=TipoCap)
    user = models.ForeignKey(User, null=True ,blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return '{}'.format(self.areaConocimiento)

    class Meta:
        permissions = (
            ("ver_capacitacion", "ver capacitación"),
        )