"""Cienciometrico URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include, handler404, handler500
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from apps.HomePrincipal.views import error_404, error_500
from django.contrib.auth.views import login, logout_then_login,password_reset,password_reset_done,password_reset_confirm,password_reset_complete
#codigo para iniciar el hilo de trabajo en segundo plano, destinado al entrenamiento de la red Neuronal
from apps.SisRec.Temporizador import Temporizador
from apps.SisRec.views import entrenaRedNeuronal
t = Temporizador('00:00:00',1,entrenaRedNeuronal)# Instanciamos nuestra clase Temporizador
t.start() #Iniciamos el hilo
# fin linea ejecución entrenamiento red neuronal


urlpatterns = [
    url(r'^adminEcuciencia/', admin.site.urls),
    url(r'^', include('apps.HomePrincipal.urls', namespace="indexHome")),
    url(r'^pais/', include('apps.pais.urls', namespace="pais")),
    url(r'^zona/', include('apps.zona.urls', namespace="zona")),
    url(r'^provincia/', include('apps.provincia.urls', namespace="provincia")),
    url(r'^ciudad/', include('apps.ciudad.urls', namespace="ciudad")),
    url(r'^Carrera/', include('apps.carrera.urls', namespace="carrera")),
    url(r'^Facultad/', include('apps.facultad.urls', namespace="Facultad")),
    url(r'^campus/', include('apps.campus.urls', namespace="campus")),
    url(r'^investigador/', include('apps.Investigador.urls', namespace="usuario")),
    url(r'^articulo/', include('apps.Articulos_Cientificos.urls', namespace="articulosCientificos")),
    url(r'^formacionAcad/', include('apps.Formacion_Academica.urls', namespace="FormacionAcademica")),
    url(r'^proyectos/', include('apps.Proyectos.urls', namespace="proyecto")),
    url(r'^roles/', include('apps.roles.urls', namespace="roles")),
    url(r'^index/', include('apps.inicio.urls', namespace="inicio")),
    url(r'^texto/', include('apps.TextMining.urls', namespace="text")),
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^accounts/login/', login, {'template_name': 'login.html'}, name='login'),
    url(r'^logout/', logout_then_login, name='logout'),
    url(r'^libro/', include('apps.Libro.urls', namespace="Libro")),
    url(r'^revista/', include('apps.Revista.urls', namespace="Revista")),
    url(r'^ponencia/', include('apps.Ponencia.urls', namespace="Ponencia")),
    url(r'^capacitacion/', include('apps.capacitacion.urls', namespace="capacitacion")),
    url(r'^palabras/', include('apps.palabraClave.urls', namespace="pal")),
    url(r'^db/', include('apps.baseDatos.urls', namespace="base")),
    url(r'^autor/', include('apps.autoresArticulos.urls', namespace="autor")),
    url(r'^linea/', include('apps.Linea_Investigacion.urls', namespace="linea")),
    url(r'^tipoBaseDatos/', include('apps.tipoBaseDatos.urls', namespace="tipoBaseDatos")),
    url(r'^amplio/', include('apps.campoAmplio.urls', namespace="campoAmplio")),
    url(r'^grafica/', include('apps.graficas.urls', namespace="grafica")),
    url(r'^BDD/', include('apps.baseDatos.urls', namespace="baseDatos")),
    url(r'^certificacion/', include('apps.certificacion.urls', namespace="certificacion")),
    url(r'^certificacionadmin/', include('apps.certificacionadmin.urls', namespace="certificacionadmin")),
    url(r'^parametrosArticulos/', include('apps.parametrosArticulos.urls', namespace="parametrosArticulos")),
    url(r'^parametrosLibro/', include('apps.parametrosLibro.urls', namespace="parametrosLibro")),
    url(r'^parametrosPonencia/', include('apps.parametrosPonencia.urls', namespace="parametrosPonencia")),
    url(r'^evento/', include('apps.evento.urls', namespace="evento")),
    url(r'^incentivo/', include('apps.incentivo.urls', namespace="incentivo")),
    url(r'^postulacion/', include('apps.postulacion.urls', namespace="postulacion")),
    #///////////////////////PASSWORD RESET///////////////////////////////////////
    url(r'^password_reset/', password_reset,
       {'template_name': 'registration/password_reset_form.html',
   'email_template_name': 'registration/password_reset_email.html'},
     name='password_reset'),
    url(r'^password_reset_done/', password_reset_done,
       {'template_name': 'registration/password_reset_done.html'},
        name='password_reset_listo'),
    url(r'^reset/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>.+)/$', password_reset_confirm,
        {'template_name': 'registration/password_reset_confirm.html'},
        name='password_reset_confirm'
        ),
    url(r'^done', password_reset_complete, {'template_name': 'registration/password_reset_complete.html'},
        name='password_reset_completado'),
    #urls sistema recomendador
    url(r'^social/', include('apps.SisRec.urls', namespace="social")),



]

handler404 = error_404
handler500 = error_500

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
