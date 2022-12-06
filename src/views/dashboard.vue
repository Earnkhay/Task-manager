<template>
    <nav-bar :navlink1="navText1"/>
    <h5 class="my-5 fs-4 fw-bold container">Welcome <span class="text-success">{{ name }}</span> to your Dashboard</h5>

    <div class="container px-5 mb-4">
        <div class="row justify-content-center">
           <div class="card border-info shadow">
                <div class="card-body text-center">
                    <h2 class="card-title fw-bold">All Tasks</h2>
                    <h1 class="card-text fw-bold data text-info">{{ tasks.length }}</h1>
                </div>
            </div> 
        </div>
    </div>

    <div class="container mb-5">
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

    <div class="container">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <vue-apex-charts width="380" type="donut" :options="options" :chartOptions="options.chartOptions"  :series="statusCount"  > </vue-apex-charts>
        </div>
        <!-- <div class=" col">
            <vue-apex-charts class="img-fluid" width="400" type="area" :options="options" :series="series"></vue-apex-charts>
        </div> -->
    </div>
    </div>

    <!-- <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <img src="../assets/dashboard.png" class="img-fluid" alt="dashboard image">
            </div>
        </div>
    </div> -->
    
    <router-view/>
    <my-footer/>
</template>

<script>
    import {Options, Vue} from "vue-class-component"
    import navBar from "@/components/UI/navbar.vue"
    import myFooter from "@/components/UI/footer.vue"
    import VueApexCharts from "vue3-apexcharts"
    import { getAuth, onAuthStateChanged } from "firebase/auth"
    import { db } from "@/firebase.js" 
    import { collection, doc, onSnapshot, query, orderBy} from "firebase/firestore"
 
    @Options({
        components: {
            navBar,
            myFooter,
            VueApexCharts,
        }
    })

export default class dashboard extends Vue {
        navText1 = "Dashboard"
        name = ""
        tasks = []
        notStartedTasks = []
        inProgressTasks = []
        completedTasks = []
        overdueTasks = []
        auth = getAuth()
        user = this.auth.currentUser
        id = this.user.uid
        statusCount= []
        todosCollectionRef = collection( db, `users/${this.id}/tasks` )
        todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"))
        mounted(){
            console.log("mounted in dashboard");
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbTasks = []
                    querySnapshot.forEach((doc) => {
                        const task = {
                            id: doc.id,
                            title: doc.data().title,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
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
                            id: doc.id,
                            title: doc.data().title,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
                         }
                        fbnotStartedTasks.push(task)  
                        }
                    })
                        this.notStartedTasks = fbnotStartedTasks
                        this.statusCount.push(fbnotStartedTasks.length)
                        console.log(fbnotStartedTasks, 'not started', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbinProgressTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'In progress'){
                          const task = {
                            id: doc.id,
                            title: doc.data().title,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
                        }
                        fbinProgressTasks.push(task)  
                        }
                    })
                        this.inProgressTasks = fbinProgressTasks
                        this.statusCount.push(fbinProgressTasks.length)
                        console.log(fbinProgressTasks, 'In Progress', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fbcompletedTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'Completed'){
                          const task = {
                            id: doc.id,
                            title: doc.data().title,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
                        }
                        fbcompletedTasks.push(task)  
                        }
                    })
                        this.completedTasks = fbcompletedTasks
                        this.statusCount.push(fbcompletedTasks.length)
                        console.log(fbcompletedTasks, 'Completed', this.statusCount);
                    })
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                    const fboverdueTasks = []
                    querySnapshot.forEach((doc) => {
                        if(doc.data().status == 'Overdue'){
                          const task = {
                            id: doc.id,
                            title: doc.data().title,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
                        }
                        fboverdueTasks.push(task)  
                        }
                    })
                        this.overdueTasks = fboverdueTasks
                        this.statusCount.push(fboverdueTasks.length)
                        console.log(fboverdueTasks, 'overdue', this.statusCount);
                    })
                    console.log(this.statusCount);
                    if(user.displayName != null){
                        this.name = user.displayName
                    }else {
                        onSnapshot(doc(db, "users", user.uid), (doc) => {
                            this.name = doc.data().name
                        })
                    }
                }
            })
        }
       options = {
            chartOptions: {
            labels: ['Not  Started', 'In Progress', 'Completed', 'Overdue']
        }
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
    }
</style>