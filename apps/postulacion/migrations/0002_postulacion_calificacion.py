# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2020-02-04 23:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postulacion', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='postulacion',
            name='calificacion',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
