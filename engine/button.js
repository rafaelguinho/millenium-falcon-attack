function Button(elemento, imgButton, x, y, callBack) {

    this.imgButton = imgButton;
    this.x = x;
    this.y = y;
    this.context = elemento.getContext('2d');
    this.elemento = elemento;

    var touch = this;

    this.touchStart = function (e) {

        var x, y;

        if (e.changedTouches) {
            x = e.changedTouches[0].pageX;
            y = e.changedTouches[0].pageY;
        }else{
            x = e.clientX;
            y = e.clientY;
        }

        var rect = {
            x: touch.x,
            y: touch.y,
            width: touch.imgButton.width,
            height: touch.imgButton.height
        };

        if (collides(rect, x, y)) {
            touch.removeEvents();
            callBack();
        }

    }

    function collides(rect, x, y) {

        var left = rect.x,
            right = rect.x + rect.width;

        var top = rect.y,
            bottom = rect.y + rect.height;

        if (right >= x && left <= x
            && bottom >= y && top <= y) {
            return true;
        }

        return false;
    }

    this.elemento.addEventListener('touchstart', this.touchStart);
    this.elemento.addEventListener('click', this.touchStart);
}

Button.prototype = { 
    draw: function () {
        this.context.drawImage(this.imgButton, this.x, this.y, this.imgButton.width, this.imgButton.height);
    },
    removeEvents: function(){
        this.elemento.removeEventListener('touchstart', this.touchStart);
        this.elemento.removeEventListener('click', this.touchStart);
    }
}