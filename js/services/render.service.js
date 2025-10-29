"use strict";

const teclado = $("#teclado");
const tablero = $("#tablero");

function crearTablero(longitud, intentos) {
  tablero.empty();
  for (let i = 0; i < intentos; i++) {
    for (let j = 0; j < longitud; j++) {
      tablero.append(`<div data-fila="${i}" data-col="${j}"></div>`);
    }
  }
  tablero.css("grid-template-columns", `repeat(${longitud}, 1fr)`);
  tablero.css("grid-template-rows", `repeat(${intentos}, 1fr)`);
}

function crearTeclado(letras) {
  teclado.empty();
  letras.forEach((letra) => {
    teclado.append(`<div id=${letra}>${letra.toUpperCase()}</div>`);
  });
}

function apretarTecla(tecla) {
  tecla.addClass("tecla-apretada");
}

function soltarTecla(tecla) {
  tecla.removeClass("tecla-apretada");
}

function actualizarTablero(tableroDatos, filaActiva) {
  $("#tablero div").attr("draggable", false).removeClass("dragging");

  tableroDatos.forEach((fila, i) => {
    fila.forEach((valor, j) => {
      let celda = $(`#tablero div[data-fila="${i}"][data-col="${j}"]`);
      celda.text(valor);

      if (i === filaActiva && valor !== "") {
        celda.attr("draggable", true);
      }
    });
  });
}

function actualizarPanelInfo(tiempoRestante) {
  $("#tiempo").text(tiempoRestante);
}

function redirigir(pagina) {
  window.location.href = pagina;
}

function actualizarColores(fila, coloresFila) {
  coloresFila.forEach((color, j) => {
    let letra = $(`#tablero div[data-fila="${fila}"][data-col="${j}"]`);
    switch (color) {
      case 2:
        letra.addClass("verde");
        $(`#${letra.text()}`).css("color", "var(--verde)");
        break;
      case 1:
        letra.addClass("amarillo");
        $(`#${letra.text()}`).css("color", "var(--amarillo)");
        break;
      case 0:
        letra.addClass("gris");
        $(`#${letra.text()}`).css("color", "var(--primario)");
        break;
    }
  });
}

function reproducirSonidoTecla() {
  let sonido = $("#sonido-tecla")[0];
  let randomPitch = Math.random() * 2.0 + 1.0;
  sonido.playbackRate = randomPitch;
  sonido.currentTime = 0;
  sonido.play();
}

function actualizarEstadisticas(datosPartida) {
  crearTitulo(datosPartida);
  crearTableroEmojis(datosPartida);
  crearSeccionEstadisticas(datosPartida);
}

function crearSeccionEstadisticas(datosPartida) {
  let estadisticas = {
    Palabra: datosPartida.palabra.join("").toUpperCase(),
    "Tiempo restante": `${datosPartida.duracion} segundos`,
    "Intentos usados": `${datosPartida.numeroDeIntento}/${datosPartida.intentosMaximos}`,
  };

  for (const titulo in estadisticas) {
    let estadistica = estadisticas[titulo];
    $("#estadisticas").append(
      `<p><span class="titulo-estadistica">${titulo}: </span>${estadistica}</p>`
    );
  }
}

function crearTitulo(datosPartida) {
  if (datosPartida.esVictoria) {
    $("#titulo").text("Felicidades! Has ganado!");
  } else if (datosPartida.duracion === 0) {
    $("#titulo").text("Se acabo el tiempo!");
  } else {
    $("#titulo").text("Suerte la próxima vez!");
  }
}

function crearTableroEmojis(datosPartida) {
  const colores = {
    0: "⬜",
    1: "🟨",
    2: "🟩",
    4: "🔲"
  };

  const pre = $("#tablero-color > pre");
  let tableroEmojis = "";

  for (const fila of datosPartida.tableroColor) {
    for (const casilla of fila) {
      tableroEmojis += colores.hasOwnProperty(casilla) ? colores[casilla] : colores[4];
    }
    tableroEmojis += "\n";
  }

  pre.text(tableroEmojis);

  if ($("#tablero-color > button").length === 0) {
    $("#tablero-color").append("<button>Copiar resultado en Emojis</button>");
    $("#tablero-color > button").addClass("boton-principal");
  }
}

function mostrarMensajeError(mensaje) {
  $("#mensaje-error").text(mensaje);
}

function manejarResaltadoInput(elemento, estaActivado) {
  if (estaActivado) {
    elemento.addClass("input-erronea");
  } else {
    elemento.removeClass("input-erronea");
  }
}

export const RenderService = {
  crearTablero: crearTablero,
  crearTeclado: crearTeclado,
  actualizarTablero: actualizarTablero,
  apretarTecla: apretarTecla,
  soltarTecla: soltarTecla,
  actualizarColores: actualizarColores,
  actualizarEstadisticas: actualizarEstadisticas,
  actualizarPanelInfo: actualizarPanelInfo,
  redirigir: redirigir,
  mostrarMensajeError: mostrarMensajeError,
  manejarResaltadoInput: manejarResaltadoInput,
  reproducirSonidoTecla: reproducirSonidoTecla,
};
