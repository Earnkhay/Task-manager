<template>
    <div id="app">
        <nav-bar :navTitle="navTitle"/>
        <h5 class="my-5 fs-4 fw-bold container">Welcome  back, <span class="text-success">{{ name }}</span>. </h5>

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

        <chart/>

    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import chart from '@/components/UI/chart.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase" 
import { collection, doc, onSnapshot, query, where} from "firebase/firestore"

@Options({
    components: {
        navBar,
        chart
    }
})

export default class dashboard extends Vue {
    name = ""
    navTitle = "My Dashboard"
    notStartedTasks: { status: string }[] = []
    inProgressTasks: { status: string }[] = []
    completedTasks: { status: string }[] = []
    overdueTasks: { status: string }[] = []
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user?.uid
    todosCollectionRef = collection( db, `tasks` )
    todosCollectionQuery = query(this.todosCollectionRef, where("assignedTo", "==", this.id))

    created(){
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks: { title: string }[] = []
                const fbNotStartedTasks: { status: string }[] = [];
                const fbInProgressTasks: { status: string }[] = [];
                const fbCompletedTasks: { status: string }[] = [];
                const fbOverdueTasks: { status: string }[] = [];
                querySnapshot.forEach((doc) => {
                    switch (doc.data().status) {
                        case "Not started":
                            fbNotStartedTasks.push({ status: doc.data().status });
                        break;
                        case "In progress":
                            fbInProgressTasks.push({ status: doc.data().status });
                        break;
                        case "Completed":
                            fbCompletedTasks.push({ status: doc.data().status });
                        break;
                        case "Overdue":
                            fbOverdueTasks.push({ status: doc.data().status });
                        break;
                    }
                })
                    this.notStartedTasks = fbNotStartedTasks
                    this.inProgressTasks = fbInProgressTasks
                    this.completedTasks = fbCompletedTasks
                    this.overdueTasks = fbOverdueTasks
                })
                if(user.displayName != null){
                    this.name = user.displayName
                }else {
                    onSnapshot(doc(db, "users", user.uid), (doc) => {
                        this.name = doc.data()?.name
                    })
                }
            }
        })
    }
}
</script>

<style scoped>
    .data{
        text-shadow: 1px 3px rgba(0, 0, 0, 0.35);
    }

    @media screen and (max-width: 480px){
       h5{
        font-size: 22px !important;
        text-align: center;
       }

       #app{
        overflow: hidden;
       }
    }
</style>