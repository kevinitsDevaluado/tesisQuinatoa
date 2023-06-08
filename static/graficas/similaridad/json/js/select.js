$(document).ready(function(){
    $("#lineaInves").on("change", sub);
    $("#Carrera").on("change", sub1);
});

function sub(){
    var values = $('#lineaInves').val();
    $.ajax({
        type:'POST',
        url:'/grafica/buscar/',
        data:{
            datos: values,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
            $("#Carrera option").remove();
            $.each(data, function(index, item) {
                var newOption = "<option value='" + item.value + "'>" + item.text + "</option>";
                $("#Carrera").append(newOption);
            });
            $("#SubLinea option").remove();
            $("#SubLinea").append("<option value='0'>---------------Todo---------------</option>");
            $("#Carrera").change();
        },
        error : function(){
             console.log('Opss');
        }
    })
}
function sub1(){
    var car = $('#Carrera').val();
    var lin = $('#lineaInves').val();
    $.ajax({
        type:'POST',
        url:'/grafica/buscar1/',
        data:{
            datos:lin,
            datos1:car,
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        success:function(data){
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
