from django.conf.urls import url
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Articulos_Cientificos.views import articulocreate,articuloUpdateDisabled,articuloUpdate, articuloList, articuloDelete,index, deleteArt,ReporteExcel
from django.contrib.auth.decorators import login_required
urlpatterns = [
    url(r'^index$', index, name="index"),
    url(r'^CrearArticulo$',login_required(articulocreate.as_view()), name="articulos"),
    url(r'^deleteArt/(?P<idArt>\d+)/$',login_required(deleteArt), name="deleteArt"),
    url(r'^ListarArticulos',login_required(articuloList.as_view(queryset=articulos_cientificos.objects.all().order_by('id'))), name="ListaArticulo"),
    url(r'^UpdateArticulos/(?P<pk>\d+)/$',login_required(articuloUpdate.as_view()), name="update_articulo"),
    url(r'^DeleteArticulos/(?P<pk>\d+)/$',login_required(articuloDelete.as_view()), name="delete_articulo"),

    url(r'^ReporteArticulo/',login_required(ReporteExcel.as_view()), name="ReporteArticulo"),

    url(r'^UpdateDisabledArticulos/(?P<pk>\d+)/$', login_required(articuloUpdateDisabled.as_view()), name="update_disabled_articulo"),

]
