from django import forms
from apps.detalleUsers.models import detalleUsers
class baseForm(forms.ModelForm):
    class Meta:
        model = detalleUsers
        fields= [
            'Nombre',
        ]
        labels={
            'Nombre':'Nombre de la base de datos',
        }
        widgets={
            'Nombre':forms.TextInput(attrs={'class':'form-control'}),
        }
