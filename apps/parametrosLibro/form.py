from django import forms
from apps.parametrosLibro.models import parametroslibro
class parametrosLibroForm(forms.ModelForm):
    class Meta:
        model = parametroslibro
        fields= [
            'descripcionp',
            'valorp',
            'estadop',
            'tipop',
        ]
        labels={
            'descripcionp':'Descripción',
            'valorp':'Valor',
            'estadop':'Estado de Parámetro',
            'tipop':'Tipo de Parámetro',

        }
        widgets={
            'descripcionp':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'valop':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estadop':forms.Select(attrs={'class':'form-control','required':'required'}),
            'tipop':forms.Select(attrs={'class':'form-control','required':'required'}),
        }
class parametrosLibroFormDisabled(forms.ModelForm):
    class Meta:
        model = parametroslibro
        fields= [
            'descripcionp',
            'valorp',
            'estadop',
            'tipop',
        ]
        labels={
            'descripcionp':'Descripción',
            'valorp':'Valor',
            'estadop':'Estado de Parámetro',
            'tipop':'Tipo de Parámetro',

        }
        widgets={
            'descripcionp':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
            'valop':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estadop':forms.Select(attrs={'class':'form-control','required':'required'}),
            'tipop':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
        }