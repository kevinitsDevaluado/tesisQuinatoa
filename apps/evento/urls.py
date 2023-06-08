from django.conf.urls import url
from django.views.generic import CreateView, ListView, UpdateView, DeleteView,TemplateView
from apps.evento.views import Verificar_Evento,search_recomendaciones_articulos,search_recomendaciones_libros,search_recomendaciones_ponencias,search_coutores,ListarEventos,CrearEventos,ModificarEventos,SearchFecha
from django.contrib.auth.decorators import login_required
#from apps.incentivo.views import CrearIncentivos
urlpatterns = [
    url(r'^informacion/',login_required(Verificar_Evento), name='evento'),
    url(r'^recomendacionA/$', login_required(search_recomendaciones_articulos), name='recomendacionA'),
    url(r'^recomendacionL/$', login_required(search_recomendaciones_libros), name='recomendacionL'),
    url(r'^recomendacionP/$', login_required(search_recomendaciones_ponencias), name='recomendacionP'),
    url(r'^search_autor/', search_coutores, name='search_autor'),
    url(r'^ListarEvento/',login_required(ListarEventos.as_view()), name='Listar_Evento'),
    url(r'^CrearEvento/$', login_required(CrearEventos.as_view()), name='Crear_Evento'),
    url(r'^ModificarEvento/(?P<pk>.+)/$', login_required(ModificarEventos.as_view()), name='Modificar_Evento'),
    #url(r'^CrearIncentivo/$', login_required(CrearIncentivos.as_view()), name='Crear_Incentivo'),

    url(r'^BuscarFecha/$', login_required(SearchFecha), name='BuscarFecha'),
]