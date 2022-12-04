<template>
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
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addTask">Add</button>
        </div>
        </div>
    </div>
    </div>
</template>
  
<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase.js"
import { getAuth } from "firebase/auth"
import { collection, addDoc } from "firebase/firestore";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

@Options({
    components: {
        Datepicker
    },
})
export default class addModal extends Vue {
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

    addTask(){
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
