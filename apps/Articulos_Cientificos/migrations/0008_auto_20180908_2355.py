# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 04:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0007_articulos_cientificos_uploaded_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulos_cientificos',
            name='AMresumen',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='articulos_cientificos',
            name='AMtitulo',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
