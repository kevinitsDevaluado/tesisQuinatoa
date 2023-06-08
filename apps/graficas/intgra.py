from django.shortcuts import render, redirect
from django.http import HttpResponse
from apps.universidad.models import universidad
from apps.campus.models import campus
from apps.facultad.models import facultad
from apps.carrera.models import carrera
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Libro.models import libro
from apps.Ponencia.models import ponencia
from apps.Proyectos.models import proyecto
from apps.zona.models import zona
from django.contrib.auth.models import User
from apps.Investigador.models import Investigador
from apps.autoresArticulos.models import autoresArticulos
from apps.autoresLibro.models import autoresLibro
from apps.autoresPonencia.models import autoresPonencia
from apps.autoresProyecto.models import autoresProyecto
from apps.informacionLaboral.models import informacionLaboral

#IMPORTAR CAMPOS
from apps.campoAmplio.models import campoAmplio
from apps.campoDetallado.models import campoDetallado
from apps.campoEspecifico.models import campoEspecifico
from apps.pais.models import pais
from apps.ciudad.models import ciudad
from apps.Revista.models import revista

from django.db.models import Q
#para los reportes
from django.conf import settings
from io import BytesIO
from reportlab.pdfgen import canvas
from django.views.generic import View
from reportlab.platypus import SimpleDocTemplate, Paragraph, TableStyle 
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Table
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
import json

def search_universidad(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            uni = universidad.objects.filter(zona_id=data)
            results = []
            doctor_json = {}
            doctor_json['text'] = '---------------Todo---------------'
            doctor_json['value'] = '0'
            results.append(doctor_json)
            for i in uni:
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

def search_campus(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            cam = campus.objects.filter(universidad_id=data)
            results = []
            doctor_json = {}
            doctor_json['text'] = '---------------Todo---------------'
            doctor_json['value'] = '0'
            results.append(doctor_json)
            for i in cam:
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

def search_facultad(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            fac = facultad.objects.filter(campus_id=data)
            results = []
            doctor_json = {}
            doctor_json['text'] = '---------------Todo---------------'
            doctor_json['value'] = '0'
            results.append(doctor_json)
            for i in fac:
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

def search_carrera(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            car = carrera.objects.filter(facultad_id=data)
            results = []
            doctor_json = {}
            doctor_json['text'] = '---------------Todo---------------'
            doctor_json['value'] = '0'
            results.append(doctor_json)
            for i in car:
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

def numero_articulos(user,arti,inic,la,inicio,usuario):
    zona_n=zona.objects.get(id=la['z'])
    universidad_n=universidad.objects.get(id=la['u'])
    campus_n=campus.objects.get(id=la['cm'])
    facultad_n=facultad.objects.get(id=la['fa'])
    carrera_n=carrera.objects.get(id=la['ca'])

    for d in inic:
        fiel=articulos_cientificos.objects.get(id=d.articulo_id)
        
        if fiel.filialUtc=='Si':
            autores=autoresArticulos.objects.filter(articulo_id=fiel.id)
            nombres=''
            nombresCompletos=''
            cedula2=[]
            for j in autores:
                nom=str(j.user.first_name).split(' ')
                ape=str(j.user.last_name).split(' ')
                nombres=nombres+str(str(nom[0])+' '+str(ape[0]))+'-'

                nombresCompletos=nombresCompletos+str(str(j.user.first_name)+' '+str(j.user.last_name))+'-'

                #Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregacion de las cedulas correspondientes a cada autor    fecha:19/07/2019
                cdla1=Investigador.objects.filter(user_id=j.user.id)
                
                for a in cdla1:
                    if str(a.cedula)!='None':
                        cedula2.append(' '+str(a.cedula)+'-')  
                    else:
                        cedula2.append("****"+'-')
                listas= cedula2[0:6]

                r=list(listas)
                cedulass=''.join(r)

                #Codigo Doi agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar codigo Doi a cada articulo    fecha:19/07/2019
                if str(fiel.doi)!='None':
                    doii=fiel.doi
                else:
                    doii=' '

                #Codigo iSSN agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Codigo iSSN agregado a cada articulo    fecha:19/07/2019
                isssn=fiel.iSSN

                #Estado del articulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar estado de cada articulo    fecha:19/07/2019
                estadoss=fiel.estado

                #Campo Amplio, Campo Especifico, Campo Detallado agregados por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar campo amplio, especifico y detalladado de cada articulo    fecha:19/07/2019
                camp=''
                camplio=campoAmplio.objects.filter(id=fiel.amplio_id)
                for ca in camplio:
                    camp=ca.Nombre

                cesp=''    
                cespecifico=campoEspecifico.objects.filter(id=fiel.especifico_id)
                for ce in cespecifico:
                    cesp=ce.Nombre

                cdet=''
                cdetallado=campoDetallado.objects.filter(id=fiel.detallado_id)
                for cd in cdetallado:
                    cdet=cd.Nombre

                #Filiacion del articulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar filiacion por cada articulo    fecha:19/07/2019
                if fiel.filialUtc=='Si':
                    filial=fiel.filialUtc
                else:
                    filial=''
                
                #Factor impacto (sjr) del articulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar factor impacto por cada articulo    fecha:19/07/2019
                sjr=''
                ur=''
                sjrr=revista.objects.filter(id=fiel.revista_id)
                for rev in sjrr:
                    if str(rev.Factor_Impacto)!='None':
                        sjr=rev.Factor_Impacto
                    else:
                        sjr=''
                    #Url de la revista a la que pertenece el articulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    #Agregar url de revista por cada articulo    fecha:19/07/2019
                    ur=rev.Url


            if str(d.articulo.id) not in inicio:
                inicio.append(str(d.articulo.id))
                item={}
                item['id']=str(d.articulo.id)
                item['titulo']=str(d.articulo.titulo)
                item['fecha']=str(d.articulo.fechaPublicacion)
                anio=str(d.articulo.fechaPublicacion).split('-')
                item['anio']=str(anio[0])
                item['url']=str(d.articulo.url)
                item['documento']=str(d.articulo.documento)
                item['revista']=str(d.articulo.revista)
                item['autor']=str(nombres)
                item['autores']=str(nombresCompletos)
                item['zona']=str(la['z'])
                item['zona_n']=str(zona_n.Nombre)
                item['universidad']=str(la['u'])
                item['universidad_n']=str(universidad_n.Nombre)
                item['campus']=str(la['cm'])
                item['campus_n']=str(campus_n.Nombre)
                item['facultad']=str(la['fa'])
                item['facultad_n']=str(facultad_n.Nombre)
                item['carrera']=str(la['ca'])
                item['carrera_n']=str(carrera_n.Nombre)
                item['cedula']=str(cedulass)
                item['doi']=str(doii)
                item['iSSN']=str(isssn)
                item['estado']=str(estadoss)
                item['campoAmplio']=str(camp)
                item['campoEspecifico']=str(cesp)
                item['campoDetallado']=str(cdet)
                item['filiacion']=str(filial)
                item['sjr']=str(sjr)
                item['url_revista']=str(ur)
                usuario.append(item)
            else:
                arti=arti-1
        else:
            arti=arti-1
    return {'arti':arti,'usuario':usuario,'inicio':inicio}

def numero_libros(user,lib,inic,la,inicio,usuario):
    zona_n=zona.objects.get(id=la['z'])
    universidad_n=universidad.objects.get(id=la['u'])
    campus_n=campus.objects.get(id=la['cm'])
    facultad_n=facultad.objects.get(id=la['fa'])
    carrera_n=carrera.objects.get(id=la['ca'])
    for d in inic:
        fiel=libro.objects.get(id=d.libro_id)
        if fiel.filialUtc=='Si':
            autores=autoresLibro.objects.filter(libro_id=fiel.id)
            nombres=''
            nombresCompletos=''
            cedula2=[]
            for j in autores:
                nom=str(j.user.first_name).split(' ')
                ape=str(j.user.last_name).split(' ')
                nombres=nombres+str(str(nom[0])+' '+str(ape[0]))+'-'

                nombresCompletos=nombresCompletos+str(str(j.user.first_name)+' '+str(j.user.last_name))+'-'

                #Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregacion de las cedulas correspondientes a cada autor    fecha:19/07/2019
                cdla1=Investigador.objects.filter(user_id=j.user_id)
                for a in cdla1:
                    if str(a.cedula)!='None':
                        cedula2.append(' '+str(a.cedula)+'-')
                        
                    else:
                        cedula2.append("****"+'-')
                
                listas= cedula2[0:9]

                r=list(listas)
                cedulass=''.join(r)

                #Codigo ISBN agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Codigo ISBN agregado a cada libro    fecha:19/07/2019
                if str(fiel.ISBN)!='None':
                    isbbn=fiel.ISBN
                else:
                    isbbn=''

                #Campo Amplio, Campo Especifico, Campo Detallado agregados por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar campo amplio, especifico y detalladado de cada libro    fecha:19/07/2019
                cdet=''
                cesp=''
                camp=''
                cdetallado=campoDetallado.objects.filter(id=fiel.detallado_id)
                for cd in cdetallado:
                    cdet=cd.Nombre
    
                    cespecifico=campoEspecifico.objects.filter(id=cd.especifico_id)
                    for ce in  cespecifico:
                        cesp=ce.Nombre
                        
                        camplio=campoAmplio.objects.filter(id=ce.amplio_id)
                        for ca in camplio:
                            camp=ca.Nombre
                            
                #Filiacion del libro agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar filiacion por cada libro    fecha:19/07/2019
                if fiel.filialUtc=='Si':
                    filial=fiel.filialUtc
                else:
                    filial=''
                
            if str(d.libro.id) not in inicio:
                inicio.append(str(d.libro.id))
                item={}
                item['id']=str(d.libro.id)
                item['titulo']=str(d.libro.Titulo)
                item['fecha']=str(d.libro.fechaPublicacion)
                anio=str(d.libro.fechaPublicacion).split('-')
                item['anio']=str(anio[0])
                item['url']=str(d.libro.Url)
                item['documento']=str(d.libro.Documento)
                item['autor']=str(nombres)
                item['autores']=str(nombresCompletos)
                item['zona']=str(la['z'])
                item['zona_n']=str(zona_n.Nombre)
                item['universidad']=str(la['u'])
                item['universidad_n']=str(universidad_n.Nombre)
                item['campus']=str(la['cm'])
                item['campus_n']=str(campus_n.Nombre)
                item['facultad']=str(la['fa'])
                item['facultad_n']=str(facultad_n.Nombre)
                item['carrera']=str(la['ca'])
                item['carrera_n']=str(carrera_n.Nombre)
                item['cedula']=str(cedulass)
                item['ISBN']=str(isbbn)
                item['campoDetallado']=str(cdet)
                item['campoEspecifico']=str(cesp)
                item['campoAmplio']=str(camp)
                item['filiacion']=str(filial)
                usuario.append(item)
            else:
                lib=lib-1
        else:
            lib=lib-1
    return {'lib':lib,'usuario':usuario,'inicio':inicio}

def numero_libros_capitulos(user,capi,inic,la,usuario):
    zona_n=zona.objects.get(id=la['z'])
    universidad_n=universidad.objects.get(id=la['u'])
    campus_n=campus.objects.get(id=la['cm'])
    facultad_n=facultad.objects.get(id=la['fa'])
    carrera_n=carrera.objects.get(id=la['ca'])
    for d in inic:
        fiel=libro.objects.get(id=d.libro_id)
        if fiel.filialUtc=='Si':
            capitulo=autoresLibro.objects.get(libro_id=fiel.id,user_id=user.id)
            if str(capitulo.capituloSel)=='False' and str(capitulo.capituloNumero)!='None' and str(capitulo.capituloTitulo)!='None':
                cedula2=[]
                #Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregacion de las cedulas correspondientes a cada autor    fecha:19/07/2019
                cdla1=Investigador.objects.filter(user_id=user.id)
                for a in cdla1:
                    if str(a.cedula)!='None':
                        cedula2.append(' '+str(a.cedula))
                        
                    else:
                        cedula2.append("****"+'-')
                
                listas= cedula2[0:9]

                r=list(listas)
                cedulass=''.join(r)

                #Campo Amplio, Campo Especifico, Campo Detallado agregados por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar campo amplio, especifico y detalladado de cada capitulo    fecha:19/07/2019
                cdet=''
                cdetallado=campoDetallado.objects.filter(id=fiel.detallado_id)
                for cd in cdetallado:
                    cdet=cd.Nombre
                    cesp=''
                    cespecifico=campoEspecifico.objects.filter(id=cd.especifico_id)
                    for ce in  cespecifico:
                        cesp=ce.Nombre
                        camp=''
                        camplio=campoAmplio.objects.filter(id=ce.amplio_id)
                        for ca in camplio:
                            camp=ca.Nombre
                            
                #Filiacion del capitulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar filiacion por cada capitulo    fecha:19/07/2019
                if fiel.filialUtc=='Si':
                    filial=fiel.filialUtc
                else:
                    filial=''

                #Estado del capitulo agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar estado de cada capitulo   fecha:19/07/2019
                if str(fiel.estado)!='None':
                    estadoss=fiel.estado
                else:
                    estadoss=''

                item={}
                item['id']=str(d.libro.id)
                item['titulo']=str(d.libro.Titulo).upper()
                item['Ncapitulo']=str(capitulo.capituloNumero)
                item['Tcapitulo']=str(capitulo.capituloTitulo).upper()
                item['fecha']=str(d.libro.fechaPublicacion)
                anio=str(d.libro.fechaPublicacion).split('-')
                item['anio']=str(anio[0])
                item['url']=str(d.libro.Url)
                item['documento']=str(d.libro.Documento)
                item['autor']=str(str(user.first_name)+' '+str(user.last_name)).upper()
                item['zona']=str(la['z'])
                item['zona_n']=str(zona_n.Nombre)
                item['universidad']=str(la['u'])
                item['universidad_n']=str(universidad_n.Nombre)
                item['campus']=str(la['cm'])
                item['campus_n']=str(campus_n.Nombre)
                item['facultad']=str(la['fa'])
                item['facultad_n']=str(facultad_n.Nombre)
                item['carrera']=str(la['ca'])
                item['carrera_n']=str(carrera_n.Nombre)
                item['ISBN']=str(d.libro.ISBN)
                item['campoAmplio']=str(camp)
                item['campoEspecifico']=str(cesp)
                item['campoDetallado']=str(cdet)
                item['cedula']=str(cedulass)
                item['filiacion']=str(filial)
                item['estado']=str(estadoss)
                usuario.append(item)
            else:
                capi=capi-1
        else:
            capi=capi-1
    return {'capi':capi,'usuario':usuario}


def numero_ponencias(user,pone,inic,la,inicio,usuario):
    zona_n=zona.objects.get(id=la['z'])
    universidad_n=universidad.objects.get(id=la['u'])
    campus_n=campus.objects.get(id=la['cm'])
    facultad_n=facultad.objects.get(id=la['fa'])
    carrera_n=carrera.objects.get(id=la['ca'])
    for d in inic:
        fiel=ponencia.objects.get(id=d.ponencia_id)
        if fiel.filialUtc=='Si':
            autores=autoresPonencia.objects.filter(ponencia_id=fiel.id)
            nombres=''
            nombresCompletos=''
            cedula2=[]
            for j in autores:
                nom=str(j.user.first_name).split(' ')
                ape=str(j.user.last_name).split(' ')
                nombres=nombres+str(str(nom[0])+' '+str(ape[0]))+'-'

                nombresCompletos=nombresCompletos+str(str(j.user.first_name)+' '+str(j.user.last_name))+'-'
                
                #Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregacion de las cedulas correspondientes a cada autor    fecha:19/07/2019
                cdla1=Investigador.objects.filter(user_id=j.user.id)
                for a in cdla1:
                    if str(a.cedula)!='None':
                        cedula2.append(" "+str(a.cedula)+'-')
                        
                    else:
                        cedula2.append("****"+'-')
                
                listas= cedula2[0:9]

                r=list(listas)
                cedulass=''.join(r)

                #Codigo ISBN agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Codigo ISBN agregado a cada ponencia    fecha:19/07/2019
                if str(fiel.isbn)!='None':
                    isbbn=fiel.isbn
                else:
                    isbbn=''

                #Nombre de la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Nombre de la ponencia agregado a cada ponencia existente    fecha:19/07/2019
                nombreponencia=fiel.nombrePonencia
                
                #Institucion donde se realizo la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Institucion donde se realizo la ponencia agregado a cada ponencia existente    fecha:19/07/2019
                lugarponencia=fiel.lugarPonencia

                #Filiacion de la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar filiacion por cada ponencia    fecha:19/07/2019
                if fiel.filialUtc=='Si':
                    filial=fiel.filialUtc
                else:
                    filial=''

                #Financiamiento de la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar financiamineto por cada ponencia    fecha:19/07/2019
                financia=fiel.financiamiento

                #Pais y ciudad donde se realizo la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Pais y ciudad por cada ponencia    fecha:19/07/2019
                if str(fiel.pais)!='None':
                    paises=fiel.pais
                else:
                    paises=''

                if str(fiel.ciudad)!='None':
                    ciudades=fiel.ciudad
                else:
                    ciudades=''
                
                #Tipo de fuente de la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar tipo de fuente por cada ponencia    fecha:19/07/2019
                tipos=""
                if str(fiel.tipo)=='1':
                    tipos="Ponencia sin publicación"
                    
                else: 
                    if str(fiel.tipo)=='2':
                        tipos="Libro de resúmenes"
                        
                    else: 
                        if str(fiel.tipo)=='3':
                            tipos="Libro de memorias(ISBN)"
                            
                        else: 
                            if str(fiel.tipo)=='4':
                                tipos="Ponencia publicada (ISBN, publicado en una revista indexada a una base de datos y revisada por pares externo)"
                                
                #Nombre del articulo relacionado con la ponencia agregado por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                #Agregar nombre del articulo por cada ponencia    fecha:19/07/2019
                articulo=articulos_cientificos.objects.filter(id=fiel.articuloCientifico_id)
                a=''
                for ar in articulo:
                    if str(ar.titulo)!='None':
                        a=ar.titulo
                    else:
                        a=''

                urls=''

            if str(d.ponencia.id) not in inicio:
                inicio.append(str(d.ponencia.id))
                item={}
                item['id']=str(d.ponencia.id)
                item['nombrePonencia']=str(nombreponencia)
                item['titulo']=str(d.ponencia.tituloPonencia)
                item['lugarPonencia']=str(lugarponencia)
                item['fecha']=str(d.ponencia.fechaPonencia)
                anio=str(d.ponencia.fechaPonencia).split('-')
                item['anio']=str(anio[0])
                if str(d.ponencia.urlPonencia)!='None':
                    item['url']=str(d.ponencia.urlPonencia)
                else:
                    item['url']=str(urls)
                item['documento']=str(d.ponencia.informe)
                item['autor']=str(nombres)
                item['autores']=str(nombresCompletos).upper()
                item['zona']=str(la['z'])
                item['zona_n']=str(zona_n.Nombre)
                item['universidad']=str(la['u'])
                item['universidad_n']=str(universidad_n.Nombre)
                item['campus']=str(la['cm'])
                item['campus_n']=str(campus_n.Nombre)
                item['facultad']=str(la['fa'])
                item['facultad_n']=str(facultad_n.Nombre)
                item['carrera']=str(la['ca'])
                item['carrera_n']=str(carrera_n.Nombre)
                item['cedula']=str(cedulass)
                item['isbn']=str(isbbn)
                item['filiacion']=str(filial)
                item['financiamiento']=str(financia)
                item['pais']=str(paises)
                item['ciudad']=str(ciudades)
                item['tipo']=str(tipos)
                item['articulo']=str(a)
                
                
                usuario.append(item)
            else:
                pone=pone-1
        else:
            pone=pone-1
    return {'pone':pone,'usuario':usuario,'inicio':inicio}

def search_filtros(request):
    if request.method == 'POST':
        articulo_json=[]
        libro_json=[]
        capitulo_json=[]
        ponencia_json=[]
        proyecto_json=[]
        #Articulos////////////////////////////////////////////////////////////////////////////
        inv=User.objects.all()
        results = []
        vacio=[]
        inicio=[]
        usuario=[]
        for iv in inv:
            arti=autoresArticulos.objects.filter(user_id=iv.id)
            if int(arti.count())>0:
                inl=Investigador.objects.select_related("informacionLaboral").get(user_id=iv.id)
                if str(inl.informacionLaboral.carrera_id)!='None':
                    u1=carrera.objects.get(id=inl.informacionLaboral.carrera.id)
                    u2=facultad.objects.get(id=u1.facultad_id)
                    u3=campus.objects.get(id=u2.campus_id)
                    u4=universidad.objects.get(id=u3.universidad_id)
                    if str(u4.zona_id)!='None':
                        if str(u4.zona_id) not in vacio:
                            laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                            datos_articulos = numero_articulos(iv,arti.count(),arti,laboral,inicio,usuario) 
                            arti=datos_articulos['arti']
                            usuario=datos_articulos['usuario']
                            inicio=datos_articulos['inicio']
                            if arti>0:
                                arti_json = {}
                                arti_json['x'] = str(u4.zona_id)
                                arti_json['y'] = arti
                                results.append(arti_json)
                                vacio.append(str(u4.zona_id))
                        else:
                            for re in results:
                                if re['x']==str(u4.zona_id):
                                    laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                                    datos_articulos = numero_articulos(iv,arti.count(),arti,laboral,inicio,usuario) 
                                    arti=datos_articulos['arti']
                                    usuario=datos_articulos['usuario']
                                    inicio=datos_articulos['inicio']
                                    re['y']=re['y']+arti
        articulo_json=usuario
        #Libros////////////////////////////////////////////////////////////////////////////
        inv=User.objects.all()
        results = []
        vacio=[]
        inicio=[]
        usuario=[]
        for iv in inv:
            lib=autoresLibro.objects.filter(user_id=iv.id)
            if int(lib.count())>0:
                inl=Investigador.objects.select_related("informacionLaboral").get(user_id=iv.id)
                if str(inl.informacionLaboral.carrera_id)!='None':
                    u1=carrera.objects.get(id=inl.informacionLaboral.carrera.id)
                    u2=facultad.objects.get(id=u1.facultad_id)
                    u3=campus.objects.get(id=u2.campus_id)
                    u4=universidad.objects.get(id=u3.universidad_id)
                    if str(u4.zona_id)!='None':
                        if str(u4.zona_id) not in vacio:
                            laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                            datos_libros = numero_libros(iv,lib.count(),lib,laboral,inicio,usuario) 
                            lib=datos_libros['lib']
                            usuario=datos_libros['usuario']
                            inicio=datos_libros['inicio']
                            if lib>0:
                                lib_json = {}
                                lib_json['x'] = str(u4.zona_id)
                                lib_json['y'] = lib
                                results.append(lib_json)
                                vacio.append(str(u4.zona_id))
                        else:
                            for re in results:
                                if re['x']==str(u4.zona_id):
                                    laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                                    datos_libros = numero_libros(iv,lib.count(),lib,laboral,inicio,usuario) 
                                    lib=datos_libros['lib']
                                    usuario=datos_libros['usuario']
                                    inicio=datos_libros['inicio']
                                    re['y']=re['y']+lib
        libro_json=usuario
        #Libros_Capitulos////////////////////////////////////////////////////////////////////////////
        inv=User.objects.all()
        results = []
        vacio=[]
        usuario=[]
        for iv in inv:
            capi=autoresLibro.objects.filter(user_id=iv.id)
            if int(capi.count())>0:
                inl=Investigador.objects.select_related("informacionLaboral").get(user_id=iv.id)
                if str(inl.informacionLaboral.carrera_id)!='None':
                    u1=carrera.objects.get(id=inl.informacionLaboral.carrera.id)
                    u2=facultad.objects.get(id=u1.facultad_id)
                    u3=campus.objects.get(id=u2.campus_id)
                    u4=universidad.objects.get(id=u3.universidad_id)
                    if str(u4.zona_id)!='None':
                        if str(u4.zona_id) not in vacio:
                            laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                            datos_capitulos = numero_libros_capitulos(iv,capi.count(),capi,laboral,usuario) 
                            capi=datos_capitulos['capi']
                            usuario=datos_capitulos['usuario']
                            if capi>0:
                                capi_json = {}
                                capi_json['x'] = str(u4.zona_id)
                                capi_json['y'] = capi
                                results.append(capi_json)
                                vacio.append(str(u4.zona_id))
                        else:
                            for re in results:
                                if re['x']==str(u4.zona_id):
                                    laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                                    datos_capitulos = numero_libros_capitulos(iv,capi.count(),capi,laboral,usuario) 
                                    capi=datos_capitulos['capi']
                                    usuario=datos_capitulos['usuario']
                                    re['y']=re['y']+capi
        capitulo_json=usuario
        #Ponencias////////////////////////////////////////////////////////////////////////////
        inv=User.objects.all()
        results = []
        vacio=[]
        inicio=[]
        usuario=[]
        for iv in inv:
            pone=autoresPonencia.objects.filter(user_id=iv.id)
            if int(pone.count())>0:
                inl=Investigador.objects.get(user_id=iv.id)
                if str(inl.informacionLaboral_id)!='None':
                    inl=Investigador.objects.select_related("informacionLaboral").get(user_id=iv.id)
                    if str(inl.informacionLaboral.carrera_id)!='None':
                        u1=carrera.objects.get(id=inl.informacionLaboral.carrera.id)
                        u2=facultad.objects.get(id=u1.facultad_id)
                        u3=campus.objects.get(id=u2.campus_id)
                        u4=universidad.objects.get(id=u3.universidad_id)
                        if str(u4.zona_id)!='None':
                            if str(u4.zona_id) not in vacio:
                                laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                                datos_ponencias = numero_ponencias(iv,pone.count(),pone,laboral,inicio,usuario) 
                                pone=datos_ponencias['pone']
                                usuario=datos_ponencias['usuario']
                                inicio=datos_ponencias['inicio']
                                if pone>0:
                                    pone_json = {}
                                    pone_json['x'] = str(u4.zona_id)
                                    pone_json['y'] = pone
                                    results.append(pone_json)
                                    vacio.append(str(u4.zona_id))
                            else:
                                for re in results:
                                    if re['x']==str(u4.zona_id):
                                        laboral={'ca':u1.id,'fa':u2.id,'cm':u3.id,'u':u4.id,'z':u4.zona_id}
                                        datos_ponencias = numero_ponencias(iv,pone.count(),pone,laboral,inicio,usuario) 
                                        pone=datos_ponencias['pone']
                                        usuario=datos_ponencias['usuario']
                                        inicio=datos_ponencias['inicio']
                                        re['y']=re['y']+pone
        ponencia_json=usuario
        union={'Articulos':articulo_json,'Libros':libro_json,'Capitulos':capitulo_json,'Ponencias':ponencia_json}
        with open('C:\workspace\Cienciometrico\static\graficas\similaridad\json\json\estadisticas.json', 'w') as file:
            json.dump(union, file, indent=4)
        matriz_json = json.dumps(union)
        mimetype="application/json"
        return HttpResponse(matriz_json,mimetype)




