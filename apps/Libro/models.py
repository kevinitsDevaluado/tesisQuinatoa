from django.db import models
from apps.autoresArticulos.models import autoresArticulos
from apps.palabraClave.models import palabraClave
from apps.baseDatos.models import baseDatos
from apps.campoDetallado.models import campoDetallado
from django.contrib.auth.models import User
from apps.TextMining.models import textmining

class libro(models.Model):
    TIPO =(
        ('capitulo', 'Capitulo de libro'),
        ('libro', 'Libro completo'),
    )
    
    TipoEditorial = (
        ('Editorial Internacional', 'Editorial Internacional'),
        ('Universidad Internacional', 'Universidad Internacional'),
        ('Universidad Técnica de Cotopaxi', 'Universidad Técnica de Cotopaxi'),
        ('Universidad Nacional', 'Universidad Nacional'),
    )

    estado = (
        ('En redacción', 'En redacción'),
        ('Entregado', 'Entregado'),
        ('Revisión por pares', 'Revisión por pares'),
        ('Publicado', 'Publicado'),
    )
    filial = (
        ('Si', 'Si'),
        ('No', 'No'),
    )

    Titulo=models.CharField(max_length=500, null=False, blank=False, error_messages={'required': 'Por favor, ingrese un titulo'})
    ISBN = models.CharField(max_length=500, null=True, blank=True)
    Anio = models.CharField(max_length=20, null=True, blank=True)
    fechaPublicacion = models.DateField(blank=True, null=True)
    Editorial = models.CharField(max_length=500, null=True, blank=True)
    Resumen=models.TextField(null=True)
    PalabrasClave = models.ManyToManyField(palabraClave, blank=True)
    Documento = models.FileField(upload_to='libro/', null=True, blank=True)
    BaseDatos = models.ManyToManyField(baseDatos, blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    Url = models.CharField(max_length=500, null=True, blank=True)
    Doi = models.Doi = models.CharField(max_length=500, null=True, blank=True)
    UbicacionFisica = models.CharField(max_length=500, null=True, blank=True)
    estado = models.CharField(max_length=200, null=True, blank=True, choices=estado)
    detallado = models.ForeignKey(campoDetallado, null=True,blank=True)
    capitulo = models.CharField(max_length=200, null=True, blank=True)
    tipo = models.CharField(max_length=200, null=True, blank=True, choices=TIPO)

    user = models.ForeignKey(User, blank=True, null=True, on_delete=models.CASCADE)
    textMining = models.ForeignKey(textmining, null=True, blank=True, on_delete=models.CASCADE)
    statusText = models.BooleanField(blank=True, default=False)
    LMtitulo = models.CharField(max_length=500, null=True, blank=True)
    LMresumen = models.TextField(null=True, blank=True)

    editableTrueFalse = models.IntegerField(blank=True, null=True)
    comentarioSecretaria = models.TextField(blank=True, null=True)
    filialUtc = models.CharField(max_length=20, blank=True, null=True, choices=filial)
    #Incentivo
    tipoEditorial = models.CharField(max_length=200, null=True, blank=True, choices=TipoEditorial)
    def __str__(self): return '{}'.format(self.Titulo)

    class Meta:
        permissions = (
            ("ver_libro", "ver libro"),
        )
        ordering = ("fechaPublicacion",)
