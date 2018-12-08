<template>
    <div class="container">
        <!--<img src="./assets/america_mg_60x60.png" alt="">-->
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
</template>

<script>

    export default {
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
    }
</script>
