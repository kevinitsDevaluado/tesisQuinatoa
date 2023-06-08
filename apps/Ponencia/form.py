from django import forms
from apps.Ponencia.models import ponencia

class PonenciaForm (forms.ModelForm):
    class Meta:
        model = ponencia
        fields = [
            'nombrePonencia',
            'lugarPonencia',
            'tituloPonencia',
            'fechaPonencia',
            'palabrasClave',
            'resumen',
            'certificado',
            'tipo',
            'isbn',
            'urlPonencia',
            'financiamiento',
            'financia',
            'informe',
            'articuloCientifico',
            'user',
            'editableTrueFalse',
            'comentarioSecretaria',
            'filialUtc',
            'pais',
            'ciudad',

        ]
        labels = {
            'nombrePonencia':'Nombre del evento',
            'lugarPonencia':'Institución dónde se realiza el evento',
            'tituloPonencia':'Titulo de ponencia',
            'fechaPonencia':'Fecha de la ponencia',
            'palabrasClave':'Palabras clave',
            'resumen':'Resumen',
            'certificado':'Certificado',
            'tipo':'Tipo',
            'isbn':'ISBN',
            'urlPonencia':'URL',
            'financiamiento': 'Financiamiento',
            'financia': 'Universidad la cual financia costos de la disertación',
            'informe':'Informe de actividades',
            'articuloCientifico':'La disertación pertenece a algún artículo cientifico.',

            'user': '',
            'comentarioSecretaria':'Comentario',
            'filialUtc':'Filial UTC (La Ponencia es filial de la Universidad Técnica de Cotopaxi)',
            'pais': 'País dónde se dio la ponencia',
            'ciudad': 'Ciudad dónde se dio la ponencia',

        }
        widgets = {
            'nombrePonencia':forms.TextInput(attrs={'class': 'form-control', 'required':True}),
            'lugarPonencia':forms.TextInput(attrs={'class': 'form-control'}),
            'tituloPonencia': forms.TextInput(attrs={'class': 'form-control', 'required':True}),
            'fechaPonencia':forms.TextInput(attrs={'class':'form-control datepicker','type':'date'}),
            'palabrasClave':forms.CheckboxSelectMultiple(attrs={'class': 'form-control'}),
            'resumen':forms.Textarea(attrs={'class': 'form-control', 'required':True}),
            'certificado':forms.FileInput(attrs={'class': 'form-control','id':'id_certificado','onchange':'check_file(this)'}),
            'tipo':forms.TextInput(attrs={'class': 'form-control', 'required':False}),
            'isbn':forms.TextInput(attrs={'class': 'form-control', 'required':False}),
            'urlPonencia':forms.URLInput(attrs={'class': 'form-control'}),
            'financiamiento':forms.Select(attrs={'class': 'form-control', 'id':'financiamiento'}),
            'financia': forms.Select(attrs={'class': 'form-control'}),
            'informe': forms.FileInput(attrs={'class': 'form-control'}),
            'articuloCientifico': forms.Select(attrs={'class': 'form-control', 'required':False }),
            'user': forms.HiddenInput(attrs={'class': 'form-control', 'id': 'user'}),
            'comentarioSecretaria': forms.Textarea(attrs={'class': 'form-control', 'required': False}),
            'filialUtc': forms.Select(attrs={'class': 'form-control', 'required': True}),
            'pais': forms.Select(attrs={'class': 'form-control', 'id': 'pais', 'required': True}),
            'ciudad': forms.Select(attrs={'class': 'form-control', 'id': 'ciudad', 'required': True}),

        }

#'articuloCientifico': forms.CheckboxSelectMultiple(attrs={'class': 'form-control'}),

class PonenciaFormDisabled (forms.ModelForm):
    class Meta:
        model = ponencia
        fields = [
            'nombrePonencia',
            'lugarPonencia',
            'tituloPonencia',
            'fechaPonencia',
            'palabrasClave',
            'resumen',
            'certificado',
            'tipo',
            'isbn',
            'urlPonencia',
            'financiamiento',
            'financia',
            'informe',
            'articuloCientifico',
            'user',
            'editableTrueFalse',
            'comentarioSecretaria',
            'filialUtc',

        ]
        labels = {
            'nombrePonencia':'Nombre del evento',
            'lugarPonencia':'Institución dónde se realiza el evento',
            'tituloPonencia':'Titulo de ponencia',
            'fechaPonencia':'Fecha de la ponencia',
            'palabrasClave':'Palabras clave',
            'resumen':'Resumen',
            'certificado':'Certificado',
            'tipo':'Tipo',
            'isbn':'ISBN',
            'urlPonencia':'URL',
            'financiamiento': 'Financiamiento',
            'financia': 'Universidad la cual financia costos de la disertación',
            'informe':'Informe de actividades',
            'articuloCientifico':'La disertación pertenece a algún artículo cientifico.',

            'user': '',
            'comentarioSecretaria':'Comentario',
            'filialUtc':'Filial UTC (El Artículo es filial de la Universidad Técnica de Cotopaxi)',


        }
        widgets = {
            'nombrePonencia':forms.TextInput(attrs={'class': 'form-control' , 'readonly':'', 'required':True}),
            'lugarPonencia':forms.TextInput(attrs={'class': 'form-control' , 'readonly':''}),
            'tituloPonencia': forms.TextInput(attrs={'class': 'form-control' , 'readonly':'', 'required':True}),
            'fechaPonencia':forms.TextInput(attrs={'class':'form-control datepicker' , 'readonly':'','type':'date'}),
            'palabrasClave':forms.CheckboxSelectMultiple(attrs={'class': 'form-control' , 'readonly':''}),
            'resumen':forms.Textarea(attrs={'class': 'form-control' , 'readonly':'', 'required':True}),
            'certificado':forms.FileInput(attrs={'class': 'form-control'}),
            'tipo':forms.TextInput(attrs={'class': 'form-control' , 'readonly':'', 'required':False}),
            'isbn':forms.TextInput(attrs={'class': 'form-control' , 'readonly':'', 'required':False}),
            'urlPonencia':forms.URLInput(attrs={'class': 'form-control' , 'readonly':''}),
            'financiamiento':forms.Select(attrs={'class': 'form-control' , 'readonly':'', 'id':'financiamiento'}),
            'financia': forms.Select(attrs={'class': 'form-control' , 'readonly':''}),
            'informe': forms.FileInput(attrs={'class': 'form-control' , 'readonly':''}),
            'articuloCientifico': forms.Select(attrs={'class': 'form-control' , 'readonly':'', 'required':False }),
            'user': forms.HiddenInput(attrs={'class': 'form-control' , 'readonly':'', 'id': 'user'}),
            'comentarioSecretaria': forms.Textarea(attrs={'class': 'form-control' , 'readonly':'', 'required': False}),
            'filialUtc': forms.Select(attrs={'class': 'form-control', 'readonly':'', 'required': True}),

        }
