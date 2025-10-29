"use strict";

import { RenderService } from "./services/render.service.js";
import { JuegoService } from "./services/juego.service.js";
import { abecedario } from "./data/constantes.data.js";

const datosIniciales = JuegoService.iniciarPartida();

//RENDERIZADO DEL JUEGO
RenderService.actualizarPanelInfo(datosIniciales.tiempo);
RenderService.crearTablero(datosIniciales.longitud, datosIniciales.intentos);
RenderService.crearTeclado(abecedario);
RenderService.actualizarTablero(datosIniciales.tablero, 0);

const objetoContador = setInterval(contador, 1000);

function contador() {
  const estadoTiempo = JuegoService.bajarContadorTiempo();

  RenderService.actualizarPanelInfo(estadoTiempo.tiempo);

  if (estadoTiempo.partidaTerminada) {
    clearInterval(objetoContador);
    RenderService.redirigir("estadisticas.html");
  }
}

function manejarLogicaDeJuego(teclaPresionada) {
  RenderService.apretarTecla($("#" + teclaPresionada));
  RenderService.reproducirSonidoTecla();

  const estadoJuego = JuegoService.manejarPulsacionDeLetra(teclaPresionada);

  RenderService.actualizarTablero(estadoJuego.tablero, estadoJuego.fila);

  if (estadoJuego.colores) {
    RenderService.actualizarColores(
      estadoJuego.fila,
      estadoJuego.colores,
      estadoJuego.longitud
    );
  }

  if (estadoJuego.partidaTerminada) {
    clearInterval(objetoContador);
    RenderService.redirigir("estadisticas.html");
  }
}

//LISTENERS
$(document).on("keydown", function (evento) {
  let teclaPresionada = evento.key.toLowerCase();
  if (abecedario.includes(teclaPresionada)) {
    manejarLogicaDeJuego(teclaPresionada);
  }
});

$(document).on("keyup", function (evento) {
  let teclaPresionada = evento.key.toLowerCase();
  if (abecedario.includes(teclaPresionada)) {
    RenderService.soltarTecla($("#" + teclaPresionada));
  }
});

$("#teclado > div").on("mousedown", function () {
  manejarLogicaDeJuego($(this).attr("id"));
});

$(document).on("mouseup", function () {
  RenderService.soltarTecla($("#teclado > div"));
});

$("#btn-ajustes").on("click", function () {
  RenderService.redirigir("instrucciones.html");
});

$("#cerrar-sesion").on("click", function () {
  RenderService.redirigir("index.html");
});

let colOrigenDrag = null;

$("#tablero").on("dragstart", "div[draggable=true]", function () {
  colOrigenDrag = $(this).data("col");
  $(this).addClass("dragging");
});

$("#tablero").on("dragover", "div[draggable=true]", function (evento) {
  evento.preventDefault();
  $(this).addClass("dragover");
});

$("#tablero").on("dragleave", "div[draggable=true]", function () {
  $(this).removeClass("dragover");
});

$("#tablero").on("drop", "div[draggable=true]", function () {
  $(this).removeClass("dragover");

  if (colOrigenDrag === null) return;

  let colDestinoDrag = $(this).data("col");
  let filaDrag = $(this).data("fila");

  if (colOrigenDrag !== colDestinoDrag) {
    const nuevoTablero = JuegoService.intercambiarLetras(
      colOrigenDrag,
      colDestinoDrag
    );
    RenderService.actualizarTablero(nuevoTablero, filaDrag);
  }

  colOrigenDrag = null;
  $(".dragging").removeClass("dragging");
});

$("#tablero").on("dragend", "div[draggable=true]", function () {
  colOrigenDrag = null;
  $(".dragging").removeClass("dragging");
  $(".dragover").removeClass("dragover");
});
