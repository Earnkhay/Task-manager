<template>
    <div class="d-block">
        <header>
            My Section Comp
        </header>
         <nav>
            <router-link :to="{name: 'card'}">Card</router-link>
            -
            <router-link to="/login/area">Area</router-link>
            -
            <router-link to="/login/:id">Login</router-link>
        </nav>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
    // export default {
    //     name: 'areaComp'
    // }
    export default class areaComp extends Vue {}
</script>

<style>

</style>