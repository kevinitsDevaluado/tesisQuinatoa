$(document).ready(function(){
	$('#zona').on('change',universidad);
	$('#universidad').on('change',campus);
	$('#campus').on('change',facultad);
	$('#facultad').on('change',carrera);
	$('#buscar_filtros').on('click',buscar_filtros);
  $('#filtro_x').on('click',verificar);

  function verificar(){
    var op =$(this).val();
    var opz=$('#filtro_z').val();
    if(op==0){
      document.getElementById("area").style.display="none";
      document.getElementById("pastel").style.display="block";
      document.getElementById("dona").style.display="block";
      if(opz==4){
        $("#filtro_z > option[value=1]").prop("selected",true);
      }
    }
    if(op==1){
      document.getElementById("area").style.display="block";
      document.getElementById("pastel").style.display="none";
      document.getElementById("dona").style.display="none";
      if(opz==2 || opz==3){
        $("#filtro_z > option[value=1]").prop("selected",true);
      }
    }
  }
	function universidad(){
		var id =$(this).val();
         $.ajax({
             data:{'datos':id,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
             },
             url:'/grafica/universidad/',
             type: 'POST',
             success: function(data){
               $('#universidad').html('');
             	var html="";
             	var vacio='<option value="0">---------------Todo---------------</option>';
               $.each(data, function(index, item) {
                    html +='<option value="'+item.value+'">'+item.text+'</option>';
               });
               $('#universidad').html(html);
			   $('#campus').html(vacio);
			   $('#facultad').html(vacio);
			   $('#carrera').html(vacio);
             }
         });
	}

	function campus(){
		var id =$(this).val();
         $.ajax({
             data:{'datos':id,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
             },
             url:'/grafica/campus/',
             type: 'POST',
             success: function(data){
               $('#campus').html('');
             	var html="";
             	var vacio='<option value="0">---------------Todo---------------</option>';
               $.each(data, function(index, item) {
                    html +='<option value="'+item.value+'">'+item.text+'</option>';
               });
               $('#campus').html(html);
			   $('#facultad').html(vacio);
			   $('#carrera').html(vacio);
             }
         });
	}

	function facultad(){
		var id =$(this).val();
         $.ajax({
             data:{'datos':id,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
             },
             url:'/grafica/facultad/',
             type: 'POST',
             success: function(data){
               $('#facultad').html('');
             	var html="";
             	var vacio='<option value="0">---------------Todo---------------</option>';
               $.each(data, function(index, item) {
                    html +='<option value="'+item.value+'">'+item.text+'</option>';
               });
               $('#facultad').html(html);
			   $('#carrera').html(vacio);
             }
         });
	}

	function carrera(){
		var id =$(this).val();
         $.ajax({
             data:{'datos':id,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
             },
             url:'/grafica/carrera/',
             type: 'POST',
             success: function(data){
               $('#carrera').html('');
             	var html="";
               $.each(data, function(index, item) {
                    html +='<option value="'+item.value+'">'+item.text+'</option>';
               });
               $('#carrera').html(html);
             }
         });
	}

	function buscar_filtros(){
    var zona=$('#zona').val();
    var universidad=$('#universidad').val();
    var campus=$('#campus').val();
    var facultad=$('#facultad').val();
    var carrera=$('#carrera').val();
    var filtro_y=$('#filtro_y').val();
    var cont=0;
    if(filtro_y==0){
       Command: toastr["error"]("Seleccione un Eje Y", "Alerta")
            toastr.options = {
              "closeButton": true,
              "debug": false,
              "newestOnTop": false,
              "progressBar": false,
              "positionClass": "toast-bottom-full-width",
              "preventDuplicates": false,
              "onclick": null,
              "showDuration": "300",
              "hideDuration": "1000",
              "timeOut": "5000",
              "extendedTimeOut": "1000",
              "showEasing": "swing",
              "hideEasing": "linear",
              "showMethod": "fadeIn",
              "hideMethod": "fadeOut"
            }
    }else{
    $('#ver_int').attr("disabled", false);
    $('#btnDescargar').attr("disabled", false);
    $.getJSON('/static/graficas/similaridad/json/json/estadisticas.json',function(datos){
//////////////////////////////////////////////Articulos////////////////////////////////////////////////
      if(filtro_y==1){
/////////////////////////////////////////////Zona/////////////////////////////////////////////////////
        if(zona==0){
          let uni=[],a=[];
          let date=[];
          $.each(datos.Articulos, function(index, item) {
             uni.push(item.zona);
             var temp={
              a:item.zona_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(datos.Articulos, function(index, j) {
              if(i==j.zona){
                cont+=1;
                tem={
                  x:j.zona_n,
                  y:cont,
                  z:'Todo'
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:datos.Articulos};
          graficar(json,date);
        }
/////////////////////////////////////Universidad////////////////////////////////////////////////////
        if(universidad==0 && zona>0){
          let filtro = datos.Articulos.filter(i => i.zona == zona);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.universidad);
             var temp={
              a:item.universidad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.universidad){
                cont+=1;
                tem={
                  x:j.universidad_n,
                  y:cont,
                  z:'Zona '+j.zona_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
//////////////////////////////////Campus//////////////////////////////////////////////////////////////
        if(campus==0 && universidad>0){
          let filtro = datos.Articulos.filter(i => i.universidad == universidad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.campus);
             var temp={
              a:item.campus_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.campus){
                cont+=1;
                tem={
                  x:j.campus_n,
                  y:cont,
                  z:j.universidad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
////////////////////////////////////////Facultad//////////////////////////////////////////////////////////////
        if(facultad==0 && campus>0){
          let filtro = datos.Articulos.filter(i => i.campus == campus);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.facultad);
             var temp={
              a:item.facultad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.facultad){
                cont+=1;
                tem={
                  x:j.facultad_n,
                  y:cont,
                  z:j.campus_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
/////////////////////////////////////////////Carrera//////////////////////////////////////////////////////
        if(carrera==0 && facultad>0){
          let filtro = datos.Articulos.filter(i => i.facultad == facultad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
        if(carrera>0){
          let filtro = datos.Articulos.filter(i => i.carrera == carrera);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }  
      }
/////////////////////////////////////////////////Libros//////////////////////////////////////////
      if(filtro_y==2){
////////////////////////////////////////////Zona///////////////////////////////////////////////
        if(zona==0){
          let uni=[],a=[];
          let date=[];
          $.each(datos.Libros, function(index, item) {
             uni.push(item.zona);
             var temp={
              a:item.zona_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(datos.Libros, function(index, j) {
              if(i==j.zona){
                cont+=1;
                tem={
                  x:j.zona_n,
                  y:cont,
                  z:'Todo'
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:datos.Libros};
          graficar(json,date);
        }
////////////////////////////////////////Universidad//////////////////////////////////////////////////////////
        if(universidad==0 && zona>0){
          let filtro = datos.Libros.filter(i => i.zona == zona);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.universidad);
             var temp={
              a:item.universidad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.universidad){
                cont+=1;
                tem={
                  x:j.universidad_n,
                  y:cont,
                  z:'Zona '+j.zona_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
/////////////////////////////////////////Campus////////////////////////////////////////////////////
        if(campus==0 && universidad>0){
          let filtro = datos.Libros.filter(i => i.universidad == universidad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.campus);
             var temp={
              a:item.campus_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.campus){
                cont+=1;
                tem={
                  x:j.campus_n,
                  y:cont,
                  z:j.universidad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
//////////////////////////////////////Facultad///////////////////////////////////////////////
        if(facultad==0 && campus>0){
          let filtro = datos.Libros.filter(i => i.campus == campus);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.facultad);
             var temp={
              a:item.facultad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.facultad){
                cont+=1;
                tem={
                  x:j.facultad_n,
                  y:cont,
                  z:j.campus_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
///////////////////////////////////////Carrera///////////////////////////////////////////////////////
        if(carrera==0 && facultad>0){
          let filtro = datos.Libros.filter(i => i.facultad == facultad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
        if(carrera>0){
          let filtro = datos.Libros.filter(i => i.carrera == carrera);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        } 
      }
//////////////////////////////////////////////////////Capitulos/////////////////////////////////////
      if(filtro_y==3){
//////////////////////////////Zona/////////////////////////////////////////////////////////////
        if(zona==0){
          let uni=[],a=[];
          let date=[];
          $.each(datos.Capitulos, function(index, item) {
             uni.push(item.zona);
             var temp={
              a:item.zona_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(datos.Capitulos, function(index, j) {
              if(i==j.zona){
                cont+=1;
                tem={
                  x:j.zona_n,
                  y:cont,
                  z:'Todo'
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:datos.Capitulos};
          graficar(json,date);
        }
////////////////////////////////////Universidad////////////////////////////////////////////////
        if(universidad==0 && zona>0){
          let filtro = datos.Capitulos.filter(i => i.zona == zona);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.universidad);
             var temp={
              a:item.universidad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.universidad){
                cont+=1;
                tem={
                  x:j.universidad_n,
                  y:cont,
                  z:'Zona '+j.zona_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
/////////////////////////////////////Campus///////////////////////////////////////////////////////////
        if(campus==0 && universidad>0){
          let filtro = datos.Capitulos.filter(i => i.universidad == universidad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.campus);
             var temp={
              a:item.campus_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.campus){
                cont+=1;
                tem={
                  x:j.campus_n,
                  y:cont,
                  z:j.universidad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
////////////////////////////////////Facultad///////////////////////////////////////////////////////
        if(facultad==0 && campus>0){
          let filtro = datos.Capitulos.filter(i => i.campus == campus);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.facultad);
             var temp={
              a:item.facultad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.facultad){
                cont+=1;
                tem={
                  x:j.facultad_n,
                  y:cont,
                  z:j.campus_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
////////////////////////////////////Carrera/////////////////////////////////////////////////////////
        if(carrera==0 && facultad>0){
          let filtro = datos.Capitulos.filter(i => i.facultad == facultad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
        if(carrera>0){
          let filtro = datos.Capitulos.filter(i => i.carrera == carrera);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        } 
      }
//////////////////////////////////////////Ponencias//////////////////////////////////////
      if(filtro_y==4){
/////////////////////////////////////////Zona//////////////////////////////////////////
        if(zona==0){
          let uni=[],a=[];
          let date=[];
          $.each(datos.Ponencias, function(index, item) {
             uni.push(item.zona);
             var temp={
              a:item.zona_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(datos.Ponencias, function(index, j) {
              if(i==j.zona){
                cont+=1;
                tem={
                  x:j.zona_n,
                  y:cont,
                  z:'Todo'
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:datos.Ponencias};
          graficar(json,date);
        }
/////////////////////////////////Universidad////////////////////////////////////////////////////////
        if(universidad==0 && zona>0){
          let filtro = datos.Ponencias.filter(i => i.zona == zona);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.universidad);
             var temp={
              a:item.universidad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.universidad){
                cont+=1;
                tem={
                  x:j.universidad_n,
                  y:cont,
                  z:'Zona '+j.zona_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
////////////////////////////////////Campus//////////////////////////////////////////
        if(campus==0 && universidad>0){
          let filtro = datos.Ponencias.filter(i => i.universidad == universidad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.campus);
             var temp={
              a:item.campus_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.campus){
                cont+=1;
                tem={
                  x:j.campus_n,
                  y:cont,
                  z:j.universidad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
///////////////////////////////Facultad//////////////////////////////////////////////////////////////
        if(facultad==0 && campus>0){
          let filtro = datos.Ponencias.filter(i => i.campus == campus);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.facultad);
             var temp={
              a:item.facultad_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.facultad){
                cont+=1;
                tem={
                  x:j.facultad_n,
                  y:cont,
                  z:j.campus_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
///////////////////////////////Carrera///////////////////////////////////////////////
        if(carrera==0 && facultad>0){
          let filtro = datos.Ponencias.filter(i => i.facultad == facultad);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        }
        if(carrera>0){
          let filtro = datos.Ponencias.filter(i => i.carrera == carrera);
          let uni=[],a=[];
          let date=[];
          $.each(filtro, function(index, item) {
             uni.push(item.carrera);
             var temp={
              a:item.carrera_n,
              b:item.anio
             };
             date.push(temp);
          });
          let uni_sin = uni.filter((valor, indiceActual , arreglo) => arreglo.indexOf(valor) === indiceActual);
          $.each(uni_sin, function(index, i) {
            var cont=0;
            var tem={};
            $.each(filtro, function(index, j) {
              if(i==j.carrera){
                cont+=1;
                tem={
                  x:j.carrera_n,
                  y:cont,
                  z:j.facultad_n
                };
              }
            });
            a.push(tem);
          });
          json={a:a,b:filtro};
          graficar(json,date);
        } 
      }

    });
    }  
	}
////////////////////////////////////////////////Graficar/////////////////////////////////////////////
  function graficar(infor,date){
               var op=$('#filtro_y').val();
               var opx=$('#filtro_x').val();
               $('#myfirstchart').html('');
               $('#modal-inf').html('');
               var datos=[];
               var pastel=[];
               var cont=0;
               var total=0;
               var fecha=['x'];
               if(opx==0){
                   $.each(infor.a, function(index, item) {
                        if(cont==0){
                          var inf=[];
                          inf.push('x',item.z);
                          datos.push(inf);
                          inf=[];
                          inf.push(item.x,item.y);
                          datos.push(inf);
                          pastel.push(inf);
                          cont=1;
                        }else{
                          inf=[];
                          inf.push(item.x,item.y);
                          datos.push(inf);
                          pastel.push(inf);
                        }
                        total=total+item.y;
                   });
               }else{
                  $.each(infor.b, function(index, item) {
                        if(fecha.length!=0){
                        var yo=0;  
                        for(var i=0;i<fecha.length; i++){
                          if(fecha[i]==item.anio){
                            yo=yo+1;
                          }
                        }
                        if(yo==0){
                          fecha.push(item.anio);
                        }
                        }else{
                          fecha.push(item.anio);
                        }
                  });
                  fecha.sort((a,b)=> a-b);
                  datos.push(fecha);
                  $.each(infor.a, function(index, a) {
                    var temp=[a.x];
                    for(var i=0;i<fecha.length; i++){
                      var result=0;
                      $.each(date, function(index, b) {
                        if(a.x==b.a && fecha[i]==b.b){
                          result=result+1;
                        }
                      });
                      if(i>0){
                      temp.push(result);
                      }
                    }
                    datos.push(temp);
                    total=total+a.y;
                  });
               }
          
               if(op==1){
                $("#num-infor").html(" Artículos Científicos : "+total);
                $(".modal-title").html(" Artículos Científicos");
                var heard='';
                var num=0;
                heard+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;" id="table-int">';
                heard+='<thead style="text-align: center;font-size: 12px;">';
                heard+='<tr>';
                heard+='<td style="background: #01568f;color: white;">#</td>';
                heard+='<td style="background: #01568f;color: white;">Título</td>';
                heard+='<td style="background: #01568f;color: white;">Fecha</td>';
                heard+='<td style="background: #01568f;color: white;">Autores</td>';
                heard+='<td style="background: #01568f;color: white;">Cédula</td>';
                heard+='<td style="background: #01568f;color: white;">Revista</td>';
                heard+='<td style="background: #01568f;color: white;">Url</td>';
                heard+='<td style="background: #01568f;color: white;">Pdf</td>';
                heard+='</tr>';
                heard+='</thead>';
                heard+='<tbody style="text-align: center;">';
                var body='';
                $.each(infor.b, function(index, item) {
                  num=num+1;
                  var ul='<ul style="text-transform: uppercase;font-size: 9px;">';
                  var nombres = item.autor.split('-');
                  for(var i=0;i<nombres.length;i++){
                    if(nombres[i]!=''){
                      ul+='<li> + '+nombres[i]+'</li>';
                    }
                  }
                  ul+='</ul>';
                  
                  //Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                  //Agregacion de las cedulas implementado en la vista html    fecha:19/07/2019
                  kk="----------";
                  var ced='<ul style="text-transform: uppercase;font-size: 9px;">';
                  var sss= item.cedula.split('-');
                  var count1=sss.length;

                  var cedulas = item.cedula.split('-',count1-1);
                  for(var s=0;s<cedulas.length;s++){
                    if(cedulas[s]=='****'){
                      ced+='<li>'+kk+'</li>';
                    }
                    else{
                      ced+='<li> + '+cedulas[s]+'</li>';
                    }
                  }
                  
                  ced+='</ul>';

                  body+='<tr>';
                  body+='<td width="10%">'+num+'</td>';
                  body+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                  body+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                  body+='<td width="40%" ">'+ul+'</td>';
                  body+='<td width="40%" ">'+ced+'</td>';
                  body+='<td width="30%" style="text-transform: uppercase;font-size: 10px;">'+item.revista+'</td>';
                  body+='<td width="20%"><a href="'+item.url+'" class="fa fa-external-link" target="_blank" style="font-size: 20px;color: green;"></a></td>';
                  body+='<td width="20%"><a href="/media/'+item.documento+'" class="fa fa-file-pdf-o" target="_blank" style="font-size: 20px;color: red;"></a></td>';
                  body+='</tr>';  
                });
                /////Excel///////
                var heard1='';
                var enc='';
                var num=0;
                heard1+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;display:none;" id="table-float">';
                heard1+='<thead style="text-align: center;font-size: 12px;">';
                heard1+='<tr>';
                heard1+='<td style="background: #01568f;color: white;">#</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ASIGNADO POR LA DIRECCIÓN DE INVESTIGACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">AÑO</td>';
                heard1+='<td style="background: #01568f;color: white;">INDEXACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO DOI / ASIGNADO POR LA DIRECCIÓN DE INVESTIGACIÓN </td>';
                heard1+='<td style="background: #01568f;color: white;">NOMBRE DE LA PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ISSN</td>';
                heard1+='<td style="background: #01568f;color: white;">NOMBRE DE LA REVISTA</td>';
                heard1+='<td style="background: #01568f;color: white;">NÚMERO REVISTA</td>';
                heard1+='<td style="background: #01568f;color: white;">SJR</td>';
                heard1+='<td style="background: #01568f;color: white;">FECHA_PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO AMPLIO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO ESPECÍFICO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO DETALLADO</td>';
                heard1+='<td style="background: #01568f;color: white;">FILIACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">ESTADO</td>';
                heard1+='<td style="background: #01568f;color: white;">LINK_PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">LINK_REVISTA</td>';
                enc+='<table>';
                enc+='<tr>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='</tr>';
                enc+='</table>';
                heard1+='<td>'+enc+'</td>';
                heard1+='</tr>';
                heard1+='</thead>';
                heard1+='<tbody style="text-align: center;">';
                var body1='';
                $.each(infor.a, function(index, j) {
                  body1+='<tr>';
                  body1+='<td></td>';
                  body1+='<td style="color: #01568f;font-weight: bold">'+j.x+'</td>';
                  body1+='</tr>';
                  let m = infor.b.filter(i => i.zona_n==j.x || i.universidad_n==j.x || i.campus_n==j.x || i.facultad_n==j.x || i.carrera_n==j.x);
                  $.each(m, function(index, item) {
                    num=num+1;

                    //Cedulas y autores agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de las cedulas y autores implementado en el excel    fecha:19/07/2019

                    k="----------";
                    var ced='';
                    ced+='<table>';
                    ced+='<tr>';
                    var ss= item.cedula.split('-');
                    var count=ss.length;
                    var cedulas = item.cedula.split('-',count-1);

                    var nombres = item.autor.split('-');

                    for(var s=0;s<cedulas.length;s++){
                      if(cedulas[s]!='****'){
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+cedulas[s]+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>'; 
                      }else{
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+k+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>';
                      } 
                    }
                    
                    ced+='</tr>';
                    ced+='</table>';

                    //Datos ordenados en excel por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de los datos ordenados en excel    fecha:19/07/2019
                    var st=" ";
                    body1+='<tr>';
                    body1+='<td width="10%">'+num+'</td>';
                    body1+='<td width="10%" style="font-size: 12px;">'+st+'</td>';
                    body1+='<td width="10%" style="font-size: 12px;">'+item.anio+'</td>';
                    body1+='<td width="10%" style="font-size: 12px;">'+st+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.doi+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.iSSN+'</td>';
                    body1+='<td width="30%" style="text-transform: uppercase;font-size: 10px;">'+item.revista+'</td>';
                    body1+='<td width="10%" style="font-size: 12px;">'+st+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.sjr+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoAmplio+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoEspecifico+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoDetallado+'</td>';
                    body1+='<td width="10%" style="font-size: 12px;">'+item.filiacion+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.estado+'</td>';
                    body1+='<td width="30%">'+item.url+'</td>';
                    body1+='<td width="30%">'+item.url_revista+'</td>';
                    body1+='<td width="40%">'+ced+'</td>';
                    body1+='</tr>';  
                  });
                });
                var footer='';
                footer+='</tbody>';
                footer+='</table>';
                var a=heard+body+footer;
                var b=heard1+body1+footer;
                var table=a+b;
                $('#modal-inf').html(table);
                var placeholder = '#table-int';
                if($(placeholder).length){
                  $(placeholder).each(function(){
                    $(this).DataTable();
                  });
                }
                $("#infor-total").css("display","block");
               }
               if(op==2){
                $('#num-infor').html(' Libros : '+total);
                $(".modal-title").html("Libros");
                var heard='';
                var num=0;
                heard+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;" id="table-int">';
                heard+='<thead style="text-align: center;font-size: 12px;">';
                heard+='<tr>';
                heard+='<td style="background: #01568f;color: white;">#</td>';
                heard+='<td style="background: #01568f;color: white;">Título</td>';
                heard+='<td style="background: #01568f;color: white;">Fecha</td>';
                heard+='<td style="background: #01568f;color: white;">Autores</td>';
                heard+='<td style="background: #01568f;color: white;">Cédula</td>';
                heard+='<td style="background: #01568f;color: white;">Url</td>';
                heard+='<td style="background: #01568f;color: white;">Pdf</td>';
                heard+='</tr>';
                heard+='</thead>';
                heard+='<tbody style="text-align: center;">';
                var body='';
                $.each(infor.b, function(index, item) {
                  num=num+1;
                  var ul='<ul style="text-transform: uppercase;font-size: 9px;">';
                  var nombres = item.autor.split('-');
                  for(var i=0;i<nombres.length;i++){
                    if(nombres[i]!=''){
                      ul+='<li> + '+nombres[i]+'</li>';
                    }
                  }
                  ul+='</ul>';

                  //Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                  //Agregacion de las cedulas implementado en la vista html    fecha:19/07/2019

                  kk="----------";
                  var ced='<ul style="text-transform: uppercase;font-size: 9px;">';
                  var sss= item.cedula.split('-');
                  var count1=sss.length;

                  var cedulas = item.cedula.split('-',count1-1);
                  for(var s=0;s<cedulas.length;s++){
                    if(cedulas[s]=='****'){
                      ced+='<li>'+kk+'</li>';
                    }
                    else{
                      ced+='<li> + '+cedulas[s]+'</li>';
                    }
                  }
                  
                  ced+='</ul>';

                  body+='<tr>';
                  body+='<td width="10%">'+num+'</td>';
                  body+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                  body+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                  body+='<td width="40%" >'+ul+'</td>';
                  body+='<td width="40%" >'+ced+'</td>';
                  body+='<td width="20%"><a href="'+item.url+'" class="fa fa-external-link" target="_blank" style="font-size: 20px;color: green;"></a></td>';
                  body+='<td width="20%"><a href="/media/'+item.documento+'" class="fa fa-file-pdf-o" target="_blank" style="font-size: 20px;color: red;"></a></td>';
                  body+='</tr>';   
                });
                /////Excel///////
                var heard1='';
                var enc='';
                var num=0;
                heard1+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;display:none;" id="table-float">';
                heard1+='<thead style="text-align: center;font-size: 12px;">';
                heard1+='<tr>';
                heard1+='<td style="background: #01568f;color: white;">#</td>';
                heard1+='<td style="background: #01568f;color: white;">FECHA DE PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CODIFICACIÓN ANUAL</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ASIGNADO POR LA DIRECCIÓN DE INVESTIGACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">NOMBRE DE LA OBRA</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ISBN</td>';
                heard1+='<td style="background: #01568f;color: white;">REVISADA POR PARES</td>';
                heard1+='<td style="background: #01568f;color: white;">FILIACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO AMPLIO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO ESPECÍFICO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO DETALLADO</td>';
                enc+='<table>';
                enc+='<tr>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº DE CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='</tr>';
                enc+='</table>';
                heard1+='<td>'+enc+'</td>';
                heard1+='</tr>';
                heard1+='</thead>';
                heard1+='<tbody style="text-align: center;">';
                var body1='';
                $.each(infor.a, function(index, j) {
                  body1+='<tr>';
                  body1+='<td></td>';
                  body1+='<td style="color: #01568f;font-weight: bold">'+j.x+'</td>';
                  body1+='</tr>';
                  let m = infor.b.filter(i => i.zona_n==j.x || i.universidad_n==j.x || i.campus_n==j.x || i.facultad_n==j.x || i.carrera_n==j.x);
                  $.each(m, function(index, item) {
                    num=num+1;

                    //Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de las cedulas implementado en el excel    fecha:19/07/2019

                    k="----------";
                    var ced='';
                    ced+='<table>';
                    ced+='<tr>';
                    var ss= item.cedula.split('-');
                    var count=ss.length;
                    var cedulas = item.cedula.split('-',count-1);

                    var nombres = item.autor.split('-');

                    for(var s=0;s<cedulas.length;s++){
                      if(cedulas[s]!='****'){
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+cedulas[s]+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>'; 
                      }else{
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+k+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>';
                      } 
                    }
                    
                    ced+='</tr>';
                    ced+='</table>';
                    
                    //Datos ordenados en excel por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de los datos ordenados en excel    fecha:19/07/2019

                    var esp=" ";
                    body1+='<tr>';
                    body1+='<td width="10%">'+num+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+esp+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+esp+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.ISBN+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+esp+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.filiacion+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoAmplio+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoEspecifico+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.campoDetallado+'</td>';
                    body1+='<td width="40%" >'+ced+'</td>';
                    body1+='</tr>';   
                  });
                });
                var footer='';
                footer+='</tbody>';
                footer+='</table>';
                var a=heard+body+footer;
                var b=heard1+body1+footer;
                var table=a+b;
                $('#modal-inf').html(table);
                var placeholder = '#table-int';
                if($(placeholder).length){
                  $(placeholder).each(function(){
                    $(this).DataTable();
                  });
                }
                $("#infor-total").css("display","block");
               }
               if(op==3){
                $('#num-infor').html(' Capítulos : '+total);
                $(".modal-title").html("Capítulos");
                var heard='';
                var num=0;
                heard+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;" id="table-int">';
                heard+='<thead style="text-align: center;background: #01568f;color: white;font-size: 12px;">';
                heard+='<tr>';
                heard+='<td>#</td>';
                heard+='<td>Libro</td>';
                heard+='<td>Fecha</td>';
                heard+='<td>Autor</td>';
                heard+='<td>Cédula</td>';
                heard+='<td>Nº</td>';
                heard+='<td>Capítulo</td>';
                heard+='<td>Url</td>';
                heard+='<td>Pdf</td>';
                heard+='</tr>';
                heard+='</thead>';
                heard+='<tbody style="text-align: center;">';
                var body='';
                $.each(infor.b, function(index, item) {
                  num=num+1;
                  body+='<tr>';
                  body+='<td width="10%">'+num+'</td>';
                  body+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                  body+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                  body+='<td width="40%" style="text-transform: uppercase;font-size: 9px;">'+item.autor+'</td>';
                  body+='<td width="40%" style="text-transform: uppercase;font-size: 9px;">'+item.cedula+'</td>';
                  body+='<td width="40%" style="text-transform: uppercase;font-size: 9px;">'+item.Ncapitulo+'</td>';
                  body+='<td width="40%" style="text-transform: uppercase;font-size: 9px;">'+item.Tcapitulo+'</td>';
                  body+='<td width="20%"><a href="'+item.url+'" class="fa fa-external-link" target="_blank" style="font-size: 20px;color: green;"></a></td>';
                  body+='<td width="20%"><a href="/media/'+item.documento+'" class="fa fa-file-pdf-o" target="_blank" style="font-size: 20px;color: red;"></a></td>';
                  body+='</tr>';   
                });
                ////////EXCEL//////////////////
                var heard1='';
                var num=0;
                heard1+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;display:none;" id="table-float">';
                heard1+='<thead style="text-align: center;font-size: 12px;">';
                heard1+='<tr>';
                heard1+='<td style="background: #01568f;color: white;">#</td>';
                heard1+='<td style="background: #01568f;color: white;">FECHA PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">CODIFICACIÓN ANUAL</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ASIGNADO POR LA DIRECCIÓN DE INVESTIGACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">NÚMERO DEL CAPÍTULO</td>';
                heard1+='<td style="background: #01568f;color: white;">TÍTULO CAPÍTULO</td>';
                heard1+='<td style="background: #01568f;color: white;">TÍTULO LIBRO</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ISBN</td>';
                heard1+='<td style="background: #01568f;color: white;">EDITOR O COMPILADOR</td>';
                heard1+='<td style="background: #01568f;color: white;">PÁGINA(S)</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO AMPLIO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO ESPECÍFICO</td>';
                heard1+='<td style="background: #01568f;color: white;">CAMPO DETALLADO</td>';
                heard1+='<td style="background: #01568f;color: white;">FILIACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">AUTOR/COAUTOR EXTERNO</td>';
                heard1+='<td style="background: #01568f;color: white;">ESTADO</td>';
                heard1+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                heard1+='<td style="background: #01568f;color: white;">AUTOR</td>';
                heard1+='</tr>';
                heard1+='</thead>';
                heard1+='<tbody style="text-align: center;">';
                var body1='';
                $.each(infor.a, function(index, j) {
                  body1+='<tr>';
                  body1+='<td></td>';
                  body1+='<td style="color: #01568f;font-weight: bold">'+j.x+'</td>';
                  body1+='</tr>';
                  let m = infor.b.filter(i => i.zona_n==j.x || i.universidad_n==j.x || i.campus_n==j.x || i.facultad_n==j.x || i.carrera_n==j.x);
                  $.each(m, function(index, item) {
                    num=num+1;
                    //Datos ordenados en excel por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de los datos ordenados en excel    fecha:19/07/2019
                    var espa=" ";
                    body1+='<tr>';
                    body1+='<td width="10%">'+num+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+espa+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+espa+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.Ncapitulo+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.Tcapitulo+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                    body1+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.ISBN+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+espa+'</td>';
                    body1+='<td width="20%" style="font-size: 12px;">'+espa+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.campoAmplio+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.campoEspecifico+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.campoDetallado+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.filiacion+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+espa+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.estado+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.cedula+'</td>';
                    body1+='<td width="40%" style="text-transform: uppercase;font-size: 12px;">'+item.autor+'</td>';
                    body1+='</tr>';
                  });   
                });
                var footer='';
                footer+='</tbody>';
                footer+='</table>';
                var a=heard+body+footer;
                var b=heard1+body1+footer;
                var table=a+b;
                $('#modal-inf').html(table);
                var placeholder = '#table-int';
                if($(placeholder).length){
                  $(placeholder).each(function(){
                    $(this).DataTable();
                  });
                }
                $("#infor-total").css("display","block");
               }
               if(op==4){
                $('#num-infor').html(' Ponencias : '+total);
                $(".modal-title").html("Ponencias");
                var heard='';
                var num=0;
                heard+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;" id="table-int">';
                heard+='<thead style="text-align: center;background: #01568f;color: white;font-size: 12px;">';
                heard+='<tr>';
                heard+='<td>#</td>';
                heard+='<td>Título</td>';
                heard+='<td>Fecha</td>';
                heard+='<td>Autores</td>';
                heard+='<td>Cédula</td>';
                heard+='<td>Url</td>';
                heard+='<td>Pdf</td>';
                heard+='</tr>';
                heard+='</thead>';
                heard+='<tbody style="text-align: center;">';
                var body='';
                $.each(infor.b, function(index, item) {
                  num=num+1;
                  var ul='<ul style="text-transform: uppercase;font-size: 10px;">';
                  var nombres = item.autor.split('-');
                  for(var i=0;i<nombres.length;i++){
                    if(nombres[i]!=''){
                      ul+='<li> + '+nombres[i]+'</li>';
                    }
                  }
                  ul+='</ul>';

                  //Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                  //Agregacion de las cedulas implementado en la vista html    fecha:19/07/2019
                  
                  kk="----------";
                  var ced='<ul style="text-transform: uppercase;font-size: 9px;">';
                  var sss= item.cedula.split('-');
                  var count1=sss.length;

                  var cedulas = item.cedula.split('-',count1-1);
                  for(var s=0;s<cedulas.length;s++){
                    if(cedulas[s]=='****'){
                      ced+='<li>'+kk+'</li>';
                    }
                    else{
                      ced+='<li> + '+cedulas[s]+'</li>';
                    }
                  }
                  
                  ced+='</ul>';

                  body+='<tr>';
                  body+='<td width="10%">'+num+'</td>';
                  body+='<td width="50%" style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                  body+='<td width="20%" style="font-size: 12px;">'+item.fecha+'</td>';
                  body+='<td width="40%" ">'+ul+'</td>';
                  body+='<td width="40%" ">'+ced+'</td>';
                  body+='<td width="20%"><a href="'+item.url+'" class="fa fa-external-link" target="_blank" style="font-size: 20px;color: green;"></a></td>';
                  body+='<td width="20%"><a href="/media/'+item.documento+'" class="fa fa-file-pdf-o" target="_blank" style="font-size: 20px;color: red;"></a></td>';
                  body+='</tr>'; 
                });
                //////////////////////EXCEL///////////////////////
                var heard1='';
                var enc='';
                var num=0;
                heard1+='<table border="1" class="table table-striped table-hover" style="font-size: 15px;width:100%;border-color: white;display:none;" id="table-float">';
                heard1+='<thead style="text-align: center;font-size: 12px;">';
                heard1+='<tr>';
                heard1+='<td style="background: #01568f;color: white;">#</td>';
                heard1+='<td style="background: #01568f;color: white;">AÑO</td>';
                heard1+='<td style="background: #01568f;color: white;">NOMBRE DE LA PONENCIA</td>';
                heard1+='<td style="background: #01568f;color: white;">INSTITUCIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">TÍTULO DE LA PONENCIA</td>';
                heard1+='<td style="background: #01568f;color: white;">CIUDAD</td>';
                heard1+='<td style="background: #01568f;color: white;">PAÍS</td>';
                heard1+='<td style="background: #01568f;color: white;">CÓDIGO ISBN</td>';
                heard1+='<td style="background: #01568f;color: white;">FINANCIAMIENTO</td>';
                heard1+='<td style="background: #01568f;color: white;">TIPO DE FUENTE</td>';
                heard1+='<td style="background: #01568f;color: white;">FECHA PUBLICACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">FILIACIÓN</td>';
                heard1+='<td style="background: #01568f;color: white;">URL</td>';
                heard1+='<td style="background: #01568f;color: white;">RELACIONADO CON ARTÍCULO</td>';
                enc+='<table>';
                enc+='<tr>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='<td style="background: #01568f;color: white;">Nº CÉDULA</td>';
                enc+='<td style="background: #01568f;color: white;">AUTOR</td>';
                enc+='</tr>';
                enc+='</table>';
                heard1+='<td>'+enc+'</td>';
                heard1+='</tr>';
                heard1+='</thead>';
                heard1+='<tbody style="text-align: center;">';
                var body1='';
                $.each(infor.a, function(index, j) {
                  body1+='<tr>';
                  body1+='<td></td>';
                  body1+='<td style="color: #01568f;font-weight: bold">'+j.x+'</td>';
                  body1+='</tr>';
                  let m = infor.b.filter(i => i.zona_n==j.x || i.universidad_n==j.x || i.campus_n==j.x || i.facultad_n==j.x || i.carrera_n==j.x);
                  $.each(m, function(index, item) {
                    num=num+1;

                    //Cedulas agregadas por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de las cedulas implementado en el excel    fecha:19/07/2019

                    k="----------";
                    var ced='';
                    ced+='<table>';
                    ced+='<tr>';
                    var ss= item.cedula.split('-');
                    var count=ss.length;
                    var cedulas = item.cedula.split('-',count-1);

                    var nombres = item.autor.split('-');

                    for(var s=0;s<cedulas.length;s++){
                      if(cedulas[s]!='****'){
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+cedulas[s]+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>'; 
                      }else{
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+k+'</td>';
                        ced+='<td style="text-transform: uppercase;font-size: 12px;">'+nombres[s]+'</td>';
                      } 
                    }
                    
                    ced+='</tr>';
                    ced+='</table>';

                    //Datos ordenados en excel por: Campoverde;De la Bastida;Alcasiga;Risueño;Zhinin
                    //Agregacion de los datos ordenados en excel    fecha:19/07/2019

                    body1+='<tr>';
                    body1+='<td>'+num+'</td>';
                    body1+='<td style="font-size: 12px;">'+item.anio+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.nombrePonencia+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.lugarPonencia+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.titulo+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.ciudad+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.pais+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.isbn+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.financiamiento+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.tipo+'</td>';
                    body1+='<td style="font-size: 12px;">'+item.fecha+'</td>';
                    body1+='<td style="font-size: 12px;">'+item.filiacion+'</td>';
                    body1+='<td style="font-size: 12px;">'+item.url+'</td>';
                    body1+='<td style="text-transform: uppercase;font-size: 12px;">'+item.articulo+'</td>';
                    body1+='<td>'+ced+'</td>';
                    body1+='</tr>';
                  }); 
                });
                var footer='';
                footer+='</tbody>';
                footer+='</table>';
                var a=heard+body+footer;
                var b=heard1+body1+footer;
                var table=a+b;
                $('#modal-inf').html(table);
                var placeholder = '#table-int';
                if($(placeholder).length){
                  $(placeholder).each(function(){
                    $(this).DataTable();
                  });
                }
                $("#infor-total").css("display","block");
               }
               if(op==5){
                $('#num-infsor').html(' Proyectos : '+total);
                $(".modal-title").html("Proyectos");
                $("#infor-total").css("display","block");
               }
              var opz=$('#filtro_z').val();
              if(opz==0 || opz==1){
                c3.generate({
                    bindto:"#myfirstchart",
                    data: {
                        x:'x',
                        columns: datos,
                        type: 'bar',
                        labels: true
                    },
                    axis: {
                        x: {
                            type: 'category',
                            tick: {
                                multiline: false
                            }
                        }
                    }
                });
              }
              if(opz==4){
                c3.generate({
                    bindto:"#myfirstchart",
                    data: {
                        x:'x',
                        columns: datos,
                        type: 'area',
                        labels: true
                    },
                    axis: {
                        x: {
                            type: 'category',
                            tick: {
                                multiline: false
                            }
                        }
                    }
                });
              }
              if(opz==2){
                c3.generate({
                    bindto:"#myfirstchart",
                    data: {
                        columns: pastel,
                        type: 'pie'
                    }
                });
              }
              if(opz==3){
                c3.generate({
                    bindto:"#myfirstchart",
                    data: {
                        columns: pastel,
                        type: 'donut'
                    }
                });
              }
  }
})