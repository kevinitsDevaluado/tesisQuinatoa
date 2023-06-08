from django import forms
from apps.tipoBaseDatos.models import tipoBaseDatos
class baseForm(forms.ModelForm):
    class Meta:
        model = tipoBaseDatos
        fields= [
            'Nombre',
        ]
        labels={
            'Nombre':'Nombre de la base de datos',
        }
        widgets={
            'Nombre':forms.TextInput(attrs={'class':'form-control'}),
        }
