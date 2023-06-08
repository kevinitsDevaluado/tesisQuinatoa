from django.shortcuts import render
from django.views.generic import ListView, CreateView,UpdateView,DeleteView
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.contrib.auth.models import User
from apps.certificacion.models import certificacion
from apps.Investigador.models import Investigador
from apps.certificacion.form import CertificacionForm
from apps.Libro.models import libro
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Ponencia.models import ponencia


#import os
#from io import BytesIO
#from reportlab.pdfgen import canvas
#from reportlab.lib.pagesizes import A4

# Create your views here.

class CertificacionList(ListView):
	print ("lopeeeeeez")

	model = certificacion
	template_name = 'certificacion/certificacion_listar.html'
	def get_context_data(self, **kwargs):
		usuario = self.request.user.id
		context = super(CertificacionList, self).get_context_data(**kwargs)
		try:
			capa = certificacion.objects.filter(user_id=usuario).order_by('fecha_actualizacion')
			notificacion = certificacion.objects.filter(notificacion=1).filter(user_id=usuario)
		except capacitacion.DoesNotExist:
			capa = None
		#mio=1087//admin=1
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		context['capa'] = capa
		context['notificacion'] = notificacion
		return context

class CertificacionCreate(CreateView):
	model = certificacion
	form_class = CertificacionForm
	template_name = 'certificacion/certificado_investigador_crear.html'
	success_url = reverse_lazy('certificacion:certificacion_listar')
	#funcion para mandar a la forma la kwargs
	"""def get_form_kwargs(self):
		kwargs = super(CertificacionCreate, self).get_form_kwargs()
		kwargs.update({'request': self.request})
		return kwargs"""

	def get_context_data(self, **kwargs):
		context = super(CertificacionCreate, self).get_context_data(**kwargs)
		usuario = self.request.user.id
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		
		us = User.objects.get(id = usuario)
		# consulta el autor del artículo
		autar = autoresArticulos.objects.filter(user = us)
		a = []
		for i in autar:
			a.append(i.articulo.id)
		# consulta el autor de la ponencia
		autpon = autoresPonencia.objects.filter(user = us)
		p = []
		for i in autpon:
			p.append(i.ponencia.id)
		#
		autlib = autoresLibro.objects.filter(user=us)
		l = []
		for i in autlib:
			l.append(i.libro.id)
        #
		#para filtrar los campos
		context['form'].fields['libros_varios'].queryset = libro.objects.filter(id__in = l).filter(editableTrueFalse=0)
		context['form'].fields['articulos_varios'].queryset = articulos_cientificos.objects.filter(id__in = a).filter(editableTrueFalse=0)
		context['form'].fields['ponencias_varios'].queryset = ponencia.objects.filter(id__in = p).filter(editableTrueFalse=0)
		context['form'].fields['investigador'].queryset = Investigador.objects.filter(user_id=usuario)
		return context

class CertificadoUpdateInvestigador(UpdateView):
	model = certificacion
	form_class = CertificacionForm
	template_name = 'certificacion/certificado_modificar.html'
	success_url = reverse_lazy('certificacion:certificacion_listar')
	
	#funcion para mandar a la forma la kwargs
	"""def get_form_kwargs(self):
		kwargs = super(CertificadoUpdateInvestigador, self).get_form_kwargs()
		kwargs.update({'request': self.request})
		return kwargs"""

	def get_context_data(self, **kwargs):
		context = super(CertificadoUpdateInvestigador, self).get_context_data(**kwargs)
		usuario = self.request.user.id
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		
		us = User.objects.get(id = usuario)
		# consulta el autor del artículo
		autar = autoresArticulos.objects.filter(user = us)
		a = []
		for i in autar:
			a.append(i.articulo.id)
		# consulta el autor de la ponencia
		autpon = autoresPonencia.objects.filter(user = us)
		p = []
		for i in autpon:
			p.append(i.ponencia.id)
		#
		autlib = autoresLibro.objects.filter(user=us)
		l = []
		for i in autlib:
			l.append(i.libro.id)
        #
		#para filtrar los campos
		context['form'].fields['libros_varios'].queryset = libro.objects.filter(id__in = l).filter(editableTrueFalse=0)
		context['form'].fields['articulos_varios'].queryset = articulos_cientificos.objects.filter(id__in = a).filter(editableTrueFalse=0)
		context['form'].fields['ponencias_varios'].queryset = ponencia.objects.filter(id__in = p).filter(editableTrueFalse=0)
		context['form'].fields['investigador'].queryset = Investigador.objects.filter(user_id=usuario)
		return context

class CertificadoDelete(DeleteView):
	model = certificacion
	template_name = 'certificacion/certificado_eliminar.html'
	success_url = reverse_lazy('certificacion:certificacion_listar')
	def get_context_data(self, **kwargs):
		context = super(CertificadoDelete, self).get_context_data(**kwargs)
		usuario = self.request.user.id
		perfil = Investigador.objects.get(user_id=usuario)
		#roles = perfil.roles.all()
		#privi = []
		#privilegios = []
		#privilegio = []
		#for r in roles:
		#	privi.append(r.id)
		#for p in privi:
		#	roles5 = Rol.objects.get(pk=p)
		#	priv = roles5.privilegios.all()
		#	for pr in priv:
		#		privilegios.append(pr.codename)
		#for i in privilegios:
		#	if i not in privilegio:
		#S		privilegio.append(i)
		#context['usuario'] = privilegio
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		return context

class DocumentoCertificadoList(ListView):
	model = certificacion
	template_name = 'certificacion/documentos_certificado.html'

	def get_context_data(self, **kwargs):
		context = super(DocumentoCertificadoList, self).get_context_data(**kwargs)
		usuario = self.request.user.id
		try:
			capa = certificacion.objects.filter(id=self.kwargs.get('pk'))
			doclib = libro.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docar = articulos_cientificos.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docpon = ponencia.objects.filter(certificacion__id=self.kwargs.get('pk'))
		except certificacion.DoesNotExist:
			capa = None
		context['capa'] = capa
		context['doclib'] = doclib
		context['docar'] = docar
		context['docpon'] = docpon
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		return context

"""def generar_certificado(request):
	response = HttpResponse(content_type='application/pdf')
	response['Content-Disposition'] = 'attachment; filename=certificado.pdf'
	buffer = BytesIO()
	c = canvas.Canvas(buffer, pagesize=A4)

	c.setLineWidth(.3)
	c.setFont('Helvetica', 22)
	c.drawString(30, 750, 'Certificado')
	c.setFont('Helvetica', 12)
	c.drawString(30, 735, 'Reporte')
	
	c.setFont('Helvetica-Bold', 12)
	c.drawString(480, 750, '22/12/2018')
	c.line(480, 747, 560, 747)

	c.save()
	pdf = buffer.getvalue()
	buffer.close()
	response.write(pdf)
	return response"""
class CertificadoDescargar(ListView):
	model = certificacion
	template_name = 'certificacion/certificado_descargar.html'

	def get_context_data(self, **kwargs):
		context = super(CertificadoDescargar, self).get_context_data(**kwargs)
		usuario = self.request.user.id
		try:
			capa = certificacion.objects.filter(id=self.kwargs.get('pk'))
			doclib = libro.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docar = articulos_cientificos.objects.filter(certificacion__id=self.kwargs.get('pk'))
			docpon = ponencia.objects.filter(certificacion__id=self.kwargs.get('pk'))
		except certificacion.DoesNotExist:
			capa = None
		context['capa'] = capa
		context['doclib'] = doclib
		context['docar'] = docar
		context['docpon'] = docpon
		context['perfil'] = Investigador.objects.get(user_id=usuario)
		return context

class CertificadoNotificacionInvestigador(UpdateView):
	model = certificacion
	form_class = CertificacionForm
	template_name = 'certificacion/certificado_notificacion.html'
	success_url = reverse_lazy('certificacion:certificacion_listar')
	
	#funcion para mandar a la forma la kwargs
	"""def get_form_kwargs(self):
		kwargs = super(CertificadoUpdateInvestigador, self).get_form_kwargs()
		kwargs.update({'request': self.request})
		return kwargs"""