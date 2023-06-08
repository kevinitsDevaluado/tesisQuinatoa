# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-02-11 22:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0019_articulos_cientificos_comentariosecretaria'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulos_cientificos',
            name='filialUtc',
            field=models.CharField(blank=True, choices=[('Si', 'Si'), ('No', 'No')], max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='articulos_cientificos',
            name='tituloSearch',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
