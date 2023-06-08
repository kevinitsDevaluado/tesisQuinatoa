from django import forms
from apps.postulacion.models import postulacion
class PostulacionForm(forms.ModelForm):
    class Meta:
        model= postulacion
        fields= [
            'fecha',
            'incentivo',
            'investigador',
            'estado',
            'calificacion',
        ]
        labels={
            'fecha':'Fecha',
            'incentivo':'Incentivo',
            'investigador':'Investigador',
            'estado':'Estado',
            'calificacion':'Calificación',
        }
        widgets={
            'fecha':forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'incentivo':forms.Select(attrs={'class': 'form-control', 'required': True}),
            'investigador':forms.Select(attrs={'class': 'form-control', 'required': True}),
            'estado':forms.Select(attrs={'class': 'form-control', 'required': True}),
            'calificacion':forms.TextInput(attrs={'class': 'form-control', 'type': 'text', 'required': True}),
        }

class EstadoForm(forms.ModelForm):
    class Meta:
        model= postulacion
        fields= [
            'estado',
        ]
        labels={
            'estado':'Estado de la postulación',
        }
        widgets={
            'estado':forms.Select(attrs={'class': 'form-control', 'required': True}),
        }