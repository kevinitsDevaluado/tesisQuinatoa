# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-11-06 08:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Revista', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='revista',
            options={'ordering': ('Nombre',), 'permissions': (('ver_Revista', 'ver Revista'),)},
        ),
    ]
