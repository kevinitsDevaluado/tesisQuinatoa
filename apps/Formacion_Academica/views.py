# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from apps.Formacion_Academica.models import formacion_academica
from apps.Formacion_Academica.form import FormacionAform
from django.core.urlresolvers import reverse_lazy
from django.views.generic import CreateView,ListView,UpdateView,DeleteView
from apps.roles.models import Rol
from apps.Investigador.models import Investigador
import unicodedata
from django.contrib import messages
from django.shortcuts import HttpResponseRedirect
# Create your views here.

def elimina_tildes(cadena):
    s = ''.join((c for c in unicodedata.normalize('NFD', cadena) if unicodedata.category(c) != 'Mn'))
    return s

class CreateFormacion_Academica (CreateView):
    model = formacion_academica
    form_class = FormacionAform
    template_name = 'FormacionAcademica/CreateFormacionAcademica.html'
    success_url = reverse_lazy('FormacionAcademica:lista_Formacion_Academica')
    def get_context_data(self, **kwargs):
        context = super(CreateFormacion_Academica, self).get_context_data(**kwargs)
        usuario = self.request.user.id
        perfil = Investigador.objects.get(user_id=usuario)
        roles = perfil.roles.all()
        privi = []
        privilegios = []
        privilegio = []
        for r in roles:
            privi.append(r.id)
        for p in privi:
            roles5 = Rol.objects.get(pk=p)
            priv = roles5.privilegios.all()
            for pr in priv:
                privilegios.append(pr.codename)
        for i in privilegios:
            if i not in privilegio:
                privilegio.append(i)
        context['usuario'] = privilegio
        return context

class ListFormacion_Academica(ListView):
    model = formacion_academica
    template_name = 'FormacionAcademica/ListFormacionAcademica.html'
    paginate_by = 6
    def get_context_data(self, **kwargs):
        context = super(ListFormacion_Academica, self).get_context_data(**kwargs)
        usuario = self.request.user.id
        perfil = Investigador.objects.get(user_id=usuario)
        roles = perfil.roles.all()
        privi = []
        privilegios = []
        privilegio = []
        for r in roles:
            privi.append(r.id)
        for p in privi:
            roles5 = Rol.objects.get(pk=p)
            priv = roles5.privilegios.all()
            for pr in priv:
                privilegios.append(pr.codename)
        for i in privilegios:
            if i not in privilegio:
                privilegio.append(i)
        context['usuario'] = privilegio
        return context

class UpdateFormacion_Academica (UpdateView):
    model = formacion_academica
    form_class = FormacionAform
    template_name = 'FormacionAcademica/UpdateFormacionAcademica.html'
    success_url = reverse_lazy ('inicio:logeo')
    def get_context_data(self, **kwargs):
        usuario = self.request.user.id
        context = super(UpdateFormacion_Academica, self).get_context_data(**kwargs)
        perfil = Investigador.objects.get(user_id=usuario)
        if 'form' not in context:
            context['form'] = self.form_class(self.request.GET)
        context['perfil'] = perfil
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        usuario = self.request.user.id
        id_art = kwargs['pk']
        art = self.model.objects.get(id=id_art)
        form = self.form_class(request.POST, request.FILES, instance=art)
        if form.is_valid():
            formacion = form.save(commit=False)
            formacion.save()
            formacion.FAMdescripcion = elimina_tildes(formacion.descripcion.upper())
            formacion.FAMtitulo = elimina_tildes(formacion.titulo.upper())
            formacion.FAMtipoTitulo = elimina_tildes(formacion.tipoTitulo.upper())
            formacion.statusText = False
            formacion.save()
            
            if formacion.textMining != None:
                formacion.textMining.statusClasificacion = False
                formacion.textMining.sublineaClasificacion = None
                formacion.textMining.save()

            messages.success(request, ('Se ha actualizado la información correctamente'))
            return HttpResponseRedirect(reverse_lazy('articulosCientificos:ListaArticulo'))
        else:
            messages.error(request, ('Ah ocurrido un error, revise la informacion del formulario.'))
            return self.render_to_response(self.get_context_data(form=form))

class DeleteFormacion_Academica (DeleteView):
    model = formacion_academica
    template_name = 'FormacionAcademica/DeleteFormacionAcademica.html'
    success_url = reverse_lazy('inicio:logeo')
    def get_context_data(self, **kwargs):
        context = super(DeleteFormacion_Academica, self).get_context_data(**kwargs)
        usuario = self.request.user.id
        perfil = Investigador.objects.get(user_id=usuario)
        roles = perfil.roles.all()
        privi = []
        privilegios = []
        privilegio = []
        for r in roles:
            privi.append(r.id)
        for p in privi:
            roles5 = Rol.objects.get(pk=p)
            priv = roles5.privilegios.all()
            for pr in priv:
                privilegios.append(pr.codename)
        for i in privilegios:
            if i not in privilegio:
                privilegio.append(i)

        context['perfil'] = perfil
        context['usuario'] = privilegio
        return context