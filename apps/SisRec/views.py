
import unicodedata
import os, sys
import requests, PyPDF2, io
import random


# This Python file uses the following encoding: utf-8
from django.http import HttpResponse
from django.shortcuts import render,redirect
from django.views.generic import ListView,TemplateView, DetailView
from apps.Investigador.models import Investigador
from apps.carrera.models import carrera
from apps.Formacion_Academica.models import formacion_academica
from apps.SisRec.models import SolicitudColaboracion
from apps.SisRec.models import Mensaje
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Libro.models import libro
from apps.Ponencia.models import ponencia
from apps.Revista.models import revista
from apps.SisRec.models import Publicacion
from apps.SisRec.models import ProyectosMacro
from apps.SisRec.models import Estadisticas
from apps.SisRec.models import Likes
from apps.SisRec.models import GlobalKeywordsInvestigador
from apps.SisRec.models import GlobalKeywords
from apps.SisRec.models import Notificacion
from apps.informacionLaboral.models import informacionLaboral
from apps.campus.models import campus
from apps.universidad.models import universidad
from apps.ciudad.models import ciudad



from apps.autoresArticulos.models import autoresArticulos
from django.contrib.auth.models import User
from apps.autoresLibro.models import autoresLibro
from apps.autoresPonencia.models import autoresPonencia

from datetime import datetime
from django.utils import formats
from django.db.models import Q
from django.contrib import messages

import json
#para el entrenamiento de la red neuronal y prediccion de datos

import pandas as pd

import requests
import numpy as np
from sklearn import metrics

from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Activation
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.utils import to_categorical
from tensorflow.keras.models import load_model
from sklearn.metrics import accuracy_score


colaboradores=[]

# Create your views here.
def index(request):
    #carga las sugerencias temporales
    usuario = request.user.id
    perfil = Investigador.objects.get(user_id=usuario)
    investigador_id=0
    for inv in Investigador.objects.filter(user_id=usuario):
        investigador_id=inv.id

    if (GlobalKeywordsInvestigador.objects.filter(investigador_id= investigador_id,estado=True).exists()):
        return render(request, 'SisRec/index.html', {'usuario': perfil})
    else:
        keywords=GlobalKeywords.objects.all().order_by("termino")

        return render(request, 'SisRec/keywords.html', {'keywords':keywords,'usuario': perfil})



def getRecomendation(request):
    #bloque de predicción de la red neuronal
    kwid= []
    carreraid=[]
    predicciones=[]
    prediccionTotal=[]
    vectorFinal=[]
    yo=0
    for invs in Investigador.objects.filter(user_id=request.user.id):
        yo=invs.id
    if(GlobalKeywordsInvestigador.objects.filter(investigador_id=yo).exists()):
        for ik in GlobalKeywordsInvestigador.objects.filter(investigador_id=yo):
            for gk in GlobalKeywords.objects.filter(id=ik.globalKeywors_id):
                kwid.append(ik.globalKeywors_id)
                carreraid.append(gk.carrera_id)
                prediccion=prediceColaborador(ik.globalKeywors_id,gk.carrera_id)
                predicciones.append(prediccion)
        #print("la prediccion total a sido", predicciones)
        for i in range(len(predicciones)):
            for j in range(len(predicciones[i])):
                #print(predicciones[i][j])
                prediccionTotal.append(predicciones[i][j])
        for i in range(len(kwid)):
            for gki in GlobalKeywordsInvestigador.objects.filter(globalKeywors_id=kwid[i]):
                prediccionTotal.append(gki.investigador_id)
        prediccionSinR=list(set(prediccionTotal))
        carreraSinR=list(set(carreraid))
        
        for prd in range(len(prediccionSinR)):
            for invSugrd in Investigador.objects.filter(id=prediccionSinR[prd]):
                #print("Invesid=",invSugrd.user_id)
                for usrSugrd in User.objects.filter(id=invSugrd.user_id):
                    #print("Usuarioid=",usrSugrd.username)
                    for iflSugrd in informacionLaboral.objects.filter(id=invSugrd.informacionLaboral_id):
                        for carraSugrd in carrera.objects.filter(id=iflSugrd.carrera_id):
                            for campSugrd in campus.objects.filter(id=iflSugrd.campus_id):
                                for unvSugrd in universidad.objects.filter(id=campSugrd.universidad_id):
                                    if invSugrd.user_id==request.user.id:
                                        print("")
                                        #print("........................soy yo mismo............................................")
                                    else:
                                        #VALIDAMOS QUE SI EL USUARIO NO TENGA ENVIADO LA SOLICITUD PARA QUE NO LE SUGIERA OTRA VEZ
                                        #con
                                        if  not SolicitudColaboracion.objects.filter(idEmisor_id=yo,idReceptor_id=invSugrd).exists():
                                            if not SolicitudColaboracion.objects.filter(idEmisor_id=invSugrd,idReceptor_id=yo).exists():
                                                #print(" user="+str(yo)+" si imprimo id="+ str (usr)+ " consulta="+str(SolicitudColaboracion.objects.filter(idEmisor_id=yo,idReceptor_id=usr).exists()))
                                                vector = {}
                                                vector["id"]=usrSugrd.id
                                                vector["username"]=usrSugrd.username
                                                vector["nombres"]=separaTexto(usrSugrd.first_name)
                                                vector["apellidos"]=separaTexto(usrSugrd.last_name)
                                                vector["foto"]=str(invSugrd.photo)
                                                vector["universidadId"]=unvSugrd.id
                                                vector["universidad"]=unvSugrd.Nombre
                                                vector["carreraId"]=carraSugrd.id
                                                vector["carrera"]=carraSugrd.Nombre
                                                vectorFinal.append(vector)
                                               

    json = serializaVector(vectorFinal)
    #print("vec final mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
    #print(json) 

    return HttpResponse(json, content_type='application/json')
def addSolicitud(request):
        usuario=request.user

        idEmisor= Investigador.objects.get(user_id=usuario)

        idReceptor=Investigador.objects.get(user_id=request.POST['userDestinoId'])
        estado=False
        solicitud=SolicitudColaboracion.objects.create(
        idEmisor=idEmisor,
        idReceptor=idReceptor,
        estado=estado
        )
        solicitud.save()
        if solicitud:
            status={}
            status["status"]=1
            status["obj"]=solicitud.id
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
def getColaboradores(request):
    colaboradores.clear()
    yo=0
    for invs in Investigador.objects.filter(user_id=request.user.id):
        yo=invs.id
    vectorFinal=[]
    if SolicitudColaboracion.objects.filter(idEmisor_id=yo, estado=True).exists():
        colaboradores1=SolicitudColaboracion.objects.filter(idEmisor_id=yo, estado=True)
        for clbs in colaboradores1:
            for inves in Investigador.objects.filter(id=clbs.idReceptor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    vector={}
                    vector2= {}
                    vector2["id"]=inves.id
                    vector["id"]=inves.id
                    vector["username"]=usrs.username
                    vector["nombres"]=separaTexto(usrs.first_name)
                    vector["apellidos"]=separaTexto(usrs.last_name)
                    vector["foto"]=str(inves.photo)
                    vectorFinal.append(vector)
                    colaboradores.append(vector2)
    if SolicitudColaboracion.objects.filter(idReceptor_id=yo, estado=True).exists():
        colaboradores2=SolicitudColaboracion.objects.filter(idReceptor_id=yo, estado=True)
        for clbs2 in colaboradores2:
            for inves in Investigador.objects.filter(id=clbs2.idEmisor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    vector={}
                    vector2= {}
                    vector2["id"]=inves.id
                    vector["id"]=inves.id
                    vector["username"]=usrs.username
                    vector["nombres"]=separaTexto(usrs.first_name)
                    vector["apellidos"]=separaTexto(usrs.last_name)
                    vector["foto"]=str(inves.photo)
                    vectorFinal.append(vector)
                    colaboradores.append(vector2)

            #print(clbs2.idEmisor_id)
        #vector["carrera"]=s.carreranombre
        #vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')
def getSolicitudes(request):
    yo=0
    for invs in Investigador.objects.filter(user_id=request.user.id):
        yo=invs.id
    vectorFinal=[]
    if SolicitudColaboracion.objects.filter(idReceptor_id=yo, estado=False).exists():

        for clbs in SolicitudColaboracion.objects.filter(idReceptor_id=yo, estado=False):
            for inves in Investigador.objects.filter(id=clbs.idEmisor_id):
                queryTotal = 'SELECT *FROM public."useruniversidad" where public."useruniversidad".id=' + str(inves.user_id)
                #print("query 2 = ",queryTotal)
                for solici in carrera.objects.raw(queryTotal):
                    vector = {}
                    vector["id"]=solici.id
                    vector["username"]=solici.username
                    vector["nombres"]=separaTexto(solici.first_name)
                    vector["apellidos"]=separaTexto(solici.last_name)
                    vector["foto"]=solici.photo
                    vector["universidadId"]=solici.universidadid
                    vector["universidad"]=solici.Nombre
                    vector["carreraId"]=solici.carreraid
                    vector["carrera"]=solici.carreranombre
                    vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')
def sendMessage(request):
    emisor=request.user.id

    message=request.POST['message']
    destinatario=request.POST['destinatario']
    #print(" el emisor= a ",emisor)
    #print("el receptor es = a ", destinatario)
    solicitud=Mensaje.objects.create(
    fecha=datetime.now(),
    hora=datetime.now(),
    leido=False,
    mensaje=message,
    idEmisor=Investigador.objects.get(user_id=emisor),
    idReceptor=Investigador.objects.get(id=destinatario),
    )
    solicitud.save()
    emisor_id=0
    for investigador in Investigador.objects.filter(user_id=emisor):
        emisor_id= investigador.id
    if solicitud:
        status={}
        status["status"]=1
        status["IdEmisor"]=emisor_id
        status["IdReceptor"]=destinatario
        status["obj"]=solicitud.id
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')
    else:
        status={}
        status["status"]=0
        status["obj"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')
def getMessage(request):
    Emisor=request.POST['IdEmisor']
    Receptor=request.POST['IdReceptor']
    #print("envio msg")
    #print("emisor=",Emisor)
    #print("receptor=",Receptor)

    vectorFinal=[]
    for msg in Mensaje.objects.filter(idEmisor_id=Emisor, idReceptor_id=Receptor).order_by('id'):
        vector = {}
        vector["id"]=msg.id
        vector["fecha"]=str(msg.fecha)
        vector["hora"]=str(msg.hora)
        vector["mensaje"]=msg.mensaje
        vector["idEmisor_id"]=msg.idEmisor_id
        vector["idReceptor_id"]=msg.idReceptor_id
        vectorFinal.append(vector)
    for msg in Mensaje.objects.filter(idEmisor_id=Receptor, idReceptor_id=Emisor).order_by('id'):
        vector = {}
        vector["id"]=msg.id
        vector["fecha"]= str(msg.fecha)
        vector["hora"]=str(msg.hora)
        vector["mensaje"]=msg.mensaje
        vector["idEmisor_id"]=msg.idEmisor_id
        vector["idReceptor_id"]=msg.idReceptor_id
        vectorFinal.append(vector)

    resultado = sorted(vectorFinal, key=lambda k: k['id'])

    json = serializaVector(resultado)
    return HttpResponse(json, content_type='application/json')

def getArticulos(request):
    usuario=request.user.id
    vectorFinal=[]
    for artcl in articulos_cientificos.objects.filter(user_id=usuario):
        vector = {}
        vector["id"]=artcl.id
        vector["titulo"]=artcl.titulo
        vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')

def getLibros(request):
    usuario=request.user.id
    vectorFinal=[]
    for artcl in libro.objects.filter(user_id=usuario):
        vector = {}
        vector["id"]=artcl.id
        vector["titulo"]=artcl.Titulo
        vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')

def getPonencias(request):
    usuario=request.user.id
    vectorFinal=[]
    for artcl in ponencia.objects.filter(user_id=usuario):
        vector = {}
        vector["id"]=artcl.id
        vector["titulo"]=artcl.nombrePonencia
        vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')
def getProyectosMacro(request):
    usuario=request.user.id
    vectorFinal=[]
    queryTotal = 'SELECT * FROM public."usercarrera" where  public."usercarrera".id=' + str(usuario)+' order by id'
    arrera_id=0
    for carr in carrera.objects.raw(queryTotal):
        carrera_id=carr.carreraid
    for pMacro in ProyectosMacro.objects.filter(carrera_id=carrera_id):
        vector = {}
        vector["id"]=pMacro.id
        vector["nombre"]=pMacro.nombre
        vector["tipo"]=pMacro.tipo
        vector["carrera_id"]=pMacro.carrera_id
        vectorFinal.append(vector)
    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')

def addPublicacion(request):
    tema=request.POST['tema']
    tipoPublicacion=request.POST['tipoPublicacion']
    articulo=request.POST['articulo']
    libr=request.POST['libro']
    ponenci=request.POST['ponencia']
    proyectosMacr=request.POST['proyectoMacro']
    investigadorid=request.POST['investigadorid']
    print(tema,tipoPublicacion,articulo,libr,ponenci, proyectosMacr, investigadorid)
    if(articulo!="null"):
        #print ("entre articulo")
        #print(tema,tipoPublicacion,articulo,libro,ponencia, ProyectosMacro)
        publicacio= Publicacion.objects.create(
        fecha=datetime.now(),
        hora=datetime.now(),
        tema=tema,
        tipo=tipoPublicacion,
        articulo=articulos_cientificos.objects.get(id=articulo),
        investigador=Investigador.objects.get(id=investigadorid),
        proyectosMacro=ProyectosMacro.objects.get(id=proyectosMacr)
        )
    if(ponenci!="null"):
        #print("entre ponencia")
    #articuloCientifico=articulos_cientificos.objects.filter(id=articulo)
        publicacio= Publicacion.objects.create(
        fecha=datetime.now(),
        hora=datetime.now(),
        tema=tema,
        tipo=tipoPublicacion,
        ponencia=ponencia.objects.get(id=ponenci),
        investigador=Investigador.objects.get(id=investigadorid),
        proyectosMacro=ProyectosMacro.objects.get(id=proyectosMacr)
        )

    if(libr!="null"):
        #print("entre libro")
    #articuloCientifico=articulos_cientificos.objects.filter(id=articulo)
        publicacio= Publicacion.objects.create(
        fecha=datetime.now(),
        hora=datetime.now(),
        tema=tema,
        tipo=tipoPublicacion,
        libro=libro.objects.get(id=libr),
        investigador=Investigador.objects.get(id=investigadorid),
        proyectosMacro=ProyectosMacro.objects.get(id=proyectosMacr)
        )

    publicacio.save()
    if publicacio:
        status={}
        status["status"]=1
        status["obj"]=publicacio.id
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')
    else:
        status={}
        status["status"]=0
        status["obj"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')

def updatePublicacion(request):
    usuario=request.user.id
    idPub=request.POST['idPub']
    tema=request.POST['tema']
    tipoPublicacion=request.POST['tipoPublicacion']
    articulo=request.POST['articulo']
    libr=request.POST['libro']
    ponenci=request.POST['ponencia']
    proyectoMacro=request.POST['proyectoMacro']
    inv=Investigador.objects.get(user_id=usuario)
    investigadorid=inv.id
    print("update publicacion-----------------------------------------------")
    print(idPub,tema,tipoPublicacion,articulo,libr,ponenci, proyectoMacro, investigadorid)
    if(articulo!="null"):
        #print ("entre articulo")
        #print(tema,tipoPublicacion,articulo,libro,ponencia, ProyectosMacro)
        publicacio= Publicacion.objects.get(id=idPub)

        publicacio.tema=tema
        publicacio.tipo=tipoPublicacion
        publicacio.articulo=articulos_cientificos.objects.get(id=articulo)
        publicacio.investigador=Investigador.objects.get(id=investigadorid)
        publicacio.proyectosMacro=ProyectosMacro.objects.get(id=proyectoMacro)


    if(ponenci!="null"):
        #print("entre ponencia")
    #articuloCientifico=articulos_cientificos.objects.filter(id=articulo)
        publicacio= Publicacion.objects.create(
        fecha=datetime.now(),
        hora=datetime.now(),
        tema=tema,
        tipo=tipoPublicacion,
        ponencia=ponencia.objects.get(id=ponenci),
        investigador=Investigador.objects.get(id=investigadorid),
        proyectosMacro=ProyectosMacro.objects.get(id=proyectosMacr)
        )

    if(libr!="null"):
        #print("entre libro")
    #articuloCientifico=articulos_cientificos.objects.filter(id=articulo)
        publicacio= Publicacion.objects.create(
        fecha=datetime.now(),
        hora=datetime.now(),
        tema=tema,
        tipo=tipoPublicacion,
        libro=libro.objects.get(id=libr),
        investigador=Investigador.objects.get(id=investigadorid),
        proyectosMacro=ProyectosMacro.objects.get(id=proyectosMacr)
        )

    publicacio.save()
    if publicacio:
        status={}
        status["status"]=1
        status["obj"]=publicacio.id
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')
    else:
        status={}
        status["status"]=0
        status["obj"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')

def getPublicacion(request):
    investigadorid=request.POST['investigadorid']
    vectorFinal=[]
     #print(len(colaboradores))
    if(Publicacion.objects.filter(investigador_id=investigadorid).exists()):
            for pub in Publicacion.objects.filter(investigador_id=investigadorid):
                if(pub.tipo=="Artículo Científico"):
                    for ar in articulos_cientificos.objects.filter(id=pub.articulo_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["articuloCientificoId"]=ar.id
                                vector["estado"]=ar.estado
                                vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                vector["resumen"]=ar.resumen
                                vector["URLdocumento"]=str(ar.documento)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):

                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)

                                    vector["Likes"]=likesTotal

                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal

                                autoresTotal=[]
                                #print("......................................................................")
                                #print("articuloid===", ar.id)
                                for autar in autoresArticulos.objects.filter(articulo_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)

                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)

                if(pub.tipo=="Libro"):
                    #print("es libro")
                    for ar in libro.objects.filter(id=pub.libro_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["articuloCientificoId"]=ar.id
                                vector["estado"]=ar.estado
                                vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                vector["resumen"]= ar.Resumen
                                vector["URLdocumento"]=str(ar.Documento)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):

                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)

                                    vector["Likes"]=likesTotal

                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal

                                autoresTotal=[]
                                #print("......................................................................")
                                #print("articuloid===", ar.id)
                                for autar in autoresLibro.objects.filter(libro_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)

                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)


                if(pub.tipo=="Ponencia"):
                    #print("es libro")
                    for ar in ponencia.objects.filter(id=pub.ponencia_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["ponenciaId"]=ar.id
                                vector["fechaPonencia"]= str(ar.fechaPonencia)
                                vector["resumen"]= ar.resumen
                                vector["URLdocumento"]=str(ar.certificado)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):

                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)

                                    vector["Likes"]=likesTotal

                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal

                                autoresTotal=[]
                                #print("......................................................................")
                                #print("articuloid===", ar.id)
                                for autar in autoresPonencia.objects.filter(ponencia_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)
                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)

    #comprobamos si el vector de los amigos estan vacios
      
   
    if(not(len(colaboradores)==0)):
       
       

        for clb in colaboradores:
            #print("colaborador= ",clb['id'])
            if(Publicacion.objects.filter(investigador_id=clb['id']).exists()):
                for pub in Publicacion.objects.filter(investigador_id=clb['id']):
                    if(pub.tipo=="Artículo Científico"):

                        for ar in articulos_cientificos.objects.filter(id=pub.articulo_id):
                            for inv in Investigador.objects.filter(id=pub.investigador_id):
                                query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                                for info in carrera.objects.raw(query):

                                    vector = {}
                                    vector["id"]=pub.id
                                    vector["fecha"]=str(pub.fecha)
                                    vector["hora"]=str(pub.hora)
                                    vector["tema"]=pub.tema
                                    vector["tipo"]=pub.tipo
                                    vector["investigadorid"]=pub.investigador_id
                                    vector["libro"]=str(pub.libro_id)
                                    vector["ponencia_id"]=str(pub.ponencia_id)
                                    vector["proyectoMacro"]=pub.proyectosMacro_id

                                    vector["articuloCientificoId"]=ar.id
                                    vector["estado"]=ar.estado
                                    vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                    vector["resumen"]=ar.resumen
                                    vector["URLdocumento"]=str(ar.documento)

                                    vector["nombres"]=separaTexto(info.first_name)
                                    vector["apellidos"]=separaTexto(info.last_name)
                                    vector["foto"]=str(info.photo)
                                    vector["universidadId"]=info.universidadid
                                    vector["universidad"]=info.Nombre

                                    if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                        for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                            vector["nLecturas"]=est.nLecturas
                                            vector["nCitas"]=est.nCitas
                                            vector["nDescargas"]=est.nDescargas
                                    else:
                                        vector["nLecturas"]=0
                                        vector["nCitas"]=0
                                        vector["nDescargas"]=0

                                    if Likes.objects.filter(publicacion_id=pub.id).exists():
                                        likesTotal=[]
                                        for lik in Likes.objects.filter(publicacion_id=pub.id):
                                            temp={}
                                            temp["like"]=lik.like
                                            temp["investigadorid"]=lik.investigador_id
                                            temp["publicacionid"]=lik.publicacion_id
                                            likesTotal.append(temp)

                                        vector["Likes"]=likesTotal
                                    else:
                                        likesTotal=[]
                                        vector["Likes"]=likesTotal
                                    autoresTotal=[]
                                    #print("articuloid===", ar.id)
                                    for autar in autoresArticulos.objects.filter(articulo_id=ar.id):

                                    #print("autorArticulo===",autar.id)
                                        query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                        if Investigador.objects.filter(user_id=autar.user_id).exists():
                                            for invs in Investigador.objects.filter(user_id=autar.user_id):
                                                for info in carrera.objects.raw(query2):
                                                #    print("inves=",invs.id)
                                                    vector2 = {}
                                                    vector2["idInvestigador"]=invs.id
                                                    vector2["gradoAutoria"]=autar.gradoAutoria
                                                    vector2["nombres"]=separaTexto(info.first_name)
                                                    vector2["apellidos"]=separaTexto(info.last_name)
                                                    vector2["autorFoto"]=str(invs.photo)
                                                autoresTotal.append(vector2)
                                            vector["autores"]=autoresTotal
                                    vectorFinal.append(vector)

                    if(pub.tipo=="Libro"):

                        for ar in libro.objects.filter(id=pub.libro_id):
                            for inv in Investigador.objects.filter(id=pub.investigador_id):
                                query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                                for info in carrera.objects.raw(query):

                                    vector = {}
                                    vector["id"]=pub.id
                                    vector["fecha"]=str(pub.fecha)
                                    vector["hora"]=str(pub.hora)
                                    vector["tema"]=pub.tema
                                    vector["tipo"]=pub.tipo
                                    vector["investigadorid"]=pub.investigador_id
                                    vector["libro"]=str(pub.libro_id)
                                    vector["ponencia_id"]=str(pub.ponencia_id)
                                    vector["proyectoMacro"]=pub.proyectosMacro_id

                                    vector["articuloCientificoId"]=ar.id
                                    vector["estado"]=ar.estado
                                    vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                    vector["resumen"]= ar.Resumen
                                    vector["URLdocumento"]=str(ar.Documento)

                                    vector["nombres"]=separaTexto(info.first_name)
                                    vector["apellidos"]=separaTexto(info.last_name)
                                    vector["foto"]=str(info.photo)
                                    vector["universidadId"]=info.universidadid
                                    vector["universidad"]=info.Nombre

                                    if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                        for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                            vector["nLecturas"]=est.nLecturas
                                            vector["nCitas"]=est.nCitas
                                            vector["nDescargas"]=est.nDescargas
                                    else:
                                        vector["nLecturas"]=0
                                        vector["nCitas"]=0
                                        vector["nDescargas"]=0

                                    if Likes.objects.filter(publicacion_id=pub.id).exists():
                                        likesTotal=[]
                                        for lik in Likes.objects.filter(publicacion_id=pub.id):
                                            temp={}
                                            temp["like"]=lik.like
                                            temp["investigadorid"]=lik.investigador_id
                                            temp["publicacionid"]=lik.publicacion_id
                                            likesTotal.append(temp)

                                        vector["Likes"]=likesTotal
                                    else:
                                        likesTotal=[]
                                        vector["Likes"]=likesTotal
                                    autoresTotal=[]
                                    #print("articuloid===", ar.id)
                                    for autar in autoresLibro.objects.filter(libro_id=ar.id):

                                    #print("autorArticulo===",autar.id)
                                        query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                        if Investigador.objects.filter(user_id=autar.user_id).exists():
                                            for invs in Investigador.objects.filter(user_id=autar.user_id):
                                                for info in carrera.objects.raw(query2):
                                                #    print("inves=",invs.id)
                                                    vector2 = {}
                                                    vector2["idInvestigador"]=invs.id
                                                    vector2["gradoAutoria"]=autar.gradoAutoria
                                                    vector2["nombres"]=separaTexto(info.first_name)
                                                    vector2["apellidos"]=separaTexto(info.last_name)
                                                    vector2["autorFoto"]=str(invs.photo)
                                                autoresTotal.append(vector2)
                                            vector["autores"]=autoresTotal
                                    vectorFinal.append(vector)
                    if(pub.tipo=="Ponencia"):

                        for ar in ponencia.objects.filter(id=pub.ponencia_id):
                            for inv in Investigador.objects.filter(id=pub.investigador_id):
                                query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                                for info in carrera.objects.raw(query):

                                    vector = {}
                                    vector["id"]=pub.id
                                    vector["fecha"]=str(pub.fecha)
                                    vector["hora"]=str(pub.hora)
                                    vector["tema"]=pub.tema
                                    vector["tipo"]=pub.tipo
                                    vector["investigadorid"]=pub.investigador_id
                                    vector["libro"]=str(pub.libro_id)
                                    vector["ponencia_id"]=str(pub.ponencia_id)
                                    vector["proyectoMacro"]=pub.proyectosMacro_id

                                    vector["ponenciaId"]=ar.id
                                    vector["fechaPonencia"]= str(ar.fechaPonencia)
                                    vector["resumen"]= ar.resumen
                                    vector["URLdocumento"]=str(ar.certificado)

                                    vector["nombres"]=separaTexto(info.first_name)
                                    vector["apellidos"]=separaTexto(info.last_name)
                                    vector["foto"]=str(info.photo)
                                    vector["universidadId"]=info.universidadid
                                    vector["universidad"]=info.Nombre

                                    if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                        for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                            vector["nLecturas"]=est.nLecturas
                                            vector["nCitas"]=est.nCitas
                                            vector["nDescargas"]=est.nDescargas
                                    else:
                                        vector["nLecturas"]=0
                                        vector["nCitas"]=0
                                        vector["nDescargas"]=0

                                    if Likes.objects.filter(publicacion_id=pub.id).exists():
                                        likesTotal=[]
                                        for lik in Likes.objects.filter(publicacion_id=pub.id):
                                            temp={}
                                            temp["like"]=lik.like
                                            temp["investigadorid"]=lik.investigador_id
                                            temp["publicacionid"]=lik.publicacion_id
                                            likesTotal.append(temp)

                                        vector["Likes"]=likesTotal
                                    else:
                                        likesTotal=[]
                                        vector["Likes"]=likesTotal
                                    autoresTotal=[]
                                    #print("articuloid===", ar.id)
                                    for autar in autoresPonencia.objects.filter(ponencia_id=ar.id):

                                    #print("autorArticulo===",autar.id)
                                        query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                        if Investigador.objects.filter(user_id=autar.user_id).exists():
                                            for invs in Investigador.objects.filter(user_id=autar.user_id):
                                                for info in carrera.objects.raw(query2):
                                                #    print("inves=",invs.id)
                                                    vector2 = {}
                                                    vector2["idInvestigador"]=invs.id
                                                    vector2["gradoAutoria"]=autar.gradoAutoria
                                                    vector2["nombres"]=separaTexto(info.first_name)
                                                    vector2["apellidos"]=separaTexto(info.last_name)
                                                    vector2["autorFoto"]=str(invs.photo)
                                                autoresTotal.append(vector2)
                                            vector["autores"]=autoresTotal
                                    vectorFinal.append(vector)


    random.shuffle(vectorFinal)
    directorioP=pwd =os.path.dirname(os.path.realpath(sys.argv[0]))
    print(directorioP)

    json = serializaVector(vectorFinal)
    return HttpResponse(json, content_type='application/json')

def addUpdateDescarga(request):
    publicacionid=request.POST['publicacionid']
    #print("id pub ==", publicacionid)
    if Estadisticas.objects.filter(publicacion_id=publicacionid).exists():
        #print("hay que actualizar")
        estadisticasid=0
        ndescargas=0
        for est in Estadisticas.objects.filter(publicacion_id=publicacionid):
            estadisticasid=est.id
            ndescargas=est.nDescargas
        descarga = Estadisticas.objects.get(id=estadisticasid)
        descarga.nDescargas = ndescargas+1
        descarga.save()
        if descarga:
            status={}
            status["status"]=1
            status["indicador"]="update"
            status["estadisticaid"]=descarga.id
            status["publicacionid"]=publicacionid
            status["valor"]=ndescargas+1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
    else:
        #print("hay que crear")
        descarga=Estadisticas.objects.create(

        nLecturas=0,
        nCitas=0,
        nDescargas=1,
        publicacion=Publicacion.objects.get(id=publicacionid)
        )
        descarga.save()
        if descarga:
            status={}
            status["status"]=1
            status["indicador"]="add"
            status["estadisticaid"]=descarga.id
            status["publicacionid"]=publicacionid
            status["valor"]=1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')


def addUpdateLectura(request):
    publicacionid=request.POST['publicacionid']
    #print("id pub ==", publicacionid)
    if Estadisticas.objects.filter(publicacion_id=publicacionid).exists():
        #print("hay que actualizar")
        estadisticasid=0
        nlecturas=0
        for est in Estadisticas.objects.filter(publicacion_id=publicacionid):
            estadisticasid=est.id
            nlecturas=est.nLecturas
        lectura = Estadisticas.objects.get(id=estadisticasid)
        lectura.nLecturas = nlecturas+1
        lectura.save()

        if lectura:
            status={}
            status["status"]=1
            status["indicador"]="update"
            status["estadisticaid"]=lectura.id
            status["publicacionid"]=publicacionid
            status["valor"]=nlecturas+1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
    else:
        #print("hay que crear")
        lectura=Estadisticas.objects.create(

        nLecturas=1,
        nCitas=0,
        nDescargas=0,
        publicacion=Publicacion.objects.get(id=publicacionid)
        )
        lectura.save()
        if lectura:
            status={}
            status["status"]=1
            status["indicador"]="add"
            status["estadisticaid"]=lectura.id
            status["publicacionid"]=publicacionid
            status["valor"]=1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')

def addUpdateLike(request):
    publicacionid=request.POST['publicacionid']
    investigadorid=request.POST['investigadorid']
    indicador=request.POST['indicador']
    indicador2=False
    tipoPeticion=""
    if(indicador=="true"):
        indicador2=True
        tipoPeticion="like"
    else:
        indicador2=False
        tipoPeticion="dislike"
    #print(publicacionid,investigadorid,indicador)

    if Likes.objects.filter( investigador_id=investigadorid ,publicacion_id=publicacionid).exists():
        #print("hay que actualizar")
        Likeid=0
        for lik in Likes.objects.filter(investigador_id=investigadorid ,publicacion_id=publicacionid):
            Likeid=lik.id
        Like = Likes.objects.get(id=Likeid)
        Like.like = indicador2
        Like.save()

        if Like:
            status={}
            status["status"]=1
            status["indicador"]="update"
            status["likeid"]=Like.id
            status["publicacionid"]=int(publicacionid)
            status["tipoPeticion"]=tipoPeticion
            status["valor"]=indicador2

            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
    else:
        #print("hay que crear")
        Like=Likes.objects.create(
        like=indicador2,
        publicacion=Publicacion.objects.get(id=publicacionid),
        investigador=Investigador.objects.get(id=investigadorid)
        )
        Like.save()
        if Like:
            status={}
            status["status"]=1
            status["indicador"]="add"
            status["estadisticaid"]=Like.id
            status["publicacionid"]=int(publicacionid)
            status["tipoPeticion"]=tipoPeticion
            status["valor"]=indicador2
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')

def getCita(request):
    publicacionid=request.POST['publicacionid']
    tCita=request.POST['tCita']

    citaTotal=[]
    #print("los autores son")
    #print(tipoP)
    tamanoVecAutores=0
    for pub in Publicacion.objects.filter(id=publicacionid):
        print("Es " ,pub.tipo )
        if(pub.tipo=="Artículo Científico"):
            cita={}
            for art in articulos_cientificos.objects.filter(id=pub.articulo_id):
                cita["status"]=1
                cita["tipoP"]=pub.tipo
                cita["tCita"]=tCita
                cita["titulo"]=art.titulo
                cita["anio"]=separaAnio(str(art.fechaPublicacion),0)
                cita["paginas"]=getNPaginasPdf("http://"+request.META.get('HTTP_HOST')+"/media/"+str(art.documento))
                cita["volumen"]=art.volumen
                cita["numero"]=art.numero
                #http://192.168.123.58:8000/media/articulo/enrique.pdf
                for revis in revista.objects.filter(id=art.revista_id):
                    cita["nombreRevista"]=revis.Nombre
                    autores=[]
                for auArt in autoresArticulos.objects.filter(articulo_id=art.id).order_by("id"):
                    tamanoVecAutores+=1
                    for user in User.objects.filter(id=auArt.user_id):
                        autor={}
                        autor["nombres"]=user.first_name
                        autor["apellidos"]=user.last_name
                        autores.append(autor)
                    cita["autores"]=autores
            citaTotal.append(cita)


        if(pub.tipo=="Libro"):
            cita={}
            for art in libro.objects.filter(id=pub.libro_id):
                cita["status"]=1
                cita["tipoP"]=pub.tipo
                cita["tCita"]=tCita
                cita["titulo"]=art.Titulo
                cita["anio"]=separaAnio(str(art.fechaPublicacion),0)
                cita["editorial"]=art.Editorial
                autores=[]
                for auArt in autoresLibro.objects.filter(libro_id=art.id).order_by("id"):
                    tamanoVecAutores+=1
                    for user in User.objects.filter(id=auArt.user_id):
                        autor={}
                        autor["nombres"]=user.first_name
                        autor["apellidos"]=user.last_name
                        autores.append(autor)
                    cita["autores"]=autores
            citaTotal.append(cita)

        if(pub.tipo=="Ponencia"):
            cita={}
            for art in ponencia.objects.filter(id=pub.ponencia_id):
                for ciu in ciudad.objects.filter(id=art.ciudad_id):
                    cita["status"]=1
                    cita["tipoP"]=pub.tipo
                    cita["tCita"]=tCita
                    cita["titulo"]=art.nombrePonencia
                    cita["anio"]=separaAnio(str(art.fechaPonencia),0)
                    cita["editorial"]=ciu.Nombre
                    autores=[]
                    for auArt in autoresPonencia.objects.filter(ponencia_id=art.id).order_by("id"):
                        tamanoVecAutores+=1
                        for user in User.objects.filter(id=auArt.user_id):
                            autor={}
                            autor["nombres"]=user.first_name
                            autor["apellidos"]=user.last_name
                            autores.append(autor)
                        cita["autores"]=autores

            citaTotal.append(cita)


    #print("las cita es")
    #print(citaTotal)


    #print(textCita)





    request=serializaVector(citaTotal)
    return HttpResponse(request, content_type='application/json')


def addUpdateCita(request):
    publicacionid=request.POST['publicacionid']
    #print("id pub ==+", publicacionid)
    if Estadisticas.objects.filter(publicacion_id=publicacionid).exists():
        #print("hay que actualizar")
        estadisticasid=0
        ncitas=0
        for est in Estadisticas.objects.filter(publicacion_id=publicacionid):

            estadisticasid=est.id
            ncitas=est.nCitas
        cita = Estadisticas.objects.get(id=estadisticasid)
        cita.nCitas = ncitas+1
        cita.save()

        if cita:
            status={}
            status["status"]=1
            status["indicador"]="update"
            status["estadisticaid"]=cita.id
            status["publicacionid"]=publicacionid
            status["valor"]=ncitas+1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
    else:
        #("hay que crear")
        citas=Estadisticas.objects.create(

        nLecturas=0,
        nCitas=1,
        nDescargas=0,
        publicacion=Publicacion.objects.get(id=publicacionid)
        )
        citas.save()
        if cita:
            status={}
            status["status"]=1
            status["indicador"]="add"
            status["estadisticaid"]=cita.id
            status["publicacionid"]=publicacionid
            status["valor"]=1
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')
        else:
            status={}
            status["status"]=0
            status["obj"]=0
            json=[]
            json.append(status)
            request=serializaVector(json)
            return HttpResponse(request, content_type='application/json')


def keywords(request):
    #carga las sugerencias temporales
    usuario = request.user.id
    perfil = Investigador.objects.get(user_id=usuario)
    return render(request, 'SisRec/keywords.html', {'usuario': perfil})
def addKeywords(request):
    usuario = request.user.id
    perfil = Investigador.objects.get(user_id=usuario)

    kw1=request.POST['kw1']
    kw2=request.POST['kw2']
    kw3=request.POST['kw3']
    kw4=request.POST['kw4']
    kw5=request.POST['kw5']
    responseTotal=[]
    kwg=0
    contador=0
    for i in range(5):
        contador=contador+1
        if contador==1:
            kwg=kw1
        if contador==2:
            kwg=kw2
        if contador==3:
            kwg=kw3
        if contador==4:
            kwg=kw4
        if contador==5:
            kwg=kw5

        Keywors=GlobalKeywordsInvestigador.objects.create(
        globalKeywors=GlobalKeywords.objects.get(id=kwg),
        estado=True,
        investigador=Investigador.objects.get(user_id=usuario)
        )
        Keywors.save()
        if Keywors:
            status={}
            status["status"]=1
            responseTotal.append(status)

        else:
            status={}
            status["status"]=0
            responseTotal.append(status)


    request=serializaVector(responseTotal)
    #return render(request, 'SisRec/index.html', {'usuario': perfil})
    #return redirect()
    return HttpResponse(request, content_type='application/json')

def updateKeywords(request):
    usuario = request.user.id
    perfil = Investigador.objects.get(user_id=usuario)
   
    kw1=request.POST['kw1']
    kw2=request.POST['kw2']
    kw3=request.POST['kw3']
    kw4=request.POST['kw4']
    kw5=request.POST['kw5']
    akw1=request.POST['akw1']
    akw2=request.POST['akw2']
    akw3=request.POST['akw3']
    akw4=request.POST['akw4']
    akw5=request.POST['akw5']

    print ("cambio", kw1," ",kw2," ",kw3," ",kw4," ",kw5)
    print (" anterior", akw1," ",akw2," ",akw3," ",akw4," ",akw5)
    responseTotal=[]
    kwg=0
    akwg=0
    contador=0

    investigador=Investigador.objects.get(user_id=usuario)
    invsid=investigador.id

    for i in range(5):
        contador=contador+1
        if contador==1:
            kwg=kw1
            akwg=akw1
        if contador==2:
            kwg=kw2
            akwg=akw2
        if contador==3:
            kwg=kw3
            akwg=akw3
        if contador==4:
            kwg=kw4
            akwg=akw4
        if contador==5:
            kwg=kw5
            akwg=akw5

        Keywors=GlobalKeywordsInvestigador.objects.get(investigador_id=invsid, globalKeywors_id=akwg)
        Keywors.globalKeywors_id=GlobalKeywords.objects.get(id=kwg)
        Keywors.save()
        if Keywors:
            status={}
            status["status"]=1
            responseTotal.append(status)

        else:
            status={}
            status["status"]=0
            responseTotal.append(status)

    request=serializaVector(responseTotal)
    #return render(request, 'SisRec/index.html', {'usuario': perfil})
    #return redirect()
    return HttpResponse(request, content_type='application/json')



def addNotification(request):

    publicacionid=request.POST['publicacionid']
    investigadorid=request.POST['investigadorid']

    #print(publicacionid,investigadorid)

    yo=0
    for invs in Investigador.objects.filter(user_id=request.user.id):
        yo=invs.id
    vectorFinal=[]
    if SolicitudColaboracion.objects.filter(idEmisor_id=investigadorid, estado=True).exists():
        colaboradores1=SolicitudColaboracion.objects.filter(idEmisor_id=investigadorid, estado=True)
        for clbs in colaboradores1:
            for inves in Investigador.objects.filter(id=clbs.idReceptor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    notification=Notificacion.objects.create(
                    origen=Investigador.objects.get(id=investigadorid),
                    destino=Investigador.objects.get(id=inves.id),
                    estado=False,
                    publicacion=Publicacion.objects.get(id=publicacionid)
                    )
                    notification.save()
    if SolicitudColaboracion.objects.filter(idReceptor_id=investigadorid, estado=True).exists():
        colaboradores2=SolicitudColaboracion.objects.filter(idReceptor_id=investigadorid, estado=True)
        for clbs2 in colaboradores2:
            for inves in Investigador.objects.filter(id=clbs2.idEmisor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    notification=Notificacion.objects.create(
                    origen=Investigador.objects.get(id=investigadorid),
                    destino=Investigador.objects.get(id=inves.id),
                    estado=False,
                    publicacion=Publicacion.objects.get(id=publicacionid)
                    )
                    notification.save()

    status={}
    status["status"]=1
    status["obj"]=0
    json=[]
    json.append(status)
    request=serializaVector(json)
    return HttpResponse(request, content_type='application/json')

def getNotification(request):

    investigadorid=request.POST['investigadorid']
    notificacionTotal=[]
    if(Notificacion.objects.filter(destino_id=investigadorid,estado=False).exists()):


        for ntf in Notificacion.objects.filter(destino_id=investigadorid,estado=False):
            for pub in Publicacion.objects.filter(id=ntf.publicacion_id):
                for inv in Investigador.objects.filter(id=ntf.origen_id):
                    for user in User.objects.filter(id=inv.user_id):
                        notificacion={}
                        notificacion["id"]=inv.id
                        notificacion["nombre"]=separaTexto(user.first_name)
                        notificacion["apellido"]=separaTexto(user.last_name)
                        notificacion["foto"]=str(inv.photo)
                        notificacion["publicacionid"]=pub.id
                        notificacion["NomPublicacion"]=pub.tema
                        notificacion["fecha"]=str(pub.fecha)
                        notificacion["hora"]=separaHora(str(pub.hora))
                        notificacionTotal.append(notificacion)
    request=serializaVector(notificacionTotal)
    return HttpResponse(request, content_type='application/json')



def getMessgeNotification(request):
    #print("........................................msg.....................notification.............................")

    investigadorid=request.POST['investigadorid']

    #print("investigador mensaje",investigadorid)
    vectorFinal=[]
    if SolicitudColaboracion.objects.filter(idEmisor_id=investigadorid, estado=True).exists():
        colaboradores1=SolicitudColaboracion.objects.filter(idEmisor_id=investigadorid, estado=True)
        for clbs in colaboradores1:
            for inves in Investigador.objects.filter(id=clbs.idReceptor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    #print("entre en uno")
                    if(Mensaje.objects.filter(idReceptor_id=investigadorid,idEmisor_id=inves.id).exists()):
                        msg=Mensaje.objects.filter(idReceptor_id=investigadorid,idEmisor_id=inves.id).last()
                        listmsg={}
                        listmsg["idMensaje"]=msg.id
                        listmsg["fecha"]=str(msg.fecha)
                        listmsg["hora"]=separaHora(str(msg.hora))
                        listmsg["leido"]=msg.leido
                        listmsg["mensaje"]=msg.mensaje
                        listmsg["emisorId"]=msg.idEmisor_id
                        listmsg["nombre"]=separaTexto(usrs.first_name)
                        listmsg["apellido"]=separaTexto(usrs.last_name)
                        listmsg["foto"]=str(inves.photo)
                        vectorFinal.append(listmsg)



    if SolicitudColaboracion.objects.filter(idReceptor_id=investigadorid, estado=True).exists():
        colaboradores2=SolicitudColaboracion.objects.filter(idReceptor_id=investigadorid, estado=True)
        for clbs2 in colaboradores2:
            for inves in Investigador.objects.filter(id=clbs2.idEmisor_id):
                for usrs in User.objects.filter(id=inves.user_id):
                    #print("entre en dos")
                    if(Mensaje.objects.filter(idReceptor_id=investigadorid,idEmisor_id=inves.id).exists()):
                        msg =Mensaje.objects.filter(idReceptor_id=investigadorid,idEmisor_id=inves.id).last()
                        listmsg={}
                        listmsg["idMensaje"]=msg.id
                        listmsg["fecha"]=str(msg.fecha)
                        listmsg["hora"]=separaHora(str(msg.hora))
                        listmsg["leido"]=msg.leido
                        listmsg["mensaje"]=msg.mensaje
                        listmsg["emisorId"]=msg.idEmisor_id
                        listmsg["nombre"]=separaTexto(usrs.first_name)
                        listmsg["apellido"]=separaTexto(usrs.last_name)
                        listmsg["foto"]=str(inves.photo)
                        vectorFinal.append(listmsg)



    request=serializaVector(vectorFinal)
    return HttpResponse(request, content_type='application/json')




def updateLecturaMsg(request):
    msgid=request.POST['msgid']
    print("el id del mensaje es===== ", msgid)

    updatemsg = Mensaje.objects.get(id=msgid)
    updatemsg.leido = True
    updatemsg.save()


    status={}
    status["status"]=1
    status["obj"]=updatemsg.id
    json=[]
    json.append(status)
    request=serializaVector(json)
    return HttpResponse(request, content_type='application/json')


def aceptaSolicitud(request):
    userid=request.POST['userid']
    invsid=request.POST['invsid']

    investigador= 0
    for inv in Investigador.objects.filter(user_id=userid):
        investigador=inv.id

    actS = SolicitudColaboracion.objects.get(idEmisor_id=investigador,idReceptor_id=invsid)
    actS.estado = True
    actS.save()

    if(actS):
        status={}
        status["status"]=1
        status["obj"]=actS.id
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')

    else:
        status={}
        status["status"]=0
        status["obj"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')


def rechazaSolicitud(request):
    userid=request.POST['userid']
    invsid=request.POST['invsid']

    investigador= 0
    for inv in Investigador.objects.filter(user_id=userid):
        investigador=inv.id

    delS = SolicitudColaboracion.objects.get(idEmisor_id=investigador,idReceptor_id=invsid)
    delS.delete()

    if(delS):
        status={}
        status["status"]=1
        status["obj"]=delS.id
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')

    else:
        status={}
        status["status"]=0
        status["obj"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')

def seachColaboradores(request):
    u = request.user.id
    yo=0
    for uso in Investigador.objects.filter(user_id=u):
        yo=uso.id


    keyword=request.POST["keyword"]
    if keyword:

        user= User.objects.filter(
        Q(first_name__icontains=keyword)|
        Q(last_name__icontains=keyword)
        ).distinct()

        userTotal=[]

        for usr in user:
            for inv in Investigador.objects.filter(user_id=usr.id):
                for ifl in informacionLaboral.objects.filter(id=inv.informacionLaboral_id):
                    for camp in campus.objects.filter(id=ifl.campus_id):
                        for unv in universidad.objects.filter(id=camp.universidad_id):
                            if SolicitudColaboracion.objects.filter(idEmisor_id=yo,idReceptor_id=inv.id).exists():
                                print("amigo")
                                user={}
                                user["id"]=usr.id
                                user["nombre"]=separaTexto(usr.first_name)
                                user["apellido"]=separaTexto(usr.last_name)
                                user["foto"]=str(inv.photo)
                                user["universidad"]=unv.Nombre
                                user["estado"]=1
                                userTotal.append(user)
                            else:
                                if SolicitudColaboracion.objects.filter(idEmisor_id=inv.id,idReceptor_id=yo).exists():
                                    print(" amigo 2")
                                    user={}
                                    user["id"]=usr.id
                                    user["nombre"]=separaTexto(usr.first_name)
                                    user["apellido"]=separaTexto(usr.last_name)
                                    user["foto"]=str(inv.photo)
                                    user["universidad"]=unv.Nombre
                                    user["estado"]=1
                                    userTotal.append(user)
                                else:
                                    if inv.id==yo:
                                        print("")
                                    else:
                                        user={}
                                        user["id"]=usr.id
                                        user["nombre"]=separaTexto(usr.first_name)
                                        user["apellido"]=separaTexto(usr.last_name)
                                        user["foto"]=str(inv.photo)
                                        user["universidad"]=unv.Nombre
                                        user["estado"]=0
                                        userTotal.append(user)


        request=serializaVector(userTotal)
        return HttpResponse(request, content_type='application/json')




investigadores =0

def entrenaRedNeuronal():
    x=[]
    ytemp=[]
    y=[]
    print("Entrenamiento de la red neuronal iniciada..")
    if(GlobalKeywordsInvestigador.objects.all().exists()):
        for ik in GlobalKeywordsInvestigador.objects.all():
            for gk in GlobalKeywords.objects.filter(id=ik.globalKeywors_id):
                xtemp=[]
                xtemp.append(ik.globalKeywors_id)
                xtemp.append(gk.carrera_id)
                x.append(xtemp)
                ytemp.append(ik.investigador_id)
        #print(x)
        #print(y)
        dummies = pd.get_dummies(ytemp) # Classification
        investigadores = dummies.columns
        #print(ytemp)
        y=dummies.values
        #print(y)
        # Build neural network
        tx=len(x[0])
        X = np.array(x)
        model = Sequential()
        model.add(Dense(50, input_dim=tx, activation='relu')) # Hidden 1
        model.add(Dense(25, activation='relu')) # Hidden 2
        model.add(Dense(y.shape[1],activation='softmax')) # Output
        model.compile(loss='categorical_crossentropy', optimizer='adam')
        model.fit(X,y,verbose=2,epochs=5000)
        pred = model.predict(X)
        #print("Shape: {pred.shape}")
        #print(pred)
        np.set_printoptions(suppress=True)
        predict_classes = np.argmax(pred,axis=1)
        expected_classes = np.argmax(y,axis=1)
        correct = accuracy_score(expected_classes,predict_classes)
        print(f"Precisión del aprendisaje de la red neuronal: {correct} %")
        directorioP=pwd =os.path.dirname(os.path.realpath(sys.argv[0]))
        save_path = directorioP+"/static/redNeuronal/"
        #print("paht")
        #print(save_path)
        model.save(os.path.join(save_path,"ModeloEntrenadoSisRec.h5"))

        vector=np.array(investigadores)

        np.savetxt(save_path+'Investigadores.txt', (vector), fmt="%.18g", delimiter=" ", newline=os.linesep)
        #print (vector)
        #archivo= open(save_path+'Investigadores.txt','w')


        #archivo.write('%s'%vector)
        #print("escritura correcta")


def prediceColaborador(kw,carrera):
    #print("llegue a la prediccion____________________________________________________________________________________________________")
    directorioP=pwd =os.path.dirname(os.path.realpath(sys.argv[0]))
    save_path = directorioP+"/static/redNeuronal/"
    #print("la direccion es",save_path +"ModeloEntrenadoSisRec.h5")
    modelo=load_model(os.path.join(save_path+"ModeloEntrenadoSisRec.h5"))
    #print("lei el obj")
    #investigadorPredict = np.array( [[kw,carrera]], dtype=int)
    investigadorPredict = np.array( [[101,1]], dtype=int)
    pred = modelo.predict(investigadorPredict)
    original=modelo.predict(investigadorPredict)
    copia= modelo.predict(investigadorPredict)
    copia.sort()
    #print(pred)
    #print (copia)
    pred = np.argmax(pred)
    #print("preeeee==",pred)
    archivo=np.loadtxt(save_path+'Investigadores.txt')
    #print(archivo)
    #print("ps")
    #print(len(archivo))

    recomendaciones=[]
    for cop in copia[0]:
        contador=0
        for org in original[0]:
            if(cop==org):
                recomendaciones.append(contador)
        #print(org," ",cop)
            contador=contador+1
    #print("las recomendaciones totales", recomendaciones)
    tamano=len(recomendaciones)
    #print(tamano)
    #print(recomendaciones[tamano-1])
    total=[]
    total.append(int(archivo[recomendaciones[tamano-1]]))
    total.append(int(archivo[recomendaciones[tamano-2]]))
    total.append(int(archivo[recomendaciones[tamano-3]]))
    total.append(int(archivo[recomendaciones[tamano-4]]))
    total.append(int(archivo[recomendaciones[tamano-5]]))
    #print("investigadores finales")
    #print(total)
    return total

def getEstadisticas(request):
    ing=request.POST["idinv"]
    vectorFinal=[]
    vectorInfo=[]
    investigadorid=0



    for invs in Investigador.objects.filter(user_id=ing):
        investigadorid=invs.id
        query1 = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(invs.user_id)
        #print(query1)

        for inf in carrera.objects.raw(query1):
            vectemp={}
            #print("entre vec")
            #print(inf.first_name)
            vectemp["id"]=inf.id
            vectemp["nombres"]=inf.first_name
            vectemp["apellidos"]=inf.last_name
            vectemp["universidad"]=inf.Nombre
            vectemp["foto"]=inf.photo
            vectorInfo.append(vectemp)




    #print("el vecinfo es")

    #print(vectorInfo)

   #comprobamos si el vector de los amigos estan vacios
    if(Publicacion.objects.filter(investigador_id=investigadorid).exists()):
            for pub in Publicacion.objects.filter(investigador_id=investigadorid):
                if(pub.tipo=="Artículo Científico"):
                    for ar in articulos_cientificos.objects.filter(id=pub.articulo_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["articuloCientificoId"]=ar.id
                                vector["estado"]=ar.estado
                                vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                vector["resumen"]=ar.resumen
                                vector["URLdocumento"]=str(ar.documento)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)

                                    vector["Likes"]=likesTotal

                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal

                                autoresTotal=[]
                                #print("......................................................................")
                                #print("articuloid===", ar.id)
                                for autar in autoresArticulos.objects.filter(articulo_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)
                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)
                if(pub.tipo=="Libro"):
                    for ar in libro.objects.filter(id=pub.libro_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["articuloCientificoId"]=ar.id
                                vector["estado"]=ar.estado
                                vector["fechaPublicacion"]= str(ar.fechaPublicacion)
                                vector["resumen"]=ar.Resumen
                                vector["URLdocumento"]=str(ar.Documento)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)

                                    vector["Likes"]=likesTotal

                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal

                                autoresTotal=[]
                                #print("......................................................................")
                                #print("libroid===", ar.id)
                                for autar in autoresLibro.objects.filter(libro_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)
                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)
                if(pub.tipo=="Ponencia"):
                    for ar in ponencia.objects.filter(id=pub.ponencia_id):
                        for inv in Investigador.objects.filter(id=pub.investigador_id):
                            query = 'SELECT * FROM "public"."useruniversidad" where public."useruniversidad".id=' + str(inv.user_id)
                            for info in carrera.objects.raw(query):
                                vector = {}
                                vector["id"]=pub.id
                                vector["fecha"]=str(pub.fecha)
                                vector["hora"]=str(pub.hora)
                                vector["tema"]=pub.tema
                                vector["tipo"]=pub.tipo
                                vector["investigadorid"]=pub.investigador_id
                                vector["libro"]=str(pub.libro_id)
                                vector["ponencia_id"]=str(pub.ponencia_id)
                                vector["proyectoMacro"]=pub.proyectosMacro_id

                                vector["articuloCientificoId"]=ar.id
                                vector["fechaPublicacion"]= str(ar.fechaPonencia)
                                vector["resumen"]=ar.resumen
                                vector["URLdocumento"]=str(ar.certificado)

                                vector["nombres"]=separaTexto(info.first_name)
                                vector["apellidos"]=separaTexto(info.last_name)
                                vector["foto"]=str(info.photo)
                                vector["universidadId"]=info.universidadid
                                vector["universidad"]=info.Nombre

                                if(Estadisticas.objects.filter(publicacion_id=pub.id).exists()):
                                    for est in Estadisticas.objects.filter(publicacion_id=pub.id):
                                        vector["nLecturas"]=est.nLecturas
                                        vector["nCitas"]=est.nCitas
                                        vector["nDescargas"]=est.nDescargas
                                else:
                                    vector["nLecturas"]=0
                                    vector["nCitas"]=0
                                    vector["nDescargas"]=0
                                if Likes.objects.filter(publicacion_id=pub.id).exists():
                                    likesTotal=[]
                                    for lik in Likes.objects.filter(publicacion_id=pub.id):
                                        temp={}
                                        temp["like"]=lik.like
                                        temp["investigadorid"]=lik.investigador_id
                                        temp["publicacionid"]=lik.publicacion_id
                                        likesTotal.append(temp)
                                    vector["Likes"]=likesTotal
                                else:
                                    likesTotal=[]
                                    vector["Likes"]=likesTotal
                                autoresTotal=[]
                                #print("......................................................................")
                                #print("articuloid===", ar.id)
                                for autar in autoresPonencia.objects.filter(ponencia_id=ar.id).order_by('id'):
                                    #print("autorArticulo===",autar.id)
                                    query2 = 'SELECT * FROM public.auth_user where public.auth_user.id=' + str(autar.user_id)
                                    if Investigador.objects.filter(user_id=autar.user_id).exists():
                                        for invs in Investigador.objects.filter(user_id=autar.user_id):
                                            for info in carrera.objects.raw(query2):
                                            #    print("inves=",invs.id)
                                                vector2 = {}
                                                vector2["idInvestigador"]=invs.id
                                                vector2["gradoAutoria"]=autar.gradoAutoria
                                                vector2["nombres"]=separaTexto(info.first_name)
                                                vector2["apellidos"]=separaTexto(info.last_name)
                                                vector2["autorFoto"]=str(invs.photo)
                                            autoresTotal.append(vector2)
                                        vector["autores"]=autoresTotal
                                vectorFinal.append(vector)

        



    vectorFinal2=[]
    vectorFinal2.append(vectorInfo)
    vectorFinal2.append(vectorFinal)
    json = serializaVector(vectorFinal2)

    return HttpResponse(json, content_type='application/json')





#codigo para templates/base1/inicio/de las keywords linea 530 + -
#esto para los futuros programadores

def getKeywords(request):

    usuario = request.user.id
    inv= 0
    vectorFinal=[]

    for invs in Investigador.objects.filter(user_id=usuario):
        inv=invs.id

    if(GlobalKeywordsInvestigador.objects.filter(investigador_id= inv,estado=True).exists()):

        for kw in GlobalKeywordsInvestigador.objects.filter(investigador_id= inv):
            for gkw  in GlobalKeywords.objects.filter(id=kw.globalKeywors_id):
                kws={}
                kws["status"]=1
                kws["id"]=gkw.id
                kws["termino"]=gkw.termino
                kws["carreraid"]=gkw.carrera_id
                vectorFinal.append(kws)



        request=serializaVector(vectorFinal)
        return HttpResponse(request, content_type='application/json')
    else:
        status={}
        status["status"]=0
        json=[]
        json.append(status)
        request=serializaVector(json)
        return HttpResponse(request, content_type='application/json')





class keywordsCarrera:
    id=0
    termino=""
    carrera_id=0
    nombreCarrera=""

def listarAdminKeywords(request):
    if request.method == 'POST':
        id =request.POST.get('idKeyword')
        termino =request.POST.get('termino')
        carreraId =request.POST.get('carreraAdminKeywords')
        data= GlobalKeywords.objects.get(id=id)
        data.termino=termino
        data.carrera_id=carreraId
        data.save()
        if data:
            messages.success(request, ' La palabra clave se actualizo correctamente!')
        else:
            messages.warning(request, ' Algo salio mal, por favor intente nuevamente!')
        return redirect("social:listarAdminKeywords")
    else:
        usuario = request.user.id
        user = User.objects.get(id=usuario)
        vectorFinal=[]
        if(user.is_superuser==True):
            perfil=Investigador.objects.get(user_id=user.id)
            for kw in  GlobalKeywords.objects.all().order_by("termino"):
                for  cr in carrera.objects.filter(id=kw.carrera_id):
                    temp={}
                    temp["id"]=kw.id
                    temp["termino"]=kw.termino
                    temp["carrera_id"]=kw.carrera_id
                    temp["nombreCarrera"]=cr.Nombre
                    vectorFinal.append(temp)
            keywords=vectorFinal
            carre = carrera.objects.all().order_by("id")
            return render(request, 'SisRec/listKeywords.html', {'keywords':keywords,'perfil': perfil,"carrera":carre})
        else:
            return redirect("inicio:logeo")
def addAdminKeywords(request):
    if request.method == 'POST':
        termino =request.POST.get('termino').upper()
        carreraId =request.POST.get('carreraAdminKeywords')
        data= GlobalKeywords.objects.create(
        termino=termino,
        carrera=carrera.objects.get(id=carreraId),
        )
        data.save()
        if data:
            messages.success(request, ' La palabra clave se agrego correctamente!')
            return redirect("social:listarAdminKeywords")
        else:
            messages.warning(request, ' Algo salio mal, por favor intente nuevamente!')

    usuario = request.user.id

    perfil=Investigador.objects.get(user_id=usuario)
    carre = carrera.objects.all().order_by("id")
    return render(request, 'SisRec/addKeywords.html',{'perfil': perfil,"carrera":carre})



def deleteAdminKeywords(request, pk):
    if request.method == 'GET':
        if  GlobalKeywordsInvestigador.objects.filter(globalKeywors=pk).exists():
            messages.warning(request, ' No se puede eliminar la palabra clave ya que se encuentra en uso!')
        else:
            delgk = GlobalKeywords.objects.get(id=pk)
            delgk.delete()
            messages.success(request, 'La palabra clave se elimino Correctamente!')
    return redirect("social:listarAdminKeywords")

def listarAdminProyectosCarrera(request):
    if request.method == 'POST':
        id =request.POST.get('idproyectoCarrera')
        nombre =request.POST.get('nombre')
        tipoPro =request.POST.get('carreraAdminProyecto')
        carreraId =request.POST.get('carreraAdminPro')

        data= ProyectosMacro.objects.get(id=id)
        data.nombre=nombre
        data.tipo=tipoPro
        data.carrera=carrera.objects.get(id=carreraId)
        data.save()
        if data:
            messages.success(request, ' El proyecto se actualizo correctamente!')
        else:
            messages.warning(request, ' Algo salio mal, por favor intente nuevamente!')
        return redirect("social:listarAdminProyectosCarrera")
    else:
        usuario = request.user.id
        user = User.objects.get(id=usuario)
        vectorFinal=[]
        if(user.is_superuser==True):
            carre = carrera.objects.all().order_by("id")
            perfil=Investigador.objects.get(user_id=user.id)
            for pm in  ProyectosMacro.objects.all():
                for  cr in carrera.objects.filter(id=pm.carrera_id):
                    temp={}
                    temp["id"]=pm.id
                    temp["nombre"]=pm.nombre
                    temp["tipoProyecto"]=pm.tipo
                    temp["carrera_id"]=pm.carrera_id
                    temp["nombreCarrera"]=cr.Nombre
                    vectorFinal.append(temp)
            ProMacro=vectorFinal
            carre = carrera.objects.all().order_by("id")
            return render(request, 'SisRec/listProyectosCarrera.html', {'ProMacro':ProMacro,'perfil': perfil,"carrera":carre})
        else:
            return redirect("inicio:logeo")






def addAdminProyectosCarrera(request):

    if request.method == 'POST':
        nombre =request.POST.get('nombre')
        tipoPro =request.POST.get('carreraAdminProyecto')
        carreraId =request.POST.get('carreraAdminPro')
        data= ProyectosMacro.objects.create(
        nombre=nombre,
        tipo=tipoPro,
        carrera=carrera.objects.get(id=carreraId),
        )
        data.save()
        if data:
            messages.success(request, ' El proyecto se agrego correctamente!')
        else:
            messages.warning(request, ' Algo salio mal, por favor intente nuevamente!')
        return redirect("social:listarAdminProyectosCarrera")
    else:
        usuario = request.user.id
        perfil=Investigador.objects.get(user_id=usuario)
        carre = carrera.objects.all().order_by("id")
        return render(request, 'SisRec/addProyectosCarrera.html',{'perfil': perfil,"carrera":carre})





def updateAdminProyectosCarrera(request):
    if request.method == 'POST':
        id =request.POST.get('idproyectoCarrera')
        nombre =request.POST.get('nombre')
        tipoPro =request.POST.get('carreraAdminProyecto')
        carreraId =request.POST.get('carreraAdminPro')

        data= ProyectosMacro.objects.get(id=id)
        data.nombre=nombre
        data.tipo=tipoPro
        data.carrera=carrera.objects.get(id=carreraId),
        data.save()
        if data:
            messages.success(request, ' El proyecto se actualizo correctamente!')
        else:
            messages.warning(request, ' Algo salio mal, por favor intente nuevamente!')
        return redirect("social:listarAdminProyectosCarrera")


def deleteAdminProyectosCarrera(request,pk):
    if request.method == 'GET':
        if  Publicacion.objects.filter(proyectosMacro_id=pk).exists():
            messages.warning(request, ' No se puede eliminar la el proyecto ya que se encuentra en uso!')
        else:
            delgk = ProyectosMacro.objects.get(id=pk)
            delgk.delete()
            messages.success(request, 'El proyecto se elimino Correctamente!')
    return redirect("social:listarAdminProyectosCarrera")












def serializaVector(vector):
    v=json.dumps(vector)
    return v
def separaTexto(Texto):
    cadena = Texto
    separador = " "
    vecTexto = cadena.split(separador)
    return vecTexto[0]
def separaAnio(Texto,pos):
    cadena = Texto
    separador = "-"
    vecTexto = cadena.split(separador)
    return vecTexto[pos]
def separaHora(Texto):
    cadena = Texto
    separador = "."
    vecTexto = cadena.split(separador)
    return vecTexto[0]
def getNPaginasPdf(url):
    response = requests.get(url)
    with io.BytesIO(response.content) as open_pdf_file:
        read_pdf = PyPDF2.PdfFileReader(open_pdf_file)
        num_pages = read_pdf.getNumPages()
        return num_pages




class Perfil(TemplateView):
    template_name = "SisRec/perfil.html"
