# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0015_auto_20180909_0016'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulos_cientificos',
            name='AMresumen',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='articulos_cientificos',
            name='AMtitulo',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
