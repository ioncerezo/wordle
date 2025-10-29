"use strict";

import { juegoActual, setJuegoActual } from "../data/juego.data.js";
import { AjustesService } from "./ajustes.service.js";
import { Juego } from "../models/juego.models.js";
import { palabras } from "../data/constantes.data.js";

function obtenerPalabra(longitudMaxima) {
  let array = palabras[longitudMaxima];
  return array[Math.floor(Math.random() * array.length)];
}

function iniciarPartida() {
  const ajustes = AjustesService.obtenerAjustes();

  const nuevoJuego = new Juego(
    ajustes.intentos,
    ajustes.longitud,
    ajustes.duracion,
    obtenerPalabra(ajustes.longitud)
  );

  //Log solo para que sea mas fácil corregir y comprobar su funcionamiento
  console.log("PALABRA A ADIVINAR: " + nuevoJuego.palabra.join(""))

  setJuegoActual(nuevoJuego);

  return {
    longitud: nuevoJuego.longitudMaxima,
    intentos: nuevoJuego.intentosMaximos,
    tiempo: nuevoJuego.duracion,
    tablero: nuevoJuego.tablero,
  };
}

function manejarPulsacionDeLetra(teclaPresionada) {
  switch (teclaPresionada) {
    case "backspace":
      manejarBackspace();
      break;
    case "enter":
      return manejarEnter();
    default:
      manejarLetras(teclaPresionada);
      break;
  }

  return {
    tablero: juegoActual.tablero,
    partidaTerminada: false,
    colores: null,
    fila: juegoActual.numeroDeIntento,
    longitud: juegoActual.longitudMaxima,
  };
}

function intercambiarLetras(colOrigen, colDestino) {
  let filaActual = juegoActual.numeroDeIntento;
  let tableroFila = juegoActual.tablero[filaActual];

  let temp = tableroFila[colOrigen];
  tableroFila[colOrigen] = tableroFila[colDestino];
  tableroFila[colDestino] = temp;

  return juegoActual.tablero;
}

function manejarLetras(teclaPresionada) {
  if (
    juegoActual.numeroDeLetra < juegoActual.longitudMaxima &&
    juegoActual.numeroDeIntento < juegoActual.intentosMaximos
  ) {
    juegoActual.tablero[juegoActual.numeroDeIntento][
      juegoActual.numeroDeLetra++
    ] = teclaPresionada;
  }
}

function manejarEnter() {
  let palabraEscogida = juegoActual.tablero[juegoActual.numeroDeIntento];
  let palabra = juegoActual.palabra;

  let sePuedePulsar =
    juegoActual.numeroDeLetra == juegoActual.longitudMaxima &&
    juegoActual.numeroDeIntento < juegoActual.intentosMaximos;

  if (sePuedePulsar) {
    const infoCorreccion = corregirPalabra(palabraEscogida, palabra);

    juegoActual.numeroDeIntento++;
    juegoActual.numeroDeLetra = 0;

    manejarFinalPartida(palabraEscogida, palabra);

    return {
      tablero: juegoActual.tablero,
      colores: infoCorreccion.colores,
      fila: infoCorreccion.fila,
      longitud: juegoActual.longitudMaxima,
      partidaTerminada: juegoActual.esVictoria || juegoActual.esDerrota,
    };
  }

  return { tablero: juegoActual.tablero, partidaTerminada: false };
}

function guardarPartida() {
  localStorage.setItem("datosPartida", JSON.stringify(juegoActual));
}

function manejarFinalPartida(palabraEscogida, palabra) {
  let sonIguales =
    palabraEscogida.join("").toString() === palabra.join("").toString();
  if (sonIguales) {
    juegoActual.esVictoria = true;
  }

  if (juegoActual.numeroDeIntento >= juegoActual.intentosMaximos) {
    juegoActual.esDerrota = true;
  }

  guardarPartida();
}

function corregirPalabra(palabraEscogida, palabra) {
  let nIntento = juegoActual.numeroDeIntento;

  for (let i = 0; i < palabraEscogida.length; i++) {
    let letra = palabraEscogida[i];
    if (letra === palabra[i]) {
      //Verde
      juegoActual.tableroColor[nIntento][i] = 2;
    } else if (palabra.includes(letra)) {
      //Amarillo
      juegoActual.tableroColor[nIntento][i] = 1;
    } else {
      //Gris
      juegoActual.tableroColor[nIntento][i] = 0;
    }
  }
  return {
    colores: juegoActual.tableroColor[nIntento],
    fila: nIntento,
  };
}

function manejarBackspace() {
  if (juegoActual.numeroDeLetra > 0) {
    juegoActual.numeroDeLetra--;
    juegoActual.tablero[juegoActual.numeroDeIntento][
      juegoActual.numeroDeLetra
    ] = "";
  }
}

function bajarContadorTiempo() {
  juegoActual.duracion--;
  if (juegoActual.duracion <= 0) {
    juegoActual.esDerrota = true;
    guardarPartida();
  }

  return {
    tiempo: juegoActual.duracion,
    partidaTerminada: juegoActual.esDerrota,
  };
}

export const JuegoService = {
  iniciarPartida: iniciarPartida, // <-- Nueva función
  manejarPulsacionDeLetra: manejarPulsacionDeLetra,
  bajarContadorTiempo: bajarContadorTiempo,
  guardarPartida: guardarPartida,
  intercambiarLetras: intercambiarLetras,
};
