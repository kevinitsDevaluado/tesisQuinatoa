/* ---------------------------------------------------------------------------
   (c) Telefónica I+D, 2013
   Author: Paulo Villegas
   ------------------------------------------------------------------------- */
function D3notok() {
  document.getElementById('sidepanel').style.visibility = 'hidden';
  var nocontent = document.getElementById('nocontent');
  nocontent.style.visibility = 'visible';
  nocontent.style.pointerEvents = 'all';
  var t = document.getElementsByTagName('body');
  var body = document.getElementsByTagName('body')[0];
}
var selectMovie = undefined;
var toggleDiv = undefined;
var clearAndSelect = undefined;
var zoomCall = undefined;
function D3ok() {

  DEBUG = false;
  if( !window.console || !DEBUG ) {
    window.console = {};
    window.console.log = function () {};
  }
  var WIDTH = $("#contenido1").width(),
      HEIGHT = 598,
      SHOW_THRESHOLD = 2.5;
  var activeMovie = undefined;
  var currentOffset = { x : 0, y : 0 };
  var currentZoom = 1.0;
  var xScale = d3.scale.linear()
    .domain([0, WIDTH])
    .range([0, WIDTH]);
  var yScale = d3.scale.linear()
    .domain([0, HEIGHT])
    .range([0, HEIGHT]);
  var zoomScale = d3.scale.linear()
    .domain([1,6])
    .range([1,6])
    .clamp(true);
  var force = d3.layout.force()
    .charge(-320)
    .size( [WIDTH, HEIGHT] )
    .linkStrength( function(d,idx) { return d.weight; } );
  var svg = d3.select("#movieNetwork").append("svg:svg")
    .attr('xmlns','http://www.w3.org/2000/svg')
    .attr("width", WIDTH)
    .attr("height", HEIGHT)
    .attr("id","graph")
    .attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT )
    .attr("preserveAspectRatio", "xMidYMid meet");
  movieInfoDiv = d3.select("#movieInfo");
  function getViewportSize( w ) {
    var w = w || window;
    console.log(w);
    if( w.innerWidth != null ) 
      return { w: w.innerWidth, 
         h: w.innerHeight,
         x : w.pageXOffset,
         y : w.pageYOffset };
    var d = w.document;
    if( document.compatMode == "CSS1Compat" )
      return { w: d.documentElement.clientWidth,
         h: d.documentElement.clientHeight,
         x: d.documentElement.scrollLeft,
         y: d.documentElement.scrollTop };
    else
      return { w: d.body.clientWidth, 
         h: d.body.clientHeight,
         x: d.body.scrollLeft,
         y: d.body.scrollTop};
  }



  function getQStringParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  toggleDiv = function( id, status ) {
    d = d3.select('div#'+id);
    console.log( 'TOGGLE', id, d.attr('class'), '->', status );
    if( status === undefined )
      status = d.attr('class') == 'panel_on' ? 'off' : 'on';
    d.attr( 'class', 'panel_' + status );
    return false;
  }

  clearAndSelect = function (id) {
    toggleDiv('faq','off'); 
    toggleDiv('help','off'); 
    selectMovie(id,true); 
  }

  function getMovieInfo( n, nodeArray ) {
    console.log( "INFO", n );
    info = '<div class="form-group" id="cover" style="background-color: white;">';
    if( n.cover )
      info += '<img class="cover" style="width: 200px; height: 250px;margin: 35px;" src="/media/' + n.cover + '"/>';
    else
      info += '<img class="cover" style="width: 200px; height: 250px;margin: 35px;" src="/static/graficas/similaridad/json/img/usuario.png"/>';
    info +=
    '<img src="/static/graficas/similaridad/json/jh/img/target-32.png" class="action" title="Centrar" onclick="selectMovie('+n.index+',true);"/>';
    info += '<br/></div><div style="clear: both;">';
    if( n.autor ){
      info += '<div class=f><span class=l>Investigador</span>: <span class=d>' 
           + n.autor + '</span></div>';
    }
    if( n.links ) {
      info += '<div class=f style="overflow-y: auto;height: 216px;"><span class=l>Relacionados : </span>: ';
      n.links.forEach( function(idx) {
      info += '<br>';  
      info += '[<a href="javascript:void(0);" onclick="selectMovie('  
       + idx + ',true);">' + nodeArray[idx].autor + '</a>]'
      });
      info += '</div>';
    }
    info += '</div>';
    info += '</div>';
    return info;
  }
$(document).ready(function(){
   $.getJSON("/static/graficas/similaridad/json/jh/data.json", function(data){
      ver(data);
    });
})

function ver(data) {
    $("#searchBox").keyup(function () {
        var query = $("#searchBox").val();
        if (query.length>4) {
            $("#response").html('');
            var myExp = new RegExp(query, 'i');
            $.each(data.nodes, function(index, item) {
               if((item.autor.search(myExp) != -1)){
               if(item.cover!=""){
                    var newOption = "<li class='lista' id='" + item.id + "'><img class='in-foto' src='/media/"+item.cover+"'><p class='list-ing'>"+item.autor+"</p></li>";
                  }else{
                    var newOption = "<li class='lista' id='" + item.id + "'><img class='in-foto' src='/static/graficas/similaridad/json/img/usuario.png'><p class='list-ing'>"+item.autor+"</p></li>";
                  }
                }
               $("#response").append(newOption);
                document.getElementById("response").style.border="1px solid rgb(101, 211, 227)";
            });
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
            $.each(data.nodes, function(index, item) {
               if(item.id==id){
                  showMoviePanel(item);
                  selectMovie(item.index,true);
                  document.getElementById("contenido").style.display="block";
               }
            });
            $("#searchBox").val('');
            document.getElementById("response").style.border="0px";
    });
    

    var nodeArray = data.nodes;
    var linkArray = data.links;
    var infor = d3.set(nodeArray.map(function(data) {return data.index; }));
    console.log("NODES:",nodeArray);
    console.log("LINKS:",linkArray);

    minLinkWeight = 
      Math.min.apply( null, linkArray.map( function(n) {return n.weight;} ) );
    maxLinkWeight = 
      Math.max.apply( null, linkArray.map( function(n) {return n.weight;} ) );
    console.log( "link weight = ["+minLinkWeight+","+maxLinkWeight+"]" );
    force
      .nodes(nodeArray)
      .links(linkArray)
      .start();
    var edge_width = d3.scale.pow().exponent(8)
      .domain( [minLinkWeight,maxLinkWeight] )
      .range([1,3])
      .clamp(true);
    svg.call( d3.behavior.drag()
        .on("drag",dragmove) );
    svg.call( d3.behavior.zoom()
        .x(xScale)
        .y(yScale)
        .scaleExtent([1, 6])
        .on("zoom", doZoom) );
    var networkGraph = svg.append('svg:g').attr('class','grpParent');
    var graphLinks = networkGraph.append('svg:g').attr('class','grp gLinks')
      .selectAll("line")
      .data(linkArray, function(d) {return d.source.index+'-'+d.target.index;} )
      .enter().append("line")
      .style('stroke-width', function(d) { return d.weight;} )///Cambia el grosor de la linea
      .attr("class", "link");

    var graphNodes = networkGraph.append('svg:g').attr('class','grp gNodes')
      .selectAll("circle")
      .data( nodeArray, function(d){ return d.index; } )
      .enter().append("svg:circle")
      .attr('id', function(d) { return "c" + d.index; } )
      .attr('class', function(d) { return 'node level'+d.index;} )
      .attr('r', function(d) { return d.score; } )
      .attr('pointer-events', 'all') 
      .attr("fill", function(d) {return getRandomColor();}) 
      .style("opacity", 0.8)
      .on("click", function(d) {showMoviePanel(d); 
        document.getElementById("contenido").style.display="block";} )
      .on("mouseover", function(d) { highlightGraphNode(d,true,this);  } )
      .on("mouseout",  function(d) { } );
    var graphLabels = networkGraph.append('svg:g').attr('class','grp gLabel')
      .selectAll("g.label")
      .data( nodeArray, function(d){return d.autor} )
      .enter().append("svg:g")
      .attr('id', function(d) { return "l" + d.index; } )
      .attr('class','label');

    labels = graphLabels.append('svg:text')
      .attr('x','-2em')
      .attr('y','-.3em')
      .attr('pointer-events', 'none') 
      .attr('id', function(d) { return "lf" + d.index; } )
      .attr('class','nlabel')
      .text( function(d) { return d.autor; } );
    ////cambio///
    //svg.selectAll("g.label").classed('on',true);
    ////////////////
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    function highlightGraphNode( node, on )
    {
      if( on && activeMovie !== undefined ) {
  console.log("..clear: ",activeMovie);
  highlightGraphNode( nodeArray[activeMovie], false);
  console.log("..cleared: ",activeMovie); 
      }

      console.log("SHOWNODE "+node.index+" ["+node.autor + "]: " + on);
      console.log(" ..object ["+node + "]: " + on);
      circle = d3.select( '#c' + node.index );
      label  = d3.select( '#l' + node.index );
      console.log(" ..DOM: ",label);
      console.log(" ..box CLASS BEFORE:", label.attr("class"));
      console.log(" ..circle",circle.attr('id'),"BEFORE:",circle.attr("class"));
      circle
  .classed( 'main', on );
      label
  .classed( 'on', on || currentZoom >= SHOW_THRESHOLD );
      label.selectAll('text')
  .classed( 'main', on );
      console.log(" ..circle",circle.attr('id'),"AFTER:",circle.attr("class"));
      console.log(" ..box AFTER:",label.attr("class"));
      console.log(" ..label=",label);
      console.log(" ..SIBLINGS ["+on+"]: "+node.links);
      Object(node.links).forEach( function(id) {
  d3.select("#c"+id).classed( 'sibling', on );
  label = d3.select('#l'+id);
  label.classed( 'on', on || currentZoom >= SHOW_THRESHOLD );
  label.selectAll('text.nlabel')
    .classed( 'sibling', on );
      } );
      activeMovie = on ? node.index : undefined;
      console.log("SHOWNODE finished: "+node.index+" = "+on );
      ///Cambio///
    //svg.selectAll("g.label").classed('on',true);
      ///cambio///
    }

    selectMovie = function( new_idx, doMoveTo ) {
      console.log("SELECT", new_idx, doMoveTo );
      doMoveTo = doMoveTo || false;
      if( doMoveTo ) {
  console.log("..POS: ", currentOffset.x, currentOffset.y, '->', 
        nodeArray[new_idx].x, nodeArray[new_idx].y );
  s = getViewportSize();
  width  = s.w<WIDTH ? s.w : WIDTH;
  height = s.h<HEIGHT ? s.h : HEIGHT;
  offset = { x : s.x + width/2  - nodeArray[new_idx].x*currentZoom,
       y : s.y + height/2 - nodeArray[new_idx].y*currentZoom };
  repositionGraph( offset, undefined, 'move' );
      }
      highlightGraphNode( nodeArray[new_idx], true );
      showMoviePanel( nodeArray[new_idx] );
    }
    function showMoviePanel( node ) {
      movieInfoDiv
  .html( getMovieInfo(node,nodeArray) )
  .attr("class","panel_on");
    }
    function repositionGraph( off, z, mode ) {
      console.log( "REPOS: off="+off, "zoom="+z, "mode="+mode );
      var doTr = (mode == 'move');
      if( off !== undefined &&
    (off.x != currentOffset.x || off.y != currentOffset.y ) ) {
  g = d3.select('g.grpParent')
  if( doTr )
    g = g.transition().duration(500);
  g.attr("transform", function(d) { return "translate("+
            off.x+","+off.y+")" } );
  currentOffset.x = off.x;
  currentOffset.y = off.y;
      }
      if( z === undefined ) {
  if( mode != 'tick' )
    return; 
  z = currentZoom;
      }
      else
  currentZoom = z;
      e = doTr ? graphLinks.transition().duration(500) : graphLinks;
      e
  .attr("x1", function(d) { return z*(d.source.x); })
        .attr("y1", function(d) { return z*(d.source.y); })
        .attr("x2", function(d) { return z*(d.target.x); })
        .attr("y2", function(d) { return z*(d.target.y); });
      n = doTr ? graphNodes.transition().duration(500) : graphNodes;
      n
  .attr("transform", function(d) { return "translate("
           +z*d.x+","+z*d.y+")" } );
      l = doTr ? graphLabels.transition().duration(500) : graphLabels;
      l
  .attr("transform", function(d) { return "translate("
           +z*d.x+","+z*d.y+")" } );
    }
    function dragmove(d) {
      console.log("DRAG",d3.event);
      offset = { x : currentOffset.x + d3.event.dx,
     y : currentOffset.y + d3.event.dy };
      repositionGraph( offset, undefined, 'drag' );
    }

    function doZoom( increment ) {
      newZoom = increment === undefined ? d3.event.scale 
          : zoomScale(currentZoom+increment);
      console.log("ZOOM",currentZoom,"->",newZoom,increment);
      if( currentZoom == newZoom )
  return; 
      if( currentZoom<SHOW_THRESHOLD && newZoom>=SHOW_THRESHOLD )
  svg.selectAll("g.label").classed('on',true);
      else if( currentZoom>=SHOW_THRESHOLD && newZoom<SHOW_THRESHOLD )
  ////cambio///
  svg.selectAll("g.label").classed('on',false);
  ///////////////
      s = getViewportSize();
      width  = s.w<WIDTH  ? s.w : WIDTH;
      height = s.h<HEIGHT ? s.h : HEIGHT;
      zoomRatio = newZoom/currentZoom;
      newOffset = { x : currentOffset.x*zoomRatio + width/2*(1-zoomRatio),
        y : currentOffset.y*zoomRatio + height/2*(1-zoomRatio) };
      console.log("offset",currentOffset,"->",newOffset);
      repositionGraph( newOffset, newZoom, "zoom" );
    }

    zoomCall = doZoom;  
    force.on("tick", function() {
      repositionGraph(undefined,undefined,'tick');
    });
    mid = getQStringParameterByName('id')
    if( mid != null )
      clearAndSelect( mid );

    var search_autor = $('#search_autor').val();
    if(search_autor>0){
      $.each(data.nodes, function(index, item) {
        if(item.id==search_autor){
          showMoviePanel(item);
          selectMovie(item.index,true);
          document.getElementById("contenido").style.display="block";
        }
      });
    }
  }
} 


