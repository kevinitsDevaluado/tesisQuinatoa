from django.conf.urls import url
from apps.HomePrincipal.views import inde,producc,similar,lista_titulos, clasificacionSVM
from django.contrib.auth.decorators import login_required
from .views import BuscarAutView,BuscarArtiView,DetalleArticulos,DetalleLibros,DetallePonencias,BuscarTodoView,BuscarArtView,BuscarLibView,BuscarPonView,BusquedaView, BusquedaAjaxView,BusquedaFacuView, BusquedaCampusView,BusquedaCarreraView,BusquedaFiltroView,BusquedaFiltroFacultadView, Reporte,Docs_pdf
urlpatterns = [
    url(r'^$',inde, name="HomePrincipal"),
    url(r'^cientifica$',producc, name="produccion"),
    url(r'^similares$',similar, name="similar"),
    url(r'^Home/clasificacion$', clasificacionSVM, name="clasificacionSVM"),
    url(r'^Home/graficas$', BusquedaView.as_view(), name="grafic"),
    url(r'^Home/busqueda_ajax/$',BusquedaAjaxView.as_view()),
    url(r'^Home/busqueda_campus/$',BusquedaCampusView.as_view()),
    url(r'^Home/busqueda_facultad/$',BusquedaFacuView.as_view()),
    url(r'^Home/busqueda_carrera/$',BusquedaCarreraView.as_view()),
    url(r'^Home/busqueda_filtros/$',BusquedaFiltroView.as_view()),
    url(r'^Home/reporte_pdf/$',Reporte.as_view(), name="reporte_pdf"),
    url(r'^Home/busqueda_filtros_Facultad/$',BusquedaFiltroFacultadView.as_view()),
    url(r'^Home/articulo/$',Docs_pdf.as_view(), name="articulo"),
    
    
    #Url Busquedas
    url(r'^Home/buscar/$',BuscarTodoView.as_view(), name="buscar"),
    url(r'^Home/buscarArticulo/$',BuscarArtView.as_view(), name="buscarArticulo"),
    url(r'^Home/buscarLibro/$',BuscarLibView.as_view(), name="buscarLibro"),
    url(r'^Home/buscarPonencia/$',BuscarPonView.as_view(), name="buscarPonencia"),
    url(r'^detalleArticulo/(?P<pk>\d+)/$',DetalleArticulos.as_view(), name="detalleArticulo"),
    url(r'^detalleLibro/(?P<pk>\d+)/$',DetalleLibros.as_view(), name="detalleLibro"),
    url(r'^detallePonencia/(?P<pk>\d+)/$',DetallePonencias.as_view(), name="detallePonencia"),
    url(r'^con_ajax_objeto/$',lista_titulos),
    #URL para la busqueda de autor 
    #Autores Arauz;Mora;Tapia;Zambrano         fecha:03/07/2019
    url(r'^Home/buscarAutor/$',BuscarAutView.as_view(), name="buscarAutor"),
    #Fin Url
]