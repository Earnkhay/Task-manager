<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>

    <div class="container text-center mb-5 mt-5">
    <div class="row">
        <div class="col">
            <vue-apex-charts width="500" type="bar" :options="options" :series="series"></vue-apex-charts>
        </div>
        <div class="col">
            <vue-apex-charts width="500" type="line" :options="options" :series="series"></vue-apex-charts>
        </div>    
    </div>
    </div>

    <div class="container text-center">
    <div class="row">
        <div class="col">
            <vue-apex-charts width="380" type="donut" :options="option" :series="serie"></vue-apex-charts>
        </div>
        <div class="col">
            <vue-apex-charts width="500" type="area" :options="options" :series="series"></vue-apex-charts>
        </div>
    </div>
    </div>
    <div class="container text-center">
    <div class="row">
        <div class="col-lg-6 mt-5">
            <maintable/>
        </div>
        <div class="col-lg-6 dbimg">
            <img src="../assets/dashboard.png" alt="dashboard image">
        </div>
    </div>
    </div>
    
    <router-view/>
    <my-footer/>
</template>

<script lang="ts">
    import {Options, Vue} from "vue-class-component"
    import navBar from "./navbar.vue"
    import myFooter from "./footer.vue"
    import VueApexCharts from "vue3-apexcharts"
    import maintable from "./table.vue"
 
    @Options({
        components: {
            navBar,
            myFooter,
            VueApexCharts,
            maintable
        }
    })

    export default class dashboard extends Vue {
        navText = "Task Manager"
        navText1 = "Dashboard"
        navText2 = "Sign out"
        options = {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
        }
        series = [{
                name: 'series-1',
                data: [30, 40, 45, 50, 49, 60, 70, 91]
        }]
        option = {}
        serie = [44, 55, 41, 17, 15]
    }
</script>

<style>
    .dbimg img{
        max-width: 100%;
        height: auto;
    }
</style>