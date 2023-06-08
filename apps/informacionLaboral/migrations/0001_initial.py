# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('carrera', '0001_initial'),
        ('facultad', '0001_initial'),
        ('universidad', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='informacionLaboral',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tipoContrato', models.CharField(blank=True, choices=[('Servicios Ocasionales', 'Servicios Ocasionales'), ('Nombramiento Titular Auxiliar 1', 'Nombramiento Titular Auxiliar 1'), ('Nombramiento Titular Auxiliar 2', 'Nombramiento Titular Auxiliar 2'), ('Nombramiento Titular Agregado 1', 'Nombramiento Titular Agregado 1'), ('Nombramiento Titular Agregado 2', 'Nombramiento Titular Agregado 2'), ('Nombramiento Principal 1', 'Nombramiento Principal 1'), ('Nombramiento Principal 2', 'Nombramiento Principal 2')], max_length=500, null=True)),
                ('carrera', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='carrera.carrera')),
                ('facultad', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='facultad.facultad')),
                ('university', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='universidad.universidad')),
            ],
            options={
                'permissions': (('ver_pais', 'ver pais'),),
            },
        ),
    ]
