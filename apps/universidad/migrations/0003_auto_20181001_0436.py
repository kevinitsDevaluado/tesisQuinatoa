# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-10-01 09:36
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('universidad', '0002_auto_20180908_2316'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='universidad',
            options={'ordering': ('Nombre',), 'permissions': (('ver_Universidad', 'ver Universidad'),)},
        ),
    ]
