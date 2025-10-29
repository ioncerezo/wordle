"use strict";

import { usuariosJSONString } from "../data/usuarios.data.js";
import { Usuario } from "../models/usuario.models.js";

function inicializarDatos() {
  const usuariosArray = JSON.parse(usuariosJSONString);

  usuariosArray.forEach((usuario) => {
    localStorage.setItem(usuario.usuario, JSON.stringify(usuario));
  });
}

function esPasswordValida(passw) {
  let passwValida = /^[a-zA-Z0-9]+$/;
  return passwValida.test(passw);
}

function login(nombreUsuario, password) {
  const usuarioString = localStorage.getItem(nombreUsuario);

  let resultado = {
    exito: false,
    mensaje: null,
    errorUsuario: false,
    errorPassword: false,
  };

  if (!usuarioString) {
    resultado.mensaje = "No existe el nombre de usuario.";
    resultado.errorUsuario = true;
    return resultado;
  }

  const usuarioJSON = JSON.parse(usuarioString);

  const usuario = new Usuario(
    usuarioJSON.id,
    usuarioJSON.nombre,
    usuarioJSON.apellido,
    usuarioJSON.usuario,
    usuarioJSON.contraseña
  );

  if (!esPasswordValida(password)) {
    resultado.mensaje = "La contraseña debe cumplir con el formato.";
    resultado.errorPassword = true;
    return resultado;
  }

  if (usuario.contraseña !== password) {
    resultado.mensaje = "Contraseña incorrecta.";
    resultado.errorPassword = true;
    return resultado;
  }

  resultado.exito = true;
  return resultado;
}

export const LoginService = {
  inicializarDatos: inicializarDatos,
  login: login,
};
