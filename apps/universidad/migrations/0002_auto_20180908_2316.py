# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 04:16
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('universidad', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='universidad',
            options={'ordering': ['Nombre'], 'permissions': (('ver_Universidad', 'ver Universidad'),)},
        ),
    ]
