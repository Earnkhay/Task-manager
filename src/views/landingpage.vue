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
            <div class="modal-body">
                <form action="" >
                    <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">New Task</label>
                    <input @keyup.enter="addTask" class="form-control" type="text" placeholder="Input new Task" v-model="title">
                    </div>
                    <!-- <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="comments"></textarea>
                    </div> -->
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" @click.prevent="addTask">Add</button>
            </div>
            </div>
        </div>
        </div>

      <div class="">
      <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
      </div>
      </div>

      <h6>Recent Tasks</h6>
      <!-- <p>
        {{ tasks }} 
      </p> -->
      <ul>
        <li v-for="(task, index) in tasks" :key="index">{{ task }}
            <span class="p-2"><i class="fa-solid fa-pen-to-square p-2 mx-1 btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"></i>
                    <i class="fa-solid fa-trash p-2 mx-1 btn btn-danger" @click="removeTask(index)"></i>
                    <i class="fa-solid fa-eye p-2 mx-1 btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop3"></i></span>
        </li>
    </ul>
      <!-- <div class="row">
          <div class="col-lg-4" style="font-size: 1rem; font-weight: 700;">
              <ul>
              <li> Tue 01, Feb
                   09:23am
              </li>
              <li>Mon 21, Mar
                  10:20am
              </li>
              <li>Wed 29, Jun
                  05:32am
              </li>
              <li>Thu 23, Jun
                  09:12am
              </li>
              <li>Tue 19, Apr
                  00:00am
              </li>
              <li>Wed 06, Apr
                  00:00am
              </li>
              </ul>
          </div>
          <div class="col-lg-6">
              <ul>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing due soon/ today</b><br>
                  EMAIL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">Testing due soon/today</b>
                  PHONE CALL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing due soon</b>
                  APPOINTMENT
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing Matter</b> <br>
                  GENERAL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">First Milestone</b></li> <br>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">Merge Testing</b></li>
              </ul>
          </div>
      </div> -->
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
// import firebase from 'firebase/app'
import { getAuth } from "firebase/auth";

@Options({
  components: {
    navBar
  }
})

export default class landingpage extends Vue {
    navText = "Task Manager"
    navText1 = "Dashboard"
    navText2 = "to-do list"
    tasks = ['Finish task']
    title = ''
    // comments = ''
    name = ""
    d = new Date()
    hour = this.d.getHours()
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
        }
    }
    addTask(){
        if(this.title != '') {
             //add new tasks from the top
            this.tasks.unshift(this.title);
            // this.tasks.push(this.title);
            this.title = ''
        }
    }
    removeTask(id){
        console.log(id);
        this.tasks.splice(id, 1)

        // this.$delete(this.tasks, id);
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