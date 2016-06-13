function TouchButton(elemento, imgButton) {

    var touch = this;

    var touchStart = function (e) {
        var rect = {};

        if (collides(rect, e.changedTouches[0].pageX,
            e.changedTouches[0].pageY)) {

        }


    }

    function collides(rect, x, y) {
        var isCollision = false;

        var left = rect.x,
            right = rect.x + rect.width;

        var top = rect.y,
            bottom = rect.y + rect.height;

        if (right >= x
            && left <= x
            && bottom >= y
            && top <= y) {
            isCollision = true;
        }

        return isCollision;
    }


    elemento.addEventListener('touchstart', touchStart);
}