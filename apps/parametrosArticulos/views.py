from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView,TemplateView
from django.contrib.auth.models import User
from apps.Investigador.models import Investigador
from apps.parametrosArticulos.form import parametrosArticulosForm, parametrosFormDisabled
from apps.parametrosArticulos.models import parametrosArticulo
from django.contrib import messages
# Create your views here.
#Solo Parametros Articulos
def parametrosCrear(request):
    if request.method == 'POST':
        form = parametrosArticulosForm(request.POST)
        if form.is_valid(): 
            form.save()
        return redirect('parametrosArticulos:ListarParametro')
    else:
        form = parametrosArticulosForm()
    return render(request, 'Parametrosarticulos/ParametrosArticulos.html', {'form':form})
    
class editarParametro(UpdateView):
    model = parametrosArticulo
    template_name = 'Parametrosarticulos/ParametrosArticulos.html'
    form_class = parametrosFormDisabled
    success_url = reverse_lazy('parametrosArticulos:ListarParametro')

class eliminarParametro(DeleteView):
    model = parametrosArticulo
    template_name = 'Parametrosarticulos/eliminarParametro.html'
    form_class = parametrosArticulosForm
    success_url = reverse_lazy('parametrosArticulo:ListarParametro')

class ListadoParametros(ListView):
    model = parametrosArticulo
    template_name = 'Parametrosarticulos/Parametros_Articulos.html'
    context_object_name = 'parametrosArticulo'  