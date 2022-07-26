/*
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;
//REFERENCIAS DEL HTML
const btnPedir = document.querySelector("#btn-pedir");
const puntaje = document.querySelectorAll("small");
const divJugadorCartas = document.querySelector("#jugador-cartas");
const divComputadoraCartas = document.querySelector("#computadora-cartas");
const btnDetener = document.querySelector("#btn-detener");
const btnNuevo = document.querySelector("#btn-nuevo");

//Create a new deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);

  return deck;
};

crearDeck();

//Take a card
const pedirCarta = () => {
  if (deck.length == 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();

  return carta;
};

//turno computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora = puntosComputadora + valorCarta(carta);
    puntaje[1].innerText = puntosComputadora;

    //   <!-- <img class="carta" src="assets/cartas/10D.png"> -->
    const crearCarta = document.createElement("img");
    crearCarta.src = `assets/cartas/${carta}.png`;
    crearCarta.classList.add("carta");
    divComputadoraCartas.append(crearCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      alert("Nadie gana");
    } else if (puntosMinimos > 21) {
      alert("Computadora gana");
    } else if (puntosComputadora > 21) {
      alert("Jugador gana");
    } else {
      alert("Computadora gana");
    }
  }, 100);
};

// pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const valor = valorCarta(pedirCarta());

// Eventos

btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  puntaje[0].innerText = puntosJugador;

  //   <!-- <img class="carta" src="assets/cartas/10D.png"> -->
  const crearCarta = document.createElement("img");
  crearCarta.src = `assets/cartas/${carta}.png`;
  crearCarta.classList.add("carta");
  divJugadorCartas.append(crearCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador == 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  deck = []
  deck = crearDeck();
  btnPedir.disabled = false;
  btnDetener.disabled = false;
  puntosJugador = 0;
  puntosComputadora = 0;
  puntaje[0].innerText = 0;
  puntaje[1].innerText = 0;
  divComputadoraCartas.innerHTML = "";
  divJugadorCartas.innerHTML = "";
});
