# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-02-11 22:33
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Ponencia', '0013_ponencia_filialutc'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ponencia',
            name='filialUtc',
        ),
    ]
