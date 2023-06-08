from django.shortcuts import render
from django.conf.urls import url
from apps.incentivo.views import EliminarEventos,ListarEventos,CrearIncentivos_,ModificarIncentivos_
from django.contrib.auth.decorators import login_required
urlpatterns = [
url(r'^CrearIncentivos_/$',login_required(CrearIncentivos_.as_view()), name='CrearIncentivos_'),
url(r'^ListarEvento/',login_required(ListarEventos.as_view()), name='Listar_Evento'),
url(r'^ModificarIncentivo/(?P<pk>\d+)/$', login_required(ModificarIncentivos_.as_view()), name='Modificar_Incentivo'),
url(r'^EliminarIncentivo/(?P<pk>\d+)/$', login_required(EliminarEventos.as_view()), name='Eliminar_Incentivo'),
]