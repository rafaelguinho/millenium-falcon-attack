var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_ACIMA = 38;
var SETA_ABAIXO = 40;
var ESPACO = 32;
var ENTER = 13;

function Teclado(elemento) {
    "use strict";
    this.elemento = elemento;

    this.pressionadas = [];

    this.disparadas = [];
    this.wasPressed = false;

    this.funcoesDisparo = [];

    var teclado = this;

    elemento.addEventListener('keydown', function (evento) {
        var tecla = evento.keyCode;
        teclado.pressionadas[tecla] = true;

        if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {
            teclado.disparadas[tecla] = true;

            //executa a função de disparo, vinculada a tecla
            teclado.funcoesDisparo[tecla]();
        }
    });

    elemento.addEventListener('keyup', function (evento) {

        teclado.wasPressed = true;

        //coloquer o setTimeout, para dar um leve delay
        //na mocimentação, não ficando tão "seco"
        setTimeout(function () {

            teclado.pressionadas[evento.keyCode] = false;
            teclado.disparadas[evento.keyCode] = false;

        }, 120);

    });
}

Teclado.prototype = {
    pressionada: function (tecla) {
        return this.pressionadas[tecla];
    },
    hasPressed: function () {
        return this.wasPressed;
    },
    disparou: function (tecla, callback) {
        this.funcoesDisparo[tecla] = callback;
    }
}