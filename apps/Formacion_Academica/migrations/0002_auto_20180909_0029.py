# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Formacion_Academica', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='formacion_academica',
            name='FAMdescripcion',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='formacion_academica',
            name='FAMtipoTitulo',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='formacion_academica',
            name='FAMtitulo',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
