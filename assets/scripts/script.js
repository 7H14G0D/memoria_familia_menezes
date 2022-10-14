// Atribuindo classes a constantes.
const FRONT = "card-front"
const BACK = "card-back"
const CARD = "card"
const ICON = "icon"


iniciarJogo()

function iniciarJogo() {
    inicializarCartas(game.criarCartasParaPerso())
}

// Função de criação dos elementos das cartas e implementação ao tabuleiro.
function inicializarCartas() {

    let tabuleiro = document.getElementById("tabuleiro")
    tabuleiro.innerHTML = ''

    game.cartas.forEach(carta => {
        let elementoCarta = document.createElement('div')
        elementoCarta.id = carta.id
        elementoCarta.classList.add(CARD)
        elementoCarta.dataset.icon = carta.icone

        criarConteudoDaCarta(carta, elementoCarta)

        elementoCarta.addEventListener('click', virarCarta)

        tabuleiro.appendChild(elementoCarta)
    })

}

// Função atrelando argumentos a outra função para criar os conteúdo das cartas.
function criarConteudoDaCarta(carta, elementoCarta) {
    criarFaceCarta(FRONT, carta, elementoCarta)
    criarFaceCarta(BACK, carta, elementoCarta)
}

//Função para criar o conteúdo de dentro das cartas front e back.
function criarFaceCarta(face, carta, elemento) {
    let FaceCarta = document.createElement('div')
    FaceCarta.classList.add(face)

    if (face == FRONT) {
        let imgIcon = document.createElement('img')
        imgIcon.classList.add(ICON)
        imgIcon.alt = "Imagem do personagem"
        imgIcon.src = "./assets/images/" + carta.icone + ".png"
        FaceCarta.appendChild(imgIcon)
    } else {
        let imgTwd = document.createElement('img')
        imgTwd.classList.add("img-twd")
        imgTwd.alt = "Logo do The Walking dead em pixel art"
        imgTwd.src = "./assets/images/twd-logo.png"
        FaceCarta.appendChild(imgTwd)
    }
    elemento.appendChild(FaceCarta)

}

// Função atribuída ao evento de click as cartas
function virarCarta() {

    if (game.porCarta(this.id)) {

        this.classList.add('flip')

        if (game.segundaCarta) {
            if (game.verificarCartas()) {
                game.limparCartas()
                if (game.verificarGameOver()) {
                    let gameOver = document.getElementById('gameOver')
                    gameOver.style = "display: flex"
                }
            } else {
                setTimeout(() => {
                    let primeiraCarta = document.getElementById(game.primeiraCarta.id)
                    let segundaCarta = document.getElementById(game.segundaCarta.id)

                    primeiraCarta.classList.remove('flip')
                    segundaCarta.classList.remove('flip')
                    game.desvirarCartas()
                }, 1000)
            }
        }
    }
}

//Função atribuída ao botão de recomeçar para recomeçar o jogo.
function restart() {
    let gameOver = document.getElementById('gameOver')
    gameOver.style = "display: none"
    iniciarJogo()
}
