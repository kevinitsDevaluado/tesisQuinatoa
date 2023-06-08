from django import forms
from apps.evento.models import evento
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
            'nombre':forms.TextInput(attrs={'class':'form-control','required': True}),
            'fechaInicio':forms.TextInput(attrs={'class': 'form-control datepicker','type': 'date', 'required': True}),
            'fechaFinal':forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'numeroPublicaciones':forms.TextInput(attrs={'class': 'form-control', 'required': True}),
            'estado':forms.Select(attrs={'class': 'form-control', 'required': True}),
        }