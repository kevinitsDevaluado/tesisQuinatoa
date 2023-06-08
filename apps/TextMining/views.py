# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import unicodedata
from pip._vendor.appdirs import unicode
from apps.Linea_Investigacion.models import linea_investigacion
from apps.Sub_Lin_Investigacion.models import sub_lin_investigacion
from django.shortcuts import render, HttpResponseRedirect, get_object_or_404
from apps.Articulos_Cientificos.models import articulos_cientificos
from apps.Formacion_Academica.models import formacion_academica
from apps.Ponencia.models import ponencia
from apps.Libro.models import libro
from apps.TextMining.models import textmining
from apps.Investigador.models import Investigador
from apps.TextMining.models import textmining
import spacy
import nltk
from openpyxl import Workbook
from django.http.response import HttpResponse
#from py_translator import Translator
#from py_translator import TEXTLIB
# Create your views here.
import requests
import xlrd
import re
from nltk.corpus import stopwords
import json
from apps.autoresLibro.models import autoresLibro
from apps.autoresPonencia.models import autoresPonencia
from apps.autoresArticulos.models import autoresArticulos
import pandas as pd
from base64 import b64encode
import io
from sklearn.feature_selection import chi2
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import LinearSVC
from sklearn.model_selection import cross_val_score
from sklearn.svm import LinearSVC
from sklearn import svm
import itertools
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import confusion_matrix
from sklearn import metrics
import seaborn as sns


def getValue(request, id):
    if request.is_ajax:
        #search=request.POST.get('start','')
        ids = id.replace('txtsvm00', '')
        print(ids)
        txt = textmining.objects.get(id=ids)
        print(txt.tipo)
        if txt.tipo == 1:
            art = articulos_cientificos.objects.filter(textMining_id = ids).first()
            aut = autoresArticulos.objects.filter(articulo = art).order_by('id').first()
            tipo = 'Artículo científico'
            titulo = art.titulo
            resumen = art.resumen
            
            if art.palabraClave.all().count() > 0:
                key = ", ".join([i.Termino.strip().capitalize() for i in art.palabraClave.all()]).strip()
            else:
                key = ''
            if art.documento:
                doc = art.documento.url
            else:
                doc = '#'
            
        if txt.tipo == 2:
            pon = ponencia.objects.filter(textMining_id = ids).first()
            aut = autoresPonencia.objects.filter(ponencia = pon).order_by('id').first()
            tipo = 'Ponencia'
            titulo = pon.tituloPonencia
            resumen = pon.resumen
            if pon.palabrasClave.all().count() > 0:
                key = ", ".join([i.Termino.strip().capitalize() for i in pon.palabrasClave.all()]).strip()
            else: 
                key = ''
            if pon.urlPonencia:
                doc = pon.urlPonencia
            else:
                doc = '#'
            
            
        if txt.tipo == 3:
            book = libro.objects.filter(textMining_id = ids).first()
            aut = autoresLibro.objects.filter(libro = book).order_by('id').first()
            tipo = 'Libro'
            titulo = book.Titulo
            resumen = book.Resumen
            if book.PalabrasClave.all().count() > 0:
                key = ", ".join([i.Termino.strip().capitalize() for i in book.PalabrasClave.all()])
            else:
                key = ''    

            if book.Documento:
                doc = book.Documento.url
            else:
                doc = '#'
            
    else:
        data_json='fail'

    data_json=json.dumps({'x1': tipo, 'x2': titulo, 'x3': resumen, 'x4': doc, 'x5':0, 'x6': key, 'x7': aut.user.first_name + ' ' + aut.user.last_name + ' <br> ' + aut.user.email})

    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

def normalizacion(cadena):
    s = ''.join((c for c in unicodedata.normalize('NFD', cadena) if unicodedata.category(c) != 'Mn'))
    return s.lower()

def procesar(x):
    nlp = spacy.load('es')
    x1 = normalizacion(x)
    x2 = re.findall(r'\w+', x1, flags = re.UNICODE)
    x3=[]
    for word in x2:
        if word not in stopwords.words('spanish'):
            x3.append(word)
    x4 = set(x3)
    p = nltk.PorterStemmer()
    return ", ".join(set([p.stem(word) for word in [token.orth_ for token in nlp(" ".join(x4)) if token.pos_ == 'ADJ' or token.pos_ == 'NOUN']]))

def procesarEn(x):
    nlp = spacy.load('en')
    x1 = normalizacion(x)
    x2 = re.findall(r'\w+', x1, flags = re.UNICODE)
    x3=[]
    for word in x2:
        if word not in stopwords.words('english'):
            x3.append(word)
    x4 = set(x3)
    p = nltk.PorterStemmer()
    return ", ".join(set([p.stem(word) for word in [token.orth_ for token in nlp(" ".join(x4)) if token.pos_ == 'ADJ' or token.pos_ == 'NOUN']]))

def procesarClass(x):
    nlp = spacy.load('es')
    x1 = normalizacion(x)
    x5 = re.sub(r'\d+', '', x1)
    x2 = re.findall(r'\w+', x5, flags = re.UNICODE)
    x3=[]
    for word in x2:
        if word not in stopwords.words('spanish'):
            x3.append(word)
    return " ".join( [ word for word in [token.orth_ for token in nlp(" ".join(x3)) if token.pos_ == 'ADJ' or token.pos_ == 'NOUN' ] ] )

def procesarClassEn(x):
    nlp = spacy.load('en')
    x1 = normalizacion(x)

    x5 = re.sub(r'\d+', '', x1)
    x2 = re.findall(r'\w+', x5, flags = re.UNICODE)

    x3=[]
    for word in x2:
        if word not in stopwords.words('english'):
            x3.append(word)
    x4 = set(x3)

    return " ".join([word for word in [token.orth_ for token in nlp(" ".join(x4)) if token.pos_ == 'ADJ' or token.pos_ == 'NOUN']])

def copiarData(request):

    for articulo in articulos_cientificos.objects.all().order_by('id'):
        if articulo.SubLinea_id != None:
            articulo.textMining.sublineaClasificacion_id = articulo.SubLinea_id
            articulo.textMining.status = True
            articulo.textMining.statusClasificacion = False
            articulo.textMining.save()
        
        else:
            if articulo.textMining.status == True:
                articulo.textMining.sublineaClasificacion_id = None
                articulo.textMining.status = False
                articulo.textMining.statusClasificacion = False
                articulo.textMining.save()


    for articulo in articulos_cientificos.objects.filter(statusText = False).order_by('id'):

        k = []
        for key in articulo.palabraClave.all():
            k.append(key.Termino)

        keywords = ", ".join(k)
        titulo = articulo.titulo
        resumen = articulo.resumen

        if articulo.idioma == 1:
            txt = procesar(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()
            txt2 = procesarClass(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()

        if articulo.idioma == 2:
            txt = procesarEn(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()
            txt2 = procesarClassEn(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()

        if articulo.textMining == None:
            txt_min = textmining.objects.create(
                texto = txt2,
                textoAtributo = txt,
                tipo = 1,
            )
            articulo.textMining = txt_min
            articulo.statusText = True
            articulo.save()
        else:
            articulo.textMining.texto = txt2
            articulo.textMining.textoAtributo = txt
            articulo.textMining.tipo = 1
            articulo.textMining.save()
            articulo.statusText = True
            articulo.save()

    for pon in ponencia.objects.filter(statusText = False).order_by('id'):
        k = []
        for key in pon.palabrasClave.all():
            k.append(key.Termino)
        titulo = str(pon.tituloPonencia)
        resumen = str(pon.resumen)
        keywords = str(", ".join(k))
        txt = procesar(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()
        txt2 = procesarClass(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()

        if pon.textMining == None:
            txt_min = textmining.objects.create(
                texto = txt2,
                textoAtributo = txt,
                tipo = 2,
            )
            pon.textMining = txt_min
            pon.statusText = True
            pon.save()
        else:
            pon.textMining.texto = txt2
            pon.textMining.textoAtributo = txt
            pon.textMining.tipo = 2
            pon.textMining.save()
            pon.statusText = True
            pon.save()

    for book in libro.objects.filter(statusText = False).order_by('id'):
        titulo = str(book.Titulo)
        resumen = str(book.Resumen)
        k = []
        for key in book.PalabrasClave.all():
            k.append(key.Termino)
        keywords = str(", ".join(k))
        
        txt = procesar(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()
        txt2 = procesarClass(str(titulo) + ' ' + str(resumen) + ' ' + str(keywords)).strip()
        if book.textMining == None:
            txt_min = textmining.objects.create(
                texto = txt2,
                textoAtributo = txt,
                tipo = 3,
            )
            
            book.statusText = True
            book.textMining = txt_min
            book.save()
        else:
            book.textMining.texto = txt2
            book.textMining.textoAtributo = txt
            book.textMining.tipo = 3
            book.textMining.save()
            book.statusText = True
            book.save()

    for formacion in formacion_academica.objects.filter(statusText = False).order_by('id'):

        if formacion.textMining == None:
            txt_min = textmining.objects.create(
                texto = procesarClass(str(formacion.titulo)).strip(),
                textoAtributo = procesar(str(formacion.titulo)).strip(),
                tipo = 4,
            )
            formacion.statusText = True
            formacion.textMining = txt_min
            formacion.save()
        else:
            formacion.textMining.texto = procesarClass(str(formacion.titulo)).strip()
            formacion.textMining.textoAtributo = procesar(str(formacion.titulo)).strip()
            formacion.textMining.tipo = 4
            formacion.textMining.save()
            formacion.statusText = True
            formacion.save()

    return HttpResponseRedirect('/index/')
    
def getName(x):
    #print(x)
    if articulos_cientificos.objects.filter(textMining = x).first():
        art = articulos_cientificos.objects.filter(textMining = int(x)).first()
        return str(art.titulo).capitalize()
    elif ponencia.objects.filter(textMining = x).first():
        art = ponencia.objects.filter(textMining = int(x)).first()
        return str(art.tituloPonencia).capitalize()
    elif libro.objects.filter(textMining = x).first():
        art = libro.objects.filter(textMining = int(x)).first()
        return str(art.Titulo).capitalize()
    elif formacion_academica.objects.filter(textMining = x).first():
        art = formacion_academica.objects.filter(textMining = int(x)).first()
        return str(art.titulo)
    else:
        return 'No se encontraron resultados'

def clasificacionList(request):

    results={
        'name':'Líneas de investigación',
        'type':'tittle',
        'id': 0,
        'font': '30px',
        'size': 500,
        'children': [ 
            {
                'name': i.Nombre.capitalize(), 
                'type':'linea',
                'font': '24px',
                'id': 0,
                'size': 500,
                'children': [
                    {
                        'name': f.Nombre.capitalize(),
                        'type':'sublinea',
                        'font': '18px',
                        'id': 0,
                        'size': 500,
                        'children': [
                            {

                                'name': 'Artículos Científicos',
                                'id': 0,
                                'type':'linea',
                                'font': '12px',
                                'size': 500,
                                'children': [
                                    {
                                        'name': getName( t.id ).capitalize(),
                                        'id': f'txtsvm00{t.id}',
                                        'type':'documento',
                                        'font': '12px',
                                        'size': 500,
                                    } for t in textmining.objects.filter(sublineaClasificacion = f.id, tipo = 1).order_by('texto') if autoresArticulos.objects.filter(articulo__textMining = t.id).order_by('id').count() > 0
                                ]
                            },
                            {

                                'name': 'Libros',
                                'id': 0,
                                'type':'linea',
                                'font': '12px',
                                'size': 500,
                                'children': [
                                    {
                                        'name': getName( t.id ).capitalize(),
                                        'id': f'txtsvm00{t.id}',
                                        'type':'documento',
                                        'font': '12px',
                                        'size': 500,
                                    } for t in textmining.objects.filter(sublineaClasificacion = f.id, tipo = 3).order_by('texto') if autoresLibro.objects.filter(libro__textMining = t.id).order_by('id').count() > 0
                                ]
                            },
                            {

                                'name': 'Ponencias',
                                'id': 0,
                                'type':'linea',
                                'font': '12px',
                                'size': 500,
                                'children': [
                                    {
                                        'name': getName( t.id ).capitalize(),
                                        'id': f'txtsvm00{t.id}',
                                        'type':'documento',
                                        'font': '12px',
                                        'size': 500,
                                    } for t in textmining.objects.filter(sublineaClasificacion = f.id, tipo = 2).order_by('texto') if autoresPonencia.objects.filter(ponencia__textMining = t.id).order_by('id').count() > 0
                                ]
                            }
                        ]

                    } for f in sub_lin_investigacion.objects.filter(linea_investigacion_id = i.id ).order_by('Nombre')
                ]
            
            } for i in linea_investigacion.objects.all().order_by('Nombre')
        
        ]

    }

    data_json=json.dumps(results)

    mimetype="application/json"
    return HttpResponse(data_json,mimetype)

def clasificacion(request):
    for i in textmining.objects.filter(status = False):
        i.sublineaClasificacion = None
        i.statusClasificacion = False
        i.save()

    from sklearn.metrics import accuracy_score
    m1 = []
    m2 = []
    m3 = []

    idby = set([i.sublineaClasificacion_id for i in textmining.objects.filter(status = True).order_by('sublineaClasificacion_id')])
    o = 0
    for i in idby:
        for i in textmining.objects.filter(status = True, sublineaClasificacion_id = i):
            if i.sublineaClasificacion_id != None:
                m1.append(str(i.texto))
                m2.append(int(i.sublineaClasificacion_id))
                m3.append( normalizacion((str(i.sublineaClasificacion.Nombre))))


    df = pd.DataFrame(
        {
            'sentence': m1,
            'sublineaID': m2,
            'categoria': m3,
        }
    )

    print(df.head())
    print(len(df))
    labels = df.sublineaID

    tfidf = TfidfVectorizer(sublinear_tf = True, min_df = 3, norm='l2', encoding='latin-1', ngram_range=(1, 10), stop_words='english')
    
    features = tfidf.fit_transform(df.sentence).toarray()
    """
    models = [
        RandomForestClassifier(n_estimators=200, max_depth=3, random_state=0),
        LinearSVC(),
        MultinomialNB(),
        LogisticRegression(random_state=0),
    ]
    CV = 5
    cv_df = pd.DataFrame(index=range(CV * len(models)))
    entries = []
    for model in models:
        model_name = model.__class__.__name__
        accuracies = cross_val_score(model, features, labels, scoring='accuracy', cv=CV)
        for fold_idx, accuracy in enumerate(accuracies):
            entries.append((model_name, fold_idx, accuracy))
    cv_df = pd.DataFrame(entries, columns=['model_name', 'fold_idx', 'accuracy'])
    print(cv_df.groupby('model_name').accuracy.mean())
    """
    model = LinearSVC()

    X_train, X_test, y_train, y_test, indices_train, indices_test = train_test_split(features, labels, df.index, test_size=0.33, random_state=0)

    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    from sklearn import metrics

    #print(metrics.classification_report(y_test, y_pred, target_names = df['categoria'].unique()))
    
    for i in textmining.objects.filter(status = False).order_by('id'):
        #txt_data = textmining.objects.get(id = i['id'])
        #print( f'#texto: {i.texto[:150]}')
        #if i.sublineaClasificacion != None:
        #    print(f'$Sub {i.sublineaClasificacion.Nombre}')
        X_test = tfidf.transform([i.texto])
        #print(model.predict(X_test))
        #predictions = model.predict(X_test)
        
        #for input, prediction, label in zip(X_test, predictions, labels):
        #    if prediction != label:
        #        print('has been classified as ', prediction, 'and should be ', label) 
       
        i.statusClasificacion = True
        i.sublineaClasificacion_id = model.predict(X_test)[0]
        i.save()

    return HttpResponseRedirect('/index/')


from sklearn.metrics import accuracy_score

def clasificacionSimple(request):
   

    m1 = []
    m2 = []
    m3 = []

    for i in textmining.objects.filter(status = True).order_by('id'):
        if i.sublineaClasificacion_id != None:
            m1.append(str(i.texto))
            m2.append(int(i.sublineaClasificacion_id))
            m3.append( normalizacion((str(i.sublineaClasificacion.Nombre))))
    for i in textmining.objects.filter(statusClasificacion = True):
        m1.append(str(i.texto))
        m2.append(int(i.sublineaClasificacion_id))
        m3.append( normalizacion((str(i.sublineaClasificacion.Nombre))))

    df = pd.DataFrame(
        {
            'sentence': m1,
            'sublineaID': m2,
            'categoria': m3,
        }
    )
    labels = df.sublineaID

    tfidf = TfidfVectorizer(sublinear_tf = True, min_df = 5, norm='l2', encoding='latin-1', ngram_range=(1, 10), stop_words='english')
    
    features = tfidf.fit_transform(df.sentence).toarray()
    """
    models = [
        RandomForestClassifier(n_estimators=200, max_depth=3, random_state=0),
        LinearSVC(),
        MultinomialNB(),
        LogisticRegression(random_state=0),
    ]

    CV = 5
    cv_df = pd.DataFrame(index=range(CV * len(models)))
    entries = []
    for model in models:
        model_name = model.__class__.__name__
        accuracies = cross_val_score(model, features, labels, scoring='accuracy', cv=CV)
        for fold_idx, accuracy in enumerate(accuracies):
            entries.append((model_name, fold_idx, accuracy))
    cv_df = pd.DataFrame(entries, columns=['model_name', 'fold_idx', 'accuracy'])
    print(cv_df.groupby('model_name').accuracy.mean())
    """
    model = LinearSVC()

    X_train, X_test, y_train, y_test, indices_train, indices_test = train_test_split(features, labels, df.index, test_size=0.33, random_state=0)

    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    from sklearn import metrics

    #print(metrics.classification_report(y_test, y_pred, target_names = df['categoria'].unique()))
    
    for i in textmining.objects.exclude(sublineaClasificacion__isnull = False):
        #txt_data = textmining.objects.get(id = i['id'])
        #print( f'#texto: {i.texto[:150]}')
        #if i.sublineaClasificacion != None:
        #    print(f'$Sub {i.sublineaClasificacion.Nombre}')
        X_test = tfidf.transform([i.texto])
        #print(model.predict(X_test))
        #predictions = model.predict(X_test)
        
        #for input, prediction, label in zip(X_test, predictions, labels):
        #    if prediction != label:
        #        print('has been classified as ', prediction, 'and should be ', label) 
        i.statusClasificacion = True
        i.sublineaClasificacion_id = model.predict(X_test)[0]
        i.save()

    return HttpResponseRedirect('/index/')