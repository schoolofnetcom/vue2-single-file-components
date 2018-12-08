<template>
    <div>
        <!--<img src="../assets/america_mg_60x60.png" alt="">-->
        <button class="btn btn-primary" @click="criarNovoJogo" ref="button">Novo jogo</button>
        <placar-modal :time-casa="timeCasa" :time-fora="timeFora" ref="modal"></placar-modal>
    </div>
</template>

<script>
    export default {
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
    }
</script>