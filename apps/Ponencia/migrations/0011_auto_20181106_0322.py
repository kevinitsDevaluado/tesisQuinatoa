# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-11-06 08:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Ponencia', '0010_auto_20180909_0034'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ponencia',
            options={'ordering': ('fechaPonencia',)},
        ),
    ]
