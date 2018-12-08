<template>
    <div class="row"> <!--root element -->
        <h1 @click="clique">Campeonato Brasileiro - Série A - 2018 {{$parent.visao}}</h1>
    </div>
</template>

<script>
    export default {
        methods: {
            clique() {
                console.log(this.$parent.$parent.param1);
            }
        }
    }
</script>