function Touch(elemento, context, startCallBack, endCallBack) {
    
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.canvas = context.canvas;
    
    this.arrastando = false;
    this.raio = 90;
    
    var touch = this; 
    this.touchCount = 0;

    var touchStart = function (e) {

        if(startCallBack) startCallBack();

        var posicao = converterParaCanvas(
            e.changedTouches[0].pageX - touch.canvas.offsetLeft,
            e.changedTouches[0].pageY - touch.canvas.offsetTop
        );
        
        var xToque = posicao.x;
        var yToque = posicao.y;

        var distanciaX = Math.abs(touch.x - xToque);
        var distanciaY = Math.abs(touch.y - yToque);

        // Pitágoras
        if (distanciaX ^ 2 + distanciaY ^ 2 <= touch.raio ^ 2) {
            touch.arrastando = true;
            touch.touchCount ++;
            touch.x = xToque;
            touch.y = yToque;
            xAnterior = touch.x;
            yAnterior = touch.y;
        }

        if (navigator.userAgent.match(/Android/i)) {
            e.preventDefault();
        }
    }

    var touchMove = function (e) {
        if (touch.arrastando) {
            xAnterior = touch.x;
            yAnterior = touch.y;

            var posicao = converterParaCanvas(
                e.changedTouches[0].pageX - touch.canvas.offsetLeft,
                e.changedTouches[0].pageY - touch.canvas.offsetTop
            );

            touch.x = posicao.x;
            touch.y = posicao.y;
        }
    }

    var touchEnd = function (e) {
        if(endCallBack && touch.touchCount > 1)endCallBack();
        touch.arrastando = false;
    }

    var converterParaCanvas = function (xToque, yToque) {
        return {
            x: canvas.width * xToque / touch.canvas.offsetWidth,
            y: canvas.height * yToque / touch.canvas.offsetHeight
        };
    }

    elemento.addEventListener('touchstart', touchStart);
    elemento.addEventListener('touchmove', touchMove);
    elemento.addEventListener('touchend', touchEnd);
}

Touch.prototype = {
    posicaoX: function () {
        return this.x;
    },
    posicaoY: function () {
        return this.y;
    }
}