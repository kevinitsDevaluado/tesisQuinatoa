from django.shortcuts import render
from apps.Investigador.models import Investigador
from apps.roles.models import Rol
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Libro.models import libro
from apps.Ponencia.models import ponencia
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
# nuevo
from apps.zona.models import zona
from apps.universidad.models import universidad
from apps.facultad.models import facultad
from apps.carrera.models import carrera
from apps.campus.models import campus
from django.views.generic import ListView,TemplateView, DetailView
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.autoresArticulos.models import autoresArticulos
from django.contrib.auth.models import User
from apps.Investigador.models import Investigador
from apps.informacionLaboral.models import informacionLaboral
from django.db import connection
from django.core import serializers
from django.http import HttpResponse
#para los reportes
from django.conf import settings
from io import BytesIO
from reportlab.pdfgen import canvas
from django.views.generic import View

from reportlab.platypus import SimpleDocTemplate, Paragraph, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Table
from reportlab.lib.pagesizes import A4
#nuevo
import json
import os
import collections
import csv
import random
#Busqueda
from django.db.models import Q
from apps.autoresLibro.models import autoresLibro
from apps.autoresPonencia.models import autoresPonencia
from apps.Ponencia.models import ponencia
#Busqueda autores
import numpy as np
from collections import namedtuple
#DSN = "dbname=Cienciometrico2 user=postgres password=1945"
var="0"

def error_404(request):
        data = {}
        return render(request,'error/error_404.html', data)

def error_500(request):
        data = {}
        return render(request,'error/error_500.html', data)

def clasificacionSVM(request):
        data = {}
        return render(request,'Home/clasificacion.html', data)
        
def inde(request):
    return render(request, 'Home/inicio.html',{'line':linea_investigacion.objects.all(), 'sub':sub_lin_investigacion.objects.all(), 'a':articulos_cientificos.objects.all().count(), 'b':libro.objects.all().count(), 'c':ponencia.objects.all().count()})

def producc(request):
    return render(request, 'Home/produccioncientifica.html')

def similar(request):
    perfil = Investigador.objects.all()
    privi = []
    for p in perfil:
        if p.roles == '3':
            privi.append(p)

    return render(request, 'Home/similares.html',{'usuario': perfil})
#Busqueda 
class DetalleArticulos(DetailView):
    model = articulos_cientificos
    template_name = 'Home/detalleArticulo.html'

class DetalleLibros(DetailView):
    model = libro
    template_name = 'Home/detalleLibro.html'

class DetallePonencias(DetailView):
    model = ponencia
    template_name = 'Home/detallePonencia.html'

class BuscarTodoView(TemplateView):
    template_name = 'Home/buscar.html'
    model=autoresArticulos
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        autoArt=autoresArticulos.objects.all()
        autoLib = autoresLibro.objects.all()
        autoPon = autoresPonencia.objects.all()
        perfil = Investigador.objects.all()
        qsetA = (
                Q(tituloSearch__icontains=buscar) 
                #Q(resumen__icontains=buscar) eliminacion para agilizar la busqueda
        )
        qsetL = (
                Q(Titulo__icontains=buscar) 
                #Q(Resumen__icontains=buscar) eliminacion para agilizar la busqueda
        )
        qsetP = (
                Q(tituloPonencia__icontains=buscar) 
                #Q(resumen__icontains=buscar) eliminacion para agilizar la busqueda
        )

        ponencias = ponencia.objects.filter(qsetP)
        articulos =  articulos_cientificos.objects.filter(qsetA)
        libros = libro.objects.filter(qsetL)
        return render(request, 'Home/buscar.html', {'articulos':articulos, 'ponencias':ponencias, 'articulo':True,'libros':libros,'libro':True,'autoArt':autoArt,'autoLib':autoLib,'autoPon':autoPon, 'buscar':buscar,'perfil':perfil})

class BuscarArtView(TemplateView):
    template_name = 'Home/BuscarArticulo.html'
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        autoArt = autoresArticulos.objects.all()
        perfil = Investigador.objects.all()
        qsetA = (
                Q(tituloSearch__icontains=buscar) |
                Q(resumen__icontains=buscar)
        )
        articulos =  articulos_cientificos.objects.filter(qsetA)
        return render(request, 'Home/buscarArticulo.html', {'articulos':articulos, 'articulo':True, 'autoArt':autoArt,'perfil':perfil, 'buscar':buscar})
class BuscarArtiView(TemplateView):
    template_name = 'Home/prueba.html'
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        autoArt = autoresArticulos.objects.all()
        qsetA = (
                Q(tituloSearch__icontains=buscar) |
                Q(resumen__icontains=buscar)
        )
        articulos =  articulos_cientificos.objects.filter(qsetA)
        return render(request, 'Home/prueba.html', {'articulos':articulos, 'articulo':True, 'autoArt':autoArt, 'buscar':buscar})
class BuscarLibView(TemplateView):
    template_name = 'Home/BuscarLibro.html'
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        autoLib = autoresLibro.objects.all()
        perfil = Investigador.objects.all()
        qsetL = (
                Q(Titulo__icontains=buscar) |
                Q(Resumen__icontains=buscar)
        )
        libros = libro.objects.filter(qsetL)
        return render(request, 'Home/buscarLibro.html', {'libros':libros,'libro':True,'autoLib':autoLib,'perfil':perfil, 'buscar':buscar})

class BuscarPonView(TemplateView):
    template_name = 'Home/BuscarPonencia.html'
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        autoPon = autoresPonencia.objects.all()
        perfil = Investigador.objects.all()
        qsetP = (
                Q(tituloPonencia__icontains=buscar) |
                Q(resumen__icontains=buscar)
        )
        ponencias = ponencia.objects.filter(qsetP)
        return render(request, 'Home/BuscarPonencia.html', {'ponencias':ponencias,'autoPon':autoPon,'perfil':perfil, 'buscar':buscar})
def lista_titulos(request):
    if request.is_ajax:
        search = request.GET.get('start', '')

        articulos = articulos_cientificos.objects.filter(tituloSearch__icontains=search)
        librs = libro.objects.filter(Titulo__icontains=search)

        results = []
        for articulo in articulos:
            articulo_json = {}
            articulo_json['label'] = articulo.tituloSearch
            articulo_json['value'] = articulo.tituloSearch
            results.append(articulo_json)
        for l in librs:
            l_json = {}
            l_json['label'] = l.Titulo
            l_json['value'] = l.Titulo
            results.append(l_json)
        data_json = json.dumps(results)

    else:
        data_json = 'fail'
    mimetype = "application/json"
    return HttpResponse(data_json, mimetype)

    #clase agregada por: Arauz; Mora;Tapia;Zambrano
    #Agregacion de la busqueda por autor   fecha:  03/07/2019
    
class BuscarAutView(TemplateView):
    template_name = 'Home/BuscarAutor.html'
    def get(self,request,*args, **kwargs):
        buscar = request.GET.get('buscalo','')
        perfil = Investigador.objects.all()
        facs = facultad.objects.all()
        il = informacionLaboral.objects.all()
        qsetA = ( Q(first_name__icontains=buscar) | Q(last_name__icontains=buscar) )
        auts = User.objects.filter(qsetA)
        Lang = namedtuple("Lang", ("autor", "numeroa", "numerol", "numeroap"))
        langs = []
        for x in auts:
            art = autoresArticulos.objects.filter(user_id=x.id).count()
            lib = autoresLibro.objects.filter(user_id=x.id).count()
            pon = autoresPonencia.objects.filter(user_id=x.id).count()
            langs.append(Lang(x,art,lib,pon))
        return render(request, 'Home/BuscarAutor.html', {'buscar':buscar,'perfil':perfil,'facs':facs,'il':il,'auts':auts,'langs':langs})

#Fin Busqueda
class BusquedaView(ListView):
    model = zona
    template_name = "Home/Graficas.html"
    context_object_name = 'zona'
class BusquedaAjaxView(TemplateView):


    def get(self,request,*args, **kwargs):
        id_zona=request.GET['id']

        #print (id_zona)

        univer=universidad.objects.filter(zona__id=id_zona)
        #print(univer)
        data= serializers.serialize('json',univer,
                            fields=('id','Nombre'))
        #print(data)
        return HttpResponse(data, content_type='application/json')
class BusquedaCampusView(TemplateView):
    def get(self,request,*args, **kwargs):
        id_uni=request.GET['id']
        #print (id_uni)

        facul=campus.objects.filter(universidad__id=id_uni)
        #print(facul)
        data= serializers.serialize('json',facul,
                            fields=('id','Nombre'))
        return HttpResponse(data, content_type='application/json')
class BusquedaFacuView(TemplateView):
    def get(self,request,*args, **kwargs):
        id_campus=request.GET['id']
        #print (id_campus)

        facul=facultad.objects.filter(campus__id=id_campus)
        #print(facul)
        data= serializers.serialize('json',facul,
                            fields=('id','Nombre'))
        return HttpResponse(data, content_type='application/json')
class BusquedaCarreraView(TemplateView):
    def get(self,request,*args, **kwargs):
        id_facul=request.GET['id']
        #print (id_facul)

        carrer=carrera.objects.filter(facultad__id=id_facul)

        #print(carrer)
        data= serializers.serialize('json',carrer,
                            fields=('id','Nombre'))
        #print(data)
        return HttpResponse(data, content_type='application/json')
class BusquedaFiltroView(TemplateView):
    def get(self,request,*args, **kwargs):
        zon=request.GET['z']
        uni=request.GET['u']
        camp=request.GET['cam']
        facu=request.GET['f']
        carr=request.GET['c']
        fy=request.GET['fy']
        #------------------------------POR CARRERA ESPECIFICA------------------------------------
        if int(zon)>0 and int(uni)>0 and int(camp)>0 and int(facu)>0 and int(carr)>0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==2:
                json=ProcesaGraficaCarrera(carr)
                s=[['utc',5],['uta',9]]
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaCarreraLibro(carr)  
                s=[['utc',5],['uta',9]]
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==1:
                json=ProcesaGraficaCarreraLibroCapitulo(carr)  
                s=[['utc',5],['uta',9]]
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==4:
                json=ProcesaGraficaCarreraPonencia(carr)  
                s=[['utc',5],['uta',9]]
                return HttpResponse(json, content_type='application/json')

        #-----------------------------Por FACULTAD TODAS LAS CARRERAS--------------------------------------
        if int(zon)>0 and int(uni)>0 and int(camp)>0 and int(facu)>0 and int(carr)==0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==1:
                json=ProcesaGraficaCarrerasTodoLibroCapitulo(facu)
                return HttpResponse(json, content_type='application/json')

            if int(fy) ==2:
                json=ProcesaGraficaCarrerasTodo(facu)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaCarrerasTodoLibro(facu)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==4:
                json=ProcesaGraficaCarrerasTodoPonencia(facu)
                return HttpResponse(json, content_type='application/json')

        #--------------------------------Por CTODAS LAS FAULTADES-----------------------------------------
        if int(zon)>0 and int(uni)>0 and int(camp)>0 and int(facu)==0 and int(carr)==0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==1:
                json=ProcesaGraficaFacultadesTodoLibroCapitulo(camp)
                return HttpResponse(json, content_type='application/json')
            
            if int(fy) ==2:
                json=ProcesaGraficaFacultadesTodo(camp)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaFacultadesTodoLibro(camp)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==4:
                json=ProcesaGraficaFacultadesTodoPonencia(camp)
                return HttpResponse(json, content_type='application/json')

        #--------------------------------Por TODAS LOS CAMPUS-----------------------------------------
        if int(zon)>0 and int(uni)>0 and int(camp)==0 and int(facu)==0 and int(carr)==0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==1:           
                json=ProcesaGraficaCampusTodoLibroCapitulo(uni)
                return HttpResponse(json, content_type='application/json')
            
            if int(fy) ==2:
                json=ProcesaGraficaCampusTodo(uni)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaCampusTodoLibro(uni)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==4:
                json=ProcesaGraficaCampusTodoPonencia(uni)
                return HttpResponse(json, content_type='application/json')

        #--------------------------------Por TODAS LAS UNIVERSIDADES-----------------------------------------
        if int(zon)>0 and int(uni)==0 and int(camp)==0 and int(facu)==0 and int(carr)==0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==1:
                json=ProcesaGraficaUniversidadTodoLibroCapitulo(zon)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==2:
                json=ProcesaGraficaUniversidadTodo(zon)
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaUniversidadTodoLibro(zon)
                return HttpResponse(json, content_type='application/json') 
            if int(fy) ==4:
                json=ProcesaGraficaUniversidadTodoPonencia(zon)
                return HttpResponse(json, content_type='application/json') 

        #--------------------------------Por TODAS LAs ZONAS-----------------------------------------
        if int(zon)==0 and int(uni)==0 and int(camp)==0 and int(facu)==0 and int(carr)==0 and (int(fy) ==1 or int(fy) ==2 or int(fy) ==3 or int(fy) ==4):
            if int(fy) ==1:
                json=ProcesaGraficaZonaTodoLibroCapitulo()
                return HttpResponse(json, content_type='application/json')
            
            if int(fy) ==2:
                json=ProcesaGraficaZonaTodo()
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==3:
                json=ProcesaGraficaZonaTodoLibro()
                return HttpResponse(json, content_type='application/json')
            if int(fy) ==4:
                json=ProcesaGraficaZonaTodoPonencia()
                return HttpResponse(json, content_type='application/json')

# area de funciones
def ProcesaGraficaCarrera(c):
    separador=" "
    carr=consultar_articulos_carrera(c)
    num=0;
    vector_articulos=[]
    nombre_carrera="."
    for c in carr:
        doc=" "
        vec_temp=[]
        coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
        vec_temp.append(c.titulo)
        vec_temp.append(c.url)
        vec_temp.append(c.iSSN)
        vec_temp.append(c.volumen)
        doc=str(c.documento)
        vec_temp.append(doc)
        #print(doc)
        vec_temp.append(c.revista.Nombre)
        vec_temp.append(c.first_name + separador + c.last_name)
        vec_temp.append(coautore)    #AGREGAR COAUTORES A VECTOR TEMPORAL
        vector_articulos.append(vec_temp)
        nombre_carrera=c.Nombre
    num=Cuenta_registros(carr)
    
    #print("el vector articulo es")
    #print(vector_articulos)
    vector_carrera=[]
    vector_carrera.append(nombre_carrera)
    vector_carrera.append(num)
    vector_carrera.append(vector_articulos)
    #vector_carrera.append(vector_articulos)

    vector_final=[]
    vector_final.append(vector_carrera)
    json=serializaVector(vector_final)
    #print (json)
    return json

# Inicio ProcesaGraficaCampusTodoLibro
# Fecha: 20-05-2019
# Detalle: BUSQUEDA DE COAUTORES LIBROS
#ELABORADO POR: CARLOS ALCASIGA, GHISLAINE CAMPOVERDE, GINGER DE LA BASTIDA, EDWIN RISUEÑO, ALEX ZHININ

#------------------------   BUSCAR COAUTORES ARTICULOS -------------------------

def BuscarCoautores(idRevista):
    sep=" "

    bcoautores=autoresArticulos.objects.filter(articulo_id=idRevista)

    coaA=[]
    for a in bcoautores:

        coaA.append(a.user.first_name+sep+a.user.last_name)

        listas= coaA[1:6]

        r=list(listas)
        s=", ".join(r)

        #print(s)

    return s

#FINN DE CODIGO

#---------------------GRAFICAR POR FACULTADES ARTICULOS------------------

def ProcesaGraficaCarrerasTodo(facu):
        separador=" "
        carrer=carrera.objects.filter(facultad__id=facu)
        nombres_carrera=[] #para los nombres de las carreras
        ids_carrera=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_articulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in carrer:
            nombres_carrera.append(row.Nombre)
            ids_carrera.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        cont=0

        vector_articulos_final=[]
        for contAR in ids_carrera:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_articulos_carrera(str(ids_carrera[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
                #print(c.titulo)
                vec_temp.append(c.titulo)
                vec_temp.append(c.url)
                vec_temp.append(c.iSSN)
                vec_temp.append(c.volumen)
                doc=str(c.documento)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.revista.Nombre)
                vec_temp.append(c.first_name + separador + c.last_name )
                vec_temp.append(coautore)    #AGREGA COAUTORES AL VECTOR TEMPORAL
                vector_articulos.append(vec_temp)
                nombre_carrera=c.Nombre
            vector_articulos_final.append(vector_articulos)
            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_carrera[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_articulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        return json
        #guardamos los articulos encontrados en esta carrera
#-------------------------------Por CAMPUS ARTICULOS--------------------
def ProcesaGraficaFacultadesTodo(camp):
        separador=" "
        facul=facultad.objects.filter(campus__id=camp)
        nombres_facultad=[] #para los nombres de las carreras
        ids_facultad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_articulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in facul:
            nombres_facultad.append(row.Nombre)
            ids_facultad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_articulos_final=[]
        cont=0
        for contAR in ids_facultad:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_articulos_facultad(str(ids_facultad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
                #print(c.titulo)
                vec_temp.append(c.titulo)
                vec_temp.append(c.url)
                vec_temp.append(c.iSSN)
                vec_temp.append(c.volumen)
                doc=str(c.documento)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.revista.Nombre)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGA COAUTORES AL VECTOR TEMPORAL
                vector_articulos.append(vec_temp)
            vector_articulos_final.append(vector_articulos)

            cont=cont+1
            cont1=0
        
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_facultad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_articulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
       # print (json)
        return json
        #guardamos los articulos encontrados en esta carrera

#------------------------------POR TODOS LOS CAMPUS ARTICULOS--------------
def ProcesaGraficaCampusTodo(uni):
        separador=" "
        camp=campus.objects.filter(universidad__id=uni)

        nombres_campus=[] #para los nombres de las carreras
        ids_campus=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_articulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in camp:
            nombres_campus.append(row.Nombre)
            ids_campus.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_articulos_final=[]
        cont=0
        for contAR in ids_campus:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_articulos_campus(str(ids_campus[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
                #print(c.titulo)
                vec_temp.append(c.titulo)
                vec_temp.append(c.url)
                vec_temp.append(c.iSSN)
                vec_temp.append(c.volumen)
                doc=str(c.documento)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.revista.Nombre)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGA COAUTORES AL VECTOR TEMPORAL
                vector_articulos.append(vec_temp)
            vector_articulos_final.append(vector_articulos)

            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_campus[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_articulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)
        #print (json)
        return json
        #guardamos los articulos encontrados en esta carrera
def ProcesaGraficaUniversidadTodo(zona):
        separador=" "
        univer=universidad.objects.filter(zona__id=zona)
        nombres_universidad=[] #para los nombres de las carreras
        ids_universidad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_articulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in univer:
            nombres_universidad.append(row.Nombre)
            ids_universidad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_articulos_final=[]
        cont=0
        for contAR in ids_universidad:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_articulos_universidad(str(ids_universidad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
                #print(c.titulo)
                vec_temp.append(c.titulo)
                vec_temp.append(c.url)
                vec_temp.append(c.iSSN)
                vec_temp.append(c.volumen)
                doc=str(c.documento)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.revista.Nombre)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGA COAUTORES AL VECTOR TEMPORAL
                vector_articulos.append(vec_temp)
            vector_articulos_final.append(vector_articulos)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_universidad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_articulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0
        json=serializaVector(vector_final)
        
        return json
        #guardamos los articulos encontrados en esta carrera
def ProcesaGraficaZonaTodo():
        separador=" "
        zon=zona.objects.filter(pais__id=52)
        nombres_zona=[] #para los nombres de las carreras
        ids_zona=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_articulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in zon:
            nombres_zona.append(row.Nombre)
            ids_zona.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_articulos_final=[]
        cont=0
        for contAR in ids_zona:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_articulos_zona(str(ids_zona[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautores(c.id)    #LLAMADA A LA FUNCION BUSCAR COAUTORES
                #print(c.titulo)
                vec_temp.append(c.titulo)
                vec_temp.append(c.url)
                vec_temp.append(c.iSSN)
                vec_temp.append(c.volumen)
                doc=str(c.documento)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.revista.Nombre)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGA COAUTORES AL VECTOR TEMPORAL
                vector_articulos.append(vec_temp)
            vector_articulos_final.append(vector_articulos)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_zona[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_articulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)

        return json
        #guardamos los articulos encontrados en esta carrera

def serializaVector(vector):
    v=json.dumps(vector)
    return v
def Cuenta_registros(obj):
    contador=0;
    for row in obj:
        contador=contador+1
    return contador
class Docs_pdf(View):
    def get(self, request, *args, **kwargs):

        datos = request.GET.getlist('datos[]')
        datos_list = json.loads(datos[0])
        print("////////////////////////////LA DATA ES///////////////////////////////////////")
        for ar in datos_list:
            print(ar[4])





        return HttpResponse('Success')



class Reporte(View):
  def get(self, request, *args, **kwargs):
        if request.method == "GET":
            titulo = request.GET.getlist('data[titulo][]')
            url = request.GET.getlist('data[url][]')
            issn = request.GET.getlist('data[issn][]')
            volumen = request.GET.getlist('data[volumen][]')
            documento = request.GET.getlist('data[documento][]')
            autor = request.GET.getlist('data[autor][]')
            revista = request.GET.getlist('data[revista][]')
            nombres = request.GET.getlist('data[nombres][]')



            cont=0
            vector_data=[]
            for d in titulo:
                vector_temporal=[]
                vector_temporal.append(titulo[cont])
                vector_temporal.append(url[cont])
                vector_temporal.append(issn[cont])
                vector_temporal.append(volumen[cont])
                vector_temporal.append(documento[cont])
                vector_temporal.append(autor[cont])
                vector_temporal.append(revista[cont])
                vector_data.append(vector_temporal)
                cont=cont+1

      #Indicamos el tipo de contenido a devolver, en este caso un pdf
        response = HttpResponse(content_type='application/pdf')
        #La clase io.BytesIO permite tratar un array de bytes como un fichero binario, se utiliza como almacenamiento temporal
        buffer = BytesIO()
        #Canvas nos permite hacer el reporte con coordenadas X y Y
        pdf = canvas.Canvas(buffer,pagesize=A4)

        #Llamo al método cabecera donde están definidos los datos que aparecen en la cabecera del reporte.
        self.cabecera(pdf)
        #config valores
        # numero de articulos por hoja
        num_ar_h=7




        #self.tabla(pdf,vector_data)
        contador=0;
        data=[]
        datos=[]
        num_total_vector=0
        # contamos el cuantos articulos tiene que utilizaremos mas abajo
        for h in vector_data:
            num_total_vector=num_total_vector+1
        # variable que guarda el munro del ultimo vector que guardo
        contador_global=0
        for d in vector_data:
            temp=[]
            temp.append(d[0])
            temp.append(d[1])
            temp.append(d[2])
            temp.append(d[3])
            temp.append(d[4])
            temp.append(d[5])
            temp.append(d[6])
            datos.append(temp)
            contador=contador+1
            muestra=0
            if contador==num_ar_h:
                contador_global=contador_global+num_ar_h
                data.append(datos)
                contador=0
                datos=[]
                muestra=1
            else:
                muestra=0
            if muestra==0 and contador_global==num_total_vector-contador:
                data.append(datos)
                contador=0
                datos=[]




        ind=0
        for dat in data:
            self.tabla(pdf,vector_data,dat)
            pdf.showPage()
            ind=ind+1











        pdf.save()
        pdf = buffer.getvalue()
        buffer.close()
        response.write(pdf)
        return response
  def cabecera(self,pdf):
          #Utilizamos el archivo logo_django.png que está guardado en la carpeta media/imagenes
          archivo_imagen = settings.MEDIA_ROOT+'/reportes/UTC3.png'
          #Definimos el tamaño de la imagen a cargar y las coordenadas correspondientes
          #                             x    y  with    height
          pdf.drawImage(archivo_imagen, 10, 740,120    ,  80,preserveAspectRatio=True)
          #Establecemos el tamaño de letra en 16 y el tipo de letra Helvetica
          pdf.setFont("Helvetica", 16)
          #Dibujamos una cadena en la ubicación X,Y especificada
          # x=590
          #  y=840
          #              x    y
          pdf.drawString(190, 800, "UNIDAD DE INVESTIGACIÓN UTC")
          pdf.setFont("Helvetica", 12)
          pdf.drawString(255, 770, "Artículos Científicos")
          pdf.setFont("Helvetica", 9)
  cuenta=0;
  def tabla(self,pdf,data,data2):
          styles=getSampleStyleSheet()
          y_table =600
          x_table=10
          y_ocupaTable=600
          x_ocupaTable=800
          #Creamos una tupla de encabezados para neustra tabla
          d=Paragraph('DOCUMENTO',styles['Normal'])
          encabezados = ('#','TÍTULO', 'URL','ISSN','VOLUMEN',d,'AUTOR','REVISTA')


         # print (obj)
          for d in data:
              y_table=y_table-60

          pdf.setFont("Helvetica", 8)
          conta=0
          detalle=[]
          for s in data2:

              temp=[]

              temp.append([(Paragraph(str(conta),styles['Normal']))])
              temp.append([(Paragraph(s[0],styles['Normal']))])
              temp.append([(Paragraph(s[1],styles['Normal']))])
              temp.append([(Paragraph(s[2],styles['Normal']))])
              temp.append([(Paragraph(s[3],styles['Normal']))])
              temp.append([(Paragraph('http://ecuciencia.utc.edu.ec:8000/media/'+s[4],styles['Normal']))])
              temp.append([(Paragraph(s[5],styles['Normal']))])
              temp.append([(Paragraph(s[6],styles['Normal']))])

              detalle.append(temp)
              conta=conta+1









          #c=1
         # for d in data:
        #     temp= []
        #     temp.append([(Paragraph(str(c),styles['Normal']))])
        #     temp.append([(Paragraph(d[0],styles['Normal']))])
        #     temp.append([(Paragraph(d[1],styles['Normal']))])
        #     temp.append([(Paragraph(d[2],styles['Normal']))])
        #     temp.append([(Paragraph(d[3],styles['Normal']))])
        #     temp.append([(Paragraph(d[4],styles['Normal']))])
        #     temp.append([(Paragraph(d[5],styles['Normal']))])
        #     temp.append([(Paragraph(d[6],styles['Normal']))])
        #     detalle.append(temp)
        #     c=c+1

          #detalle = [(Paragraph(d[0],styles['Normal']), Paragraph(d[1],styles['Normal']),Paragraph(d[2],styles['Normal']),Paragraph(d[3],styles['Normal']),Paragraph('http://ecuciencia.utc.edu.ec:8000/media/'+ d[4],styles['Normal']),Paragraph(d[5],styles['Normal']), Paragraph(d[6],styles['Normal'])) for d in data]


          #Establecemos el tamaño de cada una de las columnas de la tabla
          #                      encabezado     contenido           colum 1   colum 2
          detalle_orden = Table([encabezados]+ detalle, colWidths=[0.4* cm,4* cm,3 * cm,2* cm,2 * cm,3* cm,3 * cm,3* cm])
          #Aplicamos estilos a las celdas de la tabla
          detalle_orden.setStyle(
          TableStyle(
              [       #La primera fila(encabezados) va a estar centrada
                      ('INERGRID', (0,0),(-1,-1),0.25, colors.black),
                      ('ALIGN',(0,0),(3,0),'CENTER'),
                      #Los bordes de todas las celdas serán de color negro y con un grosor de 1
                      ('GRID', (0, 0), (-1, -1), 1, colors.black),
                      #El tamaño de las letras de cada una de las celdas será de 10
                      ('FONTSIZE', (0, 0), (-1, -1), 10),

                      ]
              ))

          #Establecemos el tamaño de la hoja que ocupará la tabla
          detalle_orden.wrapOn(pdf, y_ocupaTable, x_ocupaTable)
          #Definimos la coordenada donde se dibujará la tabla
          detalle_orden.drawOn(pdf, x_table,y_table)
          #Con show page hacemos un corte de página para pasar a la siguient

def consultar_articulos_carrera(valor):
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url,'
    query2= ' "iSSN",volumen,"Articulos_Cientificos_articulos_cientificos".documento,'
    query3= ' "auth_user".id,"auth_user".first_name, "auth_user"."last_name","Revista_revista".id ,"Revista_revista"."Nombre","carrera_carrera"."Nombre"'
    query4= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos",'
    query5= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral",'
    query6= ' "carrera_carrera","Revista_revista"'
    query7= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id'
    query8= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query9= ' and "auth_user".id= "Investigador_investigador".user_id'
    query10=' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query11=' and "informacionLaboral_informacionlaboral".carrera_id="carrera_carrera".id'
    query12=' and  "Revista_revista".id ="Articulos_Cientificos_articulos_cientificos".revista_id'
    txt="'Primero'"
    txt2="'Si'"
    query13=' and "autoresArticulos_autoresarticulos"."gradoAutoria"= '+txt
    query14=' and "carrera_carrera".id='+valor
    query15=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14+query15
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    
    #print (ar)
    return(ar)
def consultar_articulos_facultad(valor):
    print("Estoy en la funcion 1")
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url,'
    query2= ' "iSSN",volumen,"Articulos_Cientificos_articulos_cientificos".documento,'
    query3= ' "auth_user".id,"auth_user".first_name,"auth_user"."last_name","Revista_revista".id ,"Revista_revista"."Nombre"'
    query4= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos",'
    query5= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral",'
    query6= ' "facultad_facultad","Revista_revista"'
    query7= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id'
    query8= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query9= ' and "auth_user".id= "Investigador_investigador".user_id'
    query10=' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query11=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query12=' and  "Revista_revista".id ="Articulos_Cientificos_articulos_cientificos".revista_id'
    txt="'Primero'"
    query13=' and "autoresArticulos_autoresarticulos"."gradoAutoria"= '+txt
    query14=' and "facultad_facultad".id='+valor
    txt2="'Si'"
    query15=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14+query15
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)
def consultar_articulos_campus(valor):
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url, "iSSN",volumen,'
    query2= '"Articulos_Cientificos_articulos_cientificos".documento, "auth_user".first_name,"auth_user"."last_name","Revista_revista"."Nombre"'
    query3= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos", "auth_user",'
    query4= ' "Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","Revista_revista"'
    query5= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id '
    query6= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query7= ' and "auth_user".id= "Investigador_investigador".user_id'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query9=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query10=' and "Revista_revista".id="Articulos_Cientificos_articulos_cientificos".revista_id'
    query11=' and "facultad_facultad".campus_id ="campus_campus".id'
    txt="'Primero'"
    query12=' and "autoresArticulos_autoresarticulos"."gradoAutoria"='+txt
    query13=' and "campus_campus".id='+valor
    txt2="'Si'"
    query14=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)
def consultar_articulos_universidad(valor):
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url, "iSSN",volumen,'
    query2= '"Articulos_Cientificos_articulos_cientificos".documento, "auth_user".first_name,"auth_user"."last_name","Revista_revista"."Nombre"'
    query3= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos", "auth_user",'
    query4= ' "Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","Revista_revista","universidad_universidad"'
    query5= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id '
    query6= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query7= ' and "auth_user".id= "Investigador_investigador".user_id'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query9=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query10=' and "Revista_revista".id="Articulos_Cientificos_articulos_cientificos".revista_id'
    query11=' and "facultad_facultad".campus_id ="campus_campus".id and "campus_campus".universidad_id ="universidad_universidad".id'
    txt="'Primero'"
    query12=' and "autoresArticulos_autoresarticulos"."gradoAutoria"='+txt
    query13=' and "universidad_universidad".id='+valor
    txt2="'Si'"
    query14=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)
def consultar_articulos_zona(valor):
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url, "iSSN",volumen,'
    query2= '"Articulos_Cientificos_articulos_cientificos".documento, "auth_user".first_name,"auth_user"."last_name","Revista_revista"."Nombre"'
    query3= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos", "auth_user",'
    query4= ' "Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","Revista_revista","universidad_universidad","zona_zona"'
    query5= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id '
    query6= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query7= ' and "auth_user".id= "Investigador_investigador".user_id'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query9=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query10=' and "Revista_revista".id="Articulos_Cientificos_articulos_cientificos".revista_id'
    query11=' and "facultad_facultad".campus_id ="campus_campus".id and "campus_campus".universidad_id ="universidad_universidad".id and "universidad_universidad".zona_id="zona_zona".id'
    txt="'Primero'"
    query12=' and "autoresArticulos_autoresarticulos"."gradoAutoria"='+txt
    query13=' and "zona_zona".id='+valor
    txt2="'Si'"
    query14=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    
    return(ar)



  # c=0
 #  print(id_infolabo[c+1])

    #    for au_ar in autorarticulo:
    #        investigador=Investigador.objects.filter(user=au_ar.user)
    #        informacionLaboral=informacionLaboral.objects.filter(id=investigador.informacionLaboral)
    #        if informacionLaboral.carrera_id==valor
    #           articuloCaer.ADD



    #    articulos = articulos_cientificos.objects.all()

    #    carrer=carrera.objects.filter(facultad__id=id_facul)

class BusquedaFiltroFacultadView(TemplateView):


    def get(self,request,*args, **kwargs):
        campus=request.GET['campus']
        facultad=request.GET['facultad']
        carrera=request.GET['carrera']
        filtroY=request.GET['filtroY']
        universidad=request.GET['universidad']
        zona=request.GET['zona']
        print(campus)
        print(facultad)
        print(carrera)
        print(filtroY)
        print(universidad)
        print(zona)


        if(int(zona)>0 and int(universidad)> 0 and int(campus)>0 and int(facultad)==0 and int(carrera)==0 and int(filtroY)==2):
            print('entre en articulos campus')
            print (campus);
            obj= consultar_Articulos_campus(campus)
            #num_ar=Cuenta_registros(obj)
            #var="1"
            #for a in obj:
             #     print(a.Nombre)
            data= serializers.serialize('json',obj,
                           fields=('titulo','url','iSSN','volumen','documento','first_name','Nombre'))
          #print(data)
            return HttpResponse(data, content_type='application/json')

        if(int(zona)>0 and int(universidad)> 0 and int(campus)>0 and int(facultad)>0 and int(carrera)==0 and int(filtroY)==2):
            print('entre articulos facultad')
            print (campus);
            obj= consultar_articulos_facultad(facultad)
            #num_ar=Cuenta_registros(obj)
            #var="1"
            #for a in obj:
             #     print(a.Nombre)
            data= serializers.serialize('json',obj,
                           fields=('titulo','url','iSSN','volumen','documento','first_name','Nombre'))
          #print(data)
            return HttpResponse(data, content_type='application/json')

def consultar_Articulos_campus(valor):
   
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url, "iSSN",volumen,'
    query2= '"Articulos_Cientificos_articulos_cientificos".documento, "auth_user".first_name,"auth_user"."last_name","Revista_revista"."Nombre"'
    query3= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos", "auth_user",'
    query4= ' "Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","Revista_revista"'
    query5= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id '
    query6= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query7= ' and "auth_user".id= "Investigador_investigador".user_id'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query9=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query10=' and "Revista_revista".id="Articulos_Cientificos_articulos_cientificos".revista_id'
    query11=' and "facultad_facultad".id="campus_campus".id'
    txt="'Primero'"
    query12=' and "autoresArticulos_autoresarticulos"."gradoAutoria"='+txt
    query13=' and "campus_campus".id='+valor
    txt2="'Si'"
    query14=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)
def consultar_articulos_facultad(valor):
    print("Estoy en la funcion 2")
    query ='SELECT "Articulos_Cientificos_articulos_cientificos".id,titulo,url,'
    query2= ' "iSSN",volumen,"Articulos_Cientificos_articulos_cientificos".documento,'
    query3= ' "auth_user".id,"auth_user".first_name,"auth_user"."last_name","Revista_revista".id ,"Revista_revista"."Nombre"'
    query4= ' FROM "Articulos_Cientificos_articulos_cientificos","autoresArticulos_autoresarticulos",'
    query5= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral",'
    query6= ' "facultad_facultad","Revista_revista"'
    query7= ' WHERE "Articulos_Cientificos_articulos_cientificos".id = "autoresArticulos_autoresarticulos".articulo_id'
    query8= ' AND "autoresArticulos_autoresarticulos".user_id= "auth_user".id'
    query9= ' and "auth_user".id= "Investigador_investigador".user_id'
    query10=' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral".id'
    query11=' and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad".id'
    query12=' and  "Revista_revista".id ="Articulos_Cientificos_articulos_cientificos".revista_id'
    txt="'Primero'"
    query13=' and "autoresArticulos_autoresarticulos"."gradoAutoria"= '+txt
    query14=' and "facultad_facultad".id='+valor
    txt2="'Si'"
    query15=' and "filialUtc"='+txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14+query15
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    #print (queryTotal);
    return(ar)
def GraficasCarrera(request):
    lineas=linea_investigacion.objects.all().order_by('id')
    info=informacionLaboral.objects.all()
    articulos=articulos_cientificos.objects.all()
    contador=0
    with open('C:/workspace/Cienciometrico/static/tsv/companies.tsv', 'wt', encoding='utf-8', newline='') as out_file:
        tsv_writer = csv.writer(out_file, delimiter='\t', lineterminator='\n')
        tsv_writer.writerow(['cx','cy','capitalization','earnings','taxes','x','y','sector','name','alias','symbol','numArt'])
        for inf in info:
              usuarios=Investigador.objects.filter(informacionLaboral_id=inf.id)
              for usu in usuarios:
                contador=contador+1
                nombres=usu.user.first_name
                apellidos=usu.user.last_name
                care=inf.carrera
                if care:
                    sumArt=0
                    sumArt1=0
                    for a in articulos:
                        if a.user_id==usu.user_id:
                            sumArt=sumArt+1
                            sumArt1=sumArt1+1
                    if sumArt>0:
                        sumArt=sumArt*90222
                    else:
                        sumArt=90222    
                    tsv_writer.writerow([random.randrange(1,1200),random.randrange(-130,130),sumArt,random.randrange(2000,20000),4694,random.randrange(10,1180),random.randrange(-20,20),care,nombres,apellidos,care,sumArt1])
    return render(request, 'Home/Utc.html', {'lineas':lineas})
#----------------------------------------FUNCIONES DE LOS LLIBROS-------------------------------
# ----------------------LIBROS CARRERA-----------------

def ProcesaGraficaCarreraLibro(c):
    separador=" "
    carr=consultar_libros_carrera(c)
    num=0;
    vector_libros=[]
    nombre_carrera="."
    for c in carr:
        doc=" "
        vec_temp=[]
        coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
        vec_temp.append(c.Titulo)
        vec_temp.append(c.Url)
        vec_temp.append(c.ISBN)
        vec_temp.append(c.Editorial)
        doc=str(c.Documento)
        vec_temp.append(doc)
        #print(doc)
        fec=str(c.fechaPublicacion)
        vec_temp.append(fec)
        vec_temp.append(c.first_name +separador + c.last_name)
        vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
        vector_libros.append(vec_temp)
        nombre_carrera=c.Nombre
    num=Cuenta_registros(carr)
    #print("el vector articulo es")
    #print(vector_articulos)
    vector_carrera=[]
    vector_carrera.append(nombre_carrera)
    vector_carrera.append(num)
    vector_carrera.append(vector_libros)
    #vector_carrera.append(vector_articulos)
    vector_final=[]
    vector_final.append(vector_carrera)
    json=serializaVector(vector_final)
    return json

# Inicio Cambio
# Fecha: 20-05-2019
# Detalle: BUSQUEDA DE COAUTORES LIBROS
#ELABORADO POR: CARLOS ALCASIGA, GHISLAINE CAMPOVERDE, GINGER DE LA BASTIDA, EDWIN RISUEÑO, ALEX ZHININ

#--------------------------BUSCAR COAUTORES LIBROS---------------------------

def BuscarCoautoresl(idRevista):
    sep=" "

    bcoautores=autoresLibro.objects.filter(libro_id=idRevista)

    coaA=[]
    for a in bcoautores:

        coaA.append(a.user.first_name+sep+a.user.last_name)

        listas= coaA[1:7]

        r=list(listas)
        s=", ".join(r)

        #print(s)

    return s

# fin de Cambio

#-------------------------------POR FACULTADES LIBROS-----------------------------

def ProcesaGraficaCarrerasTodoLibro(facu):
        separador=" "
        carrer=carrera.objects.filter(facultad__id=facu)
        nombres_carrera=[] #para los nombres de las carreras
        ids_carrera=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_libros=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in carrer:
            nombres_carrera.append(row.Nombre)
            ids_carrera.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        cont=0

        vector_libros_final=[]
        for contAR in ids_carrera:
            vector_libros=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libros_carrera(str(ids_carrera[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.ISBN)
                vec_temp.append(c.Editorial)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_libros.append(vec_temp)
                nombre_carrera=c.Nombre
            vector_libros_final.append(vector_libros)
            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_carrera[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_libros_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_libros_carrera(valor):
    query ='SELECT "Libro_libro"."id","autoresLibro_autoreslibro"."gradoAutoria","Titulo","Url","ISBN","Editorial","Libro_libro"."Documento","fechaPublicacion",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name","carrera_carrera"."Nombre"'
    query3= ' FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "carrera_carrera"'
    query5= ' WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id"'
    query6= 'AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."carrera_id"="carrera_carrera"."id"'
    txt="'Primero'"
    query10=' and "autoresLibro_autoreslibro"."gradoAutoria"='+txt
    query11=' and "carrera_carrera".id='+valor
    txt2="'Si'"
    query12='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    return(ar)
#---------------------POR CAMPUS LIBROS-----------------------------------------
def ProcesaGraficaFacultadesTodoLibro(camp):
        separador=" "
        facul=facultad.objects.filter(campus__id=camp)
        nombres_facultad=[] #para los nombres de las carreras
        ids_facultad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_libros=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in facul:
            nombres_facultad.append(row.Nombre)
            ids_facultad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_libros_final=[]
        cont=0
        for contAR in ids_facultad:
            vector_libros=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_facultad(str(ids_facultad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.ISBN)
                vec_temp.append(c.Editorial)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_libros.append(vec_temp)
            vector_libros_final.append(vector_libros)

            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_facultad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_libros_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_libro_facultad(valor):
    query='SELECT "Libro_libro"."id","autoresLibro_autoreslibro"."gradoAutoria","Titulo","Url","ISBN","Editorial","Libro_libro"."Documento","fechaPublicacion",'
    query2='"auth_user"."id","auth_user"."first_name","auth_user"."last_name"'
    query3='FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4='"auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad"'
    query5='WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id"'
    query6='AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    txt="'Primero'"
    query10='and "autoresLibro_autoreslibro"."gradoAutoria"= '+txt
    query11='and "facultad_facultad"."id"='+valor
    txt2="'Si'"
    query12='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)
#------------------------------POR TODOS LOS CAMPUS LIBROS--------------
def ProcesaGraficaCampusTodoLibro(uni):
        separador=" "
        camp=campus.objects.filter(universidad__id=uni)

        nombres_campus=[] #para los nombres de las carreras
        ids_campus=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_libros=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in camp:
            nombres_campus.append(row.Nombre)
            ids_campus.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_libros_final=[]
        cont=0
        for contAR in ids_campus:
            vector_libros=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_campus(str(ids_campus[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.ISBN)
                vec_temp.append(c.Editorial)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_libros.append(vec_temp)
            vector_libros_final.append(vector_libros)
            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_campus[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_libros_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)
        #print (json)
        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_libro_campus(valor):
    query= 'SELECT "Libro_libro"."id","autoresLibro_autoreslibro"."gradoAutoria","Titulo","Url","ISBN","Editorial","Libro_libro"."Documento","fechaPublicacion",'
    query2='"auth_user"."id","auth_user"."first_name","auth_user"."last_name"'
    query3='FROM "Libro_libro","autoresLibro_autoreslibro", "auth_user",'
    query4='"Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus"'
    query5='WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id" '
    query6='AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad"."id"'
    query10='and "facultad_facultad"."campus_id" ="campus_campus"."id"'
    txt="'Primero'"
    query11='and "autoresLibro_autoreslibro"."gradoAutoria"='+txt
    query12= 'and "campus_campus".id='+valor
    txt2="'Si'"
    query13='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)

def ProcesaGraficaUniversidadTodoLibro(zona):
        separador=" "
        univer=universidad.objects.filter(zona__id=zona)
        nombres_universidad=[] #para los nombres de las carreras
        ids_universidad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_libros=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in univer:
            nombres_universidad.append(row.Nombre)
            ids_universidad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_libros_final=[]
        cont=0
        for contAR in ids_universidad:
            vector_libros=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_universidad(str(ids_universidad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.ISBN)
                vec_temp.append(c.Editorial)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_libros.append(vec_temp)
            vector_libros_final.append(vector_libros)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_universidad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_libros_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0
        json=serializaVector(vector_final)
        
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_libro_universidad(valor):
    query ='SELECT "Libro_libro"."id","autoresLibro_autoreslibro"."gradoAutoria","Titulo","Url","ISBN","Editorial","Libro_libro"."Documento","fechaPublicacion",'
    query2= '"auth_user"."id","auth_user"."first_name","auth_user"."last_name"'
    query3= '  FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral","universidad_universidad", "facultad_facultad","campus_campus"'
    query5= ' WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id" '
    query6= '  AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id" '
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='  and "campus_campus"."universidad_id" ="universidad_universidad"."id"'
    txt="'Primero'"
    query12=' and "autoresLibro_autoreslibro"."gradoAutoria"='+txt
    query13=' and "universidad_universidad".id='+valor
    txt2="'Si'"
    query14='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)
def ProcesaGraficaZonaTodoLibro():
        separador=" "
        zon=zona.objects.filter(pais__id=52)
        nombres_zona=[] #para los nombres de las carreras
        ids_zona=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_libros=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in zon:
            nombres_zona.append(row.Nombre)
            ids_zona.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_libros_final=[]
        cont=0
        for contAR in ids_zona:
            vector_libros=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_zona(str(ids_zona[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.ISBN)
                vec_temp.append(c.Editorial)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_libros.append(vec_temp)
            vector_libros_final.append(vector_libros)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_zona[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_libros_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)

        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_libro_zona(valor):
    query ='SELECT "Libro_libro"."id","autoresLibro_autoreslibro"."gradoAutoria","Titulo","Url","ISBN","Editorial","Libro_libro"."Documento","fechaPublicacion",'
    query2= '"auth_user"."id","auth_user"."first_name","auth_user"."last_name"'
    query3= 'FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","universidad_universidad","zona_zona"'
    query5= ' WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id"'
    query6= 'AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='and "campus_campus"."universidad_id" ="universidad_universidad"."id" and "universidad_universidad"."zona_id"="zona_zona"."id"'
    txt="'Primero'"
    query12=' and "autoresLibro_autoreslibro"."gradoAutoria"='+txt
    query13=' and "zona_zona".id='+valor
    txt2="'Si'"
    query14='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    
    return(ar)


#----------------------------------------FUNCIONES DE LOS Capitulos de los Libros-------------------------------
def ProcesaGraficaCarreraLibroCapitulo(c):
    separador=" "
    carr=consultar_libros_capitulo_carrera(c)
    num=0;
    vector_capitulos=[]
    nombre_carrera="."
    for c in carr:
        doc=" "
        vec_temp=[]
        coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
        vec_temp.append(c.Titulo)
        vec_temp.append(c.Url)
        vec_temp.append(c.capituloNumero)
        vec_temp.append(c.capituloTitulo)
        doc=str(c.Documento)
        vec_temp.append(doc)
        #print(doc)
        fec=str(c.fechaPublicacion)
        vec_temp.append(fec)
        vec_temp.append(c.first_name + separador +c.last_name)
        vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
        vector_capitulos.append(vec_temp)
        nombre_carrera=c.Nombre
    num=Cuenta_registros(carr)
    #print("el vector articulo es")
    #print(vector_articulos)
    vector_carrera=[]
    vector_carrera.append(nombre_carrera)
    vector_carrera.append(num)
    vector_carrera.append(vector_capitulos)
    #vector_carrera.append(vector_articulos)
    vector_final=[]
    vector_final.append(vector_carrera)
    json=serializaVector(vector_final)
    return json

def ProcesaGraficaCarrerasTodoLibroCapitulo(facu):
        separador=" "
        carrer=carrera.objects.filter(facultad__id=facu)
        nombres_carrera=[] #para los nombres de las carreras
        ids_carrera=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_capitulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in carrer:
            nombres_carrera.append(row.Nombre)
            ids_carrera.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        cont=0

        vector_capitulos_final=[]
        for contAR in ids_carrera:
            vector_capitulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libros_capitulo_carrera(str(ids_carrera[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.capituloNumero)
                vec_temp.append(c.capituloTitulo)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador +c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_capitulos.append(vec_temp)
                nombre_carrera=c.Nombre
            vector_capitulos_final.append(vector_capitulos)
            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_carrera[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_capitulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_libros_capitulo_carrera(valor):
    query ='SELECT "autoresLibro_autoreslibro"."gradoAutoria","capituloSel","capituloNumero","capituloTitulo",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"Libro_libro"."Titulo","Libro_libro"."Documento", "Libro_libro"."Url", "Libro_libro"."fechaPublicacion", "carrera_carrera"."Nombre"'
    query3= ' FROM "autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "carrera_carrera","Libro_libro" '
    query5= '  WHERE  "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query6= 'and "autoresLibro_autoreslibro"."libro_id"="Libro_libro"."id" '
    query7= 'and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= 'and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."carrera_id"="carrera_carrera"."id"'
    query10=' and "autoresLibro_autoreslibro"."capituloSel"=FALSE AND NOT ("autoresLibro_autoreslibro"."capituloTitulo" IS NULL)'
    query11=' and "carrera_carrera".id='+valor
    txt="'Si'"
    query12='and "Libro_libro"."filialUtc"='+txt
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    return(ar)

#--------------------------TODAS LAS FACULTADES--------------------------------
def ProcesaGraficaFacultadesTodoLibroCapitulo(camp):
        separador=" "
        facul=facultad.objects.filter(campus__id=camp)
        nombres_facultad=[] #para los nombres de las carreras
        ids_facultad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_capitulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in facul:
            nombres_facultad.append(row.Nombre)
            ids_facultad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_capitulos_final=[]
        cont=0
        for contAR in ids_facultad:
            vector_capitulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_capitulo_facultad(str(ids_facultad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.capituloNumero)
                vec_temp.append(c.capituloTitulo)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador +c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_capitulos.append(vec_temp)
            vector_capitulos_final.append(vector_capitulos)

            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_facultad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_capitulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_libro_capitulo_facultad(valor):
    query ='SELECT "autoresLibro_autoreslibro"."gradoAutoria","capituloSel","capituloNumero","capituloTitulo",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"Libro_libro"."Titulo","Libro_libro"."Documento", "Libro_libro"."Url", "Libro_libro"."fechaPublicacion"'
    query3=' FROM "autoresLibro_autoreslibro","Libro_libro",'
    query4='"auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad"'
    query5='WHERE  "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query6='and "autoresLibro_autoreslibro"."libro_id"="Libro_libro"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10='and "autoresLibro_autoreslibro"."capituloSel"=FALSE AND NOT ("autoresLibro_autoreslibro"."capituloTitulo" IS NULL)'
    query11='and "facultad_facultad"."id"='+valor
    txt2="'Si'"
    query12='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)

#------------------------------POR TODOS LOS CAMPUS CAPITULOS LIBROS--------------
def ProcesaGraficaCampusTodoLibroCapitulo(uni):
        separador=" "
        camp=campus.objects.filter(universidad__id=uni)

        nombres_campus=[] #para los nombres de las carreras
        ids_campus=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_capitulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in camp:
            nombres_campus.append(row.Nombre)
            ids_campus.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_capitulos_final=[]
        cont=0
        for contAR in ids_campus:
            vector_capitulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_capitulo__campus(str(ids_campus[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.capituloNumero)
                vec_temp.append(c.capituloTitulo)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador +c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_capitulos.append(vec_temp)
            vector_capitulos_final.append(vector_capitulos)

            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_campus[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_capitulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)
        #print (json)
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_libro_capitulo__campus(valor):
    query ='SELECT "autoresLibro_autoreslibro"."gradoAutoria","capituloSel","capituloNumero","capituloTitulo",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"Libro_libro"."Titulo","Libro_libro"."Documento", "Libro_libro"."Url", "Libro_libro"."fechaPublicacion"'
    query3='FROM "Libro_libro","autoresLibro_autoreslibro", "auth_user",'
    query4='"Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus"'
    query5='WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id" '
    query6='AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad"."id"'
    query10='and "facultad_facultad"."campus_id" ="campus_campus"."id"'
    query11='and "autoresLibro_autoreslibro"."capituloSel"=FALSE AND NOT ("autoresLibro_autoreslibro"."capituloTitulo" IS NULL)'
    query12= 'and "campus_campus".id='+valor
    txt2="'Si'"
    query13='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)

def ProcesaGraficaUniversidadTodoLibroCapitulo(zona):
        separador=" "
        univer=universidad.objects.filter(zona__id=zona)
        nombres_universidad=[] #para los nombres de las carreras
        ids_universidad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_capitulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in univer:
            nombres_universidad.append(row.Nombre)
            ids_universidad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_capitulos_final=[]
        cont=0
        for contAR in ids_universidad:
            vector_capitulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_capitulo_universidad(str(ids_universidad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.capituloNumero)
                vec_temp.append(c.capituloTitulo)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador +c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_capitulos.append(vec_temp)
            vector_capitulos_final.append(vector_capitulos)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_universidad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_capitulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0
        json=serializaVector(vector_final)
        
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_libro_capitulo_universidad(valor):
    query ='SELECT "autoresLibro_autoreslibro"."gradoAutoria","capituloSel","capituloNumero","capituloTitulo",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"Libro_libro"."Titulo","Libro_libro"."Documento", "Libro_libro"."Url", "Libro_libro"."fechaPublicacion"'
    query3= '  FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral","universidad_universidad", "facultad_facultad","campus_campus"'
    query5= ' WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id" '
    query6= '  AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id" '
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='  and "campus_campus"."universidad_id" ="universidad_universidad"."id"'
    query12=' and "autoresLibro_autoreslibro"."capituloSel"=FALSE AND NOT ("autoresLibro_autoreslibro"."capituloTitulo" IS NULL)'
    query13=' and "universidad_universidad".id='+valor
    txt2="'Si'"
    query14='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)

def ProcesaGraficaZonaTodoLibroCapitulo():
        separador=" "
        zon=zona.objects.filter(pais__id=52)
        nombres_zona=[] #para los nombres de las carreras
        ids_zona=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_capitulos=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in zon:
            nombres_zona.append(row.Nombre)
            ids_zona.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_capitulos_final=[]
        cont=0
        for contAR in ids_zona:
            vector_capitulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_libro_capitulo_zona(str(ids_zona[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresl(c.id)     #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.Titulo)
                vec_temp.append(c.Url)
                vec_temp.append(c.capituloNumero)
                vec_temp.append(c.capituloTitulo)
                doc=str(c.Documento)
                vec_temp.append(doc)
                #print(doc)
                fec=str(c.fechaPublicacion)
                vec_temp.append(fec)
                vec_temp.append(c.first_name + separador +c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_capitulos.append(vec_temp)
            vector_capitulos_final.append(vector_capitulos)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_zona[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_capitulos_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)

        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_libro_capitulo_zona(valor):
    query ='SELECT "autoresLibro_autoreslibro"."gradoAutoria","capituloSel","capituloNumero","capituloTitulo",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"Libro_libro"."Titulo","Libro_libro"."Documento", "Libro_libro"."Url", "Libro_libro"."fechaPublicacion"'
    query3= 'FROM "Libro_libro","autoresLibro_autoreslibro",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","universidad_universidad","zona_zona"'
    query5= ' WHERE "Libro_libro"."id" = "autoresLibro_autoreslibro"."libro_id"'
    query6= 'AND "autoresLibro_autoreslibro"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='and "campus_campus"."universidad_id" ="universidad_universidad"."id" and "universidad_universidad"."zona_id"="zona_zona"."id"'
    query12=' and "autoresLibro_autoreslibro"."capituloSel"=FALSE AND NOT ("autoresLibro_autoreslibro"."capituloTitulo" IS NULL)'
    query13=' and "zona_zona".id='+valor
    txt2="'Si'"
    query14='and "Libro_libro"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    
    return(ar)


#--------------------------------------------------------------------FUNCIONES DE PONENCIA--------------------------

def ProcesaGraficaCarreraPonencia(c):
    separador=" "
    carr=consultar_ponencia_carrera(c)
    num=0;
    vector_ponencias=[]
    nombre_carrera="."
    for c in carr:
        doc=" "
        vec_temp=[]
        coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresp
        vec_temp.append(c.nombrePonencia)
        vec_temp.append(c.urlPonencia)
        vec_temp.append(c.isbn)
        vec_temp.append(c.tituloPonencia)
        doc=str(c.certificado)
        vec_temp.append(doc)
        #print(doc)
        vec_temp.append(c.lugarPonencia)
        vec_temp.append(c.first_name + separador + c.last_name)
        vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
        vector_ponencias.append(vec_temp)
        nombre_carrera=c.Nombre
    num=Cuenta_registros(carr)
    #print("el vector articulo es")
    #print(vector_articulos)
    vector_carrera=[]
    vector_carrera.append(nombre_carrera)
    vector_carrera.append(num)
    vector_carrera.append(vector_ponencias)
    #vector_carrera.append(vector_articulos)
    vector_final=[]
    vector_final.append(vector_carrera)
    json=serializaVector(vector_final)
    return json

# Inicio Cambio
# Fecha: 20-05-2019
# Detalle: BUSQUEDA DE COAUTORES PONENCIA
#ELABORADO POR: CARLOS ALCASIGA, GHISLAINE CAMPOVERDE, GINGER DE LA BASTIDA, EDWIN RISUEÑO, ALEX ZHININ

#------------------------------BUSCAR COAUTORES PONENCIA----------------------------

def BuscarCoautoresp(idRevista):
    sep=" "

    bcoautores=autoresPonencia.objects.filter(ponencia_id=idRevista)

    coaA=[]
    for a in bcoautores:

        coaA.append(a.user.first_name+sep+a.user.last_name)

        listas= coaA[1:7]

        r=list(listas)
        s=", ".join(r)

        #print(s)

    return s

# FIN DE CAMBIO

#-------------------------------POR FACULTADES PONENCIA-----------------------------

def ProcesaGraficaCarrerasTodoPonencia(facu):
        separador=" "
        carrer=carrera.objects.filter(facultad__id=facu)
        nombres_carrera=[] #para los nombres de las carreras
        ids_carrera=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_ponencias=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in carrer:
            nombres_carrera.append(row.Nombre)
            ids_carrera.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        cont=0

        vector_ponencias_final=[]
        for contAR in ids_carrera:
            vector_ponencias=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_ponencia_carrera(str(ids_carrera[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.nombrePonencia)
                vec_temp.append(c.urlPonencia)
                vec_temp.append(c.isbn)
                vec_temp.append(c.tituloPonencia)
                doc=str(c.certificado)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.lugarPonencia)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_ponencias.append(vec_temp)
                nombre_carrera=c.Nombre
            vector_ponencias_final.append(vector_ponencias)
            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_carrera[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_ponencias_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_ponencia_carrera(valor):
    query ='SELECT "Ponencia_ponencia"."id","autoresPonencia_autoresponencia"."gradoAutoria","nombrePonencia","lugarPonencia","tituloPonencia","urlPonencia","Ponencia_ponencia"."certificado",'
    query2= ' "auth_user"."id","auth_user"."first_name","auth_user"."last_name" ,"carrera_carrera"."Nombre","Ponencia_ponencia"."isbn"'
    query3= ' FROM "Ponencia_ponencia","autoresPonencia_autoresponencia",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "carrera_carrera"'
    query5= ' WHERE "Ponencia_ponencia"."id" = "autoresPonencia_autoresponencia"."ponencia_id"'
    query6= 'AND "autoresPonencia_autoresponencia"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."carrera_id"="carrera_carrera"."id"'
    txt="'Primero'"
    query10=' and "autoresPonencia_autoresponencia"."gradoAutoria"='+txt
    query11=' and "carrera_carrera".id='+valor
    txt2="'Si'"
    query12='and "Ponencia_ponencia"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+ query12
    #print(queryTotal)
    ar=ponencia.objects.raw(queryTotal)
    return(ar)

#---------------------POR CAMPUS PONENCIAS-----------------------------------------
def ProcesaGraficaFacultadesTodoPonencia(camp):
        separador=" "
        facul=facultad.objects.filter(campus__id=camp)
        nombres_facultad=[] #para los nombres de las carreras
        ids_facultad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_ponencias=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in facul:
            nombres_facultad.append(row.Nombre)
            ids_facultad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_ponencias_final=[]
        cont=0
        for contAR in ids_facultad:
            vector_ponencias=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_ponencia_facultad(str(ids_facultad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.nombrePonencia)
                vec_temp.append(c.urlPonencia)
                vec_temp.append(c.isbn)
                vec_temp.append(c.tituloPonencia)
                doc=str(c.certificado)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.lugarPonencia)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_ponencias.append(vec_temp)
            vector_ponencias_final.append(vector_ponencias)

            cont=cont+1
            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_facultad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_ponencias_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1
        json=serializaVector(vector_final)
        
        return json
        #guardamos los articulos encontrados en esta carrera


def consultar_ponencia_facultad(valor):
   
    query='SELECT "Ponencia_ponencia"."id","autoresPonencia_autoresponencia"."gradoAutoria","nombrePonencia","lugarPonencia","tituloPonencia","urlPonencia","Ponencia_ponencia"."certificado",'
    query2='"auth_user"."id","auth_user"."first_name","auth_user"."last_name","Ponencia_ponencia"."isbn"'
    query3='FROM "Ponencia_ponencia","autoresPonencia_autoresponencia",'
    query4='"auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad"'
    query5='WHERE "Ponencia_ponencia"."id" = "autoresPonencia_autoresponencia"."ponencia_id"'
    query6='AND "autoresPonencia_autoresponencia"."user_id"= "auth_user"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    txt="'Primero'"
    query10='and "autoresPonencia_autoresponencia"."gradoAutoria"= '+txt
    query11='and "facultad_facultad"."id"='+valor
    txt2="'Si'"
    query12='and "Ponencia_ponencia"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)

#------------------------------POR TODOS LOS CAMPUS PONENCIA--------------
def ProcesaGraficaCampusTodoPonencia(uni):
        separador=" "
        camp=campus.objects.filter(universidad__id=uni)

        nombres_campus=[] #para los nombres de las carreras
        ids_campus=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_ponencias=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in camp:
            nombres_campus.append(row.Nombre)
            ids_campus.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_ponencias_final=[]
        cont=0
        for contAR in ids_campus:
            vector_ponencias=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_ponencia_campus(str(ids_campus[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.nombrePonencia)
                vec_temp.append(c.urlPonencia)
                vec_temp.append(c.isbn)
                vec_temp.append(c.tituloPonencia)
                doc=str(c.certificado)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.lugarPonencia)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_ponencias.append(vec_temp)
            vector_ponencias_final.append(vector_ponencias)

            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_campus[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_ponencias_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)
        #print (json)
        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_ponencia_campus(valor):
    query= 'SELECT "Ponencia_ponencia"."id","autoresPonencia_autoresponencia"."gradoAutoria","nombrePonencia","lugarPonencia","tituloPonencia","urlPonencia","Ponencia_ponencia"."certificado",'
    query2='"auth_user"."id","auth_user"."first_name","auth_user"."last_name","Ponencia_ponencia"."isbn"'
    query3='FROM "Ponencia_ponencia","autoresPonencia_autoresponencia",'
    query4='"auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad", "campus_campus"'
    query5='WHERE "Ponencia_ponencia"."id" = "autoresPonencia_autoresponencia"."ponencia_id" '
    query6='AND "autoresPonencia_autoresponencia"."user_id"= "auth_user"."id"'
    query7='and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8='and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9='and "informacionLaboral_informacionlaboral".facultad_id="facultad_facultad"."id"'
    query10='and "facultad_facultad"."campus_id" ="campus_campus"."id"'
    txt="'Primero'"
    query11='and "autoresPonencia_autoresponencia"."gradoAutoria"='+txt
    query12= 'and "campus_campus".id='+valor
    txt2="'Si'"
    query13='and "Ponencia_ponencia"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13
    #print(queryTotal)
    ar=libro.objects.raw(queryTotal)
    #print (ar)
    return(ar)

def ProcesaGraficaUniversidadTodoPonencia(zona):
        separador=" "
        univer=universidad.objects.filter(zona__id=zona)
        nombres_universidad=[] #para los nombres de las carreras
        ids_universidad=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_ponencias=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in univer:
            nombres_universidad.append(row.Nombre)
            ids_universidad.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_ponencias_final=[]
        cont=0
        for contAR in ids_universidad:
            vector_ponencias=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_ponencia_universidad(str(ids_universidad[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.nombrePonencia)
                vec_temp.append(c.urlPonencia)
                vec_temp.append(c.isbn)
                vec_temp.append(c.tituloPonencia)
                doc=str(c.certificado)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.lugarPonencia)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_ponencias.append(vec_temp)
            vector_ponencias_final.append(vector_ponencias)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_universidad[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_ponencias_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0
        json=serializaVector(vector_final)
     
        return json
        #guardamos los articulos encontrados en esta carrera
def consultar_ponencia_universidad(valor):
    query ='SELECT "Ponencia_ponencia"."id","autoresPonencia_autoresponencia"."gradoAutoria","nombrePonencia","lugarPonencia","tituloPonencia","urlPonencia","Ponencia_ponencia"."certificado",'
    query2= '"auth_user"."id","auth_user"."first_name","auth_user"."last_name","Ponencia_ponencia"."isbn"'
    query3= '   FROM "Ponencia_ponencia","autoresPonencia_autoresponencia",'
    query4= ' "auth_user","Investigador_investigador","informacionLaboral_informacionlaboral","universidad_universidad", "facultad_facultad","campus_campus"'
    query5= ' WHERE "Ponencia_ponencia"."id" = "autoresPonencia_autoresponencia"."ponencia_id" '
    query6= '  AND "autoresPonencia_autoresponencia"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id" '
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='  and "campus_campus"."universidad_id" ="universidad_universidad"."id"'
    txt="'Primero'"
    query12=' and "autoresPonencia_autoresponencia"."gradoAutoria"='+txt
    query13=' and "universidad_universidad".id='+valor
    txt2="'Si'"
    query14='and "Ponencia_ponencia"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    #print (ar)
    return(ar)


def ProcesaGraficaZonaTodoPonencia():
        separador=" "
        zon=zona.objects.filter(pais__id=52)
        nombres_zona=[] #para los nombres de las carreras
        ids_zona=[]     #para las ids de las carreras
        vector_contador=[] # para los vectores contadores de las carreras
        vector_final=[]    # para guardar el vector con la carrera y su repeticion
        vector_ponencias=[]
        #guardamos en los vectores todos los nombres y ids de las carreras
        for row in zon:
            nombres_zona.append(row.Nombre)
            ids_zona.append(row.id)
        #hafemos la consulta a la bd de cada carrera segun una id del vector de ids carrera
        vector_ponencias_final=[]
        cont=0
        for contAR in ids_zona:
            vector_articulos=[]
            #contamos el numero de articulos que hay en cada carrera y guardamos en vector_contador
            ar=consultar_ponencia_zona(str(ids_zona[cont]))
            vector_contador.append(Cuenta_registros(ar))
            for c in ar:
                doc=" "
                vec_temp=[]
                coautore = BuscarCoautoresp(c.id)    #llamada a la funcion BuscarCoautoresl
                #print(c.titulo)
                vec_temp.append(c.nombrePonencia)
                vec_temp.append(c.urlPonencia)
                vec_temp.append(c.isbn)
                vec_temp.append(c.tituloPonencia)
                doc=str(c.certificado)
                vec_temp.append(doc)
                #print(doc)
                vec_temp.append(c.lugarPonencia)
                vec_temp.append(c.first_name + separador + c.last_name)
                vec_temp.append(coautore)    #AGREGAR AL VECTOR TEMPORAL COAUTORES
                vector_ponencias.append(vec_temp)    
            vector_ponencias_final.append(vector_ponencias)
            cont=cont+1

            cont1=0
        for llena in vector_contador:
            vec_temp=[]
            vec_temp.append(nombres_zona[cont1])
            vec_temp.append(vector_contador[cont1])
            vec_temp.append(vector_ponencias_final[cont1])
            vector_final.append(vec_temp)
            cont1=cont1+1

            cont2=0

        json=serializaVector(vector_final)

        return json
        #guardamos los articulos encontrados en esta carrera

def consultar_ponencia_zona(valor):
    query ='SELECT "Ponencia_ponencia"."id","autoresPonencia_autoresponencia"."gradoAutoria","nombrePonencia","lugarPonencia","tituloPonencia","urlPonencia","Ponencia_ponencia"."certificado",'
    query2= '"auth_user"."id","auth_user"."first_name","auth_user"."last_name","Ponencia_ponencia"."isbn"'
    query3= 'FROM "Ponencia_ponencia","autoresPonencia_autoresponencia",'
    query4= '"auth_user","Investigador_investigador","informacionLaboral_informacionlaboral", "facultad_facultad","campus_campus","universidad_universidad","zona_zona"'
    query5= 'WHERE "Ponencia_ponencia"."id" = "autoresPonencia_autoresponencia"."ponencia_id"'
    query6= 'AND "autoresPonencia_autoresponencia"."user_id"= "auth_user"."id"'
    query7= ' and "auth_user"."id"= "Investigador_investigador"."user_id"'
    query8= ' and "Investigador_investigador"."informacionLaboral_id"="informacionLaboral_informacionlaboral"."id"'
    query9=' and "informacionLaboral_informacionlaboral"."facultad_id"="facultad_facultad"."id"'
    query10=' and "facultad_facultad"."campus_id" ="campus_campus"."id" '
    query11='and "campus_campus"."universidad_id" ="universidad_universidad"."id" and "universidad_universidad"."zona_id"="zona_zona"."id"'
    txt="'Primero'"
    query12=' and "autoresPonencia_autoresponencia"."gradoAutoria"='+txt
    query13=' and "zona_zona".id='+valor
    txt2="'Si'"
    query14='and "Ponencia_ponencia"."filialUtc"=' +txt2
    queryTotal=query+query2+query3+query4+query5+query6+query7+query8+query9+query10+query11+query12+query13+query14
    #print(queryTotal)
    ar=articulos_cientificos.objects.raw(queryTotal)
    
    return(ar)



 

