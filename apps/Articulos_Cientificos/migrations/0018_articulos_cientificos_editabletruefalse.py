# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-12-21 22:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Articulos_Cientificos', '0017_auto_20181106_0322'),
    ]

    operations = [
        migrations.AddField(
            model_name='articulos_cientificos',
            name='editableTrueFalse',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]