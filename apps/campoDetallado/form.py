from django import forms
from apps.campoDetallado.models import campoDetallado
class baseForm(forms.ModelForm):
    class Meta:
        model = campoDetallado
        fields= [
            'Nombre',
        ]
        labels={
            'Nombre':'Nombre de la base de datos',
        }
        widgets={
            'Nombre':forms.TextInput(attrs={'class':'form-control'}),
        }
