function Fundo(context, imagem) {
    this.context = context;
    this.imagem = imagem;
    this.velocidade = 0;
    this.posicaoEmenda = 0;

    this.screenWidth = this.context.canvas.width;
    this.newImgHeight = (this.screenWidth * this.imagem.height) / this.imagem.width;
}
Fundo.prototype = {
    atualizar: function() {
        this.posicaoEmenda += this.velocidade * this.animacao.decorrido / 386;
        
        if(this.posicaoEmenda > this.newImgHeight)
            this.posicaoEmenda = 0;
    },
    desenhar: function() {
        var img = this.imagem;

        var posicaoY = this.posicaoEmenda - this.newImgHeight;
        this.context.drawImage(img, 0, posicaoY, this.screenWidth,  this.newImgHeight);
        
        var posicaoY = this.posicaoEmenda;
        this.context.drawImage(img, 0, posicaoY, this.screenWidth, this.newImgHeight);        
    }
}