function cargarUArt(){
    var data;
    $.ajax({
        url: '/db/listUni/',
        type: 'POST',
        data: {
            pais: $('#paisFiltrado').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            $("#university option").remove();
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#university").append(newOption);
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}

function cargarUArtAll(){
    var data;
    $.ajax({
        url: '/db/listUniAll/',
        type: 'POST',
        data: {
            pais: $('#paisFiltrado').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            $("#university option").remove();
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#university").append(newOption);
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}


function lineaInv(){
    var values = $('#university').val();
    $.ajax({
        type:'POST',
        url:'/linea/selLin/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            console.log("Estoy aqui");
            $("#lineaInves option").remove();
            var n = 0;
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#lineaInves").append(newOption);
                n++;
            });
            if(n == 1){
                $("#SubLinea").empty();
            }
            
            ///Inicio Cambio
            //Fecha: 10-05-2019
            //Detalle: Validar si es Universidad Técnica de Cotopaxi ubicar como campos requeridos lineas de investigacion
            //Elaborado por: fernanda  barragan david guaman
            var codigo = document.getElementById('university').value;
            console.log(codigo);
            if (codigo==1)
            {
             //console.log(codigo);
             document.getElementById("lineaInves").required = true;
             document.getElementById("SubLinea").required = true;
            }
            else
            {
             document.getElementById("lineaInves").required = false;
             document.getElementById("SubLinea").required = false;
            }
            
            ///fin Cambio
        },
        error : function(){
             console.log('Opss');
        }
    })
}


function cargarU(){
    var data;
    $.ajax({
        url: '/db/listUni/',
        type: 'POST',
        data: {
            pais: $('#paisAut').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success: function(data) {
            $("#uni option").remove();
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#uni").append(newOption);
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}
var AutRep = document.getElementById('AutRep');
var AutIn = document.getElementById('AutIn');
AutRep.style.display = 'none';
AutIn.style.display = 'none';
$.ajaxSetup({ cache: false });
var id, id2;
function autors(x){
    id = '#res'+x.id;
    id2 = x.id;
    idAut = '#autor'+x.id;
    $(id).html('');
    var searchField = $('#'+x.id).val();
    if(searchField != "" && searchField.length > 1){
        var expression = new RegExp(searchField, "i");
        $.getJSON('/autor/selAA/', function(data) {
            var i = 0;
            $.each(data, function(key, value){
                if (value.text.search(expression) != -1){
                    $(id).append('<li class="list-group-item link-class">'+value.text+'</li>');
                } else if(value.text.search(expression) == -1){
                    i++;
                }
            });
            if(i == data.length){
                $(id).append('<li class="list-group-item link-class">Autor no encontrado</li>');
            }
        });
    }
    var list = new Array();
    
    $(id).on('click', 'li', function() {
        var click_text = $(this).text().split('|');
        if(click_text != 'Autor no encontrado'){
            $('#'+id2).val($.trim(click_text[0]));
            $(id).html('');
            console.clear();
            $('button[type="submit"]').attr('disabled','disabled');
            $('#repetidos > input').each(function( index ) {
                list.push($( this ).val());
            });
            $('#dbAutores > input').each(function( index ) {
                list.push($( this ).val());
            });
            $('#formUSer > input').each(function( index ) {
                list.push($( this ).val());
            });

            var dat = 0;
            list.forEach( function(valor, indice, array) {
                if(valor == $("#xyzUs").val()){
                    dat++;
                }
            });
            
            if(d(list).length != list.length){
                console.log("Elementos repetidos");
                AutRep.style.display = 'block';
            }else{
                $('button[type="submit"]').removeAttr('disabled');
                AutRep.style.display = 'none';
            }

            if(dat == 1){
                $('button[type="submit"]').removeAttr('disabled');
                AutIn.style.display = 'none';
            }else{
                console.log("Elementos repetidos");
                AutIn.style.display = 'block';
                $('button[type="submit"]').attr('disabled','disabled');
            }
            list.length = 0;
        }else{
            $('#'+id2).val('');
            $(id).html('');
        }
    });

}

$(document).on('submit', '#formAut', function(e){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-full-width",
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/investigador/registrarAut/',
        data:{
            email: $('#email').val(),
            name: $('#name').val(),
            lastname: $('#lastname').val(),
            uni: $('#uni').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            $('#autorNew').modal('hide');
            $('#email').val('');
            $('#name').val('');
            $('#lastname').val('');
            $('#paisAut').val('');
            $('#uni').val('');
            toastr.info("Se ha registrado correctamente en la base de datos.","Autor registrado");
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $(".autores").append(newOption);
            });

        },
        error : function(){
            $('#email').val('');
            $('#name').val('');
            $('#lastname').val('');
            $('#paisAut').val('');
            $('#uni').val('');
            toastr.error("El correo electronico ya se encuentra registrado en la base de datos.","ERROR");
        }
    });
});
$(document).ready(function(){
    $("#lineaInves").on("change", sub);
    function sub(){
        var values = $('#lineaInves').val();
        $.ajax({
            type:'POST',
            url:'/linea/sel/',
            data:{
                datos: values,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            success:function(data){
                console.log("Estoy aqui");
                $("#SubLinea option").remove();
                $.each(data, function(index, item) {
                    var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                    $("#SubLinea").append(newOption);
                });
            },
            error : function(){
                 console.log('Opss');
            }
        })
    }
});
function pais(){
    var values = $('#pais').val();
    $.ajax({
        type:'POST',
        url:'/pais/sel/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            console.log("Estoy aqui");
            $("#ciudad option").remove();
            $.each(data, function(index, item) {
                //alert("<option value='" + item.value + "'>" + item.text + "</option>");
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#ciudad").append(newOption);
            });
        },
        error : function(){
             console.log('Opss');
        }
    })
}
$(document).ready(function(){
    
    $("#pais").on("change", pais);

    $('#baseDatos').multiselect({
        buttonWidth: '100%',
        buttonClass: 'btn small btn-light',
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        enableCaseInsensitiveFiltering : true,
        maxHeight: 300,
        templates: {
            filterClearBtn: '',
        }
    });
    $('#baseData').multiselect({
        buttonWidth: '100%',
        buttonClass: 'btn small btn-light',
        enableFiltering: true,
        filterPlaceholder: 'Buscar',
        enableCaseInsensitiveFiltering : true,
        maxHeight: 300,
        templates: {
            filterClearBtn: '',
        }
    });

    $('#linea').on('change', function() {
        var selected = $(this).val();
        $("#subLinea option").each(function(item){
            console.log(selected) ;
            var element =  $(this) ;
            console.log(element.data("tag")) ;
            if (element.data("tag") != selected){
                element.hide() ;
            }else{
                element.show();
            }
        }) ;
        $("#subLinea").val($("#subLinea option:visible:first").val());

    });
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-full-width",
        "onclick": null,
        "showDuration": "3000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    $('#palabras').tagsinput({
        tagClass: 'label label-primary',
        confirmKeys: [13, 44],
        maxChars: 30,
    });

    $("#amplio").on("change", campoAm);
    $("#especifico").on("change", campoEs);
    $("#university").on("change", lineaInv);

    $('#lista1').keydown(function(event) {
        if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
            toastr.error("Error", "Restringida la acción de copiar y pegar");
            event.preventDefault();
         }
    });
    $('#formUSer').keydown(function(event) {
        if (event.ctrlKey==true && (event.which == '118' || event.which == '86')) {
            toastr.error("Error", "Restringida la acción de copiar y pegar");
            event.preventDefault();
         }
    });
});
function campoAm(){
    var values = $('#amplio').val();
    $.ajax({
        type:'POST',
        url:'/amplio/sel/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            
            $("#especifico").empty();
            $.each(data, function(index, item) {
               
                //alert("<option value='" + item.value + "'>" + item.text + "</option>");
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#especifico").append(newOption);
            });
            values.length = 0;
        },
        error : function(){
            values.length = 0;
            console.log('Opss');
        }
    })
}

function campoEs(){
    var values = $('#especifico').val();
    $.ajax({
        type:'POST',
        url:'/amplio/selEspe/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            $("#detallado").empty();
            $.each(data, function(index, item) {
                //alert("<option value='" + item.value + "'>" + item.text + "</option>");
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#detallado").append(newOption);
            });
            values.length = 0;
        },
        error : function(){
            values.length = 0;
            console.log('Opss');
        }
    })
}