# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-09-09 05:10
from __future__ import unicode_literals

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('Ponencia', '0006_remove_ponencia_uploaded_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='ponencia',
            name='uploaded_at',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2018, 9, 9, 5, 10, 5, 328140, tzinfo=utc)),
            preserve_default=False,
        ),
    ]