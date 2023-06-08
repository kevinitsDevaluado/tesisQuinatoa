$(document).ready(function(){
      $("#similitud1").submit(function(e){
        e.preventDefault();
        $.ajax({
          url:$(this).attr("action"),
          type:$(this).attr("method"),
          data:$(this).serialize(),
          success: function(json){
            //document.getElementById("inf-ko").style.display="none";
            $("#dato1").html("");
            document.getElementById("dato1").style.display="block";
            $("#bubble-chart").html("");
            $("#autores").html("");
            $("#autores").append("AUTORES::"+json.length);
            var countries = json;
            d3.queue()
              .await(createBubbleChart);
  function createBubbleChart() {
  /////////////////////Variables///////////////////////////////////////////////////////
  var populations = countries.map(function(country) { return +country.Population; });
  var populationsX = countries.map(function(country) { return +country.CountryCode; });
  var meanPopulation = d3.mean(populations),
      populationExtent = d3.extent(populations),
      populationScaleZ,
      populationScaleY;
  var meanPopulationX = d3.mean(populationsX),
      populationExtentX = d3.extent(populationsX),
      populationScaleX;
  ////////////////////////////Colores/////////////////////////////////////////////////
  var continents = d3.set(countries.map(function(country) { return country.ContinentCode; }));
  var continentColorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(continents.values());
  ////////////////////////////Tamaño/////////////////////////////////////////////////
  var width = $("#bubble-chart").width(),
      height = $("#bubble-chart").height();
  var svg,
      circles,
      circleSize = { min: 10, max: 50 };
  var circleRadiusScale = d3.scaleSqrt()
    .domain(populationExtent)
    .range([circleSize.min, circleSize.max]);

  var forces,
      forceSimulation;
  var ju=0,jo=0; 
  var pintar=0;       
  ///////////////////////////////////////Funciones/////////////////////////////////////
  createSVG();  
  createCircles();
  createForces();
  createForceSimulation();
  addGroupingListeners();
  //////////////////////////////////////Creación de la Pantalla//////////////////////
  function createSVG() {
    svg = d3.select("#bubble-chart")
      .append("svg")
        .attr("width", width)
        .attr("height", height);
  }
  ////////////////////////////////////Creación de los Circulos//////////////////////
  function createCircles() {
    var formatPopulation = d3.format(",");
    var formatPopulationX = d3.format(",");
    circles = svg.selectAll("circle")
      .data(countries)
      .enter()
        .append("circle")
        .attr("r", function(d) { return circleRadiusScale(d.Population); })
        //.attr('class','circles')
        //.on("mouseover", function(d) {})
        //.on("mouseout", function(d) {})
        .on("click", function(d){
          document.getElementById("dat").innerHTML =d.CountryName;
          ver(d.id_in);
          document.getElementById("inf").click();
        });
    circles.append("title").text(function(d) { return d.CountryName; });          
        updateCircles();
    texto=svg.selectAll("node")
      .data(countries)
      .enter()
      .append("text")
      .attr("font-size","10px")
      .text(function(d) { return d.Nombre; });  
  }
///////////////////////////////Buscar//////////////////////////////////////////////////
  $("#searchBox").keyup(function () {
        var query = $("#searchBox").val();
        if (query.length>2) {
            $.ajax({
                url: '/grafica/search/',
                type: 'POST',
                data: {
                    datos: query,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                    },
                success: function (data) {
                    $("#response").html('');
                    $.each(data, function(index, item) {
                        if(item.foto_in!="a"){
                          var newOption = "<li class='lista' id='" + item.id_in + "'><img class='in-foto' src='"+item.foto_in+"'><p class='list-ing'>"+item.Nombre_in+" "+item.Apellido_in+"</p></li>";
                        }else{
                          var newOption = "<li class='lista' id='" + item.id_in + "'><img class='in-foto' src='/static/graficas/similaridad/json/img/usuario.png'><p class='list-ing'>"+item.Nombre_in+" "+item.Apellido_in+"</p></li>";
                        }
                        $("#response").append(newOption);
                        document.getElementById("response").style.border="1px solid rgb(101, 211, 227)";
                    });
                }
            })
        }else{
            document.getElementById("response").style.border="0px";
            $("#response").html('');
        }
    });
    $('#response').on('click', 'li', function () {
            var perfil = $(this).text();
            var id = $(this).attr("id");
            $("#searchBox").val(perfil);
            $("#response").html("");
            if(pintar==0){
               cicle_search(id);
            }
            $("#searchBox").val('');
            document.getElementById("response").style.border="0px";
            //$("#lineaInves > option[value="+ 2 +"]").prop("selected",true);
            //$("#lineaInves").change();
    });
///////////////////////////////////////Cambia el Color///////////////////////////////////    
  function cicle_search(id){
    circles.attr("fill", function(d) {
          var oi=d.id_in;
            if(id==oi){
               return 'red';
            }else{        
               return continentColorScale(d.ContinentCode);
            }
          })
          .style("opacity", function(d) {
          var oi=d.id_in;
            if(id==oi){
               return 1.5;
            }else{        
               return 0.5;
            }
          });
    ju=id;
    jo=1;
    actualizar(createContinentForces());
  }
//////////////////////////////Pone los Clores a los circulos///////////////////////////
  var cony='';
  function updateCircles() {
    circles
      .attr("fill", function(d) {
        if(cony!=d.ContinentCode){
         enviar(d.ContinentCode,continentColorScale(d.ContinentCode));
         cony=d.ContinentCode;
        }
        return continentColorScale(d.ContinentCode);
      })
      .style("opacity", 0.5); 
  }
///////////////////////////////////////////////////////////////////////////////////////////////  
  function enviar(d,color){
      $('#dato1').append('<div style="width: 100%;background-color:'+color+';text-align: center;">'+d+'</div>');
  }
/////////////////////////////////////////////////////////////////////////////////////////////

  function createContinentForces() {
    var forceStrength = 0.05;
      return {
        x: d3.forceX(continentForceX).strength(forceStrength),
        y: d3.forceY(continentForceY).strength(forceStrength)
      };
      function continentForceX(d) {
        if (d.id_in == ju) {
          return right(width);
        } else {
          return center(width);
        }
      }   

      function continentForceY(d) {
        if (d.id_in == ju) {
          return bottom(height);
        } else {
          return center(height);
        } 
      }

      function left(dimension) { return dimension / 4; }
      function center(dimension) { return dimension / 2; }
      function right(dimension) { return dimension -150; }
      function top(dimension) { return dimension / 4; }
      function bottom(dimension) { return dimension -700; }
    }
/////////////////////////////////////////////////////////////////////////////////////////////
function actualizar(forces) {
      forceSimulation = d3.forceSimulation()
             .force("x", forces.x)
             .force("y", forces.y)
             .force("collide", d3.forceCollide(forceCollide));
      forceSimulation.nodes(countries)
              .on("tick", function() {
                circles
                  .attr("cx", function(d) { return d.x; })
                  .attr("cy", function(d) { return d.y; }); 
                texto
                  .attr("x", function(d) {
                    var nombre=d.Nombre;
                   if(nombre.length>9){
                    return d.x-(circleRadiusScale(d.Population)/1.5);
                   }else{
                   return d.x-(circleRadiusScale(d.Population)/2); }
                   })
                  .attr("y", function(d) { return d.y; });  
              });
    }
/////////////////////////////////////////////////////////////////////////////////////////////  
  function createForces() {
    var forceStrength = 0.05;
    forces = {
      combine:        createCombineForces(),
      population:     createPopulationForces()
    };

    function createCombineForces() {
      return {
        x: d3.forceX(width / 2).strength(forceStrength),
        y: d3.forceY(height / 2).strength(forceStrength)
      };
    }

    function createPopulationForces() {
      var scaledPopulationMargin = circleSize.max;

      populationScaleY = d3.scaleLog()
        .domain(populationExtent)
        .range([height - scaledPopulationMargin, scaledPopulationMargin*2]);

      populationScaleX = d3.scaleLog()
        .domain(populationExtentX)
        .range([scaledPopulationMargin, width - scaledPopulationMargin*2]);
      return {
        x: d3.forceX(function(d) {
            return populationScaleX(d.CountryCode) 
          }).strength(forceStrength),
        y: d3.forceY(function(d) {
          return populationScaleY(d.Population);
        }).strength(forceStrength)
      };
    }

  }

  function createForceSimulation() {
    forceSimulation = d3.forceSimulation()
      .force("x", forces.combine.x)
      .force("y", forces.combine.y)
      .force("collide", d3.forceCollide(forceCollide));
    forceSimulation.nodes(countries)
      .on("tick", function() {
        circles
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; }); 
        texto
          .attr("x", function(d) {
            var nombre=d.Nombre;
           if(nombre.length>9){
            return d.x-(circleRadiusScale(d.Population)/1.5);
           }else{
           return d.x-(circleRadiusScale(d.Population)/2); }
           })
          .attr("y", function(d) { return d.y; });  
      });
  }
  
  function forceCollide(d) {
    if(jo>0){
      if(d.id_in==ju){
        return circleRadiusScale(0);
      }else{
        return circleRadiusScale(d.Population);
      }
      jo=0;
    }else{
      return circleRadiusScale(d.Population);
    }
  }

  function addGroupingListeners() {
    addListener("#combine",         forces.combine);
    addListener("#population",      forces.population);

    function addListener(selector, forces) {
      d3.select(selector).on("click", function() {
        updateForces(forces);
        if(selector == "#population"){
           pintar=1;
           document.getElementById("dato1").style.display="none";
           //document.getElementById("inf-buscar").style.display="none";
           togglePopulationAxes(true);
        }else{
           pintar=0;
           document.getElementById("dato1").style.display="block";
           //document.getElementById("inf-buscar").style.display="block";
           togglePopulationAxes(false);
        }
        
      });
    }

function updateForces(forces) {
      forceSimulation
        .force("x", forces.x)
        .force("y", forces.y)
        //.force("collide", d3.forceCollide(forceCollide))
        .force("collide", d3.forceCollide(0))
        .alphaTarget(0.5)
        .restart();
    }

function togglePopulationAxes(showAxes) {
      var onScreenXOffset = 40,
          offScreenXOffset = -40;
      var onScreenYOffset = 40,
          offScreenYOffset = 100;

      if (d3.select(".x-axis").empty()) {
        createAxes();
      }
      var xAxis = d3.select(".x-axis"),
          yAxis = d3.select(".y-axis");

      if (showAxes) {
        translateAxis(xAxis, "translate(0," + (height - onScreenYOffset) + ")");
        translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");
      } else {
        translateAxis(xAxis, "translate(0," + (height + offScreenYOffset) + ")");
        translateAxis(yAxis, "translate(" + offScreenXOffset + ",0)");
      }

      function createAxes() {
        var numberOfTicks = 10,
            tickFormat = ".0s";

        var xAxis = d3.axisBottom(populationScaleX)
          .ticks(numberOfTicks, tickFormat);

        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
          .call(xAxis)

        var yAxis = d3.axisLeft(populationScaleY)
          .ticks(numberOfTicks, tickFormat);
        svg.append("g")
          .attr("class", "y-axis")
          .attr("transform", "translate(" + offScreenXOffset + ",0)")
          .call(yAxis);
      }

      function translateAxis(axis, translation) {
        axis
          .transition()
          .duration(500)
          .attr("transform", translation);
      }
    }
  }

}

                         
          }
        })
      })
})

