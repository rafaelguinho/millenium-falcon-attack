var SOM_EXPLOSAO = new Audio();
SOM_EXPLOSAO.src = 'snd/explosao.mp3';
SOM_EXPLOSAO.volume = 0.4;
SOM_EXPLOSAO.load();

function Explosao(context, imagem, x, y) {
    
    this.context = context;
    this.imagem = imagem;
    
    this.spritesheet = new Spritesheet(context,imagem,1,5);
    this.spritesheet.intervalo = 110;
    
    var explosao = this;
    
    this.fimDaExplosao = null;
    
    this.x = x;
    this.y = y;
    
    //Implementando esse método o sprite 
    //executa uma ação ao passar pelo último quandro
    this.spritesheet.fimDoCiclo = function() {
        
        //nesse caso ele é removido do loop de animação
        explosao.animacao.excluirSprite(explosao);
        if(explosao.fimDaExplosao) explosao.fimDaExplosao();
        
    }
    
    SOM_EXPLOSAO.currentTime = 0.0;
    SOM_EXPLOSAO.play();
}

Explosao.prototype = {
    atualizar: function() {
        
    },
    desenhar: function() {
        this.spritesheet.desenhar(this.x, this.y);
        this.spritesheet.proximoQuadro();
    }
}