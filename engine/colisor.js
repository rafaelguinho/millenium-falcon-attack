function Colisor() {
    this.sprites = [];
    this.spritesExcluir = [];
    this.aoColidir = null;
}

Colisor.prototype = {
    novoSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.colisor = this;
    },
    processar: function() {
        
        var jaTestados = new Object();
        
        for(var i = 0, x = this.sprites.length;i < x; i++){
            for(var j = 0, y = this.sprites.length;j < y; j++) {
                if(i == j) continue;
            
                var id1 = this.stringUnica(this.sprites[i]);
                var id2 = this.stringUnica(this.sprites[j]);
                
                if(! jaTestados[id1]) jaTestados[id1] = [];
                if(! jaTestados[id2]) jaTestados[id2] = [];
                
                //se não foi testado o sprite
                if(! (jaTestados[id1].indexOf(id2) >=0 || jaTestados[id2].indexOf(id1) >=0)) {
                     
                    //testa a colisão
                    this.testarColisao(this.sprites[i], this.sprites[j]);
                    
                    jaTestados[id1].push(id2);
                    jaTestados[id2].push(id1);
                }
                
            }
        }
        
        this.processarExclusoes();
    },
    testarColisao: function(sprite1, sprite2) {
        
        var rets1 = sprite1.retangulosColisao();
        var rets2 = sprite2.retangulosColisao();
        
        colisoes:
        for(var i = 0, x = rets1.length;i < x; i++) {
            for(var j = 0, y = rets2.length;j < y; j++) {

                if(this.retangulosColidem(rets1[i], rets2[j])) {
                    sprite1.colidiuCom(sprite2);
                    sprite2.colidiuCom(sprite1);
                    
                    if (this.aoColidir) this.aoColidir(sprite1, sprite2);
                    
                    break colisoes;
                }
            }
        }
    },
    //fórmula da colisão
    retangulosColidem: function(ret1, ret2) {
        return (ret1.x + ret1.largura) > ret2.x &&
            ret1.x < (ret2.x + ret2.largura) &&
            (ret1.y + ret1.altura) > ret2.y &&
            ret1.y < (ret2.y + ret2.altura);
    },
    
    //Cada sprite gera uma string única
    //para verificar quais já foram testadas a colisão
    stringUnica: function(sprite) {
        var retangulos = sprite.retangulosColisao();
        
        //for(var i = 0, x = retangulos.length;i < x; i++) {
            return 'x:'+retangulos[0].x+','+
                 'y:'+retangulos[0].y+','+
                 'l:'+retangulos[0].largura+','+
                 'a:'+retangulos[0].altura+'\n';
        //}
    },
    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },
    
    //Remove, após todos os testes, os sprites
    //que estão fora do jogo
    processarExclusoes: function() {
        var novoArray = [];
        
        for(var i = 0, x = this.sprites.length;i < x; i++) {
            if(this.spritesExcluir.indexOf(this.sprites[i]) == -1)
               novoArray.push(this.sprites[i]);
        }
        
        this.spritesExcluir = [];
        
        this.sprites = novoArray;
    }
}
