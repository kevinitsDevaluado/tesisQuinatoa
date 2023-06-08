from django.conf.urls import url
from apps.pais.models import pais
from apps.campoAmplio.views import listSelectedEspe, listSelectedItems
from django.contrib.auth.decorators import login_required
urlpatterns = [
    url(r'^sel/$', login_required(listSelectedItems), name='sel'),
    url(r'^selEspe/$', login_required(listSelectedEspe), name='selEspe'),

]