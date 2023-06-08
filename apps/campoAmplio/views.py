from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render, render_to_response
from django.template import RequestContext

from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.campoDetallado.models import campoDetallado
from apps.campoEspecifico.models import campoEspecifico
from apps.campoAmplio.models import campoAmplio
import json

def listSelectedItems(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            country = campoAmplio.objects.get(id = data)
            state = campoEspecifico.objects.filter(amplio = country)
            results = []
            doctor_json = {}
            doctor_json['text'] = '----------'
            doctor_json['value'] = ''
            results.append(doctor_json)
            for i in state:

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

def listSelectedEspe(request):
    if request.method == 'POST':
        data = request.POST.get('datos')
        if data:
            country = campoEspecifico.objects.get(id = data)
            state = campoDetallado.objects.filter(especifico = country)
            results = []
            doctor_json = {}
            doctor_json['text'] = '----------'
            doctor_json['value'] = ''
            results.append(doctor_json)
            for i in state:
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