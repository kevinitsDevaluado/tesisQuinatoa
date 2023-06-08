from django.conf.urls import url
from apps.pais.models import pais
from apps.baseDatos.models import baseDatos
from apps.baseDatos.views import listBD, createBD, existe, listDbUp, nuevaDB,listBDInstituto,listBDUniversidad,listUni,listUniAll,BddList,estadoBdd,actualizarBdd,ReporteExcel
from django.contrib.auth.decorators import login_required
urlpatterns = [
    url(r'^index',login_required(listBD), name='index'),
    url(r'^cargarImpacto/',login_required(nuevaDB), name='cargarImpacto'),
    #url(r'^existe/',existe, name='existe'),
    url(r'^create/',login_required(createBD), name='createdb'),
    url(r'^selectDb/',login_required(listDbUp), name='selectdb'),
    url(r'^instituto/',login_required(listBDInstituto), name='instituto'),
    url(r'^universidad/',login_required(listBDUniversidad), name='universidad'),
    url(r'^listUni/',login_required(listUni), name='listUni'),
    url(r'^listUniAll/',login_required(listUniAll), name='listUniAll'),

    url(r'^listarBdd', login_required(BddList.as_view(queryset= baseDatos.objects.all().order_by('id'))), name='Lista_bdd'),
    url(r'^estado_Bdd/$', login_required(estadoBdd), name='estado_Bdd'),
    url(r'^update_Bdd/', login_required(actualizarBdd), name='update_Bdd'),
    url(r'^ReporteBDD/',login_required(ReporteExcel.as_view()), name="ReporteBDD"),
]