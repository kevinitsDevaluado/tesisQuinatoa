from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponse
import numpy as np
import skfuzzy as fuzz
import csv
from skfuzzy import control as ctrl
from apps.palabraClave.models import palabraClave
import pandas as pd
import string 
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
from apps.Investigador.models import Investigador
from apps.autoresArticulos.models import autoresArticulos
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.autoresLibro.models import autoresLibro
from apps.Libro.models import libro
from apps.autoresPonencia.models import autoresPonencia
from apps.Ponencia.models import ponencia
from datetime import date
import datetime
import json
from apps.evento.models import evento
from apps.incentivo.models import incentivo
from apps.evento.form import EventoForm
from apps.postulacion.models import postulacion
from django.views.generic import CreateView, ListView, UpdateView, DeleteView,TemplateView
from apps.parametrosArticulos.models import parametrosArticulo
from apps.parametrosLibro.models import parametroslibro
# Create your views here.

#Aumentar
from django.db.models import Q
from django.contrib.auth.models import User
import re

# Create your views here.

def Verificar_Evento(request):
	usuario = request.user.id
	if request.method == 'POST':
		data = request.POST.get('id')
		eventos=evento.objects.get(id=data)
		nuevo = Investigador.objects.get(user_id=usuario)
		nuevo.eventoInv.add(eventos)
		nuevo.save() 
	comprovar=Investigador.objects.get(user_id=usuario)
	lista=comprovar.eventoInv.all()
	if lista:
		id_ev=0
		for i in lista:
			id_ev=i.id
		#Informacion
		ver_evento=evento.objects.get(id=id_ev)
		z1=str(ver_evento.fechaInicio).split('-')
		z2=str(ver_evento.fechaFinal).split('-')
		inicio = datetime.date(int(z1[0]), int(z1[1]), int(z1[2]))
		fin = datetime.date(int(z2[0]), int(z2[1]), int(z2[2]))
		maxi= int(ver_evento.numeroPublicaciones)
		a=[]
		b=[]
		#///////////////////////////////INDICADOR 1/////////////////////////////////////////////
		ind1=0
		inv = Investigador.objects.get(user_id=usuario)
		#Articulos Cientificos
		man=autoresArticulos.objects.filter(user_id=inv.user_id)
		for i in man:
			try:
				c1=articulos_cientificos.objects.get(id=i.articulo_id)
				if c1.editableTrueFalse == 0:
					c2=str(c1.fechaPublicacion).split('-')
					bol=inicio <= datetime.date(int(c2[0]), int(c2[1]), int(c2[2])) <= fin
					if bol==True:
						ind1=ind1+1
						a.append(c1.id)
			except:
				print('1')
		#Libros
		men=autoresLibro.objects.filter(user_id=inv.user_id)
		for i in men:
			try:
				c1=libro.objects.get(id=i.libro_id)
				if c1.editableTrueFalse == 0:
					c2=str(c1.fechaPublicacion).split('-')
					bol=inicio <= datetime.date(int(c2[0]), int(c2[1]), int(c2[2])) <= fin
					if bol==True:
						ind1=ind1+1
						b.append(c1.id)
			except:
				print('2')
		if ind1>maxi:
			ind1=maxi
		numero_publicaciones=ind1
		ind1= (ind1*100)/maxi

		#///////////////////////////////INDICADOR 2/////////////////////////////////////////////
		total=0
		#Articulos Cientificos
		for i in a:
			fiel=articulos_cientificos.objects.get(id=i)
			if fiel.filialUtc=='Si':
				total=total+1
		#Libros
		for i in b:
			fiel=libro.objects.get(id=i)
			if fiel.filialUtc=='Si':
				total=total+1
		total_filia=len(a)+len(b)
		filia_resul=total
		if total_filia>0:
			ind2=(total*100)/total_filia
		else:
			ind2=total_filia

		#///////////////////////////////INDICADOR 3/////////////////////////////////////////////
		num1=0
		#Articulos Cientificos
		if a:
			for i in a:
				un=0
				z=autoresArticulos.objects.filter(articulo_id=i)
				for j in z:
					if inv.user_id!=j.user.id:
						if un==0:
							num1=num1+1
							un=1
		#Libros
		num2=0
		if b:
			for i in b:
				un=0
				z=autoresLibro.objects.filter(libro_id=i)
				for j in z:
					if inv.user_id!=j.user.id:
						if un==0:
							num2=num2+1
							un=1

		sum1=len(a)+len(b)
		sum2=num1+num2
		if sum1>0:
			ind3=(sum2*100)/sum1
		else:
			ind3=sum1
		#///////////////////////////////INDICADOR 4/////////////////////////////////////////////
		result_1=0
		result_2=0
		#Articulos Cientificos
		if a:
			for i in a:
				result_1=result_1+20
				result_2=result_2+evaluarArticulo(i)
		result_3=0
		result_4=0
		result_5=0
		result_6=0
		#Libros
		if b:
			for i in b:
				try:
					autorLibro = autoresLibro.objects.get(libro_id=i, capituloSel=False, user_id=usuario)
					result_3=result_3+20
					result_4=result_4+evaluarLibro(autorLibro)
				except:
					autorCapitulo = autoresLibro.objects.get(libro_id=i, capituloSel=True, user_id=usuario)
					result_5=result_5+15
					result_6=result_6+evaluarCapitulo(autorCapitulo)

		result_7=result_1+result_3+result_5
		result_8=result_2+result_4+result_6
		result_9=0
		if result_7>0 and result_8>0:
			result_9=(result_8*100)/result_7
			ind4=result_9/10
		else:
			ind4=0
		
		#LOGICA DIFUSA
		a1 = ctrl.Antecedent(np.arange(0, 11, 1), 'a1')
		b1 = ctrl.Antecedent(np.arange(0, 11, 1), 'b1')
		c1 = ctrl.Antecedent(np.arange(0, 11, 1), 'c1')
		d1 = ctrl.Antecedent(np.arange(0, 11, 1), 'd1')

		a1['bajo'] = fuzz.trimf(a1.universe, [0, 0, 5])
		a1['medio'] = fuzz.trimf(a1.universe, [0, 5, 10])
		a1['alto'] = fuzz.trimf(a1.universe, [5, 10, 10])

		b1['bajo'] = fuzz.trimf(b1.universe, [0, 0, 5])
		b1['medio'] = fuzz.trimf(b1.universe, [0, 5, 10])
		b1['alto'] = fuzz.trimf(b1.universe, [5, 10, 10])

		c1['bajo'] = fuzz.trimf(c1.universe, [0, 0, 5])
		c1['medio'] = fuzz.trimf(c1.universe, [0, 5, 10])
		c1['alto'] = fuzz.trimf(c1.universe, [5, 10, 10])

		d1['bajo'] = fuzz.trimf(d1.universe, [0, 0, 5])
		d1['medio'] = fuzz.trimf(d1.universe, [0, 5, 10])
		d1['alto'] = fuzz.trimf(d1.universe, [5, 10, 10])

		incentivo_difuso = ctrl.Consequent(np.arange(0, 256, 1), 'incentivo_difuso')

		incentivo_difuso['bajo'] = fuzz.trimf(incentivo_difuso.universe, [0, 0, 123])
		incentivo_difuso['medio'] = fuzz.trimf(incentivo_difuso.universe, [0, 123, 255])
		incentivo_difuso['alto'] = fuzz.trimf(incentivo_difuso.universe, [123, 255, 255])

		#Reglas del Operador AND
		regla1 = ctrl.Rule(a1['alto'] & b1['alto'] & c1['alto'] & d1['alto'], incentivo_difuso['alto'])
		#ALTO-MEDIO
		regla2 = ctrl.Rule(a1['alto'] & b1['medio'] & c1['alto'] & d1['alto'], incentivo_difuso['alto'])
		regla3 = ctrl.Rule(a1['alto'] & b1['medio'] & c1['medio'] & d1['alto'], incentivo_difuso['medio'])
		regla4 = ctrl.Rule(a1['alto'] & b1['medio'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		regla5 = ctrl.Rule(a1['medio'] & b1['alto'] & c1['alto'] & d1['alto'], incentivo_difuso['alto'])
		regla6 = ctrl.Rule(a1['medio'] & b1['medio'] & c1['alto'] & d1['alto'], incentivo_difuso['medio'])
		regla7 = ctrl.Rule(a1['medio'] & b1['medio'] & c1['medio'] & d1['alto'], incentivo_difuso['medio'])
		regla8 = ctrl.Rule(a1['medio'] & b1['medio'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		#MEDIO-ALTO
		regla9 = ctrl.Rule(a1['medio'] & b1['alto'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		regla10 = ctrl.Rule(a1['medio'] & b1['alto'] & c1['alto'] & d1['medio'], incentivo_difuso['medio'])
		regla11 = ctrl.Rule(a1['alto'] & b1['alto'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		regla12 = ctrl.Rule(a1['alto'] & b1['alto'] & c1['alto'] & d1['medio'], incentivo_difuso['alto'])
		#ALTO-BAJO
		regla13 = ctrl.Rule(a1['alto'] & b1['bajo'] & c1['alto'] & d1['alto'], incentivo_difuso['medio'])
		regla14 = ctrl.Rule(a1['alto'] & b1['bajo'] & c1['bajo'] & d1['alto'], incentivo_difuso['medio'])
		regla15 = ctrl.Rule(a1['alto'] & b1['bajo'] & c1['bajo'] & d1['bajo'], incentivo_difuso['bajo'])
		regla16 = ctrl.Rule(a1['bajo'] & b1['alto'] & c1['alto'] & d1['alto'], incentivo_difuso['medio'])
		regla17 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['alto'] & d1['alto'], incentivo_difuso['bajo'])
		regla18 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['bajo'] & d1['alto'], incentivo_difuso['bajo'])
		regla19 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['bajo'] & d1['bajo'], incentivo_difuso['bajo'])
		#BAJO-ALTO
		regla20 = ctrl.Rule(a1['bajo'] & b1['alto'] & c1['bajo'] & d1['bajo'], incentivo_difuso['medio'])
		regla21 = ctrl.Rule(a1['bajo'] & b1['alto'] & c1['alto'] & d1['bajo'], incentivo_difuso['medio'])
		regla22 = ctrl.Rule(a1['alto'] & b1['alto'] & c1['bajo'] & d1['bajo'], incentivo_difuso['bajo'])
		regla23 = ctrl.Rule(a1['alto'] & b1['alto'] & c1['alto'] & d1['bajo'], incentivo_difuso['bajo'])
		#BAJO-MEDIO
		regla24 = ctrl.Rule(a1['bajo'] & b1['medio'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		regla25 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['medio'] & d1['medio'], incentivo_difuso['bajo'])
		regla26 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['bajo'] & d1['medio'], incentivo_difuso['bajo'])
		regla27 = ctrl.Rule(a1['bajo'] & b1['medio'] & c1['bajo'] & d1['bajo'], incentivo_difuso['medio'])
		regla28 = ctrl.Rule(a1['bajo'] & b1['medio'] & c1['medio'] & d1['bajo'], incentivo_difuso['medio'])
		#MEDIO-BAJO
		regla29 = ctrl.Rule(a1['medio'] & b1['medio'] & c1['bajo'] & d1['bajo'], incentivo_difuso['bajo'])
		regla30 = ctrl.Rule(a1['medio'] & b1['medio'] & c1['medio'] & d1['bajo'], incentivo_difuso['bajo'])
		regla31 = ctrl.Rule(a1['medio'] & b1['bajo'] & c1['medio'] & d1['medio'], incentivo_difuso['medio'])
		regla32 = ctrl.Rule(a1['medio'] & b1['bajo'] & c1['bajo'] & d1['medio'], incentivo_difuso['medio'])
		regla33 = ctrl.Rule(a1['medio'] & b1['bajo'] & c1['bajo'] & d1['bajo'], incentivo_difuso['bajo'])

		#TODO
		regla34 = ctrl.Rule(a1['bajo'] & b1['bajo'] & c1['medio'] & d1['alto'], incentivo_difuso['bajo'])
		regla35 = ctrl.Rule(a1['bajo'] & b1['medio'] & c1['medio'] & d1['alto'], incentivo_difuso['bajo'])
		regla36 = ctrl.Rule(a1['bajo'] & b1['medio'] & c1['alto'] & d1['alto'], incentivo_difuso['medio'])
		regla37 = ctrl.Rule(a1['medio'] & b1['alto'] & c1['bajo'] & d1['alto'], incentivo_difuso['medio'])

		incentivo_difuso_ctrl = ctrl.ControlSystem([regla1, regla2, regla3, regla4, regla5, regla6, regla7, regla8, regla9, regla10, regla11, regla12, regla13, regla14, regla15, regla16, regla17, regla18, regla19, regla20, regla21, regla22, regla23, regla24, regla25, regla26, regla27, regla28, regla29, regla30, regla31, regla32, regla33, regla34, regla35, regla36,regla37])
		volu = ctrl.ControlSystemSimulation(incentivo_difuso_ctrl)

		input_a1=ind1/10
		input_b1=ind4/10
		input_c1=ind3/10
		input_d1=ind2/10
		print(input_a1,input_b1,input_c1,input_d1,"ok")
		volu.input['a1'] = input_a1
		volu.input['b1'] = input_b1
		volu.input['c1'] = input_c1
		volu.input['d1'] = input_d1

		volu.compute()
		print ("incentivo_difuso:{0}".format(volu.output['incentivo_difuso']))
		Resultado_incentivo_difuso=""
		if volu.output['incentivo_difuso'] < 123:
			print("incentivo_difuso BAJO")
			Resultado_incentivo_difuso="Bajo"
		if volu.output['incentivo_difuso'] >= 123 and volu.output['incentivo_difuso'] < 255:
			print("incentivo_difuso MEDIO")
			Resultado_incentivo_difuso="Medio"
		if volu.output['incentivo_difuso'] >= 255:
			print("incentivo_difuso ALTO")
			Resultado_incentivo_difuso="Alto"
		if int(ind1/10)==0 and int(ind2/10)==0 and int(ind3/10)==0 and int(ind4/10)==0:
			Total_incentivo_difuso=0
			Resultado_incentivo_difuso=0
		else:
			Total_incentivo_difuso=(int(volu.output['incentivo_difuso'])*100)/255
		All_Articulos=articulos_cientificos.objects.all()
		All_Libros=libro.objects.all()
		All_Ponencias=ponencia.objects.all()
		All_Eventos=evento.objects.all()
		#Aumentar
		today = date.today()
		fecha=str(today.year)+"-"+str(today.month)+"-"+str(today.day)
		All_Incentivos=incentivo.objects.all()
		inus = Investigador.objects.get(user_id=usuario)
		All_Postulaciones=postulacion.objects.filter(investigador_id=inus.id)
		Verificar_Incentivo=incentivo.objects.filter(evento_id=ver_evento.id)
		contador_postulacion=0
		Verificar_Postulacion=postulacion.objects.all()
		for i in Verificar_Incentivo:
			for j in Verificar_Postulacion:
				if i.id==j.incentivo.id and inus.id==j.investigador.id:
					contador_postulacion=1
		return render(request, 'Incentivos/Informacion.html',{'Perfil_Evento':ver_evento.id,'Cont_Post':contador_postulacion,'Indicador_1':format(ind1, '.2f'),'Indicador_1_Resul': numero_publicaciones, 'Indicador_2':format(ind2, '.2f'),'Indicador_2_Resul': filia_resul, 'Indicador_3':format(ind3, '.2f'), 'Indicador_3_Resul': sum2, 'Indicador_4':format(result_9, '.2f'), 'Indicador_4_Resul': format(result_8, '.2f'), 'Incentivo_Difuso': format(Total_incentivo_difuso, '.1f'), 'Resultado':Resultado_incentivo_difuso, 'Gra_Incentivo': format(volu.output['incentivo_difuso'], '.1f'), 'perfil':inv, 'Articulos': All_Articulos, 'Libros': All_Libros, 'Ponencias': All_Ponencias, 'Eventos': All_Eventos,'Postulaciones':All_Postulaciones,'Incentivos':All_Incentivos})
	else:
		All_Articulos=articulos_cientificos.objects.all()
		All_Eventos=evento.objects.all()
		All_Incentivos=incentivo.objects.all()
		All_Libros=libro.objects.all()
		All_Ponencias=ponencia.objects.all()
		inus = Investigador.objects.get(user_id=usuario)
		All_Postulaciones=postulacion.objects.filter(investigador_id=inus.id)
		return render(request, 'Incentivos/Informacion.html',{'Indicador_1':0.00,'Indicador_1_Resul': 0, 'Indicador_2':0.00,'Indicador_2_Resul': 0, 'Indicador_3':0.00, 'Indicador_3_Resul': 0, 'Indicador_4':0.00, 'Indicador_4_Resul': 0, 'Incentivo_Difuso': 0.0, 'Resultado': 'Bajo', 'Gra_Incentivo': 0, 'perfil':comprovar, 'Articulos': All_Articulos, 'Libros': All_Libros , 'Ponencias': All_Ponencias, 'Eventos': All_Eventos,'Postulaciones':All_Postulaciones,'Incentivos':All_Incentivos})

#Calificaciòn de articulos 
def evaluarArticulo(id):
    articulo = articulos_cientificos.objects.get(id=id)
    calificacion = 0
    datos=articulo.revista.base.all()
    contador=1
    for o in datos:
    	if contador==1:
		    if o.tipoBaseDatos.Nombre == 'Alto Impacto':
		    	try:
		    		parametro = parametrosArticulo.objects.get(Q(descripcion=str(articulo.revista.cuartil_revista)) & Q(estado='Activo'))
		    		if parametro:	
		    			calificacion = parametro.valor
		    	except:
		    		calificacion = 0
		    else:
		    	try:
		    		parametro = parametrosArticulo.objects.get(Q(descripcion='Regional') & Q(estado='Activo'))
		    		if parametro:
		    			calificacion = parametro.valor
		    	except:
		    		calificacion = 0
		    contador=2
    return calificacion

#Calificaciòn de Libros 
def evaluarLibro(autorLibro):
	calificacion = 0
	try:
		parametro = parametroslibro.objects.get(Q(descripcionp=str(autorLibro.libro.tipoEditorial)) & Q(estadop='Activo'))
		if parametro:
			calificacion = parametro.valorp
	except:
		calificacion = 0
	return calificacion

#Calificaciòn de Capitulos 
def evaluarCapitulo(autorCapitulo):
	calificacion = 0
	try:
		parametro = parametroslibro.objects.get(Q(descripcionp=str(autorCapitulo.libro.tipoEditorial)) & Q(estadop='Activo'))
		if parametro:
			calificacion = parametro.valorp
	except:
		calificacion = 0
	return calificacion



def search_recomendaciones_articulos(request):
    if request.method == 'POST':
    	with open('static/tsv/keywordA.csv', 'wt', encoding='utf-8', newline='') as out_file:
    		csv_writer = csv.writer(out_file)
    		csv_writer.writerow(['id','title','tags'])
    		articulo=articulos_cientificos.objects.all()
    		for arti in articulo:
    			ver=""
    			resumen=arti.resumen.replace('[{}]'.format(string.punctuation),' ')
    			resumen = re.sub('[!%@#$,;:$&/?¿+*=<>.-]', '', resumen)
    			ver=ver+resumen.lower()
    			palabra = [val.id for val in arti.palabraClave.all()]
    			if palabra:
    				keyword=palabraClave.objects.filter(id__in=palabra)
    				for j in keyword:
    					ver=ver+" "+j.Termino
    			csv_writer.writerow([arti.id,arti.titulo,ver])

    	df=pd.read_csv('static/tsv/keywordA.csv')
    	df['ntags']=df['tags'].str.replace('[{}]'.format(string.punctuation),' ')
    	tfidf=TfidfVectorizer(stop_words='english')
    	df['ntags']=df['ntags'].fillna('')
    	tfidf_matrix = tfidf.fit_transform(df['ntags'])
    	cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    	indices = pd.Series(df.index, index=df['title']).drop_duplicates()
    	union=[]
    	usuario = request.user.id
    	us = User.objects.get(id = usuario)
    	aut = autoresArticulos.objects.filter(user = us)
    	l = []
    	for i in aut:
    		l.append(i.articulo.id)
    	a=articulos_cientificos.objects.filter(id__in = l)
    	vacio=[]
    	for j in a:
    		recom=articulos_cientificos.objects.get(id=j.id)
    		try:
    			infor=get_recommendations_articulos(recom.titulo,cosine_sim,indices,df)
    			for i in infor:
    				if i not in vacio:
    					articulo_id={}
    					articulo_id['id']=str(i)
    					articulo_id['ud']=str(recom.id)
    					union.append(articulo_id)
    					vacio.append(i)
    		except:
    			print('Error')
    	matriz_json = json.dumps(union)
    	mimetype="application/json"
    	return HttpResponse(matriz_json,mimetype)

def get_recommendations_articulos(title, cosine_sim,indices,df):
	idx=indices[title]
	sim_scores=list(enumerate(cosine_sim[idx]))
	sim_scores=sorted(sim_scores, key=lambda x: x[1], reverse=True)
	sim_scores=sim_scores[1:3]
	key_indices=[i[0] for i in sim_scores]
	return df['id'].iloc[key_indices]

def search_recomendaciones_libros(request):
    if request.method == 'POST':
    	with open('static/tsv/keywordL.csv', 'wt', encoding='utf-8', newline='') as out_file:
    		csv_writer = csv.writer(out_file)
    		csv_writer.writerow(['id','title','tags'])
    		libros=libro.objects.all()
    		for lib in libros:
    			ver=""
    			resumen=lib.Resumen.replace('[{}]'.format(string.punctuation),' ')
    			resumen = re.sub('[!%@#$,;:$&/?¿+*=<>.-]', '', resumen)
    			ver=ver+resumen.lower()
    			palabra = [val.id for val in lib.PalabrasClave.all()]
    			if palabra:
    				keyword=palabraClave.objects.filter(id__in=palabra)
    				for j in keyword:
    					ver=ver+" "+j.Termino
    			csv_writer.writerow([lib.id,lib.Titulo,ver])

    	df=pd.read_csv('static/tsv/keywordL.csv')
    	df['ntags']=df['tags'].str.replace('[{}]'.format(string.punctuation),' ')
    	tfidf=TfidfVectorizer(stop_words='english')
    	df['ntags']=df['ntags'].fillna('')
    	tfidf_matrix = tfidf.fit_transform(df['ntags'])
    	cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    	indices = pd.Series(df.index, index=df['title']).drop_duplicates()
    	union=[]
    	usuario = request.user.id
    	us = User.objects.get(id=usuario)
    	aut = autoresLibro.objects.filter(user=us)
    	l = []
    	for i in aut:
    		l.append(i.libro.id)
    	b=libro.objects.filter(id__in=l)
    	vacio=[]
    	for j in b:
    		recom=libro.objects.get(id=j.id)
    		try:
    			infor=get_recommendations_libros(recom.Titulo,cosine_sim,indices,df)
    			for i in infor:
    				if i not in vacio:
    					libro_id={}
    					libro_id['id']=str(i)
    					libro_id['ud']=str(recom.id)
    					union.append(libro_id)
    					vacio.append(i)
    		except:
    			print('Error')
    	matriz_json = json.dumps(union)
    	mimetype="application/json"
    	return HttpResponse(matriz_json,mimetype)

def get_recommendations_libros(title, cosine_sim,indices,df):
	idx=indices[title]
	sim_scores=list(enumerate(cosine_sim[idx]))
	sim_scores=sorted(sim_scores, key=lambda x: x[1], reverse=True)
	sim_scores=sim_scores[1:3]
	key_indices=[i[0] for i in sim_scores]
	return df['id'].iloc[key_indices]


def search_recomendaciones_ponencias(request):
    if request.method == 'POST':
    	with open('static/tsv/keywordP.csv', 'wt', encoding='utf-8', newline='') as out_file:
    		csv_writer = csv.writer(out_file)
    		csv_writer.writerow(['id','title','tags'])
    		ponencias=ponencia.objects.all()
    		for pon in ponencias:
    			ver=""
    			resumen=pon.resumen.replace('[{}]'.format(string.punctuation),' ')
    			resumen = re.sub('[!%@#$,;:$&/?¿+*=<>.-]', '', resumen)
    			ver=ver+resumen.lower()
    			palabra = [val.id for val in pon.palabrasClave.all()]
    			if palabra:
    				keyword=palabraClave.objects.filter(id__in=palabra)
    				for j in keyword:
    					ver=ver+" "+j.Termino
    			csv_writer.writerow([pon.id,pon.tituloPonencia,ver])

    	df=pd.read_csv('static/tsv/keywordP.csv')
    	df['ntags']=df['tags'].str.replace('[{}]'.format(string.punctuation),' ')
    	tfidf=TfidfVectorizer(stop_words='english')
    	df['ntags']=df['ntags'].fillna('')
    	tfidf_matrix = tfidf.fit_transform(df['ntags'])
    	cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)
    	indices = pd.Series(df.index, index=df['title']).drop_duplicates()
    	union=[]
    	usuario = request.user.id
    	us = User.objects.get(id=usuario)
    	aut = autoresPonencia.objects.filter(user=us)
    	l = []
    	for i in aut:
    		l.append(i.ponencia.id)
    	b=ponencia.objects.filter(id__in=l)
    	vacio=[]
    	for j in b:
    		recom=ponencia.objects.get(id=j.id)
    		try:
    			infor=get_recommendations_libros(recom.tituloPonencia,cosine_sim,indices,df)
    			for i in infor:
    				if i not in vacio:
    					ponencia_id={}
    					ponencia_id['id']=str(i)
    					ponencia_id['ud']=str(recom.id)
    					union.append(ponencia_id)
    					vacio.append(i)
    		except:
    			print('Error')
    	matriz_json = json.dumps(union)
    	mimetype="application/json"
    	return HttpResponse(matriz_json,mimetype)

def get_recommendations_ponencias(title, cosine_sim,indices,df):
	idx=indices[title]
	sim_scores=list(enumerate(cosine_sim[idx]))
	sim_scores=sorted(sim_scores, key=lambda x: x[1], reverse=True)
	sim_scores=sim_scores[1:3]
	key_indices=[i[0] for i in sim_scores]
	return df['id'].iloc[key_indices]

from apps.carrera.models import carrera

def search_coutores(request):
	usuario = request.user.id
	bd=carrera.objects.all()
	return render(request, 'Home/viewgrafica.html',{'bd':bd,'search_autor':usuario}) 

class ListarEventos(ListView):
  model = evento
  template_name = 'Incentivos/ListarEventos.html'
  context_object_name = 'evento'

class CrearEventos(CreateView):
  model = evento
  form_class=EventoForm
  template_name='Incentivos/CrearEventos.html'
  success_url=reverse_lazy('evento:Listar_Evento')

class ModificarEventos(UpdateView):
    model = evento
    template_name = 'Incentivos/CrearEventos.html'
    form_class = EventoForm
    success_url = reverse_lazy('evento:Listar_Evento')


import datetime
def SearchFecha(request):
    if request.method == 'POST':
        z1=str(request.POST.get('inicio')).split('-')
        z2=str(request.POST.get('final')).split('-')
        inicio = datetime.date(int(z1[0]), int(z1[1]), int(z1[2]))
        fin = datetime.date(int(z2[0]), int(z2[1]), int(z2[2]))
        pos=evento.objects.all()
        results = []
        for i in pos:
            c1=evento.objects.get(id=i.id)
            c2=str(c1.fechaInicio).split('-')
            bol=inicio <= datetime.date(int(c2[0]), int(c2[1]), int(c2[2])) <= fin
            if bol==True:
                post={}
                post['id']=i.id
                post['nombre']=i.nombre
                post['fechaInicio']=str(i.fechaInicio)
                post['fechaFinal']=str(i.fechaFinal)
                post['numeroPublicaciones']=i.numeroPublicaciones
                post['estado']=i.estado
                results.append(post)
        data_json= json.dumps(results)
    mimetype="application/json"
    return HttpResponse(data_json,mimetype)