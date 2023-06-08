from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView,TemplateView
from django.contrib.auth.models import User
from apps.Investigador.models import Investigador
from apps.parametrosLibro.form import parametrosLibroForm, parametrosLibroFormDisabled
from apps.parametrosLibro.models import parametroslibro
from django.contrib import messages

# Create your views here.
def parametrosCrearLibro(request):
    if request.method == 'POST':
        form = parametrosLibroForm(request.POST)
        if form.is_valid(): 
            form.save()
        return redirect('parametrosLibro:listado_parametros_libros')
    else:
        form = parametrosLibroForm()
    return render(request, 'Parametroslibros/crearparametrolibro.html', {'form':form})

class editarParametroLibro(UpdateView):
    model = parametroslibro
    template_name = 'Parametroslibros/crearparametrolibro.html'
    form_class = parametrosLibroFormDisabled
    success_url = reverse_lazy('parametrosLibro:listado_parametros_libros')

class ListadoParametrosLibros(ListView):
    model = parametroslibro
    template_name = 'Parametroslibros/ParametrosLibro.html'
    context_object_name = 'parametroslibro' 
