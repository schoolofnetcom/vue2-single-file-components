<template>
    <div>
        <h3>Time classificados para libertadores</h3>
        <ul>
            <li v-for="time in timesLibertadores">
                <clube :time="time"></clube>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['times'],
        computed: {
            timesLibertadores() {
                return this.times.slice(0, 6)
            }
        },
    }
</script>