from django.conf.urls import url
from .views import Perfil
from django.contrib.auth.decorators import login_required
from apps.SisRec.views import index,addSolicitud,getColaboradores,getSolicitudes,getNotification,getMessgeNotification,updateLecturaMsg,aceptaSolicitud,rechazaSolicitud,seachColaboradores,getEstadisticas,getKeywords,updateKeywords,listarAdminKeywords,addAdminKeywords,deleteAdminKeywords,listarAdminProyectosCarrera,addAdminProyectosCarrera,updateAdminProyectosCarrera,deleteAdminProyectosCarrera,updatePublicacion
from .views import getRecomendation, sendMessage,getMessage,getArticulos,getLibros,getPonencias,addPublicacion, getProyectosMacro, getPublicacion, addUpdateDescarga,addUpdateLectura,addUpdateLike,addUpdateCita,getCita,addUpdateCita,keywords,addKeywords,addNotification

urlpatterns = [
    url(r'^index$',login_required( index), name="index"),

    url(r'^getRecomendation$', login_required(getRecomendation), name="getRecomendation"),
    url(r'^addSolicitud$', login_required(addSolicitud), name="addSolicitud"),
    url(r'^getColaboradores$', login_required(getColaboradores), name="getColaboradores"),
    url(r'^getSolicitudes$', login_required(getSolicitudes), name="getSolicitudes"),
    url(r'^sendMessage$', login_required(sendMessage), name="sendMessage"),
    url(r'^getMessage$', login_required(getMessage), name="getMessage"),
    url(r'^getArticulos$', login_required(getArticulos), name="getArticulos"),
    url(r'^getLibros$', login_required(getLibros), name="getLibros"),
    url(r'^getPonencias$', login_required(getPonencias), name="getPonencias"),
    url(r'^addPublicacion$', login_required(addPublicacion), name="addPublicacion"),
    url(r'^getProyectosMacro$', login_required(getProyectosMacro), name="getProyectosMacro"),
    url(r'^getPublicacion$', login_required(getPublicacion), name="getPublicacion"),
    url(r'^addUpdateDescarga$', login_required(addUpdateDescarga), name="addUpdateDescarga"),
    url(r'^addUpdateLectura$', login_required(addUpdateLectura), name="addUpdateLectura"),
    url(r'^addUpdateLike$', login_required(addUpdateLike), name="addUpdateLike"),
    url(r'^getCita$', login_required(getCita), name="getCita"),
    url(r'^addUpdateCita$', login_required(addUpdateCita), name="addUpdateCita"),
    url(r'^keywords$', login_required(keywords), name="keywords"),
    url(r'^addKeywords$', login_required(addKeywords), name="addKeywords"),
    url(r'^addNotification$', login_required(addNotification), name="addNotification"),
    url(r'^getNotification$', login_required(getNotification), name="getNotification"),
    url(r'^getMessgeNotification$', login_required(getMessgeNotification), name="getMessgeNotification"),
    url(r'^updateLecturaMsg$', login_required(updateLecturaMsg), name="updateLecturaMsg"),
    url(r'^aceptaSolicitud$', login_required(aceptaSolicitud), name="aceptaSolicitud"),
    url(r'^rechazaSolicitud$', login_required(rechazaSolicitud), name="rechazaSolicitud"),
    url(r'^seachColaboradores$', login_required(seachColaboradores), name="seachColaboradores"),
    url(r'^getEstadisticas$', login_required(getEstadisticas), name="getEstadisticas"),
    url(r'^getKeywords$', login_required(getKeywords), name="getKeywords"),
    url(r'^listarAdminKeywords$', login_required(listarAdminKeywords), name="listarAdminKeywords"),
    url(r'^addAdminKeywords$', login_required(addAdminKeywords), name="addAdminKeywords"),
    url(r'^updateKeywords$', login_required(updateKeywords), name="updateKeywords"),

    url(r'^deleteAdminKeywords/(?P<pk>\d+)$', login_required(deleteAdminKeywords), name="deleteAdminKeywords"),
    url(r'^listarAdminProyectosCarrera$', login_required(listarAdminProyectosCarrera), name="listarAdminProyectosCarrera"),
    url(r'^addAdminProyectosCarrera$', login_required(addAdminProyectosCarrera), name="addAdminProyectosCarrera"),
    url(r'^updateAdminProyectosCarrera$', login_required(updateAdminProyectosCarrera), name="updateAdminProyectosCarrera"),
    url(r'^deleteAdminProyectosCarrera/(?P<pk>\d+)$', login_required(deleteAdminProyectosCarrera), name="deleteAdminProyectosCarrera"),
    url(r'^updatePublicacion$', login_required(updatePublicacion), name="updatePublicacion"),
   # url(r'^index$', login_required(Index.as_view()), name="index"),
     url(r'^perfil$', Perfil.as_view(), name="perfil"),

]
