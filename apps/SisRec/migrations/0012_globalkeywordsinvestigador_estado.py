# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-12-11 17:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('SisRec', '0011_auto_20191209_1313'),
    ]

    operations = [
        migrations.AddField(
            model_name='globalkeywordsinvestigador',
            name='estado',
            field=models.BooleanField(default=0),
            preserve_default=False,
        ),
    ]
