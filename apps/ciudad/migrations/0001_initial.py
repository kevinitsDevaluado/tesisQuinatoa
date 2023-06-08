# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('provincia', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ciudad',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Nombre', models.CharField(max_length=155)),
                ('provincia', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='provincia.provincia')),
            ],
            options={
                'permissions': (('ver_ciudad', 'ver ciudad'),),
            },
        ),
    ]
