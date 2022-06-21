const cards = document.querySelectorAll(".cartas");
let seVirada = false;
let primeiraCarta, segundaCarta;
let bloqueio = false;

function virarCartas(){
    if(bloqueio) return;
    if(this  === primeiraCarta) return;
    this.classList.add('virada');
    if(!seVirada){
        seVirada = true;
        primeiraCarta = this;
        return;
    }
    segundaCarta = this;
    seVirada = false;
    checaPares();
}

function checaPares(){
    if(primeiraCarta.dataset.card === segundaCarta.dataset.card){
        desabilitarCartas();
        return;
    }

    desvirarCartas();
}

function desabilitarCartas(){
    primeiraCarta.removeEventListener('click', virarCartas);
    segundaCarta.removeEventListener('click', virarCartas);
    resetar();
}

function desvirarCartas(){
    bloqueio = true;
    setTimeout(() => {
        primeiraCarta.classList.remove('virada');
        segundaCarta.classList.remove('virada');
        resetar();
    }, 1500);
}

function resetar(){
    [seVirada, bloqueio] = [false, false];
    [primeiraCarta, segundaCarta] = [null, null];
}

(function embaralha(){
    cards.forEach((cartas) => {
        let posicaoAleatoria = Math.floor(Math.random() * 12);
        cartas.style.order = posicaoAleatoria;
    })
}) ();

cards.forEach((cartas) => {
    cartas.addEventListener('click', virarCartas);
});

