# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-02-15 03:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('baseDatos', '0002_auto_20181106_0322'),
    ]

    operations = [
        migrations.AddField(
            model_name='basedatos',
            name='estado',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
