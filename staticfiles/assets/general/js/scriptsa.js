$(document).on('submit', '#formDB', function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/db/create/',
        data:{
            tipoBD: $('#tipoBD').val(),
            BaseDatos: $('#nameBD').val(),
            Url: $('#Url').val(),
            user: $('#user').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            $.each(data, function(index, item) {
            var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
            $("#baseDatos").append(newOption).multiselect('rebuild');
            $("#baseData").append(newOption).multiselect('rebuild');
            });
            $('#Url').val('');
            $('#nameBD').val('');
            $('#exampleModal').modal('hide');
            toastr.info("Completo", "Se ha creado la base de datos");

        },
        error : function(){
             $('#Url').val('');
             $('#nameBD').val('');
             $('#exampleModal').modal('hide');
             toastr.error("Error", "No se envio la nformación");
        }
    });
});
cargarDB();
cargarRev();
function cargarDB(){
    var data;
    $.ajax({
        url: '/db/index/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#baseDatos option").remove();
            $("#baseData option").remove();
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#baseDatos").append(newOption);
                $("#baseData").append(newOption);
            });
            var dbMulti = document.getElementsByName("baseDatos");
            var dbMulti2 = document.getElementsByName("baseData");
            $(dbMulti).multiselect({
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
            $(dbMulti2).multiselect({
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
        }
    });
}

function cargarRegional(){
    
    var data;
    $.ajax({
        url: '/db/index/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#baseDatos option").remove();
            $.each(data, function(index, item) {
                console.log(item.text );
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#baseDatos").append(newOption).multiselect('rebuild');
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}
function cargarRegionalRev(){
     var data;
    $.ajax({
        url: '/db/index/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#baseData option").remove();
            $.each(data, function(index, item) {
                console.log(item.text );
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#baseData").append(newOption).multiselect('rebuild');
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}

function cargarImpacto(){
    
    var data;
    $.ajax({
        url: '/db/cargarImpacto/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#baseDatos option").remove();
            $.each(data, function(index, item) {
                console.log(item.text );
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#baseDatos").append(newOption).multiselect('rebuild');
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}


function cargarImpactoRev(){
    
    var data;
    $.ajax({
        url: '/db/cargarImpacto/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#baseData option").remove();
            $.each(data, function(index, item) {
                console.log(item.text );
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#baseData").append(newOption).multiselect('rebuild');
            });
            console.log('correcto');
        },
        error : function(){
            console.log('error');
        }
    });
}
function cargarRev(){
    var data;
    $.ajax({
        url: '/revista/select/',
        type: 'GET',
        data: data,
        success: function(data) {
            $("#revista option").remove();
            var newOption = "<option>----------</option>";
            $("#revista").append(newOption);
            $.each(data, function(index, item) {
                //alert("<option value='" + item.value + "'>" + item.text + "</option>");
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#revista").append(newOption);
            });
            $("#revista").attr("required", true);
        }
    });
}
$(document).on('submit', '#formRev', function(e){
    e.preventDefault();
    $.ajax({
        type:'POST',
        url:'/revista/new/',
        data:{
            Nombre: $('#Nombre').val(),
            ISSN: $('#ISSN1').val(),
            baseData: $('#baseData').val(),
            Cuartil_Pertenece: $('#Cuartil_Pertenece').val(),
            Factor_Impacto: $('#Factor_Impacto').val(),
            Url: $('#Url1').val(),
            user: $('#user1').val(),
            validada: $('#validada').val(),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            $('#exampleModal1').modal('hide');
             $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#revista").append(newOption);
            });
            $('#Nombre').val('');
            $('#ISSN1').val('');
            $('#baseData').multiselect('rebuild');
            $('#Cuartil_Pertenece').val('');
            $('#Factor_Impacto').val('');
            $('#Url1').val('');
            toastr.info("Completo", "Se ha creado la revista");
            //alert("Revista creada.");
        },
        error : function(){
            $('#Nombre').val('');
            $('#ISSN1').val('');
            $('#baseData').multiselect('rebuild');
            $('#Cuartil_Pertenece').val('');
            $('#Factor_Impacto').val('');
            $('#Url1').val('');
            $('#exampleModal1').modal('hide');
            toastr.error("Error", "No se envio la nformación");
            //alert("Error, la revisa ya se encuentra registrada.");
        }
    });
});
$(document).ready(function() {
    $('#palabraC').tagsinput({
        tagClass: 'label label-primary'
    });
});


/*
function f(){
    console.clear();
    $('button[type="submit"]').attr('disabled','disabled');
    $('#repetidos > input').each(function( index ) {
        list.push($( this ).val());
    });
    $('#formUSer > input').each(function( index ) {
        list.push($( this ).val());
    });
    list.forEach( function(valor, indice, array) {
        console.log("En el índice " + indice + " hay este valor: " + valor);
    });
    if(d(list).length != list.length){
        console.log("Elementos repetidos");
        AutRep.style.display = 'block';
    }else{
        $('button[type="submit"]').removeAttr('disabled');
        AutRep.style.display = 'none';
    }
    
    list.length = 0;
}
*/
function d(arra1) {
    var i, len=arra1.length, result = [], obj = {};
    for (i=0; i<len; i++){
    obj[arra1[i]]=0;
    }
    for (i in obj) {
    result.push(i);
    }
    return result;
}

function a(){
    var values = $('#baseDatos').val();
    $.ajax({
        type:'POST',
        url:'/revista/sel/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            console.log("Estoy aqui");
            $("#revista").empty();
            $.each(data, function(index, item) {
                //alert("<option value='" + item.value + "'>" + item.text + "</option>");
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#revista").append(newOption);
            });
            values.length = 0;
        },
        error : function(){
            values.length = 0;
            console.log('Opss');
        }
    })
}
$(document).ready(function(){
    $("#pais").on("change", pais);
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
    $("#lineaInves").on("change", sub);
    $("#SubLinea").empty();
});

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

$(document).ready(function() {
    var iCnt = 0;
    $('#btAdd').click(function() {
        if (iCnt < 6) {
            iCnt = iCnt + 1;
            if(iCnt == 1){
               $(formGrado).append('<input  type=text class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + 'value="Segundo" readonly/>');
            }
            if(iCnt == 2){
                $(formGrado).append('<input  type=text class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + 'value="Tercero" readonly/>');
            }
            if(iCnt == 3){
                $(formGrado).append('<input  type=text class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + 'value="Cuarto" readonly />');
            }
            if(iCnt == 4){
                $(formGrado).append('<input  type=text class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + 'value="Quinto" readonly/>');
            }
            if(iCnt == 5){
                $(formGrado).append('<input  type=text class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + 'value="Sexto" readonly/>');
            }
            if(iCnt == 6){
                $(formGrado).append('<select class="form-control" name=grado' + iCnt + ' id=grado' + iCnt + ' ' + '><option value="Séptimo">Séptimo</option><option value="Octavo">Octavo</option><option value="Noveno">Noveno</option><option value="Décimo">Décimo</option><option value="Undécimo">Undécimo</option><option value="Duodécimo">Duodécimo</option><option value="Decimotercero">Decimotercero</option><option value="Decimocuarto">Decimocuarto</option><option value="Decimoquinto">Decimoquinto</option></select>');
            }
            $(formUSer).append('<input required type="text" name=' + iCnt + ' id=' + iCnt + ' placeholder="Buscar autor..." autocomplete="off" class="form-control" onkeyup="autors(this)"/><ul class="list-group" id=res' + iCnt + '></ul>');

        }
        else {
            $('button[id="btAdd"]').attr('disabled','disabled');
            $(formGrado).append('<label>Limite Alcanzado</label>');
        }
    });

    $('#btRemove').click(function() {
        if (iCnt != 0) {
            $('#grado' + iCnt).remove();
            $('#res' + iCnt).remove();
            $('#' + iCnt).remove();
            iCnt = iCnt - 1;
        }
        if (iCnt == 0) {
            $(formGrado).empty();
            $(formUSer).empty();
            $('#btAdd').removeAttr("disabled");
        }
        if (iCnt == 5) {
            $("#btAdd").removeAttr("disabled");
        }
    });
    $('#btRemoveAll').click(function() {    // Elimina todos los elementos del contenedor
        $(formGrado).empty();
        $(formUser).empty();
        $("#btAdd").removeAttr("disabled");
    });
});


function regional(){
    $('#Aut').val("1");
}
function impacto(){
    $('#Aut').val("2");
}

$('#customControlValidation2').click(function() {
    cargarRegional();
});
$('#customControlValidation3').click(function() {
    cargarImpacto();
});
$('#option1').click(function() {
    cargarRegionalRev();
});
$('#option2').click(function() {
    cargarImpactoRev();
});

