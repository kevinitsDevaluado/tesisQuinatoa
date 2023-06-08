# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2018-07-03 21:27
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Libro', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='autoresLibro',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gradoAutoria', models.CharField(blank=True, max_length=150, null=True)),
                ('capituloSel', models.BooleanField()),
                ('capituloNumero', models.CharField(blank=True, max_length=200, null=True)),
                ('capituloTitulo', models.CharField(blank=True, max_length=300, null=True)),
                ('libro', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='Libro.libro')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'permissions': (('ver_autores', 'ver autores'),),
            },
        ),
    ]
