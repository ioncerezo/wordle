"use strict";

import { RenderService } from "./services/render.service.js";
import { StatsService } from "./services/stats.service.js";

$(document).ready(function () {
  const datosPartida = StatsService.obtenerEstadisticas();
  RenderService.actualizarEstadisticas(datosPartida);
});

$("#restart").on("click", function () {
  RenderService.redirigir("juego.html");
});

$("#close").on("click", function () {
  RenderService.redirigir("index.html");
});

$("#ajustes").on("click", function () {
  RenderService.redirigir("instrucciones.html");
});

$("#tablero-color").on("click", "button", function () {
  let tablero = $("#tablero-color > pre");
  navigator.clipboard.writeText(tablero.text());
  $(this).text("Copiado! :D").css("background-color", "var(--verde)");
});
