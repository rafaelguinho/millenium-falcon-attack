function Asteroid(context, imagem, imgExplosao) {
    'use strict';
    this.context = context;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;
    this.imgExplosao = imgExplosao;
    this.stringUnica = 'asteroid'+this.x+this.y;
    
    this.canvasWidth = context.canvas.width;
    this.canvasHeight = context.canvas.height;
    
}

Asteroid.prototype = {
    atualizar: function() {
        
        this.y +=
         this.velocidade * this.animacao.decorrido / 500;
        
        if(this.y > this.canvasHeight) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function() {
        var ctx = this.context;
        var img = this.imagem;
        ctx.drawImage(img, this.x, this.y, img.width, img.height);
    },
    retangulosColisao: function() {
        return [

                {x: this.x, y: this.y, largura: 45, altura: 45}
                
            ];
    },
    colidiuCom: function(outro) {
        if(outro instanceof Tiro) {
            
            //exclui o tiro e a sim mesmo
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(outro);
            
            //gera uma explosão
            var explosao = new Explosao(this.context, this.imgExplosao, this.x, this.y);
            this.animacao.novoSprite(explosao);
        }
    }
}
