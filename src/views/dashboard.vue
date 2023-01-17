<template>
    <div id="app">
    <nav-bar :navTitle="navTitle"/>
    <!-- <h5 class="my-5 fs-4 fw-bold container">Hello <span class="text-success">{{ name }}</span>. Welcome to your Dashboard</h5> -->

    <!-- <div class="container px-5 mb-4">
        <div class="row justify-content-center">
           <div class="card border-info shadow">
                <div class="card-body text-center">
                    <h2 class="card-title fw-bold">All Tasks</h2>
                    <h1 class="card-text fw-bold data text-info">{{ tasks.length }}</h1>
                </div>
            </div> 
        </div>
    </div> -->

    <div class="container my-5">
        <div class="row ">
            <div class="col-md-3 mb-3">
                <div class="card border-primary shadow">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">Not started</h4>
                    <h1 class="card-text fw-bold data text-primary">{{ notStartedTasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card border-warning shadow">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">In Progress</h4>
                    <h1 class="card-text fw-bold data text-warning">{{ inProgressTasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card border-success shadow">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">Completed</h4>
                    <h1 class="card-text fw-bold data text-success">{{ completedTasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3 mb-3">
                <div class="card border-danger shadow">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">Overdue</h4>
                    <h1 class="card-text fw-bold data text-danger">{{ overdueTasks.length }}</h1>
                </div>
                </div>
            </div>
        </div>
    </div>

    <div class="container mb-3" v-if="tasks.length != 0">
        <div class="row justify-content-center chart">
            <div class="col-md-6 donut">
                <vue-apex-charts width="380" type="donut" :options="chartOptions" :series="statusCount"> </vue-apex-charts>
            </div>
            <div class="col-md-6 piechart">
                <vue-apex-charts width="370" type="pie" :options="chartOption" :series="priorityCount"> </vue-apex-charts>
            </div>
        </div>
    </div>

    <!-- <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <img src="../assets/dashboard.png" class="img-fluid" alt="dashboard image">
            </div>
        </div>
    </div> -->

    </div>
</template>

<script>
    import {Options, Vue} from "vue-class-component"
    import navBar from "@/components/UI/navbar.vue"
    import VueApexCharts from "vue3-apexcharts"
    import { getAuth, onAuthStateChanged } from "firebase/auth"
    import { db } from "@/firebase" 
    import { collection, doc, onSnapshot, query, where} from "firebase/firestore"
 
    @Options({
        components: {
            navBar,
            VueApexCharts,
        }
    })

export default class dashboard extends Vue {
        name = ""
        navTitle = ""
        tasks = []
        notStartedTasks = []
        inProgressTasks = []
        completedTasks = []
        overdueTasks = []
        highTasks = []
        mediumTasks = []
        lowTasks = []
        auth = getAuth()
        user = this.auth.currentUser
        id = this.user.uid
        statusCount= []
        priorityCount= []
        todosCollectionRef = collection( db, `tasks` )
        todosCollectionQuery = query(this.todosCollectionRef, where("assignedTo", "==", this.id))

        created(){
            // console.log("mounted in dashboard");
            //alternative fix for data rendering twice issue. Still not sure created works well
            this.$nextTick(() => {
                window.dispatchEvent(new Event('resize'));
            });
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbTasks = []
                    querySnapshot.forEach((doc) => {
                        const task = {
                            title: doc.data().title
                        }
                        fbTasks.push(task)
                    })
                        this.tasks = fbTasks
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbnotStartedTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'Not started'){
                          const task = {
                            status: doc.data().status,
                         }
                        fbnotStartedTasks.push(task)  
                        }
                    })
                        this.notStartedTasks = fbnotStartedTasks
                        this.statusCount.push(fbnotStartedTasks.length)
                        // console.log(fbnotStartedTasks, 'not started', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbinProgressTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'In progress'){
                          const task = {
                            status: doc.data().status,
                        }
                        fbinProgressTasks.push(task)  
                        }
                    })
                        this.inProgressTasks = fbinProgressTasks
                        this.statusCount.push(fbinProgressTasks.length)
                        // console.log(fbinProgressTasks, 'In Progress', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbcompletedTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'Completed'){
                          const task = {
                            status: doc.data().status,
                        }
                        fbcompletedTasks.push(task)  
                        }
                    })
                        this.completedTasks = fbcompletedTasks
                        this.statusCount.push(fbcompletedTasks.length)
                        // console.log(fbcompletedTasks, 'Completed', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fboverdueTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'Overdue'){
                          const task = {
                            status: doc.data().status,
                        }
                        fboverdueTasks.push(task)  
                        }
                    })
                        this.overdueTasks = fboverdueTasks
                        this.statusCount.push(fboverdueTasks.length)
                        // console.log(fboverdueTasks, 'overdue', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbHighTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().priority == 'High'){
                          const task = {
                            priority: doc.data().priority,
                        }
                        fbHighTasks.push(task)  
                        }
                    })
                        this.highTasks = fbHighTasks
                        this.priorityCount.push(fbHighTasks.length)
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbmediumTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().priority == 'Medium'){
                          const task = {
                            priority: doc.data().priority,
                        }
                        fbmediumTasks.push(task)  
                        }
                    })
                        this.mediumTasks = fbmediumTasks
                        this.priorityCount.push(fbmediumTasks.length)
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fblowTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().priority == 'Low'){
                          const task = {
                            priority: doc.data().priority,
                        }
                        fblowTasks.push(task)  
                        }
                    })
                        this.lowTasks = fblowTasks
                        this.priorityCount.push(fblowTasks.length)
                    })
                    // console.log(this.priorityCount, this.statusCount);
                    if(user.displayName != null){
                        // this.name = user.displayName
                        this.navTitle = `Welcome back, ${user.displayName}`
                    }else {
                        onSnapshot(doc(db, "users", user.uid), (doc) => {
                            // this.name = doc.data().name
                            this.navTitle = `Welcome back ${doc.data().name}`
                        })
                    }
                }
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
            // width: 380,
            // type: 'pie',
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
    .data{
        text-shadow: 1px 3px rgba(0, 0, 0, 0.35);
    }

    @media screen and (max-width: 399px){
       h5{
        font-size: 22px !important;
        text-align: center;
       }

       #app{
        overflow: hidden;
       }

       .chart{
        display: flex;
        justify-content: center;
       }

       .piechart{
         margin-right: 30px;
         margin-top: 12px;
       }
       .donut{
         margin-right: 30px;
       }
    }
</style>