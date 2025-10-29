"use strict";

import { RenderService } from "./services/render.service.js";
import { LoginService } from "./services/login.service.js";

LoginService.inicializarDatos();

$("form").on("submit", function (evento) {
  evento.preventDefault();
  let nombreUsuario = $("#usuario").val();
  let password = $("#password").val();

  const resultadoLogin = LoginService.login(nombreUsuario, password);

  if (resultadoLogin.exito) {
    RenderService.redirigir("instrucciones.html");
  } else {
    RenderService.mostrarMensajeError(resultadoLogin.mensaje);
    RenderService.manejarResaltadoInput(
      $("#usuario-container"),
      resultadoLogin.errorUsuario
    );
    RenderService.manejarResaltadoInput(
      $("#password-container"),
      resultadoLogin.errorPassword
    );
  }
});
