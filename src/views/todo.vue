<template>
    <nav-bar :navlink1="navText1"/>
   <h1 class="text-center p-3 fw-bold text-success mt-2">Todos</h1>

   <h5 class="mb-3 fs-4 fw-bold container text-center">Hello {{ name }}, kindly add new todo below</h5>

    <div class="d-flex justify-content-end mb-3 container add-icon" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <i class="fa-solid text-primary fs-2 fa-circle-plus"></i>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add a New Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input class="form-control" v-model="newTask" type="text" aria-label="default input example">
            </div>
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <label class="form-label">Start date {{startDate}}</label>
                    <Datepicker v-model="startDate" :enable-time-picker="false"/>
                </div>
                <div>
                    <label class="form-label">End date{{dueDate}}</label>
                    <Datepicker v-model="dueDate" :enable-time-picker="false"/>
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Task Priority</label>
                <select class="form-select" aria-label="Default select example" v-model="priority">
                    <option selected></option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addTodo">Add</button>
        </div>
        </div>
    </div>
    </div>

    <todos/>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import todos from '@/components/todos.vue'
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

@Options({
    components: {
        navBar,
        todos,
        Datepicker
    }
})

export default class todo extends Vue {
    navText1 = "Dashboard"
    name = ""
    newTask = ""
    description = ""
    startDate = ""
    dueDate = ""
    priority = ""
    tasks = []
    status = "Not started"
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    d = new Date()
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
    // todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"));
    mounted(){ 
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                if(this.user.displayName != null){
                    this.name = this.user.displayName
                }else {
                    onSnapshot(doc(db, "users", user.uid), (doc) => {
                        this.name = doc.data().name
                    })
                }
            }
        })
    }

    addTodo(){
        if(this.newTask) {
            addDoc(this.todosCollectionRef, { 
                title: this.newTask,
                desc: this.description,
                startdate: this.startDate,
                duedate: this.dueDate,
                priority: this.priority,
                status: this.status,
                date: Date.now(),
                day: this.day,
                month: this.month
            })
         this.newTask = "" 
         this.description = ""
         this.priority = ""
         this.startDate = ""
         this.dueDate = ""
        }
    }
}
</script>

<style scoped>
.add-icon:hover{
    cursor: pointer;
}

@media screen and (max-width: 294px) {
    h5{
        font-size: 1.1rem !important;
    }
}
</style>