# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('facultad', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='carrera',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nombre', models.CharField(max_length=350)),
                ('Director', models.CharField(max_length=250)),
                ('facultad', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='facultad.facultad')),
            ],
            options={
                'permissions': (('ver_carrera', 'ver carrera'),),
            },
        ),
    ]
