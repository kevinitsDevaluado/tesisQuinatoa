from django import forms
from apps.parametrosPonencia.models import parametrosponencia
class parametrosPonenciaForm(forms.ModelForm):
    class Meta:
        model = parametrosponencia
        fields= [
            'descripcion',
            'valor',
            'estado',
            'Tipop',
        ]
        labels={
            'descripcion':'Descripción',
            'valor':'Valor',
            'estado':'Estado de Parámetro',
            'Tipop':'Tipo de Parámetro',

        }
        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'valo':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estado':forms.Select(attrs={'class':'form-control','required':'required'}),
            'Tipop':forms.Select(attrs={'class':'form-control','required':'required'}),
        }
class parametrosPonenciaFormDisabled(forms.ModelForm):
    class Meta:
        model = parametrosponencia
        fields= [
            'descripcion',
            'valor',
            'estado',
            'Tipop',
        ]
        labels={
            'descripcion':'Descripción',
            'valor':'Valor',
            'estado':'Estado de Parámetro',
            'Tipop':'Tipo de Parámetro',

        }
        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
            'valo':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estado':forms.Select(attrs={'class':'form-control','required':'required'}),
            'Tipop':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
        }