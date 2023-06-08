from django.shortcuts import render, redirect
from django.http import HttpResponse
from apps.graficas.models import similitud_autores 
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Investigador.models import Investigador
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
from apps.informacionLaboral.models import informacionLaboral
from apps.autoresLibro.models import autoresLibro
from apps.autoresArticulos.models import autoresArticulos
from apps.autoresPonencia.models import autoresPonencia
from apps.carrera.models import carrera
from django.contrib.auth.models import User
import json
import random
# Create your views here.
def Firstview(request):
     bd=linea_investigacion.objects.all()
     inves=Investigador.objects.all()
     auto=autoresLibro.objects.all()
     arti=autoresArticulos.objects.all()
     return render(request, 'Home/viewsimilitud.html',{'bd':bd,'inves':inves,'auto':auto,'arti':arti})  

def Firstview2(request):
     bd=carrera.objects.all()
     return render(request, 'Home/viewgrafica.html',{'bd':bd})  

def Viewssimilitud(request):
    total=[]
    sub = request.POST['SubLinea']
    lin = request.POST['lineaInves']
    car = request.POST['Carrera']
    if sub=='0':
        if car != '0':
            sub=sub_lin_investigacion.objects.filter(linea_investigacion_id=lin)
            sublin=sub.filter(Carrera_id=car)
        else:
            sublin=sub_lin_investigacion.objects.filter(linea_investigacion_id=lin)
            
        for simi in sublin:
            simili = similitud_autores.objects.filter(area_id=simi.id)
            for un in simili:
                total.append(un)
        simili1 = [datos_serealizar(similitud) for similitud in total ]
        return HttpResponse(json.dumps(simili1), content_type='application/json')
    else:
        simili = similitud_autores.objects.filter(area_id=sub)
        simili1 = [datos_serealizar(similitud) for similitud in simili ]
        return HttpResponse(json.dumps(simili1), content_type='application/json')
        
       
def datos_serealizar(similitud):
     autor = Investigador.objects.get(id=similitud.investigator.id)
     Nom=similitud.investigator.user.first_name
     Nom1 = Nom.split(' ')
     Ape=similitud.investigator.user.last_name
     Ape1 = Ape.split(' ')
     Nom2 = Nom1[0]
     Nombre=Ape1[0]+' '+Nom2[0]+'.'
     nombre=similitud.investigator.user.first_name+' '+similitud.investigator.user.last_name
     return {'id_in':autor.id,'CountryName':nombre,'CountryCode':similitud.coordenadax,'ContinentCode':similitud.area.Nombre,'Population':similitud.coordenaday,'Nombre':Nombre}


def buscar(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            sub = sub_lin_investigacion.objects.filter(linea_investigacion_id=data)
            results = []
            doctor_json = {}
            doctor_json['text'] = '---------------Todo---------------'
            doctor_json['value'] = '0'
            results.append(doctor_json)
            id_sub=0
            for i in sub:
                if id_sub!=i.Carrera.id:
                    doctor_json = {}
                    doctor_json['text'] = i.Carrera.Nombre
                    doctor_json['value'] = i.Carrera.id
                    results.append(doctor_json)
                    id_sub=i.Carrera.id
            data_json = json.dumps(results)
        else:
            results = []
            doctor_json = {}
            doctor_json['text'] = '----------'
            doctor_json['value'] = ''
            results.append(doctor_json)
            data_json = json.dumps(results)
    else:
        data_json='fail'
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

def buscar1(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        data1 = request.POST.get('datos1')
        if data:
            if data1 != '0':
                sub = sub_lin_investigacion.objects.filter(linea_investigacion_id=data)
                sub1 = sub.filter(Carrera_id = data1)
                results = []
                doctor_json = {}
                doctor_json['text'] = '---------------Todo---------------'
                doctor_json['value'] = '0'
                results.append(doctor_json)
                for i in sub1:
                    doctor_json = {}
                    doctor_json['text'] = i.Nombre
                    doctor_json['value'] = i.id
                    results.append(doctor_json)
                data_json = json.dumps(results)
            else:
                sub1 = sub_lin_investigacion.objects.filter(linea_investigacion_id=data)
                results = []
                doctor_json = {}
                doctor_json['text'] = '---------------Todo---------------'
                doctor_json['value'] = '0'
                results.append(doctor_json)
                for i in sub1:
                    doctor_json = {}
                    doctor_json['text'] = i.Nombre
                    doctor_json['value'] = i.id
                    results.append(doctor_json)
                data_json = json.dumps(results)   
        else:
            results = []
            doctor_json = {}
            doctor_json['text'] = '----------'
            doctor_json['value'] = ''
            results.append(doctor_json)
            data_json = json.dumps(results)
    else:
        data_json='fail'
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)    


def search(request):
    data = request.POST.get('datos')
    data=data.upper()
    user_inf= User.objects.all()
    Perfil=[]
    for i in user_inf:
        nom=i.first_name+' '+i.last_name
        nom=nom.upper()
        obj={'id':i.id,'Nombre':nom}
        Perfil.append(obj)    
    value= filter(lambda x: x['Nombre'].count(data) > 0,Perfil)
    inves = [inf_serealizar(inf['id']) for inf in value ]
    return HttpResponse(json.dumps(inves), content_type='application/json')

def inf_serealizar(inf):
     ver=Investigador.objects.get(user_id=inf)
     foto=str(ver.photo)
     if foto:
        foto='/media/'+foto
     else:
        foto='a' 
     return {'id_in':ver.id,'Nombre_in':ver.user.first_name,'Apellido_in':ver.user.last_name,'foto_in':foto}

def redesAutores(request):
    datos=[]
    nuevo=[]
    links=[]
    contador=0
    perfil1=User.objects.all()
    for a in perfil1:
        #Limpia los List
        relacion=[]
        vacio=[]
        vista=[]
        tem=[]
        cent=0
        #Busca los Articulos x cada Autor y CoAutores
        aut=autoresArticulos.objects.filter(user_id=a.id)
        if aut:
            cent=1
            for b in aut:
                coAu=autoresArticulos.objects.filter(articulo_id=b.articulo.id)
                for c in coAu:
                    if b.user.id!=c.user.id:
                        relacion.append({'nodo':{'Autor':b.user.id,'CoAutor':c.user.id}})
        #Busca los Libros x cada Autor y CoAutores
        lib=autoresLibro.objects.filter(user_id=a.id)
        if lib:
            cent=1
            for d in lib:
                coAu1=autoresLibro.objects.filter(libro_id=d.libro.id)
                for e in coAu1:
                    if d.user.id!=e.user.id:
                        relacion.append({'nodo':{'Autor':d.user.id,'CoAutor':e.user.id}})
        #Busca los Ponencia x cada Autor y CoAutores
        pon=autoresPonencia.objects.filter(user_id=a.id)
        if pon:
            cent=1
            for c in pon:
                coAu2=autoresPonencia.objects.filter(ponencia_id=c.ponencia.id)
                for f in coAu2:
                    if c.user.id!=f.user.id:
                        relacion.append({'nodo':{'Autor':c.user.id,'CoAutor':f.user.id}})
        #Elimina los CoAutores repetidos
        for j in relacion:
            if j['nodo']['CoAutor'] not in vacio:
                vista.append(j)
                vacio.append(j['nodo']['CoAutor'])
        #Limpio el List Vacio
        vacio=[]        
        #Elimina los Autores repetidos y Almacena los CoAutores en List
        for i in vista:
            if i['nodo']['Autor'] not in vacio:
                vacio.append(i['nodo']['Autor'])
                tem.append(i['nodo']['CoAutor'])
            else:
                tem.append(i['nodo']['CoAutor'])
        if cent>=1:     
            datos.append({'ind':contador,'Autor':a.id,'CoAutor':tem})
            contador=contador+1          
    #Union
    for j in datos:
        ver=j['CoAutor']
        ump=[]
        for t in ver:
            for k in datos:
                if t == k['Autor']:
                    if j['Autor']!=k['Autor']:
                        links.append({'source':j['ind'],'target':k['ind'],'weight':0.9})
                        ump.append(k['ind'])
        nuevo.append({'ind':j['ind'],'Autor':j['Autor'],'CoAutor':ump})
    #Forma los Json
    informacion=[jsonRedes(n) for n in nuevo]
    union={'nodes':informacion,'links':links}
    with open('C:/workspace/Cienciometrico/static/graficas/similaridad/json/jh/data.json', 'w') as file:
        json.dump(union, file, indent=4)
    return HttpResponse(json.dumps(union), content_type='application/json')

def jsonRedes(i):
    inve=Investigador.objects.get(user_id=i['Autor'])
    us=User.objects.get(id=i['Autor'])
    nombre=us.first_name+' '+us.last_name
    art = autoresArticulos.objects.filter(user_id=i['Autor']).count()
    lib = autoresLibro.objects.filter(user_id=i['Autor']).count()
    pon = autoresPonencia.objects.filter(user_id=i['Autor']).count()
    sc = art+lib+pon
    if sc <= 3:
        sc=5
          #conteo de de articulos, ponencias, libros para determinar radio
            #igualacion a 5 para radio minimo; Autores: Arauz,Mora,Tapia,Zambrano
    return {'index':i['ind'],'links':i['CoAutor'],'score':sc,'cover':str(inve.photo),'autor':nombre,'id':i['Autor']}

