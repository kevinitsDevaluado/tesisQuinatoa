# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Libro', '0004_auto_20180909_0027'),
    ]

    operations = [
        migrations.AddField(
            model_name='libro',
            name='LMresumen',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='libro',
            name='LMtitulo',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
