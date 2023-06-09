# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('palabraClave', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('autoresArticulos', '0001_initial'),
        ('Articulos_Cientificos', '0001_initial'),
        ('universidad', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ponencia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombrePonencia', models.CharField(blank=True, max_length=500, null=True)),
                ('lugarPonencia', models.CharField(blank=True, max_length=500, null=True)),
                ('tituloPonencia', models.CharField(blank=True, max_length=500, null=True)),
                ('fechaPonencia', models.DateField(blank=True, null=True)),
                ('anio', models.IntegerField(blank=True, null=True)),
                ('resumen', models.TextField(blank=True, null=True)),
                ('certificado', models.FileField(blank=True, null=True, upload_to='certificados/')),
                ('tipo', models.CharField(blank=True, max_length=100, null=True)),
                ('isbn', models.CharField(blank=True, max_length=300, null=True)),
                ('urlPonencia', models.CharField(blank=True, max_length=500, null=True)),
                ('financiamiento', models.CharField(blank=True, choices=[('Sí', 'Sí'), ('No', 'No')], max_length=20, null=True)),
                ('informe', models.FileField(blank=True, null=True, upload_to='informes/')),
                ('articuloCientifico', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Articulos_Cientificos.articulos_cientificos')),
                ('autores', models.ManyToManyField(to='autoresArticulos.autoresArticulos')),
                ('financia', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='universidad.universidad')),
                ('palabrasClave', models.ManyToManyField(blank=True, to='palabraClave.palabraClave')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
