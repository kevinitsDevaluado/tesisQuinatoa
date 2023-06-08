# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-10-29 17:22
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('carrera', '0002_auto_20181001_0436'),
        ('Investigador', '0002_auto_20180703_1627'),
        ('baseDatos', '0003_basedatos_estado'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdminGrupo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Colaboradores',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idColaborador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Colaborador', to='Investigador.Investigador')),
                ('idInvestigador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Investigador', to='Investigador.Investigador')),
            ],
        ),
        migrations.CreateModel(
            name='Estadisticas',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('like', models.IntegerField()),
                ('disLike', models.IntegerField()),
                ('nLecturas', models.IntegerField()),
                ('nCitas', models.IntegerField()),
                ('nDescargas', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='GlobalKeywords',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('termino', models.CharField(max_length=50)),
                ('carrera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='carrera.carrera')),
            ],
        ),
        migrations.CreateModel(
            name='GlobalKeywordsInvestigador',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('globalKeywors', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SisRec.GlobalKeywords')),
                ('investigador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Investigador.Investigador')),
            ],
        ),
        migrations.CreateModel(
            name='Grupos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=50)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='foto/')),
                ('categoria', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Mensaje',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('hora', models.TimeField()),
                ('leido', models.BooleanField()),
                ('mensaje', models.CharField(max_length=255)),
                ('idEmisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Origen', to='Investigador.Investigador')),
                ('idReceptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Destino', to='Investigador.Investigador')),
            ],
        ),
        migrations.CreateModel(
            name='MiembroGrupo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grupos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SisRec.Grupos')),
                ('investigador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Investigador.Investigador')),
            ],
        ),
        migrations.CreateModel(
            name='Publicacion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha', models.DateField()),
                ('hora', models.TimeField()),
                ('tema', models.CharField(max_length=50)),
                ('tipo', models.CharField(max_length=30)),
                ('texto', models.CharField(max_length=255)),
                ('basedatos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='baseDatos.baseDatos')),
                ('investigador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Investigador.Investigador')),
            ],
        ),
        migrations.CreateModel(
            name='recomendacionArticulo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idRecomendado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Recomendado', to='Investigador.Investigador')),
                ('idRecomendador', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recomendador', to='Investigador.Investigador')),
                ('publicacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SisRec.Publicacion')),
            ],
        ),
        migrations.CreateModel(
            name='SolicitudColaboracion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idEmisor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Emisor', to='Investigador.Investigador')),
                ('idReceptor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Destinatario', to='Investigador.Investigador')),
            ],
        ),
        migrations.AddField(
            model_name='estadisticas',
            name='publicacion',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SisRec.Publicacion'),
        ),
        migrations.AddField(
            model_name='admingrupo',
            name='grupos',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='SisRec.Grupos'),
        ),
        migrations.AddField(
            model_name='admingrupo',
            name='investigador',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Investigador.Investigador'),
        ),
    ]