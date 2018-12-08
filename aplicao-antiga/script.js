Vue.filter('ucwords', function (valor) {
    return valor.charAt(0).toUpperCase() + valor.slice(1)
});

Vue.component('my-app', {
    template: `
    <div class="container">
        {{$parent.param1}}
        {{$root.param1}}
        <titulo></titulo>
        <div class="row">
            <div class="col-md-12">
               <!--<novo-jogo :times="times" @novo-jogo="showPlacar($event)"></novo-jogo>-->
               <novo-jogo :times="times"></novo-jogo>
            </div>
        </div>
        <br>
        <div class="row">
            <!--<div class="col-md-12" v-show="visao!='tabela'">-->
                <!--<placar :time-casa="timeCasa" :time-fora="timeFora" @fim-jogo="showTabela($event)"></placar>-->
            <!--</div>-->
            <div class="col-md-12" v-show="visao === 'tabela'">
                <tabela-clubes :times="times"></tabela-clubes>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            times: [],
            timeCasa: null,
            timeFora: null,
            visao: 'tabela'
        };
    },
    methods: {
        showTabela(event) {
            console.log(event);
            this.visao = 'tabela'
        },
        showPlacar({timeCasa, timeFora}) {
            this.timeCasa = timeCasa;
            this.timeFora = timeFora;
            this.visao = 'placar';
        }
    }
});

Vue.component('titulo', {
    template: `
    <div class="row"> <!--root element -->
        <h1 @click="clique">Campeonato Brasileiro - Série A - 2018 {{$parent.visao}}</h1>
    </div>
    `,
    methods: {
        clique() {
            console.log(this.$parent.$parent.param1);
        }
    }
});

//kebab

Vue.component('tabela-clubes', {
    //props: ['times'],
    data() {
        return {
            busca: '',
            ordem: {
                colunas: ['pontos', 'gm', 'gs', 'saldo'],
                orientacao: ['desc', 'desc', 'asc', 'desc']
            },
            times: this.timesColecao
        }
    },
    inject: ['timesColecao'],
    template: `
       <div>
            <input type="text" class="form-control" v-model="busca">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Nome</th>
                    <th v-for="(coluna, indice) in ordem.colunas">
                        <a href="#" @click.prevent="ordenar(indice)">{{coluna | ucwords}}</a>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(time,indice) in timesFiltrados" :class="{'table-success': indice<6}" :style="{'font-size': indice<6?'17px': '15px'}">
                    <td>
                        <!--<img :src="time.escudo" alt="" class="escudo">-->
                        <!--{{time.nome | ucwords}}-->
                        <clube :time="time"></clube>
                    </td>
                    <td>{{time.pontos}}</td>
                    <td>{{time.gm}}</td>
                    <td>{{time.gs}}</td>
                    <!--<td>{{time | saldo}}</td>-->
                    <td>{{time.saldo}}</td>
                </tr>
                </tbody>
            </table>
            <clubes-libertadores :times="timesOrdered"></clubes-libertadores>
            <clubes-rebaixados :times="timesOrdered"></clubes-rebaixados>
       </div>
   `,
    computed: {
        timesFiltrados() {
            console.log('ordenou', this.ordem);
            var self = this;
            return _.filter(this.timesOrdered, function (time) {
                var busca = self.busca.toLowerCase();
                return time.nome.toLowerCase().indexOf(busca) >= 0;
            })
        },
        timesOrdered() {
            //return _.orderBy(this.$root.times, this.ordem.colunas, this.ordem.orientacao);
            return _.orderBy(this.times, this.ordem.colunas, this.ordem.orientacao);
        }
    },
    methods: {
        ordenar(indice) {
            //this.ordem.orientacao[indice] = this.ordem.orientacao[indice] =='desc'? 'asc':'desc';
            this.$set(this.ordem.orientacao, indice, this.ordem.orientacao[indice] == 'desc' ? 'asc' : 'desc')
        }
    }
});

Vue.component('clubes-libertadores', {
    props: ['times'],
    template: `
    <div>
        <h3>Time classificados para libertadores</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
    `,
    computed: {
        timesLibertadores() {
            return this.times.slice(0, 6)
        }
    },
});

Vue.component('clubes-rebaixados', {
    props: ['times'],
    template: `
    <div>
        <h3>Time rebaixados</h3>
            <ul>
                <li v-for="time in timesRebaixados">
                    <clube :time="time"></clube>
                </li>
            </ul>
    </div>
    `,
    computed: {
        timesRebaixados() {
            return this.times.slice(16, 20)
        },
    },
});

Vue.component('placar', {
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0
        }
    },
    template: `
    <form class="form-inline">
        <input type="text" class="form-control col-md-1" v-model="golsCasa">
        <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
        <span>X</span>
        <clube :time="timeFora" v-if="timeFora"></clube>
        <input type="text" class="form-control  col-md-1" v-model="golsFora">
        <button type="button" class="btn btn-primary" @click="fimJogo">Fim de jogo</button>
    </form>
    `,
    methods: {
        fimJogo() {
            var golsMarcados = parseInt(this.golsCasa);
            var golsSofridos = parseInt(this.golsFora);
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
            this.$emit('fim-jogo', {golsCasa: this.golsCasa, golsFora: this.golsFora});
        },
    }
});

Vue.component('novo-jogo', {
    template: `
    <div>
        <button class="btn btn-primary" @click="criarNovoJogo" ref="button">Novo jogo</button>
        <placar-modal :time-casa="timeCasa" :time-fora="timeFora" ref="modal"></placar-modal>
    </div> 
    `,
    data() {
        return {
            timeCasa: null,
            timeFora: null,
            times: this.timesColecao
        }
    },
    //props: ['times'],
    inject: ['timesColecao'],
    methods: {
        criarNovoJogo() {
            console.log(this.$refs);
            var indiceCasa = Math.floor(Math.random() * 20),
                indiceFora = Math.floor(Math.random() * 20);

            // var timeCasa = this.$root.times[indiceCasa];
            // var timeFora = this.$root.times[indiceFora];
            //var timeCasa = this.timesColecao[indiceCasa];
            //var timeFora = this.timesColecao[indiceFora];
            this.timeCasa = this.timesColecao[indiceCasa];
            this.timeFora = this.timesColecao[indiceFora];
            var modal = this.$refs.modal;
            //var modal = this.$refs.modal.$refs.componente.$refs;
            console.log(modal);
            modal.showModal();
            //this.$emit('novo-jogo',{timeCasa, timeFora});
        },
    }
});

Vue.component('placar-modal', {
    template: `
    <modal ref="modal">
        <h5 slot="header" class="modal-title">Novo jogo</h5>
        <form class="form-inline">
            <input type="text" class="form-control col-md-1" v-model="golsCasa">
            <clube :time="timeCasa" invertido="true" v-if="timeCasa"></clube>
            <span>X</span>
            <clube :time="timeFora" v-if="timeFora"></clube>
            <input type="text" class="form-control  col-md-1" v-model="golsFora">
            
        </form>
        <div slot="footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click="fimJogo">Fim de jogo</button>
        </div>
    </modal>
    `,
    props: ['timeCasa', 'timeFora'],
    data() {
        return {
            golsCasa: 0,
            golsFora: 0
        }
    },
    methods: {
        showModal() {
            this.getModal().show();
        },
        closeModal() {
            this.getModal().close();
        },
        getModal(){
            return this.$refs.modal;
        },
        fimJogo() {
            var golsMarcados = parseInt(this.golsCasa);
            var golsSofridos = parseInt(this.golsFora);
            this.timeCasa.fimJogo(this.timeFora, golsMarcados, golsSofridos);
            //AJAX
            this.closeModal();
            //this.$emit('fim-jogo', {golsCasa: this.golsCasa, golsFora: this.golsFora});
        },
    }
});

Vue.component('modal', {
    template: `
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header"></slot>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
      </div>
    </div>
    `,
    methods: {
        show() {
            $(this.$el).modal('show');
        },
        close() {
            $(this.$el).modal('hide');
        }
    }
});

Vue.component('clube', {
    props: ['time', 'invertido'],
    template: `
    <div style="display: flex; flex-direction: row">
        <img :src="time.escudo" alt="" class="escudo" :style="{order: invertido == 'true'? 2 : 1}">
        <span :style="{order: invertido == 'true'? 1 : 2}">{{time.nome | ucwords}}</span>
        {{$root.param1}}
    </div>
    `,
    // filters: {
    //     ucwords(valor){
    //         return valor.charAt(0).toUpperCase() + valor.slice(1)
    //     }
    // }
});

new Vue({
    el: "#app",
    provide() {
        return {
            timesColecao: [
                new Time('palmeiras', 'assets/palmeiras_60x60.png'),
                new Time('Internacional', 'assets/internacional_60x60.png'),
                new Time('Flamengo', 'assets/flamengo_60x60.png'),
                new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
                new Time('Santos', 'assets/santos_60x60.png'),
                new Time('Botafogo', 'assets/botafogo_60x60.png'),
                new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
                new Time('Corinthians', 'assets/corinthians_60x60.png'),
                new Time('Grêmio', 'assets/gremio_60x60.png'),
                new Time('Fluminense', 'assets/fluminense_60x60.png'),
                new Time('Bahia', 'assets/bahia_60x60.png'),
                new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
                new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
                new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
                new Time('Sport', 'assets/sport_60x60.png'),
                new Time('Ceará', 'assets/ceara_60x60.png'),
                new Time('Vitória', 'assets/vitoria_60x60.png'),
                new Time('Vasco', 'assets/vasco_60x60.png'),
                new Time('América-MG', 'assets/america_mg_60x60.png'),
                new Time('Paraná', 'assets/parana_60x60.png'),
            ],
            metodoPraPegarAlgumaCoisa() {

            },
            getAlgumaCoisa() {
                return this.$root.algumacoisa
            },
            method1: this.method1
        }
    },
    data: {
        param1: 'valor1',
        // times: [
        //     new Time('palmeiras', 'assets/palmeiras_60x60.png'),
        //     new Time('Internacional', 'assets/internacional_60x60.png'),
        //     new Time('Flamengo', 'assets/flamengo_60x60.png'),
        //     new Time('Atlético-MG', 'assets/atletico_mg_60x60.png'),
        //     new Time('Santos', 'assets/santos_60x60.png'),
        //     new Time('Botafogo', 'assets/botafogo_60x60.png'),
        //     new Time('Atlético-PR', 'assets/atletico-pr_60x60.png'),
        //     new Time('Corinthians', 'assets/corinthians_60x60.png'),
        //     new Time('Grêmio', 'assets/gremio_60x60.png'),
        //     new Time('Fluminense', 'assets/fluminense_60x60.png'),
        //     new Time('Bahia', 'assets/bahia_60x60.png'),
        //     new Time('Chapecoense', 'assets/chapecoense_60x60.png'),
        //     new Time('São Paulo', 'assets/sao_paulo_60x60.png'),
        //     new Time('Cruzeiro', 'assets/cruzeiro_60x60.png'),
        //     new Time('Sport', 'assets/sport_60x60.png'),
        //     new Time('Ceará', 'assets/ceara_60x60.png'),
        //     new Time('Vitória', 'assets/vitoria_60x60.png'),
        //     new Time('Vasco', 'assets/vasco_60x60.png'),
        //     new Time('América-MG', 'assets/america_mg_60x60.png'),
        //     new Time('Paraná', 'assets/parana_60x60.png'),
        // ],
    },
    methods: {
        method1() {

        }
    }
    //template: '<my-app></my-app>',
});

//$parent.$parent.$parent.............. new Vue $root

//table tr td

//table
//tr info="info"
//td info="info"