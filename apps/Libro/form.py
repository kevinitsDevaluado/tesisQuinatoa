from django import forms

from apps.Libro.models import libro


class DocumentForm(forms.ModelForm):
    class Meta:
        model = libro
        fields = [
            'Titulo',
            'ISBN',
            'Anio',
            'fechaPublicacion',
            'Editorial',
            'Resumen',
            'PalabrasClave',
            'Documento',
            'BaseDatos',
            'Url',
            'Doi',
            'UbicacionFisica',
            'capitulo',
            'tipo',
            'estado',
            'detallado',
            'editableTrueFalse',
            'comentarioSecretaria',
            'filialUtc',
            'tipoEditorial',

        ]
        labels = {
            'Titulo': 'Título de portada del libro',
            'ISBN': 'Código normalizado internacional para libros (ISBN)',
            'Anio': 'Año de emisión del libro',
            'fechaPublicacion': 'Fecha de emisión del libro',
            'Editorial': 'Empresa que editó el libro',
            'Resumen': 'Resumen ',
            'PalabrasClave': 'Palabras Claves',
            'Documento': 'Archivo digital del libro PDF u otros',
            'BaseDatos': 'Base de datos',
            'Url': 'Ruta online dónde se encuentra el libro (URL)',
            'Doi': 'Identifación Digital del libro (DOI)',
            'UbicacionFisica': 'Ubicación Física del Libro',
            'capitulo': 'Capítulo de libro',
            'tipo': 'Seleccione una opción',
            'estado':'Estado del libro',
            'detallado': 'Campo detallado',
            'comentarioSecretaria':'Comentario',
            'filialUtc':'Filial UTC (El Libro es filial de la Universidad Técnica de Cotopaxi)',
            'tipoEditorial':'Editorial',
        }

        widgets = {
            'Titulo': forms.TextInput(attrs={'class': 'form-control'}),
            'tipo': forms.Select(attrs={'class': 'form-control','id':'tipo'}),
            'ISBN': forms.TextInput(attrs={'class': 'form-control'}),
            'Anio': forms.TextInput(attrs={'class': 'form-control'}),
            'fechaPublicacion': forms.TextInput(attrs={'class': 'form-control datepicker', 'type': 'date', 'required': True}),
            'Editorial': forms.TextInput(attrs={'class': 'form-control'}),
            'Resumen': forms.Textarea(attrs={'class': 'form-control'}),
            'PalabrasClave': forms.CheckboxSelectMultiple(attrs={'class': 'form-control', 'id': 'tag', 'placeholder': 'Palabras Claves', 'required': False}),
            'Documento': forms.FileInput(attrs={'class':'form-control','id':'id_Documento','onchange':'check_file(this)','required': False, }),
            'BaseDatos': forms.CheckboxSelectMultiple(attrs={'class': 'form-control input-tags-1', 'multiple':'', 'data-role':'tagsinput', 'id': 'tags', 'placeholder': 'Palabras Claves'}),
            'Url': forms.URLInput(attrs={'class': 'form-control','required': False}),
            'Doi': forms.URLInput(attrs={'class': 'form-control','required': False}),
            'UbicacionFisica': forms.TextInput(attrs={'class': 'form-control'}),
            'capitulo': forms.TextInput(attrs={'class': 'form-control','id':'capitulo'}),
            'estado':forms.Select(attrs={'class': 'form-control'}),
            'detallado': forms.Select(attrs={'class': 'form-control', 'id': 'detallado'}),
            'comentarioSecretaria': forms.Textarea(attrs={'class': 'form-control', 'required': False}),
            'filialUtc': forms.Select(attrs={'class': 'form-control', 'required': True}),
            'tipoEditorial': forms.Select(attrs={'class': 'form-control'}),

        }

class DocumentFormDisabled(forms.ModelForm):
    class Meta:
        model = libro
        fields = [
            'Titulo',
            'ISBN',
            'Anio',
            'fechaPublicacion',
            'Editorial',
            'Resumen',
            'PalabrasClave',
            'Documento',
            'BaseDatos',
            'Url',
            'Doi',
            'UbicacionFisica',
            'capitulo',
            'tipo',
            'estado',
            'detallado',
            'editableTrueFalse',
            'comentarioSecretaria',
            'filialUtc',
            'tipoEditorial',

        ]
        labels = {
            'Titulo': 'Título de portada del libro',
            'ISBN': 'Código normalizado internacional para libros (ISBN)',
            'Anio': 'Año de emisión del libro',
            'fechaPublicacion': 'Fecha de emisión del libro',
            'Editorial': 'Empresa que editó el libro',
            'Resumen': 'Resumen ',
            'PalabrasClave': 'Palabras Claves',
            'Documento': 'Archivo digital del libro PDF u otros',
            'BaseDatos': 'Base de datos',
            'Url': 'Ruta online dónde se encuentra el libro (URL)',
            'Doi': 'Identifación Digital del libro (DOI)',
            'UbicacionFisica': 'Ubicación Física del Libro',
            'capitulo': 'Capítulo de libro',
            'tipo': 'Seleccione una opción',
            'estado':'Estado del libro',
            'detallado': 'Campo detallado',
            'comentarioSecretaria':'Comentario',
            'filialUtc':'Filial UTC (El Artículo es filial de la Universidad Técnica de Cotopaxi)',
            'tipoEditorial':'Editorial',

        }

        widgets = {
            'Titulo': forms.TextInput(attrs={'class': 'form-control','readonly':''}),
            'tipo': forms.Select(attrs={'class': 'form-control','id':'tipo','readonly':''}),
            'ISBN': forms.TextInput(attrs={'class': 'form-control','readonly':''}),
            'Anio': forms.TextInput(attrs={'class': 'form-control','readonly':''}),
            'fechaPublicacion': forms.TextInput(attrs={'class': 'form-control datepicker','readonly':'', 'type': 'date', 'required': True}),
            'Editorial': forms.TextInput(attrs={'class': 'form-control','readonly':''}),
            'Resumen': forms.Textarea(attrs={'class': 'form-control','readonly':''}),
            'PalabrasClave': forms.CheckboxSelectMultiple(attrs={'class': 'form-control','readonly':'', 'id': 'tag', 'placeholder': 'Palabras Claves', 'required': False}),
            'Documento': forms.FileInput(attrs={'required': False, 'class':'form-control','readonly':''}),
            'BaseDatos': forms.CheckboxSelectMultiple(attrs={'class': 'form-control input-tags-1','readonly':'', 'multiple':'', 'data-role':'tagsinput', 'id': 'tags', 'placeholder': 'Palabras Claves'}),
            'Url': forms.URLInput(attrs={'class': 'form-control','readonly':'','required': False}),
            'Doi': forms.URLInput(attrs={'class': 'form-control','readonly':'','required': False}),
            'UbicacionFisica': forms.TextInput(attrs={'class': 'form-control','readonly':''}),
            'capitulo': forms.TextInput(attrs={'class': 'form-control','readonly':'','id':'capitulo'}),
            'estado':forms.Select(attrs={'class': 'form-control','readonly':''}),
            'detallado': forms.Select(attrs={'class': 'form-control','readonly':'', 'id': 'detallado'}),
            'comentarioSecretaria': forms.Textarea(attrs={'class': 'form-control','readonly':'', 'required': False}),
            'filialUtc': forms.Select(attrs={'class': 'form-control', 'readonly':'', 'required': True}),
            'tipoEditorial': forms.Select(attrs={'class': 'form-control'}),

        }
