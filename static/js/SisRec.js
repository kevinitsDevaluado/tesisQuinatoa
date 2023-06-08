$(document).ready(function() {
    var urlGeneral = "/social/";
    var urlServidor = "http://ecuciencia.utc.edu.ec"
    ///desactivo combo publicacion
    var id1 = 0
    var id2 = 0
    var id3 = 0
    var id4 = 0
    var id5 = 0
    var valoSolicitud = 0
    var valorSugerencia = 0

    $("#publicArticulo").prop('disabled', 'disabled');
    $("#publicLibro").prop('disabled', 'disabled');
    $("#publicPonencia").prop('disabled', 'disabled');
         
        getcontainerColaboradores();
        getPublicacion();
        getNotification($("#usuarioGeneral").attr("alt"))
       

    function getSugerencias() {
        $.ajax({
            data: {
                'datos': 6,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getRecomendation",
            type: 'POST',
            success: function(data) {
                console.log(data);
                $('.carousel-indicators').html("");
                var head = "";
                head += '<li data-target="#demo" data-slide-to="0" class="active" style="background :#01568f"></li>'
                var indicador = 1;
                var indicador2 = 0;
                for (var i = 0; i < data.length; i++) {
                    if (indicador == 5) {
                        indicador2 = indicador2 + 1;
                        head += '<li data-target="#demo" data-slide-to="' + indicador2 + '" style="background :#01568f"></li>';
                        indicador = 1;
                    }
                    indicador = indicador + 1;
                }
                $('.carousel-indicators').html(head);
                $('.carousel-inner').html("");
                var body = ""
                var unico = 1;
                var indi1 = 1;
                var indi2 = 1;
                var indi3 = 1;
                for (var i = 0; i < data.length; i++) {
                    if (indi1 == 1) {
                        if (unico == 1) {
                            body += '<div class="carousel-item active">';
                            body += '<div class="card " style="background: #f7f7f7">'
                            body += '<div class="row ">'
                            unico = 0;
                        } else {
                            body += '<div class="carousel-item ">';
                            body += '<div class="card " style="background: #f7f7f7">'
                            body += '<div class="row ">'
                        }
                        indi1 = 0;
                    }
                    body += '<div class="col-6 col-sm-3 col-md-3 col-lg-3';
                    body += 'col-xl-3" style="padding-bottom: 20px">';
                    body += '<div class="card">';
                    if (data[i]['foto'] == "") {
                        body += '<img class="card-img-top imgSugerencias" src="/media/foto/user.png"';
                    } else {
                        body += '<img class="card-img-top imgSugerencias" src="/media/' + data[i]['foto'] + '"';
                    }
                    body += 'alt="Card image ">';
                    body += '<div class="card-body ">';
                    body += '<h4 class="card-title ';
                    body += 'ACSizeTextTitle">' + (data[i]['nombres'] + ' ' + data[i]['apellidos']) + '</h4>';
                    body += '<p class="card-text ';
                    body += 'ACSizeTextContent "> ' + data[i]['universidad'] + '</p>';
                    body += '<button type="submit"  class="btn ';
                    body += 'btn-primary ACSizeButtom btnAddColaborador" alt="' + data[i]["id"] + '" aria-hidden="true" style="background: #01568f;">Agregar';
                    body += ' </button>';
                    body += '</div>';
                    body += '</div>';
                    body += '</div>';
                    if (indi2 == 4) {
                        body += '</div></div></div>'
                        indi1 = 1;
                        indi2 = 0;
                    }
                    indi2 = indi2 + 1;
                }
                $('.carousel-inner').html(body);
            }
        });

    }

    function addColaborador(userId) {
        $.ajax({
            data: {
                'userDestinoId': userId,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addSolicitud",
            type: 'POST',
            success: function(data) {
                console.log("el proceso de agragar es ");
                console.log(data);
                if (data[0]["status"] == 1) {
                    getSugerencias();
                    alert("Solicitud de colaboración enviada!");
                } else {
                    alert("Intentelo mas tarde");
                }

            }
        });

    }

    // para enviar solicitudes
    $(".carousel-inner").on("click", ".btnAddColaborador", function(e) {
        var userId = $(this).attr("alt");
        //alert(userId);

        addColaborador(userId);

    });

    //para consultar amigos
    function getcontainerColaboradores() {
        $.ajax({
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getColaboradores",
            type: 'POST',
            success: function(data) {
                //console.log(data);
                $('.containerColaboradores').html("");
                $('.containerPopoverColaboradores').html("");
                var body = "";

                for (var i = 0; i < data.length; i++) {

                    body += '<div class="row boxuserColaboradores" ind="1" id="sidebar-user-box" alt="' + data[i]['id'] + '" ft="' + data[i]['foto'] + '">'

                    body += '<div class="col-2 ">'
                    if (data[i]['foto'] == "") {
                        body += '<img src="/media/foto/user.png"'
                    } else {
                        body += '<img src="/media/' + data[i]['foto'] + '"'
                    }

                    body += 'alt="' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '" width="20px" height="20px" style="border-radius:100%;">'
                    body += '</div>'
                    body += ' <div class="col-7">'
                    body += '<span id="slider-username" style=" font-size: 9px; ">' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '</span>'
                    body += ' </div>'
                    body += '<div class="col-3">'
                    body += '<div class="UserConected" style="padding-top: 8px"></div>'
                    body += '</div>'
                    body += '</div>'

                }
                $('.containerColaboradores').html(body);
                $('.containerPopoverColaboradores').html(body);
            }
        });
    }

    function getSolicitudes() {
        $.ajax({
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getRecomendation",
            type: 'POST',
            success: function(data) {
                console.log("las recomendaciones son");
                console.log(data);
                valorSugerencia = 0
                valorSugerencia = data.length
                $(".popoverSugerenciasNotification").html("")
                $(".popoverSugerenciasNotification").html(parseInt(data.length))


                $('.popoverSugerencias').html("");
                var body = "";
                body += '<h6 class="SolicTxtSizeBody" style="padding-top:10px; padding-bottom:10px; ">Sugerencias de Colaboración</h6>';
                for (var i = 0; i < data.length; i++) {
                    body += '<div class="card">';
                    body += '<div class="row">';
                    body += '<div class="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-2">';
                    if (data[i]['foto'] == "") {
                        body += '<img src="/media/foto/user.png" class="SolicsizeImg" alt="CakePHP" style=" border-radius: 100%;">';
                    } else {
                        body += '<img src="/media/' + data[i]['foto'] + '" class="SolicsizeImg" alt="CakePHP" style=" border-radius: 100%;">';
                    }
                    body += '</div>';
                    body += '<div class="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-10">';
                    body += '<div class="row">';
                    body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeHead">' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '</div>';
                    body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeBody">' + data[i]['universidad'] + '</div>';
                    body += '</div>';
                    body += '</div>';
                    body += '<div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">';
                    body += '</div>';
                    body += '<div class="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" style="padding-top:10px; padding-bottom:10px; ">';
                    body += '<button type="submit" class="btn btn-sm btn-primary SolicBtn btnaddColaboradorN" alt="' + data[i]['id'] + '">Agregar</button>';
                    body += '<button type="reset" class="btn btn-sm btn-default  SolicBtn">Ignorar</button>';
                    body += '</div>';
                    body += '</div>';
                    body += '</div>';

                }
                $('.popoverSugerencias').html(body);

            }
        });

        $.ajax({
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getSolicitudes",
            type: 'POST',
            success: function(data) {
                valoSolicitud = 0
                valoSolicitud = data.length

                //    console.log("las solicitudes son");
                //    console.log(data);
                $('.popoverSolicitudes').html("");
                var body = "";
                body += '<h6 class="SolicTxtSizeBody" style="padding-top:10px; padding-bottom:10px; ">Solicitudes de Colaboración</h6>';
                for (var i = 0; i < data.length; i++) {
                    body += '<div class="card">';
                    body += '<div class="row">';
                    body += '<div class="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-2">';
                    if (data[i]['foto'] == "") {
                        body += '<img src="/media/foto/user.png" class="SolicsizeImg" alt="CakePHP" style=" border-radius: 100%;">';
                    } else {
                        body += '<img src="/media/' + data[i]['foto'] + '" class="SolicsizeImg" alt="CakePHP" style=" border-radius: 100%;">';
                    }
                    body += '</div>';
                    body += '<div class="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-10">';
                    body += '<div class="row">';
                    body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeHead">' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '</div>';
                    body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeBody">' + data[i]['universidad'] + '</div>';
                    body += '</div>';
                    body += '</div>';
                    body += '<div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">';
                    body += '</div>';
                    body += '<div class="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7" style="padding-top:10px; padding-bottom:10px; ">';
                    body += '<button type="submit" class="btn btn-sm btn-primary SolicBtn btnAceptarColaborador" alt="' + data[i]['id'] + '">Aceptar</button>';
                    body += '<button type="reset" class="btn btn-sm btn-default  SolicBtn btnRechazarColaborador" alt="' + data[i]['id'] + '" >Ignorar</button>';
                    body += '</div>';
                    body += '</div>';
                    body += '</div>';

                }
                $('.popoverSolicitudes').html(body);

            }
        });


    }

    $(".popoverSugerencias").on("click", ".btnaddColaboradorN", function(e) {

        userid = $(this).attr("alt");
        addColaborador(userid);
        getSolicitudes();
    });

    $(".popoverSolicitudes").on("click", ".btnAceptarColaborador", function(e) {

        userid = $(this).attr("alt");
        invsid = $("#usuarioGeneral").attr("alt");
        //alert(userid)

        $.ajax({
            data: {
                'userid': userid,
                'invsid': invsid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "aceptaSolicitud",
            type: 'POST',
            success: function(data) {

                if (data[0]["status"] == 1) {
                    alert("El investigador fue agregado a lalista de tus amigos!")
                    getSolicitudes();
                    getColaboradores();
                } else {
                    alert("Algo salio mal intente nuvamente por favor!")

                }


            }


        });

    });
    $(".popoverSolicitudes").on("click", ".btnRechazarColaborador", function(e) {

        userid = $(this).attr("alt");
        invsid = $("#usuarioGeneral").attr("alt");
        //alert(userid)

        $.ajax({
            data: {
                'userid': userid,
                'invsid': invsid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "rechazaSolicitud",
            type: 'POST',
            success: function(data) {

                if (data[0]["status"] == 1) {
                    alert("Solicitud rechazada!")
                    getSolicitudes();
                    getColaboradores();
                } else {
                    alert("Algo salio mal intente nuvamente por favor!")

                }


            }


        });

    });

    $("#publicTipoPublicacion").change(function() {
       
        var op = $("#publicTipoPublicacion option:selected").val();
        $.ajax({
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getProyectosMacro",
            type: 'POST',
            success: function(data) {
                console.log("los macro son ");
                console.log(data);
                $("#publicProyectoMacro").html("");
                var body = "";
                if (data.length > 0) {
                    body += '<option value="0">-----Selecciona el proyecto-----</option>'
                    for (var i = 0; i < data.length; i++) {
                        body += '<option value="' + data[i]["id"] + '">' + data[i]['nombre'] + '</option>'
                    }
                    $("#publicProyectoMacro").html(body);
                }

            }
        });
        if (op == 1) {
            $("#publicArticulo").prop('disabled', false);
            $("#publicLibro").prop('disabled', 'disabled');
            $("#publicPonencia").prop('disabled', 'disabled');
            $.ajax({
                data: {
                    'datos': 6,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "getArticulos",
                type: 'POST',
                success: function(data) {
                    $("#publicArticulo").html("");
                    $("#publicLibro").html("");
                    $("#publicPonencia").html("");
                    var body = "";
                    if (data.length > 0) {
                        body += '<option value="0">-----Selecciona-----</option>'
                        for (var i = 0; i < data.length; i++) {
                            body += '<option value="' + data[i]["id"] + '">' + data[i]['titulo'] + '</option>'
                        }
                    } else {
                        body += '<option value="0">Registre un articulo Cientifico primero</option>'
                    }
                    $("#publicArticulo").html(body);
                    $("#publicLibro").html('<option value="null"></option>');
                    $("#publicPonencia").html('<option value="null"></option>');
                }
            });
        }
        if (op == 2) {
            $("#publicArticulo").prop('disabled', 'disabled');
            $("#publicLibro").prop('disabled', false);
            $("#publicPonencia").prop('disabled', 'disabled');
            $.ajax({
                data: {
                    'datos': 6,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "getLibros",
                type: 'POST',
                success: function(data) {
                    $("#publicArticulo").html("");
                    $("#publicLibro").html("");
                    $("#publicPonencia").html("");
                    var body = "";

                    if (data.length > 0) {
                        body += '<option value="0">-----Selecciona-----</option>'
                        for (var i = 0; i < data.length; i++) {
                            body += '<option value="' + data[i]["id"] + '">' + data[i]['titulo'] + '</option>'
                        }
                    } else {
                        $("#publicLibro").html("");
                        body += '<option value="0">Registre un Libro primero</option>'
                    }


                    $("#publicArticulo").html('<option value="null"></option>');
                    $("#publicLibro").html(body);
                    $("#publicPonencia").html('<option value="null"></option>');
                }
            });
        }
        if (op == 3) {
            $("#publicArticulo").prop('disabled', 'disabled');
            $("#publicLibro").prop('disabled', 'disabled');
            $("#publicPonencia").prop('disabled', false);
            $.ajax({
                data: {
                    'datos': 6,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "getPonencias",
                type: 'POST',
                success: function(data) {
                    $("#publicArticulo").html("");
                    $("#publicLibro").html("");
                    $("#publicPonencia").html("");
                    var body = "";

                    if (data.length > 0) {
                        body += '<option value="0">-----Selecciona-----</option>'
                        for (var i = 0; i < data.length; i++) {
                            body += '<option value="' + data[i]["id"] + '">' + data[i]['titulo'] + '</option>'
                        }
                    } else {
                        $("#publicPonencia").html("");
                        body += '<option value="0">Registre una ponencia primero</option>'
                    }
                    $("#publicArticulo").html('<option value="null"></option>');
                    $("#publicLibro").html('<option value="null"></option>');
                    $("#publicPonencia").html(body);
                }
            });


        }
       
       

    });

    $("#btnNPublicacion").click(function() {
       

        $.ajax({
            data: {
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getProyectosMacro",
            type: 'POST',
            success: function(data) {
                
                $("#publicProyectoMacro").html("");
                var body = "";
                if (data.length > 0) {
                    body += '<option value="0">-----Selecciona el proyecto-----</option>'
                    for (var i = 0; i < data.length; i++) {
                        body += '<option value="' + data[i]["id"] + '">' + data[i]['nombre'] + '</option>'
                    }
                    $("#publicProyectoMacro").html(body);
                }

            }
        });
    });


    function getNotification(investigadorid) {

        $.ajax({
            data: {
                'investigadorid': investigadorid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getNotification",
            type: 'POST',
            success: function(data) {
                $(".popoverSugerenciasNotification").html("")
                $(".popoverSugerenciasNotification").html(data.length)


                //console.log("la notificacion es");
                //console.log(data);
                var body = ""
                if (data.length > 0) {
                    //body += '<option value="0">-----Selecciona-----</option>'

                    $(".txtNotificationNumbrer").html("")
                    $(".txtNotificationNumbrer").html(data.length)
                    $(".containerNotificaciones").html("")
                    for (var i = 0; i < data.length; i++) {

                        body += '<a href="#" style="text-decoration: none">'
                        body += '<div class="card">'
                        body += '<div class="row">'
                        body += '<div class="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-2">'
                        body += '<img src="/media/' + data[i]["foto"] + '" class="SolicsizeImg" alt="CakePHP" style=" border-radius: 100%;">'
                        body += '</div>'
                        body += '<div class="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-10">'
                        body += '<div class="row">'
                        body += '<div class="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 SolicTxtSizeHead" style="color:black">'
                        body += '' + data[i]["nombre"] + ' ' + data[i]["apellido"]
                        body += '</div>'
                        body += '<div class="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 SolicTxtSizeBodyNotf">'
                        body += 'Nueva Publicación'
                        body += '</div>'
                        body += '<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 SolicTxtSizeBody" style="color:black">'
                        body += 'Factores de exito para sistemas recomendadores'
                        body += '</div>'
                        body += '<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 SolicTxtSizeBody" style="color:black">'
                        body += '' + data[i]["fecha"] + ' ' + data[i]["hora"]
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div> '
                        body += '</a>'
                    }

                    $(".containerNotificaciones").html(body)
                }
            }
        });

    }

    function addNotification(publicacionid, investigadorid) {

        $.ajax({
            data: {
                'publicacionid': publicacionid,
                'investigadorid': investigadorid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addNotification",
            type: 'POST',
            success: function(data) {
                //console.log("la notificacion es");
                console.log(data);
                if (data[0]["status"] == 1) {
                    getNotification(investigadorid)
                }
            }
        });
    }


    $("#btnPublicacion").click(function() {
        var tema = $("#publicTema").val();
        //alert("tema"+tema);
        var tipoPublicacion = $("#publicTipoPublicacion option:selected").text();
        var tipoPublicacionVal = $("#publicTipoPublicacion").val();
        //alert("tipoPublicacion"+tipoPublicacionVal);
        var articulo = $("#publicArticulo").val();
        //    alert("articulo"+articulo);
        var libro = $("#publicLibro").val();
        //alert("libro"+libro);
        var ponencia = $("#publicPonencia").val();
        //alert("ponencia"+ponencia);
        var proyectoMacro = $("#publicProyectoMacro").val();
        //alert("proyecto macro = "+proyectoMacro)
        var investigador_id = $("#usuarioGeneral").attr("alt");
        //alert("el investigador= "+ investigador_id)

        if (tema == "" || tipoPublicacionVal == 0 || articulo == 0 || libro == 0 || ponencia == 0 || proyectoMacro == 0) {
            alert("No cumple los requisitos para la publicar")
        } else {
            $.ajax({
                data: {
                    'tema': tema,
                    'tipoPublicacion': tipoPublicacion,
                    'articulo': articulo,
                    'libro': libro,
                    'ponencia': ponencia,
                    'proyectoMacro': proyectoMacro,
                    'investigadorid': investigador_id,

                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "addPublicacion",
                type: 'POST',
                success: function(data) {
                    if (data[0]['status'] == 1) {
                        alert("Publicación realizada exitosamente");
                        $('.bd-example-modal-lg').modal('hide');

                        addNotification(data[0]['obj'], investigador_id)
                    } else {
                        alert("Algo salio mal, Intente nuevamente");
                    }
                }
            });

        }
    });

    function getPublicacion() {
        
        var investigador_id = $("#usuarioGeneral").attr("alt");
        console.log(investigador_id)
        $.ajax({
            data: {
                'investigadorid': investigador_id,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getPublicacion",
            type: 'POST',
            success: function(data) {
                console.log("las publicaciones son");
                console.log(data);
                $(".PublicacionContainer").html("");
                var body = "";
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        body += '<div style="padding-top: 20px"></div>'
                        body += '<div class="card">'
                        body += '<div class="card-header">'
                        body += '<div class="col-12" style="padding-top:5px; ">'
                        body += '<a href="/" style=" color:black; text-decoration: none;font-weight:bold;font-size: 16px">'
                        if (data[i]['foto'] == "") {

                            body += '<img src="/media/foto/user.png" alt="' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '" width="30px" height="30px" style="border-radius:100%;">' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '</a>'

                        } else {
                            body += '<img src="/media/' + data[i]['foto'] + '" alt="' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '" width="30px" height="30px" style="border-radius:100%;">' + data[i]['nombres'] + ' ' + data[i]['apellidos'] + '</a>'


                        }
                        body += '</div>'
                        body += '<div style="padding-left: 40px;font-weight:bold; "> ' + data[i]['universidad'] + '</div>'
                        body += '</div>'
                        body += '<div class="card-body">'
                        body += '<div class="row">'
                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">'
                        body += '<h5 class="pubTxtHead" altpubtxthead="' + data[i]['id'] + '" >' + data[i]['tema'] + '</h5>'
                        body += '</div>'
                        body += '<div class="col-7 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">'
                        body += '<div class="card border pubEtqtTxt">' + data[i]['tipo'] + '</div>'
                        body += '</div>'
                        body += '<div class="col-5 col-sm-6 col-md-2 col-lg-2 col-xl-2 ">'
                        if (data[i]['tipo'] == "Ponencia") {

                            body += '<div class="card border pubFechaTxt">' + data[i]['fechaPonencia'] + '</div>'
                        } else {
                            body += '<div class="card border pubFechaTxt">' + data[i]['fechaPublicacion'] + '</div>'

                        }
                        body += '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 "></div>'
                        body += '<div class="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7 " style="padding-top: 20px">'
                        body += '<h5 class="pubTxtHead">Resumen</h5>'
                        body += '<div class="  pubContenTxt">' + data[i]['resumen'] + '</div>'
                        body += '</div>'

                        //body += '<iframe class="d-none d-sm-none d-md-block d-lg-block d-xl-block col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 border" altpuburl="' + data[i]['id'] + '" src="/media/' + data[i]['URLdocumento'] + '" style=" width: auto ; height: auto; padding-top: 20px; border:0"></iframe>'
                        //body +='<a href="http://docs.google.com/viewer?url=http%3A%2F%2Fmeridadesign.com%2Fdemos%2Fquotes.pptx" title="Quotes" target="_blank">http://ecuciencia.utc.edu.ec/media/certificados/Gamboa.docx</a>'
                        body += '<iframe class=" col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 border" altpuburl="' + data[i]['id'] + '" src="http://docs.google.com/viewer?url=' + urlServidor + '/media/' + data[i]['URLdocumento'] + '&embedded=true"  style=" width: auto ; height: auto; padding-top: 20px; border:0"></iframe>'
                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">'
                        body += '<h5 class="pubTxtHead">Autores:</h5>'
                        body += '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7  ">'
                        body += '<div class="row">'
                        for (var j = 0; j < data[i]['autores'].length; j++) {
                            body += '<div class="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-4 " style="padding-top:10px">'
                            body += '<a href="/social/index" style=" color:#01568f; text-decoration: none;font-weight:bold;font-size: 12px">'
                            if (data[i]['autores'][j]['autorFoto'] == "") {
                                body += '<img src="/media/foto/user.png" alt="' + data[i]['autores'][j]['nombres'] + ' ' + data[i]['autores'][j]['apellidos'] + '" width="20px" height="20px" style="border-radius: 100%; "> '
                            } else {
                                body += '<img src="/media/' + data[i]['autores'][j]['autorFoto'] + '" alt="' + data[i]['autores'][j]['nombres'] + ' ' + data[i]['autores'][j]['apellidos'] + '" width="20px" height="20px" style="border-radius: 100%; "> '
                            }
                            body += '' + data[i]['autores'][j]['nombres'] + ' ' + data[i]['autores'][j]['apellidos'] + '</a>'
                            body += '</div>'
                        }
                        body += '</div>'
                        body += '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 " style="padding-top: 5px; color:#01568f">'
                        body += '<div class="row">'
                        body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 " style="padding-left: 10px;">'
                        body += '<div class="row" style="text-align: center;  ">'
                        body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtDescargaPub="' + data[i]['id'] + '">' + data[i]['nDescargas'] + '</div>'
                        body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Descargas</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-left: 10px">'
                        body += '<div class="row" style="text-align: center;  ">'
                        body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtLecturaPub="' + data[i]['id'] + '">' + data[i]['nLecturas'] + '</div>'
                        body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Lecturas</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-left: 10px">'
                        body += '<div class="row" style="text-align: center;  ">'
                        body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtCitaPub="' + data[i]['id'] + '">' + data[i]['nCitas'] + '</div>'
                        body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Citas</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '<div class="card-footer">'
                        body += '<div class="row">'
                        body += '<div class="col-1 col-sm-5 col-md-6 col-lg-7 col-xl-7"></div>'
                        body += '<div class="col-11 col-sm-7 col-md-6 col-lg-5 col-xl-5">'
                        body += '<button type="button" altbtnleerPub="' + data[i]['id'] + '" class="btn btn-primary ACSizeButtom fa fa-eye" id="btnleerPub" data-toggle="modal" data-target="#ModalPdf" style="background: #01568f;" > Leer</button> '
                        body += '<a id="btnModalDowloadpd" href="/media/' + data[i]['URLdocumento'] + '" download="' + data[i]['tema'] + '.pdf" altModalDowloadPdf="' + data[i]['id'] + '" class="btn btn-primary ACSizeButtom fas fa-download" style="background: #01568f; "> Descargar </a> '
                        if (data[i]["Likes"].length == 0) {
                            body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                            body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">0</span>'
                            body += '</a>'
                            body += '<a  id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                            body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >0</span>'
                            body += '</a>'
                        } else {
                            var likes = 0
                            var dislikes = 0
                            invesId = $("#usuarioGeneral").attr("alt");
                            //alert("invesId=" + invesId)
                            var estadoInves = false
                            var estadoLikes = true
                            for (var k = 0; k < data[i]["Likes"].length; k++) {
                                if (data[i]["Likes"][k]["like"] == true) {
                                    likes = likes + 1
                                } else {
                                    dislikes = dislikes + 1
                                }
                                if (data[i]["Likes"][k]["investigadorid"] == invesId && data[i]["Likes"][k]["publicacionid"] == data[i]["id"]) {
                                    estadoInves = true
                                    estadoLikes = data[i]["Likes"][k]["like"]
                                }
                            }
                            if (estadoInves == true) {
                                //alert("entre")
                                if (estadoLikes == true) {
                                    body += '<a  id="btnLikePub"  title="Solicitudes" class="btn fas fa-thumbs-up LikButtom disabled " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                    body += '</a>'
                                    body += '<a id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                    body += '</a>'
                                } else {
                                    body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom  " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                    body += '</a>'
                                    body += '<a  id="btndisLikePub" title="Solicitudes" class="btn fas fa-thumbs-down LikButtom disabled " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                    body += '</a>'
                                }
                            } else {
                                body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom  " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                body += '</a>'
                                body += '<a  id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                body += '</a>'
                            }
                        }
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                    }
                    $(".PublicacionContainer").html(body);

                    getSugerencias();
                    getSolicitudes();

                } else {
                    body += '<h1 > Aun no existen publicaciones que mostrar o es posible que tenga que recargar la página!</h1>'
                    $(".PublicacionContainer").html(body);
                    getSugerencias();
                    getSolicitudes();

                }
            }
        });
    }


    function addDescarga(publicacionid) {
        $.ajax({
            data: {
                'publicacionid': publicacionid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addUpdateDescarga",
            type: 'POST',
            success: function(data) {
                if (data[0]["status"] == 1) {
                    $('[altTxtDescargaPub="' + data[0]["publicacionid"] + '"]').html("");
                    $('[altTxtDescargaPub="' + data[0]["publicacionid"] + '"]').html(data[0]["valor"]);
                }
            }
        });
    }

    function addLectura(publicacionid) {
        //alert(publicacionid)
        $.ajax({
            data: {
                'publicacionid': publicacionid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addUpdateLectura",
            type: 'POST',
            success: function(data) {
                //console.log("lectura==");
                //console.log(data);
                if (data[0]["status"] == 1) {
                    $('[altTxtLecturaPub="' + data[0]["publicacionid"] + '"]').html("");
                    $('[altTxtLecturaPub="' + data[0]["publicacionid"] + '"]').html(data[0]["valor"]);
                }
            }
        });
    }

    function addCita(publicacionid) {
        //alert(publicacionid)
        $.ajax({
            data: {
                'publicacionid': publicacionid,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addUpdateCita",
            type: 'POST',
            success: function(data) {
                //console.log("cita==");
                //console.log(data);
                if (data[0]["status"] == 1) {
                    $('[altTxtCitaPub="' + data[0]["publicacionid"] + '"]').html("");
                    $('[altTxtCitaPub="' + data[0]["publicacionid"] + '"]').html(data[0]["valor"]);
                }
            }
        });
    }

    function addLike(publicacionid, investigadorid, indicador) {
        //alert(publicacionid)
        $.ajax({
            data: {
                'publicacionid': publicacionid,
                'investigadorid': investigadorid,
                'indicador': indicador,

                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "addUpdateLike",
            type: 'POST',
            success: function(data) {
                //console.log("like==");
                //console.log(data);
                if (data[0]["status"] == 1) {
                    if ((data[0]["indicador"] == "update") && (data[0]["tipoPeticion"] == "dislike")) {
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("far")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("fas")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("disabled")
                        var dislike = parseInt($('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text());
                        $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                        $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text(dislike + 1)
                        var like = parseInt($('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text());
                        $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                        if (like == 1) {
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text("0")
                        } else {
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text(like - 1)
                        }
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("fas")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("far")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("disabled")
                    }
                    if ((data[0]["indicador"] == "update") && (data[0]["tipoPeticion"] == "like")) {
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("far")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("fas")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("disabled")
                        var like = parseInt($('[altTxtdisdisLikePubBody="' + data[0]["publicacionid"] + '"]').text());
                        if (isNaN(like)) {
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                            //alert("los dislike anterior son =" +dislike)
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text(1)
                        } else {
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                            $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text(dislike + 1)
                        }
                        var like = parseInt($('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text());
                        $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                        if (like == 1) {
                            $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text("0")
                        } else {
                            $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text(like - 1)
                        }
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("fas")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("far")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("disabled")
                    }
                    if ((data[0]["indicador"] == "add") && (data[0]["tipoPeticion"] == "like")) {
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("far")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("fas")
                        $('[altTxtLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("disabled")
                        $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                        $('[altTxtLikePubBody="' + data[0]["publicacionid"] + '"]').text(1)
                    }
                    if ((data[0]["indicador"] == "add") && (data[0]["tipoPeticion"] == "dislike")) {
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').removeClass("far")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("fas")
                        $('[altTxtdisLikePubHead="' + data[0]["publicacionid"] + '"]').addClass("disabled")
                        $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text("")
                        $('[altTxtdisLikePubBody="' + data[0]["publicacionid"] + '"]').text(1)
                    }
                }
            }
        });


    }

    $(".PublicacionContainer").on("click", "#btnleerPub", function(e) {
        idPub = $(this).attr("altbtnleerPub");
        addLectura(idPub);
        tema = $('[altpubtxthead="' + idPub + '"]').text()
        url = $('[altpuburl="' + idPub + '"]').attr("src")
        urlfinal = window.location.host + url
        var pathname = window.location.pathname;
        $("#txtModalTitlePub").text("");
        $("#txtModalTitlePub").text(tema);
        $(".modalFramePdf").attr("src", "");
        $(".modalFramePdf").attr("src", url);
        $("#btnModalDowloadpdf").attr("href", "");
        $("#btnModalDowloadpdf").attr("href", url);
        $("#btnModalDowloadpdf").attr("download", "");
        $("#btnModalDowloadpdf").attr("download", tema + ".pdf");
        $("#btnModalDowloadpdf").attr("altModalDowloadPdf", "");
        $("#btnModalDowloadpdf").attr("altModalDowloadPdf", idPub);

        $("#btnModalIEEpdf").attr("altModalIEEPdf", "");
        $("#btnModalIEEpdf").attr("altModalIEEPdf", idPub);
        $("#btnModalAPApdf").attr("altModalAPAPdf", "");
        $("#btnModalAPApdf").attr("altModalAPAPdf", idPub);
    });
    $(".PublicacionContainer").on("click", "#btnModalDowloadpd", function(e) {
        publicacionid = $(this).attr("altModalDowloadPdf");
        //alert("download"+publicacionid)
        addDescarga(publicacionid);

    });

    $("#btnModalDowloadpdf").click(function() {
        publicacionid = $("#btnModalDowloadpdf").attr("altModalDowloadPdf");
        addDescarga(publicacionid);
    });

    $(".PublicacionContainer").on("click", "#btnLikePub", function(e) {
        idPub = $(this).attr("altTxtLikePubHead");
        //alert("publicacion="+idPub)
        invid = $("#usuarioGeneral").attr("alt");
        //alert("investigador="+invid)
        addLike(idPub, invid, indicador = true);
    });
    $(".PublicacionContainer").on("click", "#btndisLikePub", function(e) {
        idPub = $(this).attr("altTxtdisLikePubHead");
        invid = $("#usuarioGeneral").attr("alt");
        addLike(idPub, invid, indicador = false);
    });

    function getCita(publicacionid, tCita) {
        $.ajax({
            data: {
                'publicacionid': publicacionid,
                'tCita': tCita,
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getCita",
            type: 'POST',
            success: function(data) {
                console.log("la ciata es");
                console.log(data);
                citaHead = ""
                citaBody = ""
                if (data[0]["status"] == 1 && data[0]["tipoP"] == "Artículo Científico") {
                    if (data[0]["tCita"] == "APA") {
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i]["autores"].length - 1; j++) {
                                var nombres = (data[i]["autores"][j]["nombres"]).split(" ");

                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);

                                    //alert(nombre1)
                                    //alert(nombre2)
                                    if (j == 0) {
                                        citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                        citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                    } else {
                                        citaHead += "," + data[i]["autores"][j]["apellidos"]
                                        citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                    }

                                } else {

                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    if (j == 0) {
                                        citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                        citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                    } else {
                                        citaHead += "," + data[i]["autores"][j]["apellidos"]
                                        citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                    }
                                }


                            }
                            citaHead += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"]
                            citaHead += "," + data[i]["anio"] + ")"
                            var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");
                            if (nombres.length == 1) {
                                var nombre1 = nombres[0].charAt(0);
                                citaBody += " & " + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["nombreRevista"] + "," + data[i]["paginas"] + "."
                            } else {
                                var nombre1 = nombres[0].charAt(0);
                                var nombre2 = nombres[1].charAt(0);
                                citaBody += " & " + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["nombreRevista"] + "," + data[i]["paginas"] + "."
                            }


                        }


                        var citaFInal = 'Cita= " ' + citaHead + ' " ' + ' Bibliografía= " ' + citaBody + '  "'
                        //    console.log(citaHead);
                        //console.log(citaBody)
                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)
                        //copiar(citaFInal)
                    }
                    if (data[0]["tCita"] == "IEE") {

                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i]["autores"].length; j++) {
                                var nombres = (data[i]["autores"][j]["nombres"]).split(" ");
                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + data[i]["autores"][j]["apellidos"] + ","
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + nombre2 + "." + data[i]["autores"][j]["apellidos"] + ","
                                }
                            }

                            var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");
                            if (nombres.length == 1) {
                                var nombre1 = nombres[0].charAt(0);

                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["nombreRevista"] + ",vol." + data[i]["volumen"] + ",nº" + data[i]["numero"] + ",p." + data[i]["paginas"] + "," + data[i]["anio"] + "."
                            } else {

                                var nombre1 = nombres[0].charAt(0);
                                var nombre2 = nombres[1].charAt(0);
                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["nombreRevista"] + ",vol." + data[i]["volumen"] + ",nº" + data[i]["numero"] + ",p." + data[i]["paginas"] + "," + data[i]["anio"] + "."
                            }
                        }
                        var citaFInal = 'Cita= " [1] " ' + ' Bibliografía= " ' + citaBody + '  "'

                        console.log(citaBody)

                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)

                    }

                }
                if (data[0]["status"] == 1 && data[0]["tipoP"] == "Libro") {
                    if (data[0]["tCita"] == "APA") {
                        for (var i = 0; i < data.length; i++) {

                            if (data[i]["autores"].length == 1) {
                                for (var j = 0; j < data[i]["autores"].length; j++) {
                                    var nombres = (data[i]["autores"][j]["nombres"]).split(" ");
                                    if (nombres.length == 1) {
                                        var nombre1 = nombres[0].charAt(0);
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1
                                        }
                                    } else {

                                        var nombre1 = nombres[0].charAt(0);
                                        var nombre2 = nombres[1].charAt(0);
                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2
                                        }
                                    }
                                }
                                citaHead += "," + data[i]["anio"] + ")"
                                var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");

                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    citaBody += ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);

                                    citaBody += ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                }

                            } else {
                                for (var j = 0; j < data[i]["autores"].length - 1; j++) {
                                    var nombres = (data[i]["autores"][j]["nombres"]).split(" ");


                                    if (nombres.length == 1) {
                                        var nombre1 = nombres[0].charAt(0);

                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]

                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                        }

                                    } else {

                                        var nombre1 = nombres[0].charAt(0);
                                        var nombre2 = nombres[1].charAt(0);
                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                        }
                                    }
                                }


                                if (data[i]["autores"].length == 1) {
                                    citaHead += "," + data[i]["anio"] + ")"

                                } else {
                                    citaHead += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"]

                                    citaHead += "," + data[i]["anio"] + ")"

                                }

                                var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");

                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    citaBody += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"] + "," + nombre1 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);

                                    citaBody += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"] + "," + nombre1 + "." + nombre2 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                }

                            }

                        }

                        //alert(citaHead)

                        //alert(citaBody)


                        var citaFInal = 'Cita= " ' + citaHead + ' " ' + ' Bibliografía= " ' + citaBody + '  "'
                        //    console.log(citaHead);
                        //console.log(citaBody)
                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)
                        //copiar(citaFInal)



                    }

                    if (data[0]["tCita"] == "IEE") {
                        // alert("entre")
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i]["autores"].length; j++) {
                                var nombres = (data[i]["autores"][j]["nombres"]).split(" ");
                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + data[i]["autores"][j]["apellidos"] + ","
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + nombre2 + "." + data[i]["autores"][j]["apellidos"] + ","
                                }
                            }

                            var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");
                            if (nombres.length == 1) {
                                var nombre1 = nombres[0].charAt(0);

                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["editorial"] + "," + data[i]["anio"] + "."
                            } else {

                                var nombre1 = nombres[0].charAt(0);
                                var nombre2 = nombres[1].charAt(0);
                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["editorial"] + "," + data[i]["anio"] + "."
                            }
                        }
                        var citaFInal = 'Cita= " [1] " ' + ' Bibliografía= " ' + citaBody + '  "'

                        console.log(citaBody)

                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)

                    }

                }
                if (data[0]["status"] == 1 && data[0]["tipoP"] == "Ponencia") {
                    if (data[0]["tCita"] == "APA") {
                        for (var i = 0; i < data.length; i++) {

                            if (data[i]["autores"].length == 1) {
                                for (var j = 0; j < data[i]["autores"].length; j++) {
                                    var nombres = (data[i]["autores"][j]["nombres"]).split(" ");
                                    if (nombres.length == 1) {
                                        var nombre1 = nombres[0].charAt(0);
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1
                                        }
                                    } else {

                                        var nombre1 = nombres[0].charAt(0);
                                        var nombre2 = nombres[1].charAt(0);
                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2
                                        }
                                    }
                                }
                                citaHead += "," + data[i]["anio"] + ")"
                                var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");

                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    citaBody += ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);

                                    citaBody += ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                }

                            } else {
                                for (var j = 0; j < data[i]["autores"].length - 1; j++) {
                                    var nombres = (data[i]["autores"][j]["nombres"]).split(" ");


                                    if (nombres.length == 1) {
                                        var nombre1 = nombres[0].charAt(0);

                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]

                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + ".,"
                                        }

                                    } else {

                                        var nombre1 = nombres[0].charAt(0);
                                        var nombre2 = nombres[1].charAt(0);
                                        //alert(nombre1)
                                        //alert(nombre2)
                                        if (j == 0) {
                                            citaHead += "(" + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                        } else {
                                            citaHead += "," + data[i]["autores"][j]["apellidos"]
                                            citaBody += "" + data[i]["autores"][j]["apellidos"] + "," + nombre1 + "." + nombre2 + ".,"
                                        }
                                    }
                                }


                                if (data[i]["autores"].length == 1) {
                                    citaHead += "," + data[i]["anio"] + ")"

                                } else {
                                    citaHead += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"]

                                    citaHead += "," + data[i]["anio"] + ")"

                                }

                                var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");

                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    citaBody += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"] + "," + nombre1 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);

                                    citaBody += " & " + data[i]["autores"][data[i]["autores"].length - 1]["apellidos"] + "," + nombre1 + "." + nombre2 + ".(" + data[i]["anio"] + ")." + data[i]["titulo"] + "." + data[i]["editorial"] + "."
                                }

                            }

                        }

                        //alert(citaHead)

                        //alert(citaBody)


                        var citaFInal = 'Cita= " ' + citaHead + ' " ' + ' Bibliografía= " ' + citaBody + '  "'
                        //    console.log(citaHead);
                        //console.log(citaBody)
                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)
                        //copiar(citaFInal)



                    }

                    if (data[0]["tCita"] == "IEE") {
                        // alert("entre")
                        for (var i = 0; i < data.length; i++) {
                            for (var j = 0; j < data[i]["autores"].length; j++) {
                                var nombres = (data[i]["autores"][j]["nombres"]).split(" ");
                                if (nombres.length == 1) {
                                    var nombre1 = nombres[0].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + data[i]["autores"][j]["apellidos"] + ","
                                } else {
                                    var nombre1 = nombres[0].charAt(0);
                                    var nombre2 = nombres[1].charAt(0);
                                    //alert(nombre1)
                                    //alert(nombre2)
                                    citaBody += "" + nombre1 + "." + nombre2 + "." + data[i]["autores"][j]["apellidos"] + ","
                                }
                            }

                            var nombres = (data[i]["autores"][data[i]["autores"].length - 1]["nombres"]).split(" ");
                            if (nombres.length == 1) {
                                var nombre1 = nombres[0].charAt(0);

                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["editorial"] + "," + data[i]["anio"] + "."
                            } else {

                                var nombre1 = nombres[0].charAt(0);
                                var nombre2 = nombres[1].charAt(0);
                                //alert(nombre1)
                                //alert(nombre2)
                                citaBody += " «" + data[i]["titulo"] + ",»" + data[i]["editorial"] + "," + data[i]["anio"] + "."
                            }
                        }
                        var citaFInal = 'Cita= " [1] " ' + ' Bibliografía= " ' + citaBody + '  "'

                        console.log(citaBody)

                        $("#txtTareaModalpdf").val("")
                        $("#txtTareaModalpdf").val(citaFInal)

                    }

                }

            }
        });


    }

    $("#btnModalAPApdf").click(function() {
        publicacionid = $(this).attr("altModalAPAPdf");
        getCita(publicacionid, "APA")
        addCita(publicacionid)

    });
    $("#btnModalIEEpdf").click(function() {
        publicacionid = $(this).attr("altModalIEEPdf")
        getCita(publicacionid, "IEE")
        addCita(publicacionid)
    });


    /*$("#btnCopyCita").click(function() {
        texto = $("#txtTareaModalpdf").val()
        alert(texto)
        copiar(texto)

    });*/

    var clipboard = new ClipboardJS('#btnCopyCita');

    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        e.clearSelection();

        alert("Texto Copiadoa a portapapeles")


    });

    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
        alert("copy no copiado")
    });



    $("#op1PClave").change(function() {
        var idPClave = $("#op1PClave").val()

        $("#op2PClave option[value=" + id1 + "]").removeAttr("disabled");
        $("#op3PClave option[value=" + id1 + "]").removeAttr("disabled");
        $("#op4PClave option[value=" + id1 + "]").removeAttr("disabled");
        $("#op5PClave option[value=" + id1 + "]").removeAttr("disabled");
        id1 = idPClave;
        $("#op2PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op3PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op4PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op5PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
    });
    $("#op2PClave").change(function() {
        var idPClave = $("#op2PClave").val()
        $("#op1PClave option[value=" + id2 + "]").removeAttr("disabled");
        $("#op3PClave option[value=" + id2 + "]").removeAttr("disabled");
        $("#op4PClave option[value=" + id2 + "]").removeAttr("disabled");
        $("#op5PClave option[value=" + id2 + "]").removeAttr("disabled");
        id2 = idPClave;
        $("#op1PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op3PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op4PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op5PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');

    });
    $("#op3PClave").change(function() {
        var idPClave = $("#op3PClave").val()
        $("#op1PClave option[value=" + id3 + "]").removeAttr("disabled");
        $("#op2PClave option[value=" + id3 + "]").removeAttr("disabled");
        $("#op4PClave option[value=" + id3 + "]").removeAttr("disabled");
        $("#op5PClave option[value=" + id3 + "]").removeAttr("disabled");
        id3 = idPClave;
        $("#op1PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op2PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op4PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op5PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');

    });
    $("#op4PClave").change(function() {
        var idPClave = $("#op4PClave").val()
        $("#op1PClave option[value=" + id4 + "]").removeAttr("disabled");
        $("#op2PClave option[value=" + id4 + "]").removeAttr("disabled");
        $("#op3PClave option[value=" + id4 + "]").removeAttr("disabled");
        $("#op5PClave option[value=" + id4 + "]").removeAttr("disabled");
        id4 = idPClave;
        $("#op1PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op2PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op3PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op5PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');

    });
    $("#op5PClave").change(function() {
        var idPClave = $("#op5PClave").val()
        $("#op1PClave option[value=" + id5 + "]").removeAttr("disabled");
        $("#op2PClave option[value=" + id5 + "]").removeAttr("disabled");
        $("#op3PClave option[value=" + id5 + "]").removeAttr("disabled");
        $("#op4PClave option[value=" + id5 + "]").removeAttr("disabled");
        id4 = idPClave;
        $("#op1PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op2PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op3PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');
        $("#op4PClave option[value=" + idPClave + "]").attr("disabled", 'disabled');

    });



    $("#btnAreasConocimiento").click(function() {
        var select1 = $("#op1PClave").val();
        var select2 = $("#op2PClave").val();
        var select3 = $("#op3PClave").val();
        var select4 = $("#op4PClave").val();
        var select5 = $("#op5PClave").val();


        if (select1 == 0 || select2 == 0 || select3 == 0 || select4 == 0 || select5 == 0) {
            alert("Falta seleccionar opciones");

        } else {


            $.ajax({
                data: {
                    'kw1': select1,
                    'kw2': select2,
                    'kw3': select3,
                    'kw4': select4,
                    'kw5': select5,


                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "addKeywords",
                type: 'POST',
                success: function(data) {
                    console.log("la kw add =");
                    console.log(data);
                    if (data[0]['status'] == 1) {

                        window.location = urlGeneral + "index"
                    }
                }
            });
        }
    });




    $.ajax({
        data: {
            'investigadorid': $("#usuarioGeneral").attr("alt"),
            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
        },
        url: urlGeneral + "getMessgeNotification",
        type: 'POST',
        success: function(data) {
            console.log("los mensajes son");
            console.log(data);

            body = ""
            var contador = 0

            $(".containerMsg").html("")

            for (var i = 0; i < data.length; i++) {
                body += '<a href="#"  class="boxuserColaboradores" ind="2"  msgid="' + data[i]["idMensaje"] + '"  nom="' + data[i]["nombre"] + ' ' + data[i]["apellido"] + '" alt="' + data[i]["emisorId"] + '" ft="' + data[i]["foto"] + '" style="text-decoration: none" > '
                if (data[i]["leido"] == false) {
                    body += '<div class="border-bottom" altmsgid="' + data[i]["idMensaje"] + '"  style="background: #edf2fa">'
                    contador = contador + 1
                } else {
                    body += '<div class="border-bottom" >'
                }
                body += '<div class="row">'
                body += '<div class="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-2">'
                body += '<img src="/media/' + data[i]["foto"] + '" class="SolicsizeImg" alt="' + data[i]["nombre"] + '" style=" border-radius: 100%;">'
                body += '</div>'
                body += '<div class="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-10">'
                body += '<div class="row">'
                body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeHead" style="color:black">'
                body += '' + data[i]["nombre"] + ' ' + data[i]["apellido"]
                body += '</div>'
                body += '<div class="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 SolicTxtSizeBody" style="color:black;">'
                body += '' + data[i]["mensaje"]
                body += '</div>'
                body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 SolicTxtSizeBody" style="color:black; font-size:7px; ">'
                body += '' + data[i]["fecha"] + ' ' + data[i]["hora"]
                body += '</div>'
                body += '</div>'
                body += '</div>'
                body += '</div>'
                body += '</div>'
                body += '</a>'

            }

            $(".popoverNotificationSmg").html("")
            $(".popoverNotificationSmg").html(contador)

            $(".containerMsg").html(body)

        }



    });


    $(".inputColaboradoresSeach").keyup(function() {
        var value = $(this).val().toUpperCase();
        indicador = $(this).attr("altIndicador");
        //alert("el indicadicador es " + indicador)



        if (value == '') {
            $(".containerBuscarColaborador").html("")
        } else {

            $.ajax({
                data: {
                    'keyword': value,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
                url: urlGeneral + "seachColaboradores",
                type: 'POST',
                success: function(data) {
                    //console.log("la busqueda es");
                    //console.log(data);
                    body = ""

                    $(".containerBuscarColaborador").html("")


                    for (var i = 0; i < data.length; i++) {
                        body += '<div class="card">'
                        body += '<div class="row">'
                        body += '<div class="col-2 col-sm-2 col-md-2 col-lg-3 col-xl-2">'
                        if (data[i]["foto"] == '') {
                            body += '<img src="/media/foto/user.png" class="SolicsizeImg" alt="' + data[i]["nombre"] + '" style=" border-radius: 100%;"></div>'
                        } else {
                            body += '<img src="/media/' + data[i]["foto"] + '" class="SolicsizeImg" alt="' + data[i]["nombre"] + '" style=" border-radius: 100%;"></div>'
                        }
                        body += '<div class="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-10">'
                        body += '<div class="row">'
                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeHead">' + data[i]["nombre"] + ' ' + data[i]["apellido"] + '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 SolicTxtSizeBody" style="padding-right: 20px">' + data[i]["universidad"] + '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '<div class="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>'
                        body += '<div class="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10" style="padding-top:10px; padding-bottom:10px; ">'
                        if (data[i]["estado"] == 0) {
                            body += '<button type="submit" class="btn btn-sm btn-primary SolicBtn btnaddColaboradorN " alt="' + data[i]["id"] + '" style="font-size: 10px; padding-right: 5px;" >Agregar</button>'
                        }
                        if (indicador == 1) {
                            body += '<button type="submit" class="btn btn-success SolicBtn btnEstadisticas1 " altInvestigadorEstadisticas="' + data[i]["id"] + '"  style="font-size: 9px;">Estadisticas</button>'
                        } else {
                            body += '<button type="submit" class="btn btn-success SolicBtn btnEstadisticas2 " altInvestigadorEstadisticas="' + data[i]["id"] + '"  style="font-size: 9px;">Estadisticas</button>'
                        }




                        body += '</div></div></div></div>'
                    }

                    $(".containerBuscarColaborador").html(body)
                }
            });
        }
    });

    $(".containerBuscarColaborador").on("click", ".btnaddColaboradorN", function(e) {
        userid = $(this).attr("alt");
        addColaborador(userid);
        getSolicitudes();
        $(".containerBuscarColaborador").html("")
        $(".inputColaboradoresSeach").val("")
    });



    function getEstadadisticas(invid) {

        $.ajax({
            data: {

                'idinv': invid,

                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
            },
            url: urlGeneral + "getEstadisticas",
            type: 'POST',
            success: function(data) {
                console.log("las estadisticas son====== ")
                console.log(data);

                $(".ContainerEstadisticas").html("");

                var body = "";
                var dataGraficas = [];
                body += '<div class="card border modalPerfil card-body" style="padding-right: 20px;">'
                body += '<div class="row">'
                body += '<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-2">'
                if (data[0][0]['foto'] == "") {
                    body += '<img class="card-img-top imgEstadisticas" src="/media/foto/user.png" alt="' + data[0][0]['nombres'] + ' ' + data[0][0]['apellidos'] + '" style="border-radius:100%;"></a>'

                } else {

                    body += '<img class="card-img-top imgEstadisticas" src="/media/' + data[0][0]['foto'] + '" alt="' + data[0][0]['nombres'] + ' ' + data[0][0]['apellidos'] + '" style="border-radius:100%;"></a>'
                }
                body += '</div>'
                body += '<div class="col-7 col-sm-7 col-md-7 col-lg-9 col-xl-9">'
                body += '<div class="txtMenuBody"> <br>'
                body += '<br>'
                body += '</div>'
                body += '<div class="txtHeadNombreEstadisticas">'
                body += '' + data[0][0]['nombres'] + ' ' + data[0][0]['apellidos']
                body += '</div>'
                body += '<div class="txtHeadUniversidadEstadisticas">'
                body += '' + data[0][0]['universidad']
                body += '</div>'
                body += '</div>'
                body += '</div>'
                body += '</div>'




                if (data[1].length > 0) {
                    for (var i = 0; i < data[1].length; i++) {
                        body += '<div style="padding-top: 20px"><br></div>'
                        body += '<div class="card bordercard-body">'


                        body += '<div class="card-header">'
                        body += '<div class="col-12" style="padding-top:5px; ">'
                        body += '<a href="/" style=" color:black; text-decoration: none;font-weight:bold;font-size: 16px">'
                        if (data[1][i]['foto'] == "") {
                            body += '<img src="/media/foto/user.png" alt="' + data[1][i]['nombres'] + ' ' + data[1][i]['apellidos'] + '" width="30px" height="30px" style="border-radius:100%;">' + data[1][i]['nombres'] + ' ' + data[1][i]['apellidos'] + '</a>'

                        } else {
                            body += '<img src="/media/' + data[1][i]['foto'] + '" alt="' + data[1][i]['nombres'] + ' ' + data[1][i]['apellidos'] + '" width="30px" height="30px" style="border-radius:100%;">' + data[1][i]['nombres'] + ' ' + data[1][i]['apellidos'] + '</a>'

                        }
                        body += '</div>'
                        body += '<div style="padding-left: 40px;font-weight:bold; "> ' + data[1][i]['universidad'] + '</div>'
                        body += '</div>'
                        body += '<div class="card-body">'
                        body += '<div class="row">'
                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">'
                        body += '<h5 class="pubTxtHead" altpubtxthead="' + data[1][i]['id'] + '" >' + data[1][i]['tema'] + '</h5>'
                        body += '</div>'
                        body += '<div class="col-7 col-sm-6 col-md-3 col-lg-3 col-xl-3 ">'
                        body += '<div class="card border pubEtqtTxt">' + data[1][i]['tipo'] + '</div>'
                        body += '</div>'
                        body += '<div class="col-5 col-sm-6 col-md-2 col-lg-2 col-xl-2 ">'
                        body += '<div class="card border pubFechaTxt">' + data[1][i]['fechaPublicacion'] + '</div>'
                        body += '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-7 col-lg-7 col-xl-7 "></div>'
                        body += '<div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 " style="padding-top: 20px">'
                        body += '<h5 class="pubTxtHead">Resumen</h5>'
                        body += '<div class="  pubContenTxt">' + data[1][i]['resumen'] + '</div>'
                        body += '</div>'

                        body += '<div class=" col-12 col-sm-12 col-md-5 col-lg-6 col-xl-6 border" style=" width: auto ; height: auto; padding-top: 20px; ">'

                        body += '<div id="GraficaEstadisticas' + data[1][i]['id'] + '" altGraficaEstadisticas="' + data[1][i]['id'] + '"></div>'
                        body += '</div>'

                        body += '<div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">'
                        body += '<h5 class="pubTxtHead">Autores:</h5>'
                        body += '</div>'
                        body += '<div class="col-12 col-sm-12 col-md-6 col-lg-7 col-xl-7  ">'
                        body += '<div class="row">'
                        for (var j = 0; j < data[1][i]['autores'].length; j++) {
                            body += '<div class="col-6 col-sm-4 col-md-6 col-lg-4 col-xl-4 " style="padding-top:10px">'
                            body += '<a href="/social/index" style=" color:#01568f; text-decoration: none;font-weight:bold;font-size: 12px">'
                            if (data[1][i]['autores'][j]['autorFoto'] == "") {
                                body += '<img src="/media/foto/user.png" alt="' + data[1][i]['autores'][j]['nombres'] + ' ' + data[1][i]['autores'][j]['apellidos'] + '" width="20px" height="20px" style="border-radius: 100%; "> '
                            } else {
                                body += '<img src="/media/' + data[1][i]['autores'][j]['autorFoto'] + '" alt="' + data[1][i]['autores'][j]['nombres'] + ' ' + data[1][i]['autores'][j]['apellidos'] + '" width="20px" height="20px" style="border-radius: 100%; "> '
                            }
                            body += '' + data[1][i]['autores'][j]['nombres'] + ' ' + data[1][i]['autores'][j]['apellidos'] + '</a>'
                            body += '</div>'
                        }
                        body += '</div>'
                        body += '</div>'

                        /*    body += '<div class="col-12 col-sm-12 col-md-6 col-lg-5 col-xl-5 " style="padding-top: 5px; color:#01568f">'
                            body += '<div class="row">'
                            body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 " style="padding-left: 10px;">'
                            body += '<div class="row" style="text-align: center;  ">'
                            body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtDescargaPub="' + data[i]['id'] + '">' + data[i]['nDescargas'] + '</div>'
                            body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Descargas</div>'
                            body += '</div>'
                            body += '</div>'
                            body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-left: 10px">'
                            body += '<div class="row" style="text-align: center;  ">'
                            body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtLecturaPub="' + data[i]['id'] + '">' + data[i]['nLecturas'] + '</div>'
                            body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Lecturas</div>'
                            body += '</div>'
                            body += '</div>'
                            body += '<div class="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" style="padding-left: 10px">'
                            body += '<div class="row" style="text-align: center;  ">'
                            body += '<div class="col-12" style="font-size: 20px;font-weight:700;" altTxtCitaPub="' + data[i]['id'] + '">' + data[i]['nCitas'] + '</div>'
                            body += '<div class="col-12" style="font-size: 10px;font-weight:600; ">Citas</div>'

                            body += '</div>'

                            body += '</div>'
                            body += '</div>'
                            body += '</div>'*/

                        var graficasTemp = new Array();
                        graficasTemp["publicacionid"] = data[1][i]['id']
                        graficasTemp["descargas"] = data[1][i]['nDescargas']
                        graficasTemp["lecturas"] = data[1][i]['nLecturas']
                        graficasTemp["citas"] = data[1][i]['nCitas']
                        dataGraficas.push(graficasTemp)

                        body += '</div>'
                        body += '</div>'
                        body += '<div class="card-footer">'
                        body += '<div class="row">'
                        body += '<div class="col-1 col-sm-5 col-md-6 col-lg-10 col-xl-10"></div>'
                        body += '<div class="col-11 col-sm-7 col-md-6 col-lg-2 col-xl-2">'
                        //body += '<button type="button" altbtnleerPub="' + data[i]['id'] + '" class="btn btn-primary ACSizeButtom fa fa-eye" id="btnleerPub" data-toggle="modal" data-target="#ModalPdf" style="background: #01568f;" > Leer</button> '
                        body += '<a id="btnModalDowloadpd" href="/media/' + data[1][i]['URLdocumento'] + '" download="' + data[1][i]['tema'] + '.pdf" altModalDowloadPdf="' + data[1][i]['id'] + '" class="btn btn-primary ACSizeButtom fas fa-download" style="background: #01568f; "> Descargar </a> '






                        /*


                        if (data[i]["Likes"].length == 0) {


                            body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                            body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">0</span>'
                            body += '</a>'
                            body += '<a  id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                            body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >0</span>'
                            body += '</a>'


                        } else {
                            var likes = 0
                            var dislikes = 0
                            invesId = $("#usuarioGeneral").attr("alt");
                            //alert("invesId=" + invesId)
                            var estadoInves = false
                            var estadoLikes = true
                            for (var k = 0; k < data[i]["Likes"].length; k++) {
                                if (data[i]["Likes"][k]["like"] == true) {
                                    likes = likes + 1
                                } else {
                                    dislikes = dislikes + 1
                                }
                                if (data[i]["Likes"][k]["investigadorid"] == invesId && data[i]["Likes"][k]["publicacionid"] == data[i]["id"]) {
                                    estadoInves = true
                                    estadoLikes = data[i]["Likes"][k]["like"]
                                }
                            }
                            if (estadoInves == true) {
                                //alert("entre")
                                if (estadoLikes == true) {
                                    body += '<a  id="btnLikePub"  title="Solicitudes" class="btn fas fa-thumbs-up LikButtom disabled " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                    body += '</a>'
                                    body += '<a id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                    body += '</a>'
                                } else {
                                    body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom  " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                    body += '</a>'
                                    body += '<a  id="btndisLikePub" title="Solicitudes" class="btn fas fa-thumbs-down LikButtom disabled " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                    body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                    body += '</a>'
                                }
                            } else {
                                body += '<a  id="btnLikePub"  title="Solicitudes" class="btn far fa-thumbs-up LikButtom  " style="color:#01568f"   altTxtLikePubHead="' + data[i]['id'] + '">'
                                body += '<span class="badge badge-secondary ACSizeButtom" altTxtLikePubBody="' + data[i]['id'] + '">' + likes + '</span>'
                                body += '</a>'
                                body += '<a  id="btndisLikePub" title="Solicitudes" class="btn far fa-thumbs-down LikButtom " style="color:#01568f" altTxtdisLikePubHead="' + data[i]['id'] + '">'
                                body += '<span class="badge badge-secondary ACSizeButtom" altTxtdisLikePubBody="' + data[i]['id'] + '" >' + dislikes + '</span>'
                                body += '</a>'
                            }
                        }*/
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                        body += '</div>'
                    }
                    $(".ContainerEstadisticas").html(body);
                } else {
                    body += '<h1 > Aun no existen Estadisticas que mostrar</h1>'
                    $(".ContainerEstadisticas").html(body);
                }

                //console.log("la data de graficas son ");
                //console.log(dataGraficas);

                //$('[altTxtCitaPub="' + data[0]["publicacionid"] + '"]').html("");
                //$('[altTxtCitaPub="' + data[0]["publicacionid"] + '"]').html(data[0]["valor"]);

                //altGraficaEstadisticas

                for (var i = 0; i < dataGraficas.length; i++) {
                    data = []

                    dataDescargas = []
                    dataDescargas.push('Descargas')
                    dataDescargas.push(dataGraficas[i]["descargas"])
                    dataLecturas = []
                    dataLecturas.push('Lecturas')
                    dataLecturas.push(dataGraficas[i]["lecturas"])
                    dataCitas = []
                    dataCitas.push("Citas")
                    dataCitas.push(dataGraficas[i]["citas"])

                    data.push(dataDescargas)
                    data.push(dataLecturas)
                    data.push(dataCitas)


                    var chart = c3.generate({
                        bindto: '#GraficaEstadisticas' + dataGraficas[i]['publicacionid'],
                        data: {
                            columns: data,
                            type: 'bar',
                            labels: true
                        },
                        bar: {
                            width: {
                                ratio: 0.3 // this makes bar width 50% of length between ticks
                            }
                        }
                    });
                    setTimeout(function() {
                        chart.resize();
                    }, 500);
                }



            }

        });

    }



    $(".btnEstadisticas").click(function() {
        idinv = $("#usuarioGeneral").attr("altuser")

        getEstadadisticas(idinv)
    });

    $(".containerBuscarColaborador").on("click", ".btnEstadisticas1", function(e) {
        idinv = $(this).attr("altInvestigadorEstadisticas");
        getEstadadisticas(idinv)
        $("#ModalPerfil").modal("show")
    });


    $(".containerBuscarColaborador").on("click", ".btnEstadisticas2", function(e) {
        idinv = $(this).attr("altInvestigadorEstadisticas");
        getEstadadisticas(idinv)
    });
    $("#btnMisEstadisticas").click(function() {

        idinv = $("#usuarioGeneral").attr("altuser")
        getEstadadisticas(idinv)
    });

    //programacion administrador de la direccion templates/base1/inicio/de las keywords linea 530 + -

/*
    $(document).mousemove(function(event) {
        $("#texto").text("Coordenadas en del ratón en la parte visible del navegador: " + event.clientX + ", " + event.clientY);
        $("#texto2").text("Coordenadas absolutas del ratón en la página actual: " + event.pageX + ", " + event.pageY);
        alert("conectado")
    });*/



});
