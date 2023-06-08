from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic import CreateView, ListView, UpdateView, DeleteView,TemplateView
from django.contrib.auth.models import User
from apps.Investigador.models import Investigador
from apps.parametrosPonencia.models import parametrosponencia
from apps.parametrosPonencia.form import parametrosPonenciaForm, parametrosPonenciaFormDisabled
from django.contrib import messages

# Create your views here.
def parametrosCrearPonencia(request):
    if request.method == 'POST':
        form = parametrosPonenciaForm(request.POST)
        if form.is_valid(): 
            form.save()
        return redirect('parametrosPonencia:listado_parametros_ponencias')
    else:
        form = parametrosPonenciaForm()
    return render(request, 'Parametrosponencias/crearparametroponencia.html', {'form':form})

class editarParametroPonencia(UpdateView):
    model = parametrosponencia
    template_name = 'Parametrosponencias/crearparametroponencia.html'
    form_class = parametrosPonenciaFormDisabled
    success_url = reverse_lazy('parametrosPonencia:listado_parametros_ponencias')

class ListadoParametrosPonencia(ListView):
    model = parametrosponencia
    template_name = 'Parametrosponencias/ParametrosPonencia.html'
    context_object_name = 'parametrosponencia'
