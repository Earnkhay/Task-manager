<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>
    
    <div class="container mt-5">
    <div class="row gx-5">
    <div class="col-md-6 weird">
      <!-- <h2>Good {{hour >= 0 && hour <= 11 ? "morning" :  hour >= 12 && hour <= 17 ? "afternoon" :  "evening"}}, </h2> -->
      <h2 class="fw-bold">Good {{ greet() }}, </h2>
      <h5 class="mb-4 fs-4 fw-bold">{{ name }}</h5>
      <!-- <div>User {{ $route.params.id }}</div> -->
      <!-- <p>{{hour}}</p> -->
      <div class="d-flex flex-wrap mb-5">

      <!-- Button trigger modal -->
        <button type="button" class="btn fw-bold" id="new" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span>Create New
        </button>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Create New Task</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" >
            <div class="modal-body">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">New Task</label>
                    <input @keydown.prevent.enter="addTask" class="form-control" type="text" placeholder="Input new Task" v-model="title">
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                    <textarea class="form-control" @keyup.prevent.enter="addTask" id="exampleFormControlTextarea1" rows="3" v-model="comments"></textarea>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="addTask">Add</button>
            </div>
            </form>
            </div>
        </div>
        </div>

      <div class="">
      <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
      </div>
      </div>

      <h6>Recent Tasks</h6>                   
           <table class="table mt-3">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Task Title</th>
                    <th scope="col">Task Description</th>
                    <th scope="col" colspan="2">Actions</th>
                </tr>
            </thead>
            <tbody class="p-4" v-for="(task, index) in tasks" :key="index">
                <!-- <td><div class="form-check pt-0 ps-4">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" v-model="checked" >
                    <label class="form-check-label" for="flexRadioDefault1">
                        {{checked}}
                    </label>
                    </div>
                </td> -->
                <td> {{ index + 1}} </td>
                <td> {{ task.title }} </td>
                <td> {{ task.comments}} </td>
                <td><i class="fa-solid fa-pen-to-square mx-1 text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click.prevent="editTask(task)"></i></td>
                <td><i class="fa-solid fa-trash mx-1 text-danger" @click="removeTask(task)"></i></td>
                <!-- <td><i class="fa-solid fa-eye mx-1 text-success" data-bs-toggle="modal" data-bs-target="#exampleModal2"></i></td> -->
            </tbody>
           </table> 
    </div>
    
      <!-- Edit Modal -->
      <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit current Task</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" >
            <div class="modal-body">
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Edit Task</label>
                    <input @keydown.prevent.enter="updateTask" class="form-control" type="text" placeholder="Input new Task" v-model="editTitle">
                    </div>
                    <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Edit Description</label>
                    <textarea class="form-control" @keyup.prevent.enter="updateTask" id="exampleFormControlTextarea1" rows="3" v-model="editComments"></textarea>
                    </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="updateTask(currentTask)"> Save Changes</button>
            </div>
            </form>
            </div>
        </div>
        </div>

    <div class="col-md-6 mt-3">
      <img :src="'../assets/'+greetImage()+'.png'" alt="">
    </div>
    </div>
    </div>
    <router-view/>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/navbar.vue"
import { getAuth } from "firebase/auth";
// import {fb, db } from "../firebase.js"
// import * as $ from 'jquery'

@Options({
  components: {
    navBar
  }
})

export default class landingpage extends Vue {
    navText = "Task Manager"
    navText1 = "Dashboard"
    navText2 = "to-do list"
    tasks = []
    currentTask = '' 
    title = ''
    comments = ''
    name = ""
    done = false
    checked = null
    editTitle = ''
    editComments = ''
    d = new Date()
    hour = this.d.getHours()
    time = this.d.getTime()
    // greetImage = "../assets/morningsvg.png"
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
    mounted (){
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            // this.name = user.displayName;
            this.name = user.email;
            // const photoURL = user.photoURL;
            // const emailVerified = user.emailVerified;
            // const uid = user.uid;
            this.tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    }
    // setStatus(){
    //     console.log(this.done);
    //     if (this.done == false) {
    //         this.done = true
    //         this.checked = true
    //     }else if( this.done == true){
    //         this.done = false
    //         this.checked = false
    //     }
    // }
    addTask(){
        if(this.title != '') {
             //add new tasks from the top
            // this.tasks.unshift(this.title);
            this.tasks = this.tasks || []
            const formObject = {
                title: this.title,
                comments: this.comments,
                id: this.time,
                done: this.done,
            }
            this.tasks.unshift(
                formObject
            );
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.title = ''
            this.comments = ''
            // const taskModal = $('#exampleModal')
            // taskModal.modal('hide');
        }
    }
    removeTask(task){
        // this.tasks.splice(id, 1)
        // this.tasks = this.tasks.filter((t) => t !== task)
        this.tasks = this.tasks.filter((t) => {
          if (t != task) {
            return task
          }
        })
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        console.log( this.tasks);
    }
    editTask(task){
        const itemToBeEdited = this.tasks.find((t) => t === task);
        this.editTitle = itemToBeEdited.title
        this.editComments = itemToBeEdited.comments
        this.currentTask = task
        console.log(itemToBeEdited, 'items to be edited', task);
    }
    updateTask(currentTask){
        currentTask.title = this.editTitle
        currentTask.comments = this.editComments
        console.log(this.tasks, 'tasks view', currentTask, 'current tasks');
        const result = this.tasks.filter((data) => {
            if (data.id !== currentTask.id) {
                return data
            }
        })

        result.unshift(currentTask)
        console.log(this.tasks, 'result view', result);

        localStorage.setItem('tasks', JSON.stringify(result));
    }    
    
}
</script>

<style scoped>
    #new{
        /* width: 100%; */
        background-color: rgb(68, 68, 170);
        border-color:  rgb(68, 68, 170);
        color: white;
    }
    #new:hover{
        color: black;
    }
    #dashboard:hover{
        background-color: rgb(68, 68, 170);
        color: white;
    }

    h6{
        border-bottom: 1px groove;
        padding: 20px;
        font-weight: bold;
    }

    li{
        padding-bottom: 15px;
        list-style: none;
    }

    img{
        max-width: 100%;
        height: auto;
    }

    @media screen and (max-width: 767px) {
        img{
            display: none;
        }
    }

    @media screen and (max-width: 399px){
       h5{
        font-size: 10px;
       }
    }
</style>