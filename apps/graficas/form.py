from django import forms
from apps.graficas.models import similitud_autores
class SimilitudAuForm(forms.ModelForm):
    class Meta:
        model= similitud_autores
        fields= [
            'coordenadax',
            'coordenaday',
            'area',
            'investigator',
        ]
        labels={
            'coordenadax':'CoordenadaX',
            'coordenaday':'CoordenadaY',
            'area':'Area',
            'investigator':'Autor',
        }
        widgets={
            'coordenadax':forms.TextInput(attrs={'class':'form-control'}),
            'coordenaday':forms.TextInput(attrs={'class':'form-control'}),
            'area':forms.Select(attrs={'class': 'form-control'}),
            'investigator':forms.Select(attrs={'class': 'form-control'}),
        }