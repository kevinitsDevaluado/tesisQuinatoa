# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-01-04 20:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0018_articulos_cientificos_editabletruefalse'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulos_cientificos',
            name='comentarioSecretaria',
            field=models.TextField(blank=True, null=True),
        ),
    ]
