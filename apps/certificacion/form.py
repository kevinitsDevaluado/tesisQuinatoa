from django import forms

from apps.certificacion.models import certificacion
from apps.Investigador.models import Investigador

class CertificacionForm (forms.ModelForm):
    #funcion para mandar a la forma segun su kwargs
    #def __init__(self, request, *args, **kwargs):
    #    super(CertificacionForm, self).__init__(*args, **kwargs)
    #    self.fields['libros_varios'].queryset = libro.objects.filter(user=request.user)
    #    self.fields['articulos_varios'].queryset = articulo.objects.all()
    #    self.fields['ponencias_varios'].queryset = ponencia.objects.all()
    #    self.fields['investigador'].queryset = Investigador.objects.filter(user=request.user)


    class Meta:
        model = certificacion
        fields = [
            'asunto',
            #'fecha_envio',
            'hora_envio',
            'libros_varios',
            'articulos_varios',
            'ponencias_varios',
            'estado',
            'validar',
            'nota',
            'notificacion',
            #'fecha_actualizacion',
            'hora_actualizacion',
            'user',
            'investigador',
        ]
        labels = {
            'asunto':'¿Porqué necesita un certificado?',
            #'fecha_envio': 'Fecha de envio de solicitud',
            'hora_envio': 'Hora de envio',
            'libros_varios': 'Seleccione los docuementos que desea',
            'articulos_varios': 'Seleccione los docuementos que desea',
            'ponencias_varios': 'Seleccione los docuementos que desea',
            'estado': 'Estado de vista',
            'validar': 'Estado del certificado',
            'nota': 'Nota final',
            'notificacion': 'Estado de la notificacion',
            #'fecha_actualizacion': 'Fecha de envio de actualizacion',
            'hora_actualizacion': 'Hora de actualizacion',
            '':'',
            'investigador': 'Verifique su número de cedula',
        }
        widgets = {
            'asunto': forms.Textarea(attrs={'class': 'form-control'}),
            #'fecha_envio': forms.DateInput(attrs={'class': 'form-control'}),
            'hora_envio': forms.TextInput(attrs={'class': 'form-control','id':'idhoraenvio'}),
            'libros_varios': forms.CheckboxSelectMultiple(attrs={'class': 'checlib','id':'checkbox','name':'checklib'}),
            'articulos_varios': forms.CheckboxSelectMultiple(attrs={'class': 'checar'}),
            'ponencias_varios': forms.CheckboxSelectMultiple(attrs={'class': 'checpon','id':'checkbox','name':'checkpon'}),
            'estado': forms.TextInput(attrs={'class':'form-control'}),
            'nota': forms.Textarea(attrs={'class': 'form-control'}),
            'validar': forms.Select(attrs={'class':'form-control','id':'idvalidar'}),
            'notificacion': forms.Textarea(attrs={'class': 'form-control'}),
            #'fecha_actualizacion': forms.DateInput(attrs={'class': 'form-control'}),
            'hora_actualizacion': forms.TextInput(attrs={'class': 'form-control','id':'idhoraactual'}),
            'user': forms.HiddenInput(attrs={'class': 'form-control','id':'user','name':'user'}),
            'investigador': forms.Select(attrs={'class': 'form-control','id':'idinvestigador'}),
        }