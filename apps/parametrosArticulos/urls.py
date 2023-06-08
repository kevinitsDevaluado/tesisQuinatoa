from django.conf.urls import url
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Libro.models import libro
from apps.parametrosArticulos.views import parametrosCrear, editarParametro, eliminarParametro,ListadoParametros
from django.contrib.auth.decorators import login_required

urlpatterns = [
   url(r'^ListarParametros/$', login_required(ListadoParametros.as_view()), name="ListarParametro"),
   url(r'^CrearParametros/$', login_required(parametrosCrear), name="CrearParametro"),
   url(r'^ModificarParametros/(?P<pk>.+)/$', login_required(editarParametro.as_view()), name="ModificarParametro"),
   url(r'^EliminarParametro/(?P<pk>.+)/$', login_required(eliminarParametro.as_view()), name="EliminarParametro"),
]