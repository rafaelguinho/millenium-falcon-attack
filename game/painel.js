function Painel(context, nave, imagemVida) {
    'use strict';
    this.context = context;
    this.nave = nave;
    
    this.imagemVida = imagemVida;
    
    this.pontuacao = 0;
    this.pontuacaoMaxima = 0;
}
Painel.prototype = {
    atualizar: function() {
    
    },
    desenhar: function() {
        var ctx = this.context;
        
        // Pontuação
        ctx.save();
        ctx.fillStyle = 'yellow' ;
        ctx.font = '15px Lcd-Solid' ;
        ctx.fillText("Current "+this.pontuacao, (ctx.canvas.width - 120), 30);
        ctx.fillStyle = 'red' ;
        ctx.fillText("HI "+this.pontuacaoMaxima, (ctx.canvas.width - 190), 30);
        ctx.restore();
        
        var x = 9;
        var y = 10;
        
        for(var i = 1; i<= this.nave.vidasExtras; i++) {
            
            this.context.drawImage(this.imagemVida,x, y);
            
            x += 37;
        }
    }
}
