# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0014_auto_20180909_0015'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='articulos_cientificos',
            name='AMresumen',
        ),
        migrations.RemoveField(
            model_name='articulos_cientificos',
            name='AMtitulo',
        ),
    ]
