from django import forms
from apps.campoEspecifico.models import campoEspecifico
class baseForm(forms.ModelForm):
    class Meta:
        model = campoEspecifico
        fields= [
            'Nombre',
        ]
        labels={
            'Nombre':'Nombre de la base de datos',
        }
        widgets={
            'Nombre':forms.TextInput(attrs={'class':'form-control'}),
        }
