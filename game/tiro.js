var SOM_TIRO = new Audio();
SOM_TIRO.src = 'snd/laser.wav';
SOM_TIRO.volume = 0.1;
SOM_TIRO.load();

function Tiro(context, nave) {
    'use strict';
    
    this.context = context;
    this.nave = nave;
    
    this.largura = 3;
    this.altura = 12;
    //this.x = nave.x + (nave.imagem.width/nave.spritesheet.numColunas) - this.largura / 2;
    this.x = nave.x + 32;
    this.y = nave.y-20;
    this.velocidade = 250;
    this.cor = 'red';
    
    SOM_TIRO.currentTime = 0.0;
    SOM_TIRO.play();
    this.stringUnica =  'tiro'+this.x+this.y;
    
    
}
Tiro.prototype = {
    atualizar: function() {
        this.y -= this.velocidade * this.animacao.decorrido / 500;
        
        if(this.y < 0) {
            this.animacao.excluirSprite(this);
            this.colisor.excluirSprite(this);
        }
    },
    desenhar: function() {
        var ctx = this.context;
        ctx.save();
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.restore();
    },
    retangulosColisao: function() {
      return [ {x: this.x, y: this.y, largura: 6,
            altura: 16} ];
   },
    colidiuCom: function(outro) {
    
    }
}
