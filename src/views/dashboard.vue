<template>
    <nav-bar :navlink1="navText1"/>

    <h5 class="my-5 fs-4 fw-bold container">Welcome {{ name }}, view your data</h5>

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
    
    <nkselector/>
    
    <router-view/>
    <my-footer/>
</template>

<script>
    import {Options, Vue} from "vue-class-component"
    import navBar from "@/components/navbar.vue"
    import myFooter from "@/components/footer.vue"
    import VueApexCharts from "vue3-apexcharts"
    import maintable from "@/components/table.vue"
    import nkselector from "@/components/nkselector.vue"
    import { getAuth, onAuthStateChanged } from "firebase/auth"
    import { db } from "@/firebase.js" 
    import { collection, doc, onSnapshot, query, orderBy} from "firebase/firestore"
 
    @Options({
        components: {
            navBar,
            myFooter,
            VueApexCharts,
            maintable,
            nkselector
        }
    })

export default class dashboard extends Vue {
        navText1 = "Dashboard"
        name = ""
        todos = ""
        auth = getAuth()
        user = this.auth.currentUser
        id = this.user.uid
        months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
        todosCollectionRef = collection( db, `users/${this.id}/todos` )
        todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"))
        mounted(){
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                        // chart.updateSeries([{
                        //     name: 'Sales',
                        //     data: response
                        // }])
                    const fbTodos = []
                    querySnapshot.forEach((doc) => {
                        const todo = {
                            id: doc.id,
                            name: doc.data().name,
                            done: doc.data().done,
                            day: doc.data().day,
                            month: doc.data().month
                        }
                        fbTodos.push(todo)
                    })
                        this.todos = fbTodos
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
            data: []
       }]
       option = {}
       serie = []
}
</script>

<style>
    .dbimg img{
        max-width: 100%;
        height: auto;
    }
</style>