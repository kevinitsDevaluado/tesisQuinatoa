from django.conf.urls import url
from django.contrib.auth.decorators import login_required

from apps.certificacion.views import CertificacionList, CertificacionCreate, CertificadoUpdateInvestigador, CertificadoDelete, DocumentoCertificadoList, CertificadoDescargar, CertificadoNotificacionInvestigador
from apps.certificacion.models import certificacion




urlpatterns = [
	url(r'^nuevo',login_required(CertificacionCreate.as_view()), name="certificacionCrear"),
	url(r'^index',login_required(CertificacionList.as_view()), name="certificacion_listar"),
	url(r'^revisar/(?P<pk>\d+)/$',login_required(CertificadoUpdateInvestigador.as_view()), name="certificado_actualizar"),
	url(r'^eliminar/(?P<pk>\d+)/$',login_required(CertificadoDelete.as_view()), name="certificado_eliminar"),
	url(r'^revisardocs/(?P<pk>\d+)/$',DocumentoCertificadoList.as_view(), name="documento_certificado_listar"),
	#url(r'^generar/$', generar_certificado, name='generar_certificado'),
	url(r'^descargar/(?P<pk>\d+)/$',login_required(CertificadoDescargar.as_view()), name="certificado_descargar"),
	url(r'^notificacion/(?P<pk>\d+)/$',login_required(CertificadoNotificacionInvestigador.as_view()), name="certificado_notificacion"),
]