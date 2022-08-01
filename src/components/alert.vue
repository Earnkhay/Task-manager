<template>
    <div :class="[alertType == 'Success' ? 'bg-success' : 'bg-danger']" class="alertComp">
        <p class="mt-1 mb-1"><span class="pe-2"><i class="fa-solid" :class="[alertType == 'Success' ? 'fa-circle-check' : 'fa-circle-exclamation']"></i></span>{{alertText}}</p>
    </div>
    <router-view/>
</template>

<script lang="ts">
    import {Options, Vue} from "vue-class-component"
    @Options({
        props: {
            alertText: String,
            alertType: String
        }
    })

    export default class alert extends Vue {
        
    }
</script>

<style scoped>
    .alertComp{
        /* background-color: rgb(245, 68, 68); */
        /* position: absolute; */
        /* top: 30px;
        left: 10px; */
        padding: 5px;
        border-radius: 10px;
        color: white;
    }
</style>