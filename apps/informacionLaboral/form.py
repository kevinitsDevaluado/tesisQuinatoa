from django import forms
from apps.informacionLaboral.models import informacionLaboral
class infLabForm(forms.ModelForm):
    class Meta:
        model=informacionLaboral
        fields= [
            'tipoContrato',
            'facultad',
            'carrera',
            'ingreso',
            'university',

        ]
        labels={
            'tipoContrato':'Tipo de contrato',
            'facultad':'Facultad',
            'carrera':'Carrera',
            'ingreso':'Fecha de ingreso a la entidad',
            'university':'Universidad',
        }
        widgets={
            'tipoContrato':forms.Select(attrs={'class':'form-control'}),
            'facultad':forms.Select(attrs={'class':'form-control'}),
            'carrera': forms.Select(attrs={'class': 'form-control'}),
            'ingreso': forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'university': forms.Select(attrs={'class': 'form-control'}),
        }