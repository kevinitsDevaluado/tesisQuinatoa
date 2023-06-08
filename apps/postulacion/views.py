from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from django.core.urlresolvers import reverse_lazy
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from apps.postulacion.form import PostulacionForm,EstadoForm
from apps.postulacion.models import postulacion
from apps.Investigador.models import Investigador

#Aumentar
from apps.incentivo.models import incentivo
import json

class ListarPostulaciones(ListView):
    model = postulacion
    template_name = 'Incentivos/ListarPostulaciones.html'
    def get_context_data(self, **kwargs):
        context = super(ListarPostulaciones, self).get_context_data(**kwargs)
        perfil = Investigador.objects.get(user_id=self.request.user.id)
        context['postulacion'] = postulacion.objects.all()
        context['perfil'] = perfil
        return context

class ModificarPostulaciones(UpdateView):
    model = postulacion
    template_name = 'Incentivos/Actualizar_postulaciones.html'
    form_class = EstadoForm
    success_url = reverse_lazy('postulacion:Listar_Postulacion')

def estadoA(request):    
    estado=request.POST.get('estado')
    id_pos=request.POST.get('id')
    model=revista
    print("hola mundi",estado,id_pos)
    proy = revista.objects.get(id=id_pos)
    if request.method == 'POST':
     postulacion.objects.filter(id=id_pos).update(
     estado=estado,
     )
     print("ESTOY AQUI")
     r = postulacion.objects.all().filter(id = id_pos)
     results=[]
     doctor_json = {}
     doctor_json['text'] = ''
     doctor_json['validar']=''
     doctor_json['estado']=''
     results.append(doctor_json)
     for i in r:
        doctor_json={}
        doctor_json['text']=i.Nombre 
        doctor_json['validar']=i.validar
        doctor_json['estado']=i.estado
        
        results.append(doctor_json)
     data_json=json.dumps(results)    
    else:data_json='fail'
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

#Aumentar y Cambiar
def CrearPostulacion(request):
    data_json='0'
    if request.method == 'POST':
        incent=incentivo.objects.get(id=request.POST['incentivo'])
        if int(incent.numeroCupos)>0:
            form = PostulacionForm(request.POST)
            if form.is_valid():
                form.save()
                incent.numeroCupos=int(incent.numeroCupos)-1
                incent.save()
                data_json='1'
            else:
                data_json='2'
        else:
            data_json='0'
    else:
        data_json='0'
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

import datetime
def SearchFecha(request):
    if request.method == 'POST':
        z1=str(request.POST.get('inicio')).split('-')
        z2=str(request.POST.get('final')).split('-')
        inicio = datetime.date(int(z1[0]), int(z1[1]), int(z1[2]))
        fin = datetime.date(int(z2[0]), int(z2[1]), int(z2[2]))
        pos=postulacion.objects.all()
        results = []
        for i in pos:
            c1=postulacion.objects.get(id=i.id)
            c2=str(c1.fecha).split('-')
            bol=inicio <= datetime.date(int(c2[0]), int(c2[1]), int(c2[2])) <= fin
            if bol==True:
                post={}
                post['id']=i.id
                post['fecha']=str(i.fecha)
                post['investigador']=str(i.investigador.user.first_name)+' '+str(i.investigador.user.last_name)
                post['evento']=i.incentivo.evento.nombre
                post['nivel']=i.incentivo.nivel
                post['estado']=i.estado
                post['calificacion']=i.calificacion
                results.append(post)
        data_json= json.dumps(results)
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

import smtplib, getpass
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from django.contrib import messages
def CorreoPostulacion(request):
    id_u = request.user.id
    usuario=User.objects.get(id=id_u)
    mensaje(request.POST['contenido'],usuario.email)
    data_json='0'
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

def mensaje(data,usuario):
    inf= 'topsuperweb@gmail.com'
    user = 'ecu.ciencia@utc.edu.ec'
    password ='3cuci3ncia.2018'
    remitente = usuario
    asunto = 'Solicitud para la asignación de un cupo'
    mensaje = data
    gmail = smtplib.SMTP('smtp.gmail.com',587)
    gmail.starttls()
    gmail.login(user, password)
    gmail.set_debuglevel(1)
    header = MIMEMultipart()
    header ['Subject'] = asunto
    header ['From'] = remitente
    header ['To'] = inf 
    mensaje = MIMEText (mensaje, 'html')
    header.attach(mensaje)
    gmail.sendmail(remitente, inf , header.as_string())
    gmail.quit()
