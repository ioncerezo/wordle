"use strict";

import { RenderService } from "./services/render.service.js";
import { AjustesService } from "./services/ajustes.service.js";

let rangeIntentos = $("#intentos");
let spanIntentos = $("#intentos-instrucciones");
let spanLongitud = $("#longitud-instrucciones");
let spanDuracion = $("#duracion-instrucciones");
let rangeLongitud = $("#longitud");
let rangeDuracion = $("#duracion");
let selectDificultad = $("#predefinidos");

$(document).ready(function () {
  cambiarAjustes(6, 5, 30);
  selectDificultad.val("facil");
});

rangeIntentos.on("input change", function () {
  spanIntentos.text(rangeIntentos.val());
  selectDificultad.val("personalizada");
});

rangeLongitud.on("input change", function () {
  spanLongitud.text(rangeLongitud.val());
  selectDificultad.val("personalizada");
});

rangeDuracion.on("input change", function () {
  spanDuracion.text(rangeDuracion.val());
  selectDificultad.val("personalizada");
});

selectDificultad.on("change", function () {
  let opcion = selectDificultad.val();
  switch (opcion) {
    case "facil":
      cambiarAjustes(6, 5, 30);
      break;
    case "intermedio":
      cambiarAjustes(4, 6, 40);
      break;
    case "dificil":
      cambiarAjustes(5, 7, 60);
      break;
  }
});

$("form").on("submit", function (evento) {
  evento.preventDefault();
  let ajustes = {
    intentos: Number(rangeIntentos.val()),
    longitud: Number(rangeLongitud.val()),
    duracion: Number(rangeDuracion.val()),
  };
  AjustesService.guardarAjustes(ajustes);
  RenderService.redirigir("juego.html");
});

function cambiarAjustes(intentos, longitud, duracion) {
  rangeIntentos.val(intentos);
  spanIntentos.text(intentos);
  rangeLongitud.val(longitud);
  spanLongitud.text(longitud);
  rangeDuracion.val(duracion);
  spanDuracion.text(duracion);
}
