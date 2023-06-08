from apps.inicio.views import inicio, new, oldNew,verRechazados
from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from apps.inicio.views import inicio,Reporte_excel
urlpatterns = [
        url(r'^$',login_required(inicio), name="logeo"),
        url(r'^index$',login_required(new), name="index"),
        url(r'^oldNew$',login_required(oldNew), name="oldNew"),
        url(r'^verRechazados/$',login_required(verRechazados), name="verRechazados"),
        #URL agregado por: Quinchimbla; Azogue; Caiza; Guilcazo; Potosi; Jaya
	    #url para el botòn excel  fecha: 23/07/2019
        url(r'^Reporte/',login_required(Reporte_excel.as_view()), name="Reporte" ),
    ]