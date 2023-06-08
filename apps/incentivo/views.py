from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.http import HttpResponse, HttpResponseRedirect
from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from apps.incentivo.form import IncentivoForm,EventoForm
from apps.evento.models import evento
from apps.incentivo.models import incentivo,evento
from apps.autoresArticulos.models import autoresArticulos
from apps.Investigador.models import Investigador
from django.db.models import Q

class CrearIncentivos_(CreateView):
    model = evento
    form_class = EventoForm
    template_name = 'Incentivos/CrearIncentivo.html'
    success_url = reverse_lazy('incentivo:Listar_Evento')
    def get_context_data(self, **kwargs):
        context = super(CrearIncentivos_, self).get_context_data(**kwargs)
        perfil = Investigador.objects.get(user_id=self.request.user.id)
        context['perfil'] = perfil       
        return context
    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        form = self.form_class(request.POST, request.FILES)
        if form.is_valid():
            even = form.save(commit=False)
            even.save()
            form.save_m2m()
            contador=request.POST['IdContador']
            for i in range(int(contador)+1):
                        nivel = "nivel"+str(i)
                        cupo = "cupo"+str(i)
                        des = "des"+str(i)
                        n = request.POST[nivel]
                        c = request.POST[cupo]
                        d = request.POST[des]
                        eve = incentivo.objects.create(nivel=n,numeroCupos=c,descripcion=d, evento=even)
                        eve.save()
                        print(i)
                        del eve

            messages.success(request, ('Incentivo registrado exitosamente'))
            return HttpResponseRedirect(reverse_lazy('incentivo:Listar_Evento'))
        else:
            messages.error(request, ('Por favor registre nuevamente'))
            return self.render_to_response(self.get_context_data(form=form))



class ListarEventos(ListView):
    model = evento
    template_name = 'Incentivos/ListarIncentivosFrom.html'
    def get_context_data(self, **kwargs):
        context = super(ListarEventos, self).get_context_data(**kwargs)
        perfil = Investigador.objects.get(user_id=self.request.user.id)
        context['evento'] = evento.objects.all()
        context['incentivo'] = incentivo.objects.all()
        context['perfil'] = perfil
        return context


class ModificarIncentivos_(UpdateView):
    model = evento
    form_class = EventoForm
    template_name = 'Incentivos/ActualizarIncentivo.html'
    success_url = reverse_lazy('incentivo:Listar_Evento')
    def get_context_data(self, **kwargs):
        context = super(ModificarIncentivos_, self).get_context_data(**kwargs)
        eventoId = self.object.id
        autPon = incentivo.objects.filter(evento_id=eventoId).order_by('id')
        perfil = Investigador.objects.get(user_id=self.request.user.id)
        context['Niveles'] = autPon
        context['perfil'] = perfil
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        ponId = kwargs['pk']
        ev = self.model.objects.get(id=ponId)
        form = self.form_class(request.POST, instance=ev)
        if form.is_valid():
            even = form.save(commit=False)
            even.save()
            form.save_m2m()
            if request.POST['estado']=='0':
                allInves=Investigador.objects.all()
                for i in allInves:
                    eliminar = evento.objects.all()
                    for j in eliminar:
                        i.eventoInv.remove(j.id) 
            contador=request.POST['IdContador']
            vacio=[]
            ver=[]
            a=incentivo.objects.filter(evento_id=ev.id)
            if a:
                for i in a:
                    vacio.append(i.id)
            for i in range(int(contador)):
                nivel = "nivel"+str(i)
                cupo = "cupo"+str(i)
                des = "des"+str(i)
                inc = "id"+str(i)
                index = request.POST[inc]
                if index!='0':
                    ver.append(int(index))
                    incen = incentivo.objects.get(Q(evento_id=ev.id) & Q(id=index))
                    if incen:
                        incen.nivel = request.POST[nivel]
                        incen.numeroCupos=int(request.POST[cupo])
                        incen.descripcion=request.POST[des]
                        incen.save()
                else:
                    n=request.POST[nivel]
                    c=request.POST[cupo]
                    d=request.POST[des]
                    nuevo=incentivo.objects.create(evento_id=ev.id,nivel=n,numeroCupos=c,descripcion=d)
                    nuevo.save()
            for i in vacio:
                if i not in ver:
                    print(i)
                    ineli = incentivo.objects.get(Q(evento_id=ev.id) & Q(id=i))
                    ineli.delete() 
            messages.success(request, ('Se ha actualizado incentivo correctamente'))
            return HttpResponseRedirect(reverse_lazy('incentivo:Listar_Evento'))
        else:
            messages.error(request, ('Por favor revise la información del formulario'))
            return self.render_to_response(self.get_context_data(form=form))

class EliminarEventos(DeleteView):
	model = evento
	template_name = 'Incentivos/EliminarIncentivos.html'
	success_url = reverse_lazy('incentivo:Listar_Evento')
