<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>
    
    <div class="container mt-5">
    <div class="row gx-5">
    <div class="col-md-6 weird">
      <!-- <h2>Good {{hour >= 0 && hour <= 11 ? "morning" :  hour >= 12 && hour <= 17 ? "afternoon" :  "evening"}}, </h2> -->
      <h2 class="fw-bold">Good {{ greet() }}, </h2>
      <h5 class="mb-4 fs-4 fw-bold">{{ name }}</h5>
      <div class="d-flex flex-wrap mb-4">

      <!-- Button trigger modal -->
        <button type="button" class="btn fw-bold" id="new" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span>Create New
        </button>

        <!-- Modal -->
        <!-- <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        </div> -->

      <div class="">
      <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
      </div>
      </div>

      <h6>Recent Todos</h6>                   
           <table class="table mt-3">
            <thead>
                <tr>
                    <th scope="col" class="fw-bold fs-5">Todo List</th>
                </tr>
            </thead>
            <tbody class="p-5" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
                <td class="fw-bold p-3 border-bottom" :class="[todo.done ?  'text-decoration-line-through' : 'text-dark']">
                    {{ todo.name }}
                </td>
            </tbody>
           </table> 
           <div class="fw-bold d-flex justify-content-end">
            <router-link :to="{name: 'todo'}" id="todolink">View All></router-link>
           </div>
    </div>
    
    <div class="col-md-6 mt-3">
      <img :src="'../assets/'+greetImage()+'.png'" alt="" >
    </div>
    </div>
    </div>
    <router-view/>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/navbar.vue"
import { getAuth } from "firebase/auth";
import { db } from "@/firebase.js"
import { collection, doc, onSnapshot, query, orderBy, limit} from "firebase/firestore";

@Options({
  components: {
    navBar
  }
})

export default class landingpage extends Vue {
    navText = "Task Manager"
    navText1 = "Dashboard"
    navText2 = "To-do list"
    todos = []
    name = ""
    done = false
    name = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    d = new Date()
    hour = this.d.getHours()
    time = this.d.getTime()
    // greetImage = "../assets/morningsvg.png"
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), limit(3));
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
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
            const fbTodos = []
            querySnapshot.forEach((doc) => {
                const todo = {
                    id: doc.id,
                    name: doc.data().name,
                    done: doc.data().done
                }
                fbTodos.push(todo)
            })
                this.todos = fbTodos
            })
            // this.name = user.email;
            onSnapshot(doc(db, "users", user.uid), (doc) => {
                console.log("Current data: ", doc.data());
                this.name = doc.data().name
            });
        }
    }
    
    addTask(){
        console.log(this.todosCollectionQuery);
        
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
    #todolink:hover{
        color: green;
        text-decoration: none;
    }
    /* #todolink{
        text-decoration: none;
    } */

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

    .success{
        background-color: rgb(164, 243, 164);
    }
    .through{
        text-decoration: line-through;
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