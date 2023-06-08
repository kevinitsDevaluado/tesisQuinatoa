from django.conf.urls import url
from apps.graficas.views import Viewssimilitud,Firstview,Firstview2,buscar,buscar1,search,redesAutores
from apps.graficas.intgra import search_universidad,search_campus,search_carrera,search_facultad,search_filtros
urlpatterns = [
    url(r'^viewsimilitud$',Viewssimilitud, name="view_similitud"),
    url(r'^firstview/$',Firstview, name="firstview"),
    url(r'^firstview2/$',Firstview2, name="firstview2"),
    url(r'^buscar/$', buscar, name='buscar'),
    url(r'^buscar1/$', buscar1, name='buscar1'),
    url(r'^search/$', search, name='search'),
    url(r'^redesAutores/$', redesAutores, name='redesAutores'),
    url(r'^universidad/$', search_universidad, name='universidad'),
    url(r'^campus/$', search_campus, name='campus'),
    url(r'^facultad/$', search_facultad, name='facultad'),
    url(r'^carrera/$', search_carrera, name='carrera'),
    url(r'^filtros/$', search_filtros, name='filtros'),
]