from django.conf.urls import url
from django.contrib.auth.decorators import login_required
from apps.TextMining.views import copiarData, getValue, clasificacionList, clasificacion,clasificacionSimple
from django.contrib.auth.decorators import login_required
urlpatterns = [ 

    url(r'^procesar', copiarData, name='copiarData'),
    
    url(r'^list', clasificacionList, name='clasificacionList'),
    url(r'^clasificacion', clasificacion, name='clasificacion'),
    url(r'^simple', clasificacionSimple, name='clasificacionSimple'),

    url(r'^file/([\w ]+)/$', getValue, name='limpiar'),
    
]