window.onload = function estados()
{
// Obtenemos el elemento con id “contenido”
var el = document.getElementById("contenido");
// obtenemos todos los elementos con tag LABEL y A que hay dentro del elemento 'el'
var lb = el.getElementsByTagName("label");
var es = el.getElementsByTagName("a");
//posicion inicial del circulo de estado
var aux = 1;
var aux2 = 2;
// recorremos el array de elementos para cambiarles el color del estado
	for (var i=0; i<=lb.length; i++) {
		if (lb[i].innerHTML=="Enviado") {
			es[aux].style.background = '#F5B041'; // naranja
			aux+=6;//suma de la posicion
		}
		else if (lb[i].innerHTML=="Revisado") {
			es[aux].style.background = '#16A085'; // verde
			es[aux+3].className = "btn btn-outline-light btn-sm disabled"; // desabilitar
			aux+=6;//suma de la posicion
		}
		else if (lb[i].innerHTML=="None") {
			lb[i].innerHTML="En Espera";
			es[aux2].style.background = '#F5B041'; // naranja
			es[aux2+3].style.visibility = 'hidden'; // invisible
			aux2+=6;//suma de la posicion
		}
		else if (lb[i].innerHTML=="") {
			lb[i].innerHTML="En Espera";
			es[aux2].style.background = '#F5B041'; // naranja
			es[aux2+3].style.visibility = 'hidden'; // invisible
			aux2+=6;//suma de la posicion
		}
		else if (lb[i].innerHTML=="Aprobado") {
			es[aux2].style.background = '#16A085'; // verde
			es[aux2+3].style.visibility = 'visible'; // visible
			es[aux2+1].className = "btn btn-outline-light btn-sm disabled"; // desabilitar
			aux2+=6;//suma de la posicion
		}
		else if (lb[i].innerHTML=="Denegado") {
			es[aux2].style.background = '#E74C3C'; // rojo
			es[aux2+3].style.visibility = 'hidden'; // invisible
			es[aux2+1].className = "btn btn-outline-light btn-sm disabled"; // desabilitar
			aux2+=6;//suma de la posicion
		}
	}
}

