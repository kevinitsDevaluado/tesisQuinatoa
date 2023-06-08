from django import forms
from apps.parametrosArticulos.models import parametrosArticulo
class parametrosArticulosForm(forms.ModelForm):
    class Meta:
        model = parametrosArticulo
        fields= [
            'descripcion',
            'valor',
            'estado',
            'tipoIntReg',
        ]
        labels={
            'descripcion':'Descripción',
            'valor':'Valor',
            'estado':'Estado de Parámetro',
            'tipoIntReg':'Tipo de Parámetro',

        }
        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'valor':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estado':forms.Select(attrs={'class':'form-control','required':'required'}),
            'tipoIntReg':forms.Select(attrs={'class':'form-control','required':'required'}),
        }
class parametrosFormDisabled(forms.ModelForm):
    class Meta:
        model = parametrosArticulo
        fields= [
            'descripcion',
            'valor',
            'estado',
            'tipoIntReg',
        ]
        labels={
            'descripcion':'Descripción',
            'valor':'Valor',
            'estado':'Estado de Parámetro',
            'tipoIntReg':'Tipo de Parámetro',

        }
        widgets={
            'descripcion':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
            'valor':forms.TextInput(attrs={'class':'form-control','required':'required'}),
            'estado':forms.Select(attrs={'class':'form-control','required':'required'}),
            'tipoIntReg':forms.TextInput(attrs={'class':'form-control','readonly':'readonly'}),
        }