# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth.models import User
from django.db import models
from apps.universidad.models import universidad
from apps.autoresArticulos.models import autoresArticulos
from apps.palabraClave.models import palabraClave
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.TextMining.models import textmining
from apps.ciudad.models import ciudad
from apps.pais.models import pais

class ponencia (models.Model):
  CHOICES = (
    ('Sí', 'Sí'),
    ('No', 'No'),
  )
  filial = (
    ('Si', 'Si'),
    ('No', 'No'),
  )
  nombrePonencia = models.CharField(max_length=500, null=True, blank=True)
  lugarPonencia = models.CharField(max_length=500, null=True, blank=True)
  tituloPonencia = models.CharField(max_length=500, null=True, blank=True)
  fechaPonencia = models.DateField(null=True, blank=True)
  anio = models.IntegerField(null=True, blank=True)
  palabrasClave = models.ManyToManyField(palabraClave, blank=True)
  resumen = models.TextField(null=True, blank=True)
  certificado = models.FileField(upload_to='certificados/', null=True, blank=True)
  tipo = models.CharField(max_length=100, null=True, blank=True)
  isbn = models.CharField(max_length=300, null=True, blank=True)
  urlPonencia = models.CharField(max_length=500, null=True, blank=True)
  financiamiento = models.CharField(max_length=20, null=True, blank=True,choices=CHOICES)
  financia = models.ForeignKey(universidad, null=True, blank=True)
  informe = models.FileField(upload_to='informes/', null=True, blank=True)
  articuloCientifico = models.ForeignKey(articulos_cientificos, null=True, blank=True)  
  user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
  
  uploaded_at = models.DateTimeField(auto_now_add=True)
  textMining = models.ForeignKey(textmining, null=True, blank=True, on_delete=models.CASCADE)
  statusText = models.BooleanField(blank=True, default=False)
  PMnombre = models.CharField(max_length=500, null=True, blank=True)
  PMtitulo = models.CharField(max_length=500, null=True, blank=True)
  PMresumen = models.TextField(null=True, blank=True)

  editableTrueFalse = models.IntegerField(blank=True, null=True)
  comentarioSecretaria = models.TextField(blank=True, null=True)
  filialUtc = models.CharField(max_length=20, blank=True, null=True, choices=filial)

  pais = models.ForeignKey(pais, blank=True, null=True)
  ciudad = models.ForeignKey(ciudad, blank=True, null=True)


  def __str__(self): return '{}'.format(self.nombrePonencia)
  class Meta:
    ordering = ("fechaPonencia",)

#articuloCientifico = models.ManyToManyField(articulos_cientificos, blank=True)

