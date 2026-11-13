var islas = ["A", "B", "C", "D", "E"];
var filasPorIsla = [18, 17, 17, 16, 17];

var flechas = ["&#8595;", "&#8593;", "&#8595;", "&#8593;", "&#8595;", "&#8593;"];

// guardar lugares: true = ocupado, false = libre
var lugares = [];
var nombres = [];

var pausado = false;

function crearEstacionamiento() {
    var html = "";
    var numero = 0;

    for (var i = 0; i < islas.length; i++) {
        html += '<div class="calle"><span>' + flechas[i] + '</span><span>' + flechas[i] + '</span><span>' + flechas[i] + '</span></div>';

        html += '<div class="isla">';
        for (var f = 0; f < filasPorIsla[i]; f++) {
            html += '<div class="fila">';

            for (var lado = 0; lado < 2; lado++) {
                var nombre = islas[i] + (f * 2 + lado + 1);
                nombres.push(nombre);

                lugares.push(Math.random() < 0.6);

                html += '<div id="lugar' + numero + '" class="lugar" onclick="cambiarLugar(' + numero + ')">' + nombre + '</div>';
                numero++;
            }

            html += '</div>';
        }
        html += '</div>';
    }

    html += '<div class="calle"><span>' + flechas[5] + '</span><span>' + flechas[5] + '</span><span>' + flechas[5] + '</span></div>';

    document.getElementById("estacionamiento").innerHTML = html;

    for (var n = 0; n < lugares.length; n++) {
        pintarLugar(n);
    }
    actualizarDashboard();
}

function pintarLugar(n) {
    var lugar = document.getElementById("lugar" + n);
    if (lugares[n] == true) {
        lugar.className = "lugar ocupado";
        lugar.title = nombres[n] + " - Occupied";
    } else {
        lugar.className = "lugar libre";
        lugar.title = nombres[n] + " - Available";
    }
}

function cambiarLugar(n) {
    lugares[n] = !lugares[n];
    pintarLugar(n);
    actualizarDashboard();
}

// Contar lugares y poner en el dashboard
function actualizarDashboard() {
    var total = lugares.length;
    var ocupados = 0;

    for (var n = 0; n < total; n++) {
        if (lugares[n] == true) {
            ocupados++;
        }
    }

    var libres = total - ocupados;
    var porcentaje = Math.round((ocupados / total) * 100);

    document.getElementById("total").innerHTML = total;
    document.getElementById("ocupados").innerHTML = ocupados;
    document.getElementById("libres").innerHTML = libres;
    document.getElementById("porcentaje").innerHTML = porcentaje + "%";
    document.getElementById("barra-llena").style.width = porcentaje + "%";
}
function simularSensores() {
    if (pausado == true) {
        return;
    }
    var cambios = Math.floor(Math.random() * 3) + 1;
    for (var c = 0; c < cambios; c++) {
        var n = Math.floor(Math.random() * lugares.length);
        lugares[n] = !lugares[n];
        pintarLugar(n);
    }

    actualizarDashboard();
}

// Boton pausa 
function pausar() {
    pausado = !pausado;

    if (pausado == true) {
        document.getElementById("boton-pausa").innerHTML = "Resume sensors";
        document.getElementById("estado-sensores").innerHTML = "Sensors paused";
    } else {
        document.getElementById("boton-pausa").innerHTML = "Pause sensors";
        document.getElementById("estado-sensores").innerHTML = "Sensors running — updating every 3 seconds";
    }
}

crearEstacionamiento();
setInterval(simularSensores, 3000);
