from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from apps.certificacionadmin.views import SecretariaList, CertificadoUpdateSecre, DocumentoCertificadoList
from apps.certificacion.models import certificacion

urlpatterns = [
   	url(r'^index',login_required(SecretariaList.as_view()), name="certificacionadminListar"),
   	url(r'^revisar/(?P<pk>\d+)/$',login_required(CertificadoUpdateSecre.as_view()), name="secretaria_certificado_actualizar"),
   	url(r'^revisardocs/(?P<pk>\d+)/$',login_required(DocumentoCertificadoList.as_view()), name="documento_certificado_listar"),
]