# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('campus', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='facultad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nombre', models.CharField(max_length=250)),
                ('Decano', models.CharField(max_length=250)),
                ('campus', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='campus.campus')),
            ],
            options={
                'permissions': (('ver_facultad', 'ver facultad'),),
            },
        ),
    ]
