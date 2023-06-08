from django.db import models

# Create your models here.
from apps.Investigador.models import Investigador
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Libro.models import libro
from apps.Ponencia.models import ponencia
from apps.carrera.models import carrera


# Create your models here.
class SolicitudColaboracion(models.Model):
    idEmisor = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE, related_name="Emisor")
    idReceptor = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,related_name="Destinatario")
    estado=models.BooleanField()


class Grupos(models.Model):
    nombre = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='foto/', null=True, blank=True)
    categoria = models.CharField(max_length=50)


class MiembroGrupo(models.Model):
    investigador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE)
    grupos = models.ForeignKey(Grupos, null=False, blank=False, on_delete=models.CASCADE)


class AdminGrupo(models.Model):
    investigador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE)
    grupos = models.ForeignKey(Grupos, null=False, blank=False, on_delete=models.CASCADE)


class ProyectosMacro(models.Model):
    nombre =models.CharField(max_length=255)
    tipo=models.CharField(max_length=15)
    carrera = models.ForeignKey(carrera, null=False, blank=False, on_delete=models.CASCADE)

class Publicacion(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    tema = models.CharField(max_length=255)
    tipo = models.CharField(max_length=30)
    articulo = models.ForeignKey(articulos_cientificos, null=True, blank=False, on_delete=models.CASCADE)
    libro = models.ForeignKey(libro, null=True, blank=False, on_delete=models.CASCADE)
    ponencia = models.ForeignKey(ponencia, null=True, blank=False, on_delete=models.CASCADE)
    investigador = models.ForeignKey(Investigador, null=True, blank=False, on_delete=models.CASCADE)
    proyectosMacro=models.ForeignKey(ProyectosMacro, null=True, blank=False, on_delete=models.CASCADE)


class recomendacionArticulo(models.Model):
    idRecomendador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,
                                       related_name="recomendador")
    idRecomendado = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,
                                      related_name="Recomendado")
    publicacion = models.ForeignKey(Publicacion, null=False, blank=False, on_delete=models.CASCADE)


class Colaboradores(models.Model):
    idInvestigador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,
                                       related_name="Investigador")
    idColaborador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,
                                      related_name="Colaborador")


class Estadisticas(models.Model):
    nLecturas = models.IntegerField()
    nCitas = models.IntegerField()
    nDescargas = models.IntegerField()
    publicacion = models.ForeignKey(Publicacion, null=False, blank=False, on_delete=models.CASCADE)


class Mensaje(models.Model):
    fecha = models.DateField()
    hora = models.TimeField()
    leido = models.BooleanField()
    mensaje = models.CharField(max_length=255)
    idEmisor = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE, related_name="Origen")
    idReceptor = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,
                                   related_name="Destino")


class GlobalKeywords(models.Model):
    termino = models.CharField(max_length=80)
    carrera = models.ForeignKey(carrera, null=False, blank=False, on_delete=models.CASCADE)

class GlobalKeywordsInvestigador(models.Model):
    globalKeywors = models.ForeignKey(GlobalKeywords, null=False, blank=False, on_delete=models.CASCADE)
    estado= models.BooleanField()
    investigador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE)

class Likes(models.Model):
    like=models.BooleanField()
    publicacion = models.ForeignKey(Publicacion, null=False, blank=False, on_delete=models.CASCADE)
    investigador = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE)

class Notificacion(models.Model):
    origen = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE, related_name="OrigenNotificacion")
    destino = models.ForeignKey(Investigador, null=False, blank=False, on_delete=models.CASCADE,related_name="DestinoNotificacion")
    estado=models.BooleanField()
    publicacion = models.ForeignKey(Publicacion, null=False, blank=False, on_delete=models.CASCADE)
