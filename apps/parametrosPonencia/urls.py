from django.conf.urls import url
from apps.Libro.models import libro
from apps.parametrosPonencia.views import ListadoParametrosPonencia,parametrosCrearPonencia,editarParametroPonencia
from django.contrib.auth.decorators import login_required

urlpatterns = [
url(r'^ListadoParametrosPonencias/$', login_required(ListadoParametrosPonencia.as_view()), name="listado_parametros_ponencias"),
url(r'^parametro_crear_ponencia/$', login_required(parametrosCrearPonencia), name="parametro_crear_ponencia"),
url(r'^modificar_parametro_ponencia/(?P<pk>.+)/$', login_required(editarParametroPonencia.as_view()), name="modificar_parametro_ponencia"),
   #url(r'^EliminarParametro/(?P<pk>.+)/$', login_required(eliminarParametro.as_view()), name="EliminarParametro"),
]