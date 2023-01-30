<template>
<div id="chartapp">

<div class="container" v-if="tasks.length != 0">
    <div class="row justify-content-center align-items-center">
        <div class="col-md-6 donut">
            <vue-apex-charts v-once width="380" type="donut" :options="chartOptions" :series="statusCount"> </vue-apex-charts>
        </div>
        <div class="col-md-6 piechart">
            <vue-apex-charts v-once width="370" type="pie" :options="chartOption" :series="priorityCount"> </vue-apex-charts>
        </div>
    </div>
</div>

</div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import VueApexCharts from "vue3-apexcharts"

@Options({
    components: {
        VueApexCharts,
    }
})

export default class chart extends Vue {
    tasks: { title: string }[] = []
    statusCount: number[] = []
    priorityCount: number[] = []
    $store: any

    created() {
    this.$store.dispatch('getTasks')
        .then(() => {
            this.tasks = this.$store.state.tasks
            this.statusCount = this.$store.state.statusCount
            this.priorityCount = this.$store.state.priorityCount

            // console.log(this.statusCount, this.$store.state.priorityCount, 'from chart.vue', this.$store.state.tasks)
        })
        .catch((error: any) => {
            console.error(error)
        })
    }

    chartOptions= {
        labels: ['Not Started', 'In progress', 'Completed', 'Overdue'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300,
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#0d6efd', '#ffc107', '#198754', '#dc3545'] 
    }
    chartOption = {
        // chart: {
        //     width: 380,
        //     type: 'pie',
        // },
        labels: ['High', 'Medium', 'Low'],
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 300,
                },
                legend: {
                    position: 'bottom'
                }
            }
        }],
        colors: ['#dc3545', '#ffc107', '#808080'] 
    } 

}
</script>

<style scoped>
@media (min-width: 395px) and (max-width: 480px){
    .piechart{
        margin-left: 70px;
        margin-top: 12px;
    }
    .donut{
        margin-left: 70px;
    }
}
@media (min-width: 341px) and (max-width: 394px){
    .piechart{
        margin-left: 50px;
        margin-right: 35px;
        margin-top: 12px;
    }
    .donut{
        margin-left: 50px;
        margin-right: 35px;
    }
}
@media screen and (max-width: 340px){
    #chartapp{
        overflow: hidden;
    }

    .piechart{
        margin-left: 10px;
        margin-right: 45px;
        margin-top: 12px;
    }
    .donut{
        margin-left: 10px;
        margin-right: 45px;
    }
}
</style>