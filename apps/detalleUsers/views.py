from django.contrib.auth.models import User
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render, render_to_response
from django.template import RequestContext

from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.baseDatos import form
from apps.baseDatos.models import baseDatos
from apps.pais.models import pais
import json




