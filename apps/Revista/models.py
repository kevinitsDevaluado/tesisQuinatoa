from django.db import models
from django.contrib.auth.models import User
from apps.baseDatos.models import baseDatos

# Create your models here.
class revista(models.Model):
 Val = (
  ('Ingresada', 'Ingresada'),
  ('A revisar', 'A revisar'),
  ('Corregida', 'Corregida'),
  ('validada', 'validada'),
 )
 Cuartil=(
  ('Q1', 'Q1'),
  ('Q2', 'Q2'),
  ('Q3', 'Q3'),
  ('Q4', 'Q4'),
 )

 Nombre = models.CharField(max_length=500,unique=True)
 ISSN=models.CharField(max_length=250,null=True,blank=True)
 base=models.ManyToManyField(baseDatos, blank=True)
 Cuartil_Pertenece=models.CharField(max_length=500,null=True,blank=True)
 Factor_Impacto=models.CharField(max_length=500,null=True,blank=True)
 Url=models.URLField(null=True,blank=True)
 validar  = models.CharField(max_length=500, blank=True,null=True, choices=Val)
 user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
 Observacion=models.CharField(max_length=250,null=True,blank=True)
 estado = models.IntegerField(blank=True, null=True)
 cuartil_revista = models.CharField(max_length=50,null=True, blank=True, choices=Cuartil)
 def __str__(self): return '{}'.format(self.Nombre)
 class Meta:
  permissions = (
   ("ver_Revista", "ver Revista"),
  )
  ordering = ("Nombre",)
