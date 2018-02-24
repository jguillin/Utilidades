var cartas = [];
var logs = false;

// Definimos el objeto "objCartas", con tres funciones:
//    - rellenar: crea la baraja con todas las cartas (palo-figura-valor).
//    - visualizar: muestra por consola la baraja completa.
//    - ver: muestra por consola una carta de la baraja.
var objCartas = {};

//    - rellenar: crea la baraja con todas las cartas (palo-figura-valor).
objCartas.rellenar = function (cartas) {
  var palos = ["C", "P", "T", "D"];
  var palosg = ["♥","♠","♣","♦"];
  var figuras = ["AS", "02", "03", "04", "05", "06", "07", "08", "09", "10", " J", " Q", " K"];
  // Las cartas numéricas suman su valor, las figuras suman 10 y el as es un 11 o un 1,
  // según como convenga al jugador.
  var valores = [1,2,3,4,5,6,7,8,9,10,10,10,10];

  cartas = [];
  for (var i=0; i<palos.length; i++){
    for (var j=0; j<figuras.length; j++){
      cartas[cartas.length] = {palo:palos[i], palog:palosg[i], figura:figuras[j], valor:valores[j]};
    }  // fin iteración j
  };  // fin iteración i
  console.log ("Baraja de cartas creada con "+cartas.length+" cartas.");
  return cartas;
};  // Fin función rellenar.

//    - visualizar: muestra por consola la baraja completa.
objCartas.visualizar = function (cartas) {
  var cpalo = "";
  var cfigura = "";
  var cvalor = 0;

  for (var i=0; i<cartas.length; i++) {
    console.log("Carta: "+cartas[i].palo+cartas[i].figura+"; Valor:"+cartas[i].valor);
  };  // fin iteración i
  console.log ("Baraja de cartas contiene "+cartas.length+" cartas.");
};  // Fin función visualizar.

//    - ver: muestra por consola una carta de la baraja.
objCartas.ver = function (vercarta) {
  console.log("Carta: "+vercarta.palo+vercarta.figura+"; Valor: "+vercarta.valor+" .");
};  // Fin función ver.
// ------------------------------------------------------------- FIN objCartas ---------//


// Definimos el objeto "objCrupier", con tres funciones:
//    - barajar: desordena la baraja simulando el barajar.
//    - repartir: saca una carta de la baraja y la quita de la baraja.
//    - valorar: devuelve el valor de la mano (cartas del jugador).
//    - valorarAs: devuelve el valor de la mano (cartas del jugador) pero el As vale 11.
//    - evaluar: determina si según la mano, se ssigue jugando o se planta.
// y dos variables:
//    - mano (array): contendrá las cartas que vaya recogiendo en cada mano.
//    - planta (booleano): determinará si el jugador sigue pidiendo cartas o se planta.
var objCrupier = {};
//    - variables.
objCrupier.mano = [];
objCrupier.planta = false;

//    - barajar: desordena la baraja simulando el barajar.
objCrupier.barajar = function(cartas) {
  var min = 0;
  var max = cartas.length;
  var auxcarta = [];

  // Barajamos unas 300 veces
  console.log ("Barajando...");
  for (var i=0; i<300; i++) {
    var n1carta = Math.floor(Math.random()*(max-min))+min;
    var n2carta = Math.floor(Math.random()*(max-min))+min;

    // intercambiamos las cartas
    auxcarta[0] = cartas[n1carta];
    cartas[n1carta] = cartas[n2carta];
    cartas[n2carta] = auxcarta[0];
  };  // fin iteración i
  console.log ("Cartas Barajadas.");
  return cartas;
};  // fin function

//    - repartir: saca una carta de la baraja y la quita de la baraja.
objCrupier.repartir = function(cartas) {
  var min = 0;
  var max = cartas.length;
  var carta = {};

  if (cartas.length > 0) {
    var n1carta = Math.floor(Math.random()*(max-min))+min;
    carta = cartas[n1carta];
    // quitamos la carta seleccionada de la baraja: ya no se puede entregar a nadie de nuevo.
    cartas.splice(n1carta,1);
    if (logs) {
      console.log("(repartir)Se entrega la carta: "+carta.palo+carta.figura+carta.valor);
    };
  }
  else {
    console.log("La baraja está vacía. Inicie correctamente el juego.");
  };
  return (carta);
};  // fin function

//    - valorar: devuelve el valor de la mano (cartas del jugador).
objCrupier.valorar = function(mano) {
  var totalmano = 0;

  for ( var i=0; i<mano.length; i++) {
    totalmano += mano[i].valor;
  };  // fin iteración i
  return totalmano;
};  // fin function

//    - valorarAs: devuelve el valor de la mano (cartas del jugador) pero el As vale 11.
objCrupier.valorarAs = function(mano) {
  var totalmano = 0;

  for ( var i=0; i<mano.length; i++) {
// Es "As" puede valorarse como 1 o como 11.
// En esta función lo valoramos como 11.
    if (mano[i].valor < 2) {
      totalmano += 11;
    }
    else {
      totalmano += mano[i].valor;
    };
  };  // fin iteración i
  return totalmano;
};  // fin function


//    - evaluar: determina si según la mano, se ssigue jugando o se planta.
objCrupier.evaluar = function(manojugada) {

  var riesgo = 0;
  var riesgo1 = 0;
  var posneg = true;
  var valormano = 0;
  var valormanoas = 0;
  var swplantar = true;

  // Obtenemos el valor de la manoa jugada.
  valormano = this.valorar(manojugada);
  valormanoas = this.valorarAs(manojugada);
  if (logs) {
    console.log("ValorMano: "+ valormano + ".");
    console.log("ValorManoAs: "+ valormanoas + ".");
  };

  // Añadimos "cierto" grado de riesgo para plantarnos.
  riesgo = 21 - valormano;
  riesgo1 = 21 - valormanoas;
  if (logs) {
    console.log("Riesgo: "+ riesgo + ".");
    console.log("Riesgo1: "+ riesgo1 + ".");
  };

  // Si ha obtenido 21 exzactos, nos plantamos.
  if ( riesgo == 0 || riesgo1 == 0 ) {
    swplantar = true;
  }
  else {
    // Si nos pasamos ( 21 - 23 = -2:  "< 0")
    if ( riesgo < 0 || riesgo1 < 0 ) {
      swplantar = true;
    }
    else {
      // Si nos aproximamos a 21 en hasta cinco unidades, nos plantamos.
      if ( (riesgo > 0 && riesgo <= 5) || (riesgo1 > 0 && riesgo1 <= 5) ) {
        swplantar = true;
      }
      else {
        swplantar = false;
      };
    };
  };
  if (logs) {
    console.log("SwPlantar: "+ swplantar + ".");
  };

  return swplantar;
};  // fin function
// ------------------------------------------------------------- FIN objCrupier -------//


// Definimos el objeto "objJugador", con tres funciones:
// Solo con dos variables:
//    - mano (array): contendrá las cartas que vaya recogiendo en cada mano.
//    - planta (booleano): determinará si el jugador sigue pidiendo cartas o se planta.
var objJugador = {};
objJugador.mano = [];
objJugador.planta = false;
// ------------------------------------------------------------- FIN objJugador -------//



// Función Principal.
function blackjack () {

  // Creamos los objetos necesarios en base a los ya creados.
  var miBaraja = objCartas;
  var miCrupier = objCrupier;
  var miJugador = objJugador;

  var totJugador = 0;
  var totCrupier = 0;
  var totJugadorAs = 0;
  var totCrupierAs = 0;

  // Comenzamos la partida.
  cartas = miBaraja.rellenar(cartas);
  //miBaraja.visualizar(cartas);
  cartas = miCrupier.barajar(cartas);
  //miBaraja.visualizar(cartas);

  // Incializamos las variables principales.
  miCrupier.mano = [];
  miCrupier.planta = false;
  miJugador.mano = [];
  miJugador.planta = false;



  // Empezamos lo bueno...
  //  - se reparten las cartas: dos a cada jugador.
  for (var i=0;i<2;i++) {
    // jugador...
    miJugador.mano[miJugador.mano.length] = miCrupier.repartir(cartas);
    // Crupier...
    miCrupier.mano[miCrupier.mano.length] = miCrupier.repartir(cartas);
  };

  // Bucle principal donde se seguiran repartiendo cartas hasta que ambos jugadores se planten..

  // Empezamos por el Jugador.
  var swplanto = false;
  var icontaseguridad = 0;

  while ( !swplanto ) {
    // Valoramos la mano jugada de cada jugador.
    miJugador.planta = miCrupier.evaluar(miJugador.mano);
    swplanto = miJugador.planta;
    // No se planta, sacamos otra carta.
    if ( !swplanto ) {
      miJugador.mano[miJugador.mano.length] = miCrupier.repartir(cartas);
    };
  };  // fin While

  // Seguimos con el Crupier.
  var swplanto = false;
  var icontaseguridad = 0;

  while ( !swplanto ) {
    // Valoramos la mano jugada del Crupier.
    miCrupier.planta = miCrupier.evaluar(miCrupier.mano);
    swplanto = miCrupier.planta;
    // No se planta, sacamos otra carta.
    if ( !swplanto ) {
      miCrupier.mano[miCrupier.mano.length] = miCrupier.repartir(cartas);
    };
  };  // fin While

  // Cartas y Valor de las cartas del Crupier.
  console.log ("Cartas obtenidas por el Crupier:");
  for (var i = 0; i < miCrupier.mano.length; i++ ) {
    objCartas.ver(miCrupier.mano[i]);
  };
  totCrupier = miCrupier.valorar (miCrupier.mano);
  totCrupierAs = miCrupier.valorarAs (miCrupier.mano);
  console.log ("Valor  por el Crupier:");
  console.log (" (normal)  ---> " + totCrupier + ".");
  console.log (" ('suave') ---> " + totCrupierAs + ".");

  // Cartas y Valor de las cartas del Jugador.
  console.log ("Cartas obtenidas por el Jugador:");
  for (var i = 0; i < miJugador.mano.length; i++ ) {
    objCartas.ver(miJugador.mano[i]);
  };
  totJugador = miCrupier.valorar (miJugador.mano);
  totJugadorAs = miCrupier.valorarAs (miJugador.mano);
  console.log ("Valor  por el Jugador:");
  console.log (" (normal)  ---> " + totJugador + ".");
  console.log (" ('suave') ---> " + totJugadorAs + ".");

  // Y gana....
  var strGanador = "";
  var ganajug = false;
  var ganacru = false;


  // Con el siguiente bloque determino si no se han pasado en la mano
  // ambos jugadores, ya sea con la valoración normal o "suave" (AS con valor 11).

  // Si el jugador no se pasa, por ahora puede ganar.
  if ( totJugador <= 21 )  {
    ganajug = true;
  }
  else {
    // Comprobamos si con el "sueve" no se pasa.
    if ( totJugadorAs <= 21 ) {
      ganajug = true;
    };
  };

  // Si el crupier no se pasa, por ahora puede ganar.
  if ( totCrupier <= 21 )  {
    ganacru = true;
  }
  else {
    // Comprobamos si con el "sueve" no se pasa.
    if ( totCrupierAs <= 21 ) {
      ganacru = true;
    };
  };


  // Si ambos jugadores pueden ganar, hay que comprobar los valores de sus cartas,
  // tanto valoradas en modo normal como en "suave" (AS con valor 11).
  if (ganajug && ganacru) {
    // Ambos son posibles ganadores, lo determinar el valor de la mano.
    if ( (totJugador >= totCrupier || totJugadorAs >= totCrupier)
		   && (totCrupier != 21 && totCrupierAs != 21) ) {
      strGanador = "Jugador ( [" + totJugador + "/" + totJugadorAs +
			"] ) mayor/igual que Crupier ( [" + totCrupier + "/" + totCrupierAs + "] )";
    }
    else {
      strGanador = "Crupier ( [" + totCrupier + "/" + totCrupierAs +
			"] ) mayor/igual que Jugador ( [" + totJugador + "/" + totJugadorAs + "] )";
    };
  }
  else {
    if (ganajug == ganacru) {
      // Ambos han perdido.
      strGanador = "Ambos Pierden.";
    }
    else {
      if (ganajug) {
        strGanador = "Jugador";
      }
      else {
        strGanador = "Crupier";
      };
    };
  };

  pintaweb(miJugador.mano , miCrupier.mano , strGanador);

  console.log ("El Ganador de la partida de Blackjack es:" + strGanador + ".");
  console.log ("\n\nIntroduzca de nuevo la orden 'blackjack()' para una nueva partida.");

};  // fin function Principal


// Llamada la programa principa.
//  blackjack();
