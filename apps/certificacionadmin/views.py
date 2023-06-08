from django.shortcuts import render
from django.views.generic import ListView, CreateView,UpdateView,DeleteView, View
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404

from apps.certificacion.models import certificacion
from apps.Investigador.models import Investigador
from apps.certificacion.form import CertificacionForm
from apps.Libro.models import libro
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Ponencia.models import ponencia
from apps.autoresArticulos.models import autoresArticulos


class SecretariaList(ListView):
	model = certificacion
	template_name = 'certificacionadmin/Listsecretaria.html'

	def get_context_data(self, **kwargs):
		context = super(SecretariaList, self).get_context_data(**kwargs)
		try:
			capa = certificacion.objects.all().order_by('fecha_actualizacion').order_by('hora_actualizacion')
			notificacion = certificacion.objects.filter(notificacion=0)
		except certificacion.DoesNotExist:
			capa = None
		context['perfil'] = Investigador.objects.get(user_id=self.request.user.id)
		context['capa'] = capa
		context['notificacionnuevasoli'] = notificacion
		return context

class CertificadoUpdateSecre(UpdateView):
	model = certificacion
	form_class = CertificacionForm
	template_name = 'certificacionadmin/secretaria_certificado_modificar.html'
	success_url = reverse_lazy('certificacionadmin:certificacionadminListar')
	
	#funcion para mandar a la forma la kwargs
	"""def get_form_kwargs(self):
		kwargs = super(CertificadoUpdateSecre, self).get_form_kwargs()
		kwargs.update({'request': self.request})
		return kwargs"""

	def get_context_data(self, **kwargs):
		context = super(CertificadoUpdateSecre, self).get_context_data(**kwargs)
		#usuario = self.request.user.id

		#context['perfil'] = Investigador.objects.get(user_id=self.request.user.id)
		return context

class DocumentoCertificadoList(ListView):
	model = certificacion
	template_name = 'certificacionadmin/documentos_certificado.html'

	def get_context_data(self, **kwargs):
		context = super(DocumentoCertificadoList, self).get_context_data(**kwargs)
		try:
			capa = certificacion.objects.filter(id=self.kwargs.get('pk'))
			doclib = libro.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docar = articulos_cientificos.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docpon = ponencia.objects.filter(certificacion__id=self.kwargs.get('pk'))
		except certificacion.DoesNotExist:
			capa = None
		context['perfil'] = Investigador.objects.get(user_id=self.request.user.id)
		context['capa'] = capa
		context['doclib'] = doclib
		context['docar'] = docar
		context['docpon'] = docpon
		return context