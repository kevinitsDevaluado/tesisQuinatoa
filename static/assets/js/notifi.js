/*$(document).ready(function () {
    var us = $("#usuario").val();
    if(us!=1){
        $.ajax({
            type: 'GET',
            url: '/revista/verRevista/',
            data: {
                user: us,
            },
            success: function (data) {
                $.each(data, function (index, item) {
                    if (item.estado != 0) {
    
                        var xs = "<span class='notification-bubble'> "+item.estado+"</span>";
                        $("#revIco").append(xs);
                    } else {
                        console.log("No tiene ninguan revista incorrecta");
                    }
                });
    
            },
            error: function () {
    
                console.log('Opss');
            }
        })
    }
});*/
$(document).ready(function () {
    
    var us = $("#usuario").val();
    if(us!=1){
        $.ajax({
            type: 'GET',
            url: '/index/verRechazados/',
            data: {
                user: us,
            },
            success: function (data) {
                $.each(data, function (index, item) {
                    if (item.revistas > 0 ) {   
                        var rev = "<span class='notification-bubble'> "+item.revistas+"</span>";
                        $("#revIco").append(rev);    
                    } else {console.log("No tiene ninguna revista rechazada");}
                    
                    if (item.articulos> 0 ) {
                        var art="<span style='right: 8%' class='notification-bubble'> "+item.articulos+"</span>";
                        $("#artIco").append(art);
                    } else {console.log("No tiene ningun articulo rechazdo");}

                    if (item.ponencias> 0 ) {
                        var pon="<span style='right: 8%' class='notification-bubble'> "+item.ponencias+"</span>";
                        $("#ponIco").append(pon);
                    } else {console.log("No tiene ninguna ponencias rechazada");}
                    
                });
    
            },
            error: function () {
    
                console.log('Opss');
            }
        })
    }
});