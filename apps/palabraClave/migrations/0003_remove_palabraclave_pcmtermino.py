# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:29
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('palabraClave', '0002_palabraclave_pcmtermino'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='palabraclave',
            name='PCMtermino',
        ),
    ]
