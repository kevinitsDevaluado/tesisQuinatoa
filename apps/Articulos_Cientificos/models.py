# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
from apps.baseDatos.models import baseDatos
from apps.Revista.models import revista
from apps.palabraClave.models import palabraClave
from apps.ciudad.models import ciudad
from apps.pais.models import pais
from apps.campoDetallado.models import campoDetallado
from apps.campoEspecifico.models import campoEspecifico
from apps.campoAmplio.models import campoAmplio
from apps.pais.models import pais
from apps.universidad.models import universidad
from apps.TextMining.models import textmining

# Create your models here.
class articulos_cientificos(models.Model):
    Estado = (
        ('Receptado', 'Receptado'),
        ('En revisión', 'En revisión'),
        ('Aceptado', 'Aceptado'),
        ('Publicado', 'Publicado'),
    )
    Tipo = (
        ('Científico', 'Científico'),
        ('De revisión', 'De revisión'),
        ('Ensayo', 'Ensayo'),
        ('Reflexión', 'Reflexión'),
    )
    filial = (
        ('Si', 'Si'),
        ('No', 'No'),
    )

    titulo = models.CharField(max_length=500, null=True, blank=True, unique=True)
    estado = models.CharField(max_length=500, blank=True, null=True, choices=Estado)
    iSSN = models.CharField(max_length=60, blank=True, null=True)
    url = models.CharField(max_length=500, blank=True, null=True)
    doi = models.CharField(max_length=500, blank=True, null=True)
    fechaPublicacion = models.DateField(blank=True, null=True)
    pais = models.ForeignKey(pais, blank=True, null=True)
    ciudad = models.ForeignKey(ciudad, blank=True, null=True)
    baseDatos = models.ManyToManyField(baseDatos, blank=True)
    revista = models.ForeignKey(revista, blank=True)
    volumen = models.CharField(max_length=150, blank=True, null=True)
    numero = models.CharField(max_length=150, blank=True, null=True)
    lineaInves = models.ForeignKey(linea_investigacion, max_length=150, blank=True, null=True)
    SubLinea = models.ForeignKey(sub_lin_investigacion, max_length=150, blank=True, null=True)
    resumen = models.TextField(blank=True, null=True)
    palabraClave = models.ManyToManyField(palabraClave, blank=True)
    documento = models.FileField(upload_to='articulo/', blank=True, null=True)
    tipoArticulo = models.CharField(max_length=500, blank=True, null=True, choices=Tipo)
    aprobado = models.CharField(max_length=500, blank=True, null=True)
    comiteEditorial = models.CharField(max_length=500, blank=True, null=True)
    estPub = models.BooleanField(blank=True)
    desEstado = models.TextField(null=True, blank=True)
    idioma = models.IntegerField(null=True, blank=True)

    detallado = models.ForeignKey(campoDetallado, null=True, blank=True)
    especifico = models.ForeignKey(campoEspecifico, null=True, blank=True)
    amplio = models.ForeignKey(campoAmplio, null=True,blank=True)
    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    university = models.ForeignKey(universidad, null=True, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    textMining = models.ForeignKey(textmining, null=True, blank=True, on_delete=models.CASCADE)
    statusText = models.BooleanField(blank=True, default=False)
    AMtitulo = models.CharField(max_length=500, null=True, blank=True)
    AMresumen = models.TextField(null=True, blank=True)

    tituloSearch = models.CharField(max_length=500, null=True, blank=True)
    
    editableTrueFalse = models.IntegerField(blank=True, null=True)
    comentarioSecretaria = models.TextField(blank=True, null=True)
    filialUtc = models.CharField(max_length=20, blank=True, null=True, choices=filial)

    #timezone.now()
    def __str__(self):
        return '{}'.format(self.titulo)
    class Meta:
        permissions = (
            ("ver_articulo", "ver articulo"),
        )
        ordering = ("fechaPublicacion",)