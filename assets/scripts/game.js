let game = {

    cartas: null,
    modoBloqueio: false,
    primeiraCarta: null,
    segundaCarta: null,

    personagens: [
        "menezes",
        "lucia",
        "fatima",
        "lana",
        "marconi",
        "thiago",
        "thayse",
        "thalyne",
        "maecio",
        "maely",
        "mayla",
        "mailson",
        "juan",
        "nicoly",
        "clara",
        "breno",
        "lis",
        "joao",
    ],

    //Método para pegar duas cartas quando elas forem clicadas.
    porCarta(id) {
        let carta = this.cartas.filter(carta => carta.id === id)[0]

        if (carta.inverso || this.modoBloqueio) {
            return false
        }

        if (!this.primeiraCarta) {
            this.primeiraCarta = carta
            this.primeiraCarta.inverso = true
            return true
        } else {
            this.segundaCarta = carta
            this.segundaCarta.inverso = true
            this.modoBloqueio = true
            return true
        }
    },

    //Método para verificar se as duas cartas são iguais.
    verificarCartas: function () {
        if (!this.primeiraCarta || !this.segundaCarta) {
            return false
        }
        return this.primeiraCarta.icone === this.segundaCarta.icone

    },

    // Método para limpar as cartas para assim, o cliente conseguir selecionar duas cartas novamente.
    limparCartas: function () {
        this.primeiraCarta = null
        this.segundaCarta = null
        this.modoBloqueio = false
    },

    /*Método para caso as cartas não se batam, você desvirar elas. Mas não no sentido de 
    animação e sim de propriedade, para assim ela poder ser selecionada novamente.*/
    desvirarCartas: function () {
        this.primeiraCarta.inverso = false
        this.segundaCarta.inverso = false
        this.limparCartas()
    },

    // Método para verificar se o game acabou.
    verificarGameOver: function () {
        return game.cartas.filter(carta => !carta.inverso).length === 0
    },

    // Método de criação de cartas a partir do array de personagens.
    criarCartasParaPerso: function () {
        this.cartas = []

        this.personagens.forEach(personagem => {
            this.cartas.push(this.criarParesParaPerso(personagem))
        })

        this.cartas = this.cartas.flatMap(par => par)
        this.embaralharCartas()
        return this.cartas
    },

    // Método para criar os pares das cartas.
    criarParesParaPerso: function (personagem) {
        return [{
            id: this.criarIdParaPerso(personagem),
            icone: personagem,
            inverso: false
        },
        {
            id: this.criarIdParaPerso(personagem),
            icone: personagem,
            inverso: false
        }]
    },

    //Método para criar um id diferente para cada personages para assim, pudemos identificar cada carta mesmo se ela tiver o mesmo ícone. 
    criarIdParaPerso: function (personagem) {
        return personagem + parseInt(Math.random() * 1000)
    },

    //Método para embaralhar cartas.
    embaralharCartas: function () {

        let indexAtual = this.cartas.length
        let indexRandom = 0

        while (indexAtual !== 0) {
            indexRandom = Math.floor(Math.random() * indexAtual)
            indexAtual--
            [this.cartas[indexAtual], this.cartas[indexRandom]] = [this.cartas[indexRandom], this.cartas[indexAtual]]
        }

    },

}