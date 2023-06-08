from django.shortcuts import render
from django.conf.urls import url
from apps.postulacion.views import ListarPostulaciones,ModificarPostulaciones,estadoA,CrearPostulacion,SearchFecha,CorreoPostulacion
from django.contrib.auth.decorators import login_required
urlpatterns = [
url(r'^ListarPostulacion/',login_required(ListarPostulaciones.as_view()), name='Listar_Postulacion'),
url(r'^ModificarPostulacion/(?P<pk>\d+)/$', login_required(ModificarPostulaciones.as_view()), name='Modificar_Postulacion'),
url(r'^estadoA/$', login_required(estadoA), name='estadoA'),
url(r'^CrearPostulacion/$', login_required(CrearPostulacion), name='Crear_Postulacion'),
url(r'^CorreoPostulacion/$', login_required(CorreoPostulacion), name='Correo_Postulacion'),

url(r'^BuscarFecha/$', login_required(SearchFecha), name='BuscarFecha'),
]