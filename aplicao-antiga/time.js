class Time { //ES6

    constructor(nome, escudo) {
        this.nome = nome;
        this.escudo = escudo;

        this.pontos = 0;
        this.gm = 0;
        this.gs = 0;
        this.saldo = 0;
    }

    fimJogo(timeVisitante, golsMarcados, golsSofridos) {
        if (this.foiEmpate(golsMarcados, golsSofridos)) {
            this.empate(golsMarcados, golsSofridos);
            timeVisitante.empate(golsMarcados, golsSofridos);
            return;
        }

        if (this.foiVitoria(golsMarcados, golsSofridos)) {
            this.vitoria(golsMarcados, golsSofridos);
            timeVisitante.derrota(golsSofridos, golsMarcados);
        } else {
            this.derrota(golsMarcados, golsSofridos);
            timeVisitante.vitoria(golsSofridos, golsMarcados);
        }
    }

    foiEmpate(golsMarcados, golsSofridos) {
        return golsMarcados === golsSofridos
    }

    foiVitoria(golsMarcados, golsSofridos) {
        return golsMarcados > golsSofridos;
    }

    empate(golsMarcados, golsSofridos) {
        this.atualizarInfo(1, golsMarcados, golsSofridos);
    }

    vitoria(golsMarcados, golsSofridos) {
        this.atualizarInfo(3, golsMarcados, golsSofridos);
    }

    derrota(golsMarcados, golsSofridos) {
        this.atualizarInfo(0, golsMarcados, golsSofridos);
    }

    atualizarInfo(pontos, golsMarcados, golsSofridos) {
        this.pontos += pontos;
        this.gm += golsMarcados;
        this.gs += golsSofridos;
        this.saldo += this.gm - this.gs;
    }
}