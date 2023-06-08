from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from apps.Ponencia.models import ponencia
from apps.Ponencia.views import PonenciaCreate,PonenciaList,PonenciaDelete,PonenciaUpdate,PonenciaUpdateDisabled,ReporteExcelPonencia
from django.contrib.auth.decorators import login_required
urlpatterns = [
    url(r'^nuevo',login_required(PonenciaCreate.as_view()), name='ponencia_crear'),
    url(r'^listar',login_required(PonenciaList.as_view(queryset= ponencia.objects.all().order_by('id'))), name='ponencia_listar'),
    url(r'^editar/(?P<pk>\d+)/$',login_required(PonenciaUpdate.as_view()), name='ponencia_editar'),
    url(r'^eliminar/(?P<pk>\d+)/$',login_required(PonenciaDelete.as_view()), name='ponencia_eliminar'),
    url(r'^editarDisabled/(?P<pk>\d+)/$',login_required(PonenciaUpdateDisabled.as_view()), name='ponencia_editar_disabled'),

    url(r'^ReportePonencia/',login_required(ReporteExcelPonencia.as_view()), name="ReportePonencia"),
]