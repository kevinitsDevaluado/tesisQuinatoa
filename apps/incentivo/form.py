from django import forms
from apps.evento.models import evento
from apps.incentivo.models import incentivo
class EventoForm(forms.ModelForm):
    class Meta:
        model= evento
        fields= [
            'nombre',
            'fechaInicio',
            'fechaFinal',
            'numeroPublicaciones',
            'estado',
        ]
        labels={
            'nombre':'Nombre evento',
            'fechaInicio':'Fecha de Inicio',
            'fechaFinal':'Fecha de Finalización',
            'numeroPublicaciones':'Meta de Publicaciones',
            'estado':'Estado evento',
        }
        widgets={
            'nombre':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'fechaInicio':forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'fechaFinal':forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'numeroPublicaciones':forms.NumberInput(attrs={'class': 'form-control','minlength': 0, 'maxlength': 100, 'required': True, 'type': 'number',}),
            'estado':forms.Select(attrs={'class': 'form-control', 'required': True}),
        }

class IncentivoForm(forms.ModelForm):
    class Meta:
        model= incentivo
        fields= [
            'nivel',
            'numeroCupos',
            'descripcion',
        ]

        labels= {
            'nivel':'Nivel',
            'numeroCupos':'Número de Cupos',
            'descripcion':'Descripción',
        }
        widgets= {
            'nivel':forms.Select(attrs={'class': 'form-control', 'required': True}),
            'numeroCupos':forms.NumberInput(attrs={'min': 0, 'max': 100,'required': True, 'type': 'number',}),
            'descripcion':forms.TextInput(attrs={'class': 'form-control', 'required': True}),
        }

