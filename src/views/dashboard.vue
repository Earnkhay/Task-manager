<template>
    <nav-bar :navlink1="navText1"/>
    <h5 class="my-5 fs-4 fw-bold container">Welcome <span class="text-success">{{ name }}</span>, view your progress</h5>

    <!-- <div>User {{ $route.params.id }}</div> -->
    <!-- <div class="container text-center mb-5 mt-5">
    <div class="row">
        <div class=" col">
            <vue-apex-charts width="500" type="bar" :options="options" :series="series"></vue-apex-charts>
        </div>
        <div class=" col">
            <vue-apex-charts width="500" type="line" :options="options" :series="series"></vue-apex-charts>
        </div>    
    </div>
    </div> -->
    

    <!-- <div class="container mb-5">
        <div class="row ">
            <div class="col-md-3">
                <div class="card border-primary">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">All Tasks</h4>
                    <h1 class="card-text fw-bold data text-primary">{{ tasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-warning">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">In Progress</h4>
                    <h1 class="card-text fw-bold data text-warning">{{ inProgressTasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-success">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">Tasks Completed</h4>
                    <h1 class="card-text fw-bold data text-success">{{ completedTasks.length }}</h1>
                </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card border-danger">
                <div class="card-body text-center">
                    <h4 class="card-title fw-bold">Tasks Overdue</h4>
                    <h1 class="card-text fw-bold data text-danger">{{ overdueTasks.length }}</h1>
                </div>
                </div>
            </div>
        </div>
    </div> -->

    <div class="container text-center">
    <div class="row">
        <div class=" col">
            <vue-apex-charts width="380" type="donut" :options="option" :series="serie"></vue-apex-charts>
        </div>
        <div class=" col">
            <vue-apex-charts width="500" type="area" :options="options" :series="series"></vue-apex-charts>
        </div>
    </div>
    </div>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">
                <img src="../assets/dashboard.png" class="img-fluid" alt="dashboard image">
            </div>
        </div>
    </div>
    
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
        completedTasks = []
        overdueTasks = []
        inProgressTasks = []
        auth = getAuth()
        user = this.auth.currentUser
        id = this.user.uid
        todosCollectionRef = collection( db, `users/${this.id}/tasks` )
        todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"))
        mounted(){
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
                    })
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
            chart: {
                id: 'vuechart-example'
            },
            xaxis: {
                categories: []
            }
       }
       series = [{
            name: 'series-1',
            data: [1, 2, 3]
       }]
       option = {}
       serie = [1, 2, 3]
}
</script>

<style scoped>
    .data{
        text-shadow: 1px 3px rgba(0, 0, 0, 0.35);
    }
</style>