from django.core.mail import EmailMultiAlternatives
from django.http import HttpResponse
from django.shortcuts import render, HttpResponseRedirect
from apps.Investigador.models import Investigador
from apps.roles.models import Rol
from django.views.generic import CreateView,UpdateView
from django.core.urlresolvers import reverse_lazy, reverse
from apps.Investigador.form import RegistroForm,UserForm, InformacionForm,PasswordForm
from django.contrib.auth.models import User
from apps.informacionLaboral.models import informacionLaboral
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from apps.pais.models import pais
from apps.provincia.models import provincia
from apps.ciudad.models import ciudad
from apps.campoEspecifico.models import campoEspecifico 
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
from apps.campoDetallado.models import campoDetallado 
from apps.detalleUsers.models import detalleUsers 
from apps.universidad.models import universidad
from apps.carrera.models import carrera
from apps.facultad.models import facultad
from apps.Articulos_Cientificos.models import articulos_cientificos
import csv
import json

class RegistroUsuario(CreateView):
        model = Investigador
        template_name = "usuario/registrar.html"
        form_class = RegistroForm
        second_form_class = UserForm
        third_form_class = InformacionForm
        success_url = reverse_lazy('usuario:registrar')
        def get_context_data(self, **kwargs):
            persona = Investigador.objects.all()  # Esto si retorna un QuerySet
            exi = persona.exists() #metodo_comprobar
            context= super(RegistroUsuario,self).get_context_data(**kwargs)
            usuario = self.request.user.id  #usuario loggeado
            perfil = Investigador.objects.get(user_id=usuario) #buscar el perfil del usuario
            roles = perfil.roles.all() # todos los roles
            privi = [] #array vacio
            privilegios = [] #array vacio
            privilegio = [] #array vacio
            for r in roles:
                 privi.append(r.id) #almacena roles por id
            for p in privi:
                 roles5 = Rol.objects.get(pk=p)
                 priv = roles5.privilegios.all()
                 for pr in priv:
                     privilegios.append(pr.codename)
            for i in privilegios:
                 if i not in privilegio:
                     privilegio.append(i)
            context['usuario'] = privilegio
            if 'form' not in context:
                context['form']= self.form_class(self.request.GET)
            if 'form2' not in context:
                context['form2']= self.second_form_class(self.request.GET)
            if 'form3' not in context:
                context['form3']= self.third_form_class(self.request.GET)
            return context
        def post(self, request, *args, **kwargs):
            self.object= self.get_object
            form= self.form_class(request.POST)
            form2 = self.second_form_class(request.POST)
            form3 = self.third_form_class(request.POST)
            if form.is_valid() and form2.is_valid() :
                investigador = form.save(commit=False)
                investigador.user = form2.save()
                #investigador.u ser.set_password(form2.cleaned_data['password'])
                investigador.user.save()
                investigador.informacionLaboral=form3.save()
                investigador.informacionLaboral.save()
                investigador.save()
                form.save_m2m()
                data = form2.cleaned_data
                usu = data['username']
                passw = data['password']
                subject = 'Usuario creado exitosamente'
                text_content = 'This is an important message.'
                html_content = '<p>Username:<strong>' + usu + '</strong></p><p>Password:<strong>' + passw + '</strong></p>'
                msg = EmailMultiAlternatives(
                   subject,
                   text_content,
                   'admin@mail.com',  # FROM
                   [data['email']]
                )
                msg.attach_alternative(html_content, "text/html")
                msg.send()
                messages.success(request,('Se ha registrado satisfactoriamente'),extra_tags='alert')
                return HttpResponseRedirect(self.get_success_url())
            else:
                messages.error(request,('Por favor registrese nuevamente'))
                return self.render_to_response(self.get_context_data(form=form, form2=form2, form3=form3))


class ActualizarUsuario(UpdateView):
    model = Investigador
    second_model = User
    third_model = informacionLaboral
    template_name = "usuario/update.html"
    form_class = RegistroForm
    second_form_class = UserForm
    third_form_class = InformacionForm
    success_url = reverse_lazy('usuario:registrar')
    def get_context_data(self, **kwargs):
        context = super(ActualizarUsuario, self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk', 0)
        perfil = self.model.objects.get(id=pk)
        usuario = self.second_model.objects.get(id=perfil.user_id)
        if perfil.informacionLaboral:
            informacion = perfil.informacionLaboral
        else:
            f = informacionLaboral.objects.create()
            perfil.informacionLaboral = f
            perfil.save()
            informacion = perfil.informacionLaboral
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
        if 'form' not in context:
            context['form'] = self.form_class()
        if 'form2' not in context:
            context['form2'] = self.second_form_class(instance=usuario)
        if 'form3' not in context:
            context['form3'] = self.third_form_class(instance=informacion)
        context['id'] = pk
        context['perfil'] = perfil
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        id_solicitud = kwargs['pk']
        perfil = self.model.objects.get(id=id_solicitud)
        usuario = self.second_model.objects.get(id=perfil.user_id)
        informacion = self.third_model.objects.get(id=perfil.informacionLaboral_id)
        form = self.form_class(request.POST, request.FILES , instance=perfil)
        form2 = self.second_form_class(request.POST, request.FILES, instance=usuario)
        form3 = self.third_form_class(request.POST, request.FILES,instance=informacion)
        if form.is_valid() and form2.is_valid() and form3.is_valid():
            perfil = form.save(commit=False)
            perfil.user = form2.save()
            perfil.user.save()
            perfil.informacionLaboral =form3.save()
            perfil.informacionLaboral.save()
            perfil.save()
            form.save_m2m()
            messages.success(request, ('La información se ha actualizado correctamente.'))
            return HttpResponseRedirect('/index/')
        else:
            messages.error(request, ('Revise el formulario, no se ha podido enviar la información'))
            return self.render_to_response(self.get_context_data(form=form, form2=form2, form3=form3))

class ActualizarPassword(UpdateView):
    model = Investigador
    second_model = User
    template_name = "usuario/updatePass.html"
    form_class = PasswordForm
    success_url = reverse_lazy('usuario:registrar')

    def get_context_data(self, **kwargs):
        context = super(ActualizarPassword, self).get_context_data(**kwargs)
        pk = self.kwargs.get('pk', 0)
        perfil = self.model.objects.get(id=pk)
        usuario = self.second_model.objects.get(id=perfil.user_id)
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
        if 'form2' not in context:
            context['form2'] = self.form_class(instance=usuario)
        context['id'] = pk
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object
        id_solicitud = kwargs['pk']
        perfil = self.model.objects.get(id=id_solicitud)
        usuario = self.second_model.objects.get(id=perfil.user_id)
        form2 = self.form_class(request.POST, instance=usuario)
        password1 = self.request.POST['password']
        password2 = self.request.POST['password1']
        if form2.is_valid() and password1 == password2:

            perfil.user = form2.save()
            perfil.user.set_password(perfil.user.password)
            perfil.user.save()
            perfil.save()
            update_session_auth_hash(request, request.user)
            messages.success(request, ('Se a completado la petición, contraseña actualizada'))
            return HttpResponseRedirect('/index/')
        else:
            messages.error(request, ('Las contraseñas no coinciden, vuelva a intentarlo'))
            return HttpResponseRedirect('/investigador/editarPass/'+str(perfil.user_id))

def autor(request):
    results = []
    dbjson = {}
    if request.method == 'POST':
        email = request.POST.get('email')
        #username = request.POST.get('username')
        first_name = request.POST.get('name')
        last_name = request.POST.get('lastname')
        uni = request.POST.get('uni')
        print('Mi email', email,first_name,last_name)

        if not User.objects.filter(email=email):
            rol = Rol.objects.get(id=1);
            us = User.objects.create_user(username=email, email=email, password = email , first_name=first_name, last_name=last_name, is_active=False)
            detalleUsers.objects.create(userRegistrado = us, userRegistra_id = request.user.id)
            #us.save()
            inf = informacionLaboral.objects.create(university_id = uni)
            inf.save()
            inv = Investigador(cambio = False, user= us, informacionLaboral=inf)
            inv.save(force_insert=True)
            inv.roles.add(rol)
            dbjson['text'] = us.first_name + ' ' + us.last_name
            dbjson['value'] = us.id
            results.append(dbjson)
            data_json = json.dumps(results)
            mimetype = "application/json"
            return HttpResponse(data_json, mimetype)
"""
from apps.Investigador.models import Investigador
def new(request):
    
    us = User.objects.get(id = "485")
    print(us)
    inv = Investigador.objects.get(user = us)
    inv.cambio = False
    inv.save()
    print(inv.cambio)
    return HttpResponseRedirect('/index/')
"""

from django.contrib.auth import login
def new(request):
    if 'UserAll' in request.POST:
        usN = request.POST['UserAll']
        usuarioNuevo = User.objects.get(id = usN)
        usuarioNuevo.backend = 'django.contrib.auth.backends.ModelBackend'
        login(request, usuarioNuevo)
    return HttpResponseRedirect('/index/')

def nuevoUser(email, cedula, name, last):
    rol = Rol.objects.get(id=1)
    us = User.objects.create_user(username=email, email=email, password=cedula, first_name=name, last_name=last, )
    us.save()
    inf = informacionLaboral.objects.create()
    inf.save()
    inv = Investigador(cedula=cedula, cambio=False, user=us, informacionLaboral=inf)
    inv.save(force_insert=True)
    inv.roles.add(rol)
    

