
var hpAliado = 500;
var hpAliadoMax = 500;
var ataqueAD = 65; 
var armaduraAliado = 35;


var nivelDarius = 1;
var hpEnemigoMax = 450;
var hpEnemigoActual = 450;
var armaduraEnemigo = 20;

function actualizarInterfaz(textoEvento) {
    
    document.getElementById("hp-aliado").innerText = Math.floor(hpAliado) + "/" + hpAliadoMax;
    document.getElementById("hp-enemigo").innerText = Math.floor(hpEnemigoActual) + "/" + hpEnemigoMax;
    document.getElementById("nivel-enemigo").innerText = nivelDarius;
    document.getElementById("log-combate").innerText = textoEvento;

    
    let porcAliado = (hpAliado / hpAliadoMax) * 100;
    let porcEnemigo = (hpEnemigoActual / hpEnemigoMax) * 100;
    
    document.getElementById("BarraVida-aliado").style.width = Math.max(0, porcAliado) + "%";
    document.getElementById("BarraVida-enemigo").style.width = Math.max(0, porcEnemigo) + "%";
}

function ejecutarAtaque() {
    
    var multiplicadorDano = 100 / (100 + armaduraEnemigo);
    var danoBase = (Math.random() * ataqueAD) + 10;
    var danoFinalRealizado = danoBase * multiplicadorDano;

    hpEnemigoActual -= danoFinalRealizado;

    if (hpEnemigoActual < 0) hpEnemigoActual = 0;

    let mensaje = "¡Garen usa Juicio! Daño físico realizado: " + Math.floor(danoFinalRealizado);


    if (hpEnemigoActual <= 0) {
        mensaje = "¡Darius ha sido ejecutado!";
        actualizarInterfaz(mensaje);
        setTimeout(subirDeNivelGrieta, 1000);
        return;
    }

    
    var adEnemigoBase = 40 + (nivelDarius * 15);
    var probabilidadAtaque = Math.random();

    if (probabilidadAtaque >= 0.4) { 
        var multiplicadorDefensaAliado = 100 / (100 + armaduraAliado);
        var danoRecibido = (adEnemigoBase * Math.random()) * multiplicadorDefensaAliado;

        hpAliado -= danoRecibido;
        mensaje = "¡Darius contraataca! Daño recibido: " + Math.floor(danoRecibido);
    }

    if (hpAliado <= 0) {
        hpAliado = 0;
        actualizarInterfaz("HAS SIDO DERROTADO. Reapareciendo...");
        setTimeout(resetearPartida, 1500);
        return;
    }

    actualizarInterfaz(mensaje);
}

function subirDeNivelGrieta() {
    nivelDarius++;
 
    hpEnemigoMax = 450 + (nivelDarius * 80);
    hpEnemigoActual = hpEnemigoMax;
    armaduraEnemigo += 5;
    
   
    hpAliado = hpAliadoMax; 

    actualizarInterfaz("¡Darius ha subido al Nivel " + nivelDarius + "!");
}

function resetearPartida() {
    hpAliado = 500;
    nivelDarius = 1;
    hpEnemigoMax = 450;
    hpEnemigoActual = 450;
    armaduraEnemigo = 20;
    actualizarInterfaz("¡Partida Reiniciada! Bienvenidos a la Grieta.");
}