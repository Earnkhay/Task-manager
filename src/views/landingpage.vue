<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>
    
    <div class="container mt-5">
    <div class="row gx-5">
    <div class="col-md-6">
      <!-- <h2>Good {{hour >= 0 && hour <= 11 ? "morning" :  hour >= 12 && hour <= 17 ? "afternoon" :  "evening"}}, </h2> -->
      <h2>Good {{greet()}},</h2>
      <h1 class="mb-4">{{name}}</h1>
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
                    <th scope="col" colspan="3">Actions</th>
                </tr>
            </thead>
            <tbody class="p-4" v-for="(task, index) in tasks" :key="index">
                <td>{{ index + 1 }}</td>
                <td> {{ task.title }} </td>
                <td> {{ task.comments}} </td>
                <td><i class="fa-solid fa-pen-to-square mx-1 text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click.prevent="editTask(task)"></i></td>
                <td><i class="fa-solid fa-trash mx-1 text-danger" @click="removeTask(task)"></i></td>
                <td><i class="fa-solid fa-eye mx-1 text-success" data-bs-toggle="modal" data-bs-target="#exampleModal2"></i></td>
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
                <button type="button" class="btn btn-primary" @click.prevent="updateTask(task)">Save Changes</button>
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
    // task = {
    //     title = '',
    //     comments = ''
    // }
    title = ''
    comments = ''
    name = ""
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
    addTask(){
        if(this.title != '') {
             //add new tasks from the top
            // this.tasks.unshift(this.title);
            this.tasks = this.tasks || []
            const formObject = {
                title: this.title,
                comments: this.comments,
                id: this.time,
            }
            this.tasks.unshift(
                formObject
            );
            localStorage.setItem("tasks", JSON.stringify(this.tasks));
            this.title = ''
            this.comments = ''
            // $('#exampleModal').modal('hide')
        }
    }
    removeTask(task){
        // this.tasks.splice(id, 1)
        // this.tasks = this.tasks.filter((t) => t !== task)
        this.tasks = this.tasks.filter((id) => {
          if (id != task) {
            return task
          }
        })
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        console.log( this.tasks);
    }
    editTask(task){
        const itemToBeEdited = this.tasks.find((id) => id === task);
        this.editTitle = itemToBeEdited.title
        this.editComments = itemToBeEdited.comments
        console.log(itemToBeEdited);
    }
    // updateTask(task){
    //     console.log(this.tasks, 'tasks view');
    //     const result = this.tasks.filter((id) => {
    //         if (id === task) {
    //             return task
    //         }
    //     })

    //     result.unshift(this.tasks)
    //     console.log(this.tasks, 'result view', result);

    //     localStorage.setItem('tasks', JSON.stringify(result));
    // }    
    
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

    h1{
        font-weight: bold;
    }

    h2{
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
</style>