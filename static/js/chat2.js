$(document).ready(function() {
    var urlGeneral = "/social/";
    var arr = []; // List of users

    var numberWindowsChat = [];
    //para que monitoree los mensajes en timpo real cuando se abra una ventana de chat
    var repite = setInterval(function() {
        if (numberWindowsChat.length > 0) {
            for (var i = 0; i < numberWindowsChat.length; i++) {
                llenaMessage(numberWindowsChat[i]['emisor'], numberWindowsChat[i]['receptor']);
            }
        }
    }, 10000);


    $(document).on('click', '.msg_head', function() {
        var chatbox = $(this).parents().attr("rel");
        $('[rel="' + chatbox + '"] .msg_wrap').slideToggle('slow');

        //  $(".msg_msg_wrap").slideToggle('slow');
        return false;
    });


    $(document).on('click', '.close', function() {
        //alert(numberWindowsChat.length);
        var destino = $(this).attr("relclose");
        //alert("el destino es "+ destino);
        var borrar = 0;
        for (var i = 0; i < numberWindowsChat.length; i++) {
            if (numberWindowsChat[i]["receptor"] == destino) {
                borrar = i;
            }
        }
        numberWindowsChat.splice(borrar, 1);
        var chatbox = $(this).parents().parents().attr("rel");
        $('[rel="' + chatbox + '"]').hide();
        arr.splice($.inArray(chatbox, arr), 1);
        displayChatBox();
        return false;
    });


    $(document).on('click', '.boxuserColaboradores', function() {
        var userID = $(this).attr("alt");
        var ind = $(this).attr("ind");
        var username = $(this).children().text();
        if (ind == 1) {
            username = $(this).children().text();
        } else {
            username = $(this).attr("nom");
        }


        var foto = $(this).attr("ft");
        if ($.inArray(userID, arr) != -1) {
            arr.splice($.inArray(userID, arr), 1);
        }

        arr.unshift(userID);
        chatPopup = ' <div class="  msg_box" style="right: 5px;" rel="' + userID + '">' +

            '<div class="  msg_head"><img src="/media/' + foto + '" class="foto">' + '  ' + username +
            ' <div class="close" relclose="' + userID + '">x</div>' +
            ' </div>' +
            '<div class=" msg_wrap"> ' +
            ' <div class="msg_body">' +
            '<div class="msg_push " relsmg="' + userID + '" >' +
            ' <div class="mensajeA col-8">' +
            ' Hola' +
            '</div>' +
            '<div class="mensajeB col-8">' +
            'Hola como estas' +
            '</div>' +
            ' </div>' +
            ' </div>' +
            ' <div class="msg_footer">' +
            '<textarea class="msg_input" placeholder="Escribe un mensaje ..." rows="4" relinputmsg="' + userID + '">' +
            '</textarea>' +
            '<button type="submit" class="btn btn-sm btn-primary BtnSendMessage far fa-paper-plane" style="font-size:30px; background:  #01568f;" rel="' + userID + '"></button>' +
            '</div> ' +
            '</div> ' +
            ' </div>';
        $("body").append(chatPopup);
        var emisor = $("#usuarioGeneral").attr("alt");
        //alert("el usuario general ="+ emisor)
        displayChatBox();
        var estado = 0;
        //para agregar la info de las ventanas de chat abiertas
        if (numberWindowsChat.length > 0) {
            for (var i = 0; i < numberWindowsChat.length; i++) {
                if (numberWindowsChat[i]["receptor"] == userID) {
                    estado = 1;
                }
            }
        }
        if (estado == 0) {
            var dicTemp = new Array();
            dicTemp["emisor"] = emisor;
            dicTemp["receptor"] = userID;
            numberWindowsChat.push(dicTemp);
            llenaMessage(emisor, userID);
        }
        if (ind == 2) {

            msgid=$(this).attr("msgid");



            $.ajax({
                data: {
                    'msgid': msgid,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "updateLecturaMsg",
                type: 'POST',
                success: function(data) {
                    console.log("la actualixacion es")
                console.log(data);
                if(data[0]["status"]==1){

                $('[altmsgid="' + data[0]["obj"] + '"]').css("background","#ffffff")
                }
                }

            });




        }









    });






    function displayChatBox() {

        i = 10; // start position
        j = 260; //next position

        $.each(arr, function(index, value) {
            if (index < 4) {
                $('[rel="' + value + '"]').css("right", i);
                $('[rel="' + value + '"]').show();
                i = i + j;
            } else {
                $('[rel="' + value + '"]').hide();
            }
        });
    }


    $(document).on('keypress', '.msg_input', function(e) {

        if (e.keyCode == 13) {
            var msg = $(this).val();
            $(this).val('');
            if (msg.trim().length != 0) {
                var chatbox = $(this).parents().parents().parents().attr("rel");
                $('<div class="mensajeA col-8">' + msg + '</div>').insertBefore('[rel="' + chatbox + '"] .msg_push');
                $('.msg_body').scrollTop($('.msg_body')[0].scrollHeight);
            }
        }
    });

    $(document).on('click', '.BtnSendMessage', function() {
        var idReceptor = $(this).attr("rel");

        var message = $('[relinputmsg="' + idReceptor + '"]').val()
        var destinatario = foto = $(this).attr("rel");
        $(".msg_input").val("");

        $.ajax({
            data: {
                'message': message,
                'destinatario': destinatario,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()

            },
            url: urlGeneral + "sendMessage",
            type: 'POST',
            success: function(data) {
                //console.log(data);
                if (data[0]["status"] == 1) {
                    var emisorId = data[0]["IdEmisor"]
                    var receptorId = data[0]["IdReceptor"]

                    llenaMessage(emisorId, receptorId);



                } else {
                    console.log("error");
                }
            }
        });
    });

    function llenaMessage(idEmisor, idReceptor) {

        $.ajax({
            data: {
                'IdEmisor': idEmisor,
                'IdReceptor': idReceptor,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()

            },
            url: urlGeneral + "getMessage",
            type: 'POST',
            success: function(data) {
                //console.log("el mensaje es");
                //console.log(data);

                $('[relsmg="' + idReceptor + '"]').html("")
                var messageData = "";
                if (data.length == 0) {
                    messageData += '<h5>Escribe un mensaje!</h5>'
                }
                for (var i = 0; i < data.length; i++) {

                    if (data[i]['idEmisor_id'] == idEmisor) {
                        messageData += '<div class="mensajeB col-8">' + data[i]['mensaje'] + '</div>'
                    } else {
                        messageData += '<div class="mensajeA col-8">' + data[i]['mensaje'] + '</div>'
                    }

                }
                $('[relsmg="' + idReceptor + '"]').html(messageData);

                var altura = $(".msg_body").prop("scrollHeight");
                $(".msg_body").scrollTop(altura);

            }
        });



    }









});
