from django.conf.urls import url
from apps.Libro.models import libro
from apps.parametrosLibro.views import ListadoParametrosLibros,parametrosCrearLibro,editarParametroLibro
from django.contrib.auth.decorators import login_required

urlpatterns = [
url(r'^ListadoParametrosLibros/$', login_required(ListadoParametrosLibros.as_view()), name="listado_parametros_libros"),
url(r'^parametro_crear_libro/$', login_required(parametrosCrearLibro), name="parametro_crear_libro"),
url(r'^modificar_parametro_libro/(?P<pk>.+)/$', login_required(editarParametroLibro.as_view()), name="modificar_parametro_libro"),
   #url(r'^EliminarParametro/(?P<pk>.+)/$', login_required(eliminarParametro.as_view()), name="EliminarParametro"),
]