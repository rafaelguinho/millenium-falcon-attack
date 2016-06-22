function MilleniumFalcon(context, teclado, imagem, imagemExplosao, touch) {
    "use strict"

    this.context = context;
    this.teclado = teclado;
    this.touch = touch;
    this.imagem = imagem;
    this.x = 0;
    this.y = 0;
    this.velocidade = 0;

    this.imagemExplosao = imagemExplosao;

    this.acabaramVidas = null;
    this.vidasExtras = 3;
    this.stringUnica = 'falcon';
    this.ultimoTiro = new Date().getTime();
}

MilleniumFalcon.prototype = {
    atualizar: function () {

        // var incremento = this.velocidade * this.animacao.decorrido / 1000;

        // if (this.teclado.pressionada(SETA_ESQUERDA) && this.x > 0)
        //     this.x -= incremento;

        // if (this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width)
        //     this.x += incremento;

        // if (this.teclado.pressionada(SETA_ACIMA) && this.y > 0)
        //     this.y -= incremento;

        // if (this.teclado.pressionada(SETA_ABAIXO) && this.y < this.context.canvas.height - this.imagem.height)
        //     this.y += incremento;

        this.x = this.touch.posicaoX() - (this.imagem.width/2);
        this.y = this.touch.posicaoY() - (this.imagem.height/2 + 50);

        this.chewbaccaAtirar();

    },
    chewbaccaAtirar: function () {
        var agora = new Date().getTime();
        var decorrido = agora - this.ultimoTiro;

        if (decorrido < 290) return;

        this.atirar();
        this.ultimoTiro = agora;
    },
    desenhar: function () {

        this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    },
    atirar: function () {
        var t = new Tiro(this.context, this);
        this.animacao.novoSprite(t);
        this.colisor.novoSprite(t);
    },
    retangulosColisao: function () {
        return [
            { x: this.x + 13, y: this.y + 22, largura: 60, altura: 80 }
        ];
    },
    colidiuCom: function (outro) {
        if (outro instanceof TieFighter || outro instanceof Asteroid) {
            this.animacao.excluirSprite(this);
            this.animacao.excluirSprite(outro);
            this.colisor.excluirSprite(this);
            this.colisor.excluirSprite(outro);

            window.navigator.vibrate(300);

            //Gera uma explosão para a nave e uma para
            //o inimigo
            var exp1 = new Explosao(this.context, this.imagemExplosao,
                this.x, this.y);
            var exp2 = new Explosao(this.context, this.imagemExplosao,
                outro.x, outro.y);

            this.animacao.novoSprite(exp1);
            this.animacao.novoSprite(exp2);

            var nave = this;

            exp1.fimDaExplosao = function () {
                nave.vidasExtras--;

                if (nave.vidasExtras < 0) {
                    if (nave.acabaramVidas) nave.acabaramVidas();
                }
                else {
                    nave.colisor.novoSprite(nave);
                    nave.animacao.novoSprite(nave);

                    nave.posicionar();
                }
            }

        }
    },
    posicionar: function () {
        var canvas = this.context.canvas;
        this.x = canvas.width / 2 - 40.83333;
        this.y = canvas.height - 110;
    }
}
