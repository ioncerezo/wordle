"use strict";
export class Juego {
  constructor(intentosMaximos, longitudMaxima, duracion, palabraSeleccionada) {
    this.tablero = crearMatriz(longitudMaxima, intentosMaximos);
    this.tableroColor = crearMatriz(longitudMaxima, intentosMaximos);
    this.duracion = duracion;
    this.numeroDeIntento = 0;
    this.numeroDeLetra = 0;
    this.intentosMaximos = intentosMaximos;
    this.longitudMaxima = longitudMaxima;
    this.palabra = palabraSeleccionada.split("");
    this.esVictoria = false;
    this.esDerrota = false;
  }
}

function crearMatriz(x, y) {
  return Array(y)
    .fill(null)
    .map(() => Array(x).fill(""));
}
