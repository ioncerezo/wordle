"use strict";

function obtenerEstadisticas() {
  return JSON.parse(localStorage.getItem("datosPartida"));
}

export const StatsService = {
  obtenerEstadisticas: obtenerEstadisticas,
};