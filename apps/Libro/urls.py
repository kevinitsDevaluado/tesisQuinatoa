from django.conf.urls import url
from apps.Libro.models import libro
from apps.Libro.views import Librocrear,LibroList,LibroEdit,LibroDelete,LibroEditDisabled,ReporteExcelLibro,consulta
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^nuevo/$', login_required(Librocrear), name='libro_crear'),
    url(r'^listar', login_required(LibroList.as_view(queryset= libro.objects.all().order_by('id'))), name='libro_lis'),
    url(r'^editar/(?P<idLibro>\d+)/$', login_required(LibroEdit), name='libro_update'),
    url(r'^eliminar/(?P<pk>\d+)/$', login_required(LibroDelete.as_view()), name='libro_eliminar'),
    url(r'^editarDisabled/(?P<idLibro>\d+)/$', login_required(LibroEditDisabled), name='libro_update_disabled'),


    url(r'^consulta/', consulta, name="consulta"),
    url(r'^ReporteLibros/',login_required(ReporteExcelLibro.as_view()), name="ReporteLibros"),

]
