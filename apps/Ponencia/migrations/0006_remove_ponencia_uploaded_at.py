# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 04:57
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Ponencia', '0005_ponencia_uploaded_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ponencia',
            name='uploaded_at',
        ),
    ]
