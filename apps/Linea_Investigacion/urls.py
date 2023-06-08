from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Linea_Investigacion.views import listSelectedItems,listLinea
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^sel/$', login_required(listSelectedItems), name='sublinea'),
    url(r'^selLin/$', login_required(listLinea), name='linea'),
]
