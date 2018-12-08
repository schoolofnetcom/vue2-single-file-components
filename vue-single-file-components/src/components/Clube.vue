<template>
    <div style="display: flex; flex-direction: row">
        <img :src="time.escudo" alt="" class="escudo" :style="{order: invertido == 'true'? 2 : 1}">
        <span :style="{order: invertido == 'true'? 1 : 2}">{{time.nome | ucwords}}</span>
        {{$root.param1}}
    </div>
</template>

<script>
    export default {
        props: ['time', 'invertido'],
    }
</script>

<style scoped>
    .escudo {
        width: 30px;
        height: 30px;
    }
</style>

<!--<style>      Global-->
    <!--regra{-->
        <!---->
    <!--}-->
<!--</style>-->