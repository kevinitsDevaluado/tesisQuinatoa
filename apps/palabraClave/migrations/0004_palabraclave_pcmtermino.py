# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('palabraClave', '0003_remove_palabraclave_pcmtermino'),
    ]

    operations = [
        migrations.AddField(
            model_name='palabraclave',
            name='PCMtermino',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]