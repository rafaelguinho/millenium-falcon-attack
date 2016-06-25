//Controla todo o loop de animação
function Animacao(context){
    'use strict';
	this.context = context;
	this.sprites = [];
    this.ligado=false;
    this.processamentos = [];
        
    this.spritesExcluir = [];
    this.processamentosExcluir = [];
        
    this.ultimoCiclo = 0;
    this.decorrido = 0;
}
Animacao.prototype={
    novoProcessamento: function(processamento) {
        this.processamentos.push(processamento);
        processamento.animacao = this;
    },
	novoSprite:function(sprite){
		this.sprites.push(sprite);
        sprite.animacao = this;
	},
	ligar:function(){
        this.ultimoCiclo = 0;
        this.ligado = true;
        this.proximoFrame();
	},
	desligar: function(){
		this.ligado = false;
	},
	proximoFrame:function(){
		if(!this.ligado)return;

         this.processarExclusoes();
        
        //cronometra o tempo de cada animação
        //com esse tempo definido os valores da "movimentação"
        //de cada sprite consulta esse valor e faz o cálculo
        //para definir quando deve se movimentar
        var agora = new Date().getTime();
        if(this.ultimoCiclo == 0) this.ultimoCiclo = agora;
        
        this.decorrido = agora - this.ultimoCiclo;

		for(var i = 0, j = this.sprites.length;i < j; i++){
            this.sprites[i].atualizar();
            this.sprites[i].desenhar();
        }

        for(var i = 0, j = this.processamentos.length;i < j; i++)
            this.processamentos[i].processar();
        
        this.ultimoCiclo = agora;

		var animacao = this;
        
		requestAnimationFrame(function(){
			animacao.proximoFrame();
		});
	},
	limparTela: function(){
		var ctx = this.context;
		ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
	},
    excluirSprite: function(sprite) {
        this.spritesExcluir.push(sprite);
    },
    excluirProcessamento: function(processamento) {
        this.processamentosExcluir.push(processamento);
    },
    
    //Após todo o loop de animação
    //faz o processamento de tudo que deve ser removido
    //da memória
    processarExclusoes: function() {
        var novoSprites = [];
        var novoProcessamentos = [];
        
        for(var i = 0, count = this.sprites.length;i < count; i++) {
            if (this.spritesExcluir.indexOf(this.sprites[i]) == -1)
                novoSprites.push(this.sprites[i]);
        }

        for(var i = 0, j = this.processamentos.length;i < j; i++) {
            if (this.processamentosExcluir.indexOf(this.processamentos[i]) == -1)
                novoProcessamentos.push(this.processamentos[i]);
        }
        
        // Limpar os arrays de exclusões
        this.spritesExcluir = [];
        this.processamentosExcluir = [];
        // Substituir os arrays velhos pelos novos
        this.sprites = novoSprites;
        this.processamentos = novoProcessamentos;

    }
}
