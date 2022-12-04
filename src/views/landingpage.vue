<template>
<div id="app">
    <nav-bar :navlink1="navText1"/>
    
    <div class="container mt-5">
    <div class="row gx-5">
        <div class="col-md-6">
        <h2 class="fw-bold">Good {{ greet() }}, </h2>
        <h5 class="mb-4 fs-4 fw-bold">{{ name }}</h5>

        <div class="d-flex flex-wrap mb-4">
            <!-- Button trigger modal -->
            <div data-bs-toggle="modal" data-bs-target="#exampleModal">
                <a class="btn fw-bold" id="new"><span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span>Create New</a>
            </div>
            
            <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
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
                            <label class="form-label">Start date</label>
                            <Datepicker v-model="startDate" :enable-time-picker="false"/>
                        </div>
                        <div>
                            <label class="form-label">End date</label>
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

        <h6>Recent Todos</h6> 
            <div class="table-responsive">        
                <table class="table table-hover cover">
                <thead>
                    <tr>
                    <th scope="col">Recent Task</th>
                    <th scope="col">Due Date</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                
                <tbody>
                    <tr data-bs-toggle="modal" data-bs-target="#exampleModal1" v-for="(task, id) in tasks" :key="id" @click="viewTask(task.id)">
                        <th>{{ task.title }}</th>
                        <td> {{ task.duedate }} </td>
                        <td class="badge rounded-pill" :class="[task.status == 'Not started' ? 'text-bg-primary' : task.status == 'In progress' ? 'text-bg-warning' : task.status == 'Completed' ? 'text-bg-success' : task.status == 'Overdue' ? 'text-bg-danger' : 'bg-transparent' ]">
                            {{task.status}}
                        </td>
                        <!-- <td>
                            <i class="fa-solid fa-eye text-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="viewTask(task.id)"></i>
                            <i class="fa-solid fa-pen-to-square text-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="editTask(task.id)"></i>
                            <i class="fa-solid fa-trash text-danger ms-2" @click.prevent="deleteTask(task.id)"></i>
                        </td> -->
                    </tr>
                </tbody>
            </table> 
            </div>
            <div class="fw-bold d-flex justify-content-end">
                <router-link :to="{name: 'todo'}" id="todolink">View All></router-link>
            </div>
        </div>

        <!-- View Modal -->
        <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">Info</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h2 class="fw-bold mb-4"> {{ viewTitle }} </h2>
                <div class="row justify-content-center">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Description </h6>
                    </div>
                    <div class="col-md-9">
                        <p> {{viewDesc}} </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Priority </h6>
                    </div>
                    <div class="col-md-9">
                        <p> {{viewPriority}}  </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-3">
                        <h6 class="fw-bold">Status </h6>
                    </div>
                    <div class="col-md-9">
                        <p class="badge rounded-pill p-2" :class="[viewStatus == 'Not started' ? 'bg-primary' : viewStatus == 'In progress' ? 'bg-warning' : viewStatus == 'Completed' ? 'bg-success' : viewStatus == 'Overdue' ? 'bg-danger' : 'bg-transparent' ]"> {{viewStatus}} </p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
        </div>
    
    <div class="col-md-6 mt-3">
      <img :src="'../assets/'+greetImage()+'.png'" alt="" >
    </div>
    </div>
    </div>
</div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import spinner from '@/components/UI/spinner.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase.js"
import { collection, doc, addDoc, getDoc, onSnapshot, query, orderBy, limit} from "firebase/firestore"

@Options({
  components: {
    navBar, 
    spinner,
    Datepicker
  }
})

export default class landingpage extends Vue {
    navText1 = "Dashboard"
    spinnerShow = false 
    name = ""
    newTask = ""
    description = ""
    startDate = ""
    dueDate = ""
    priority = ""
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    tasks = []
    status = "Not started"
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    d = new Date()
    hour = this.d.getHours()
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    auth = getAuth()
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), limit(4));
    greetImage(){
        if (this.hour >= 0 && this.hour <= 11) {
            return 'morningsvg'          
        } else if(this.hour >= 12 && this.hour <= 17) {
            return 'afternoonsvg'    
        }else{
            return 'eveningsvg'
        }
    }
    greet(){
        if (this.hour >= 0 && this.hour <= 11) {
            return "morning"            
        } else if(this.hour >= 12 && this.hour <= 17) {
            return "afternoon"
        }else{
            return "evening"
        }
    }
    mounted(){
        // const auth = getAuth()
        // this.spinnerShow = true
        // setTimeout(() => {  
        //     this.spinnerShow = false
        // }, 2000) 
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                this.spinnerShow = true
                setTimeout(() => {  
                    this.spinnerShow = false
                }, 2000) 
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks = []
                querySnapshot.forEach((doc) => {
                    let myDate = new Date(doc.data().duedate * 1000).toDateString()
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: myDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                    fbTasks.push(task)
                })
                    this.tasks = fbTasks
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
    async viewTask(id){
        const docRef = doc(db, `users/${this.id}/tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
        }
    }
}
</script>

<style scoped>
    #new{
        background-color: rgb(68, 68, 170);
        border-color:  rgb(68, 68, 170);
        color: white;
    }
    #new:hover{
        color: black;
    }
    .cover{
        white-space: nowrap;
        overflow-x:auto;
    }
    #dashboard:hover{
        background-color: rgb(68, 68, 170);
        color: white;
    }
    #todolink:hover{
        color: green;
        text-decoration: none;
    }
    img{
        max-width: 100%;
        height: auto;
    }
    .success{
        background-color: rgb(164, 243, 164);
    }
    @media screen and (max-width: 767px) {
        img{
            display: none;
        }

       #app{
            overflow: hidden;
        }
    }

    @media screen and (max-width: 399px){
       h5{
        font-size: 10px;
       }
    }
</style>