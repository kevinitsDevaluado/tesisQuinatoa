function cargarDB(){$.ajax({url:"/db/index/",type:"GET",data:void 0,success:function(e){$("#baseDatos option").remove(),$("#baseData option").remove(),$.each(e,function(e,a){var t="<option value='"+a.value+"'>"+a.text+"</option>";$("#baseDatos").append(t),$("#baseData").append(t)});var a=document.getElementsByName("baseDatos"),t=document.getElementsByName("baseData");$(a).multiselect({buttonWidth:"100%",buttonClass:"btn small btn-light",enableFiltering:!0,filterPlaceholder:"Buscar",enableCaseInsensitiveFiltering:!0,maxHeight:300,templates:{filterClearBtn:""}}),$(t).multiselect({buttonWidth:"100%",buttonClass:"btn small btn-light",enableFiltering:!0,filterPlaceholder:"Buscar",enableCaseInsensitiveFiltering:!0,maxHeight:300,templates:{filterClearBtn:""}})}})}function cargarRev(){$.ajax({url:"/revista/select/",type:"GET",data:void 0,success:function(e){$("#revista option").remove(),$.each(e,function(e,a){var t="<option value='"+a.value+"'>"+a.text+"</option>";$("#revista").append(t)});var a=document.getElementsByName("revista");$(a).multiselect({buttonWidth:"100%",buttonClass:"btn small btn-light",enableFiltering:!0,filterPlaceholder:"Buscar",enableCaseInsensitiveFiltering:!0,maxHeight:300,templates:{filterClearBtn:""}})}})}$(document).on("submit","#formDB",function(e){e.preventDefault(),$.ajax({type:"POST",url:"/db/create/",data:{BaseDatos:$("#nameBD").val(),Url:$("#Url").val(),user:$("#user").val(),csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()},success:function(e){$.each(e,function(e,a){var t="<option value='"+a.value+"'>"+a.text+"</option>";$("#baseDatos").append(t).multiselect("rebuild"),$("#baseData").append(t).multiselect("rebuild")}),$("#Url").val(""),$("#nameBD").val(""),$("#exampleModal").modal("hide"),alert("Base de datos creada")},error:function(){$("#Url").val(""),$("#nameBD").val(""),$("#exampleModal").modal("hide"),alert("Ya existe la base de datos")}})}),cargarDB(),cargarRev(),$(document).on("submit","#formRev",function(e){e.preventDefault(),$.ajax({type:"POST",url:"/revista/new/",data:{Nombre:$("#Nombre").val(),ISSN:$("#ISSN1").val(),baseData:$("#baseData").val(),Cuartil_Pertenece:$("#Cuartil_Pertenece").val(),Factor_Impacto:$("#Factor_Impacto").val(),Url:$("#Url1").val(),user:$("#user1").val(),csrfmiddlewaretoken:$("input[name=csrfmiddlewaretoken]").val()},success:function(e){$("#exampleModal1").modal("hide"),$.each(e,function(e,a){var t="<option value='"+a.value+"'>"+a.text+"</option>";$("#revista").append(t).multiselect("rebuild")}),$("#Nombre").val(""),$("#ISSN1").val(""),$("#baseData").multiselect("rebuild"),$("#Cuartil_Pertenece").val(""),$("#Factor_Impacto").val(""),$("#Url1").val(""),alert("Revista creada.")},error:function(){$("#Nombre").val(""),$("#ISSN1").val(""),$("#baseData").multiselect("rebuild"),$("#Cuartil_Pertenece").val(""),$("#Factor_Impacto").val(""),$("#Url1").val(""),$("#exampleModal1").modal("hide"),alert("Error, la revisa ya se encuentra registrada.")}})}),$(document).ready(function(){$("#linea").on("change",function(){var e=$(this).val();$("#subLinea option").each(function(a){console.log(e);var t=$(this);console.log(t.data("tag")),t.data("tag")!=e?t.hide():t.show()}),$("#subLinea").val($("#subLinea option:visible:first").val())}),$("#palabraC").tagsinput({tagClass:"label label-primary"})});