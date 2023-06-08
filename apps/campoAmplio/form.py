from django import forms
from apps.campoAmplio.models import campoAmplio
class baseForm(forms.ModelForm):
    class Meta:
        model = campoAmplio
        fields= [
            'Nombre',
        ]
        labels={
            'Nombre':'Nombre',
        }
        widgets={
            'Nombre':forms.TextInput(attrs={'class':'form-control'}),
        }
