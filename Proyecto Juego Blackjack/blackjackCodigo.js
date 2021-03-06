//BLACJACK project

var baraja = {
  crearBaraja: function() {
    var palos = ["C", "D", "P", "T"];
    var figuras = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var valores = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    var baraja = [];
    var n = 0;

    for (var i=0; i<palos.length; i+=1) {
      for (var j=0; j<figuras.length; j+=1) {
        baraja[n] = {palo: palos[i], valor: valores[j]}
    }
  }
    return baraja;
  }
}

//Definimos objeto croupier

var croupier = {
  mano: [],
  puntuacion: 0,
  mazo: baraja.crearBaraja(),
  barajar: function(){
    for(var i=0; i<100; i=i+1){
      var empezar = Math.floor(Math.random()*this.mazo.length);
      var final= Math.floor(Math.random()*this.mazo.length);
      var caja= this.mazo[final];
      this.mazo[final]= this.mazo[empezar];
      this.mazo[empezar]= caja;
  }
},
repartir: function(jugador, croupier){
  jugador.mano[jugador.mano.length]= this.mazo.shift();
  croupier.mano[croupier.mano.length]= this.mazo.shift();
},
puntua: function(persona){
  persona.puntuacion=0;
  for(var i=0; i<persona.mano.length; i=i+1){
    persona.puntuacion=persona.mano[i];
  }
},
elGanador: function (jugador, croupier){
  console.log("La puntuación del Jugador es: " + miJugador.puntuacion);
  console.log("La puntuación del Croupier es: " + miCroupier.puntuacion);
  var msg= "";
  if(jugador.puntuacion > croupier.puntuacion) {msg= "El ganador es el Jugador, con una puntuación de " + jugador.puntuacion + "puntos";}
  if(jugador.puntuacion < croupier.puntuacion) {msg= "El ganador es el Croupier, con una puntuación de " + croupier.puntuacion + "puntos";}
  if(jugador.puntuacion === croupier.puntuacion) {msg= "Has obtenido un empate con una puntuación de " + jugador.puntuacion + "puntos";}
    console.log(msg);
    alert(msg);
  }
}

//Definimos objeto jugador

var jugador = {
  puntuacion:0,
  mano:[],
  pasar: function(){
  if(this.mano[0].valor>9) return true;
  }
}

var miCroupier = croupier;
var miJugador = jugador;
do {
    miCroupier.repartir(miJugador, miCroupier);
    miCroupier.puntua(miJugador);
    miCroupier.puntua(miCroupier);
 
  }
  while(miJugador.pasar()){
  miCroupier.elGanador(miJugador, miCroupier);
}