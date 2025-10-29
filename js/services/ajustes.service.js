"use strict";

const CLAVE_AJUSTES = "ajustes";

function guardarAjustes(ajustes) {
  sessionStorage.setItem(CLAVE_AJUSTES, JSON.stringify(ajustes));
}

function obtenerAjustes() {
  let ajustesGuardados = sessionStorage.getItem(CLAVE_AJUSTES);

  if (ajustesGuardados) {
    return JSON.parse(ajustesGuardados);
  } else {
    return {
      intentos: 6,
      longitud: 5,
      duracion: 30,
    };
  }
}

export const AjustesService = {
  guardarAjustes: guardarAjustes,
  obtenerAjustes: obtenerAjustes,
};
