function Button(elemento, imgButton, x, y, callBack) {

    this.imgButton = imgButton;
    this.x = x;
    this.y = y;
    this.context = elemento.getContext('2d');

    var touch = this;

    var touchStart = function (e) {

        var rect = { x: touch.x, 
            y: touch.y, 
            width: touch.imgButton.width, 
            height: touch.imgButton.height };

        if (collides(rect, e.changedTouches[0].pageX, e.changedTouches[0].pageY)){
                elemento.removeEventListener('touchstart', touchStart);
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


    elemento.addEventListener('touchstart', touchStart);
}

Button.prototype = {
    draw: function () {
        this.context.drawImage(this.imgButton, this.x, this.y, this.imgButton.width, this.imgButton.height);
    }
}