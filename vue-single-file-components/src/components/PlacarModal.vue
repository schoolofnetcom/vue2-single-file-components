<template>
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
</template>

<script>
    export default {
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
    }
</script>