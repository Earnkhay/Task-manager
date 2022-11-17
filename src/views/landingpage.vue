<template>
    <nav-bar :navlink1="navText1"/>
    
    <div class="container mt-5">
    <div class="row gx-5">
    <div class="col-md-6">
      <h2 class="fw-bold">Good {{ greet() }}, </h2>
      <h5 class="mb-4 fs-4 fw-bold">{{ name }}</h5>

      <div class="d-flex flex-wrap mb-4">
        <router-link :to="{name: 'todo'}" class="btn fw-bold" id="new"><span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span>Create New</router-link>
        <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
      </div>

      <h6>Recent Todos</h6>         
           <table class="table mt-3">
            <thead>
                <tr>
                    <th scope="col" class="fw-bold fs-5">Todo List</th>
                </tr>
            </thead>
            <div class=" d-flex justify-content-center " v-if="spinnerShow">
                <spinner class="mt-5 spinner-border"/>
            </div>
            <tbody v-else class="p-5" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
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
import spinner from '@/components/spinner.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase.js"
import { collection, doc, onSnapshot, query, orderBy, limit} from "firebase/firestore"

@Options({
  components: {
    navBar, 
    spinner
  }
})

export default class landingpage extends Vue {
    navText1 = "Dashboard"
    spinnerShow = false 
    todos = []
    name = ""
    done = false
    name = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    d = new Date()
    hour = this.d.getHours()
    // time = this.d.getTime()
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
        // const auth = getAuth()
        this.spinnerShow = true
        setTimeout(() => {  
            this.spinnerShow = false
        }, 1000) 
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
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
                if(user.displayName != null){
                    this.name = user.displayName
                }else {
                    onSnapshot(doc(db, "users", user.uid), (doc) => {
                        this.name = doc.data().name
                    })
                }
            }
        })
        // if (user !== null) {
        //     onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
        //     const fbTodos = []
        //     querySnapshot.forEach((doc) => {
        //         const todo = {
        //             id: doc.id,
        //             name: doc.data().name,
        //             done: doc.data().done
        //         }
        //         fbTodos.push(todo)
        //     })
        //         this.todos = fbTodos
        //     })
        //     if(user.displayName != null){
        //         this.name = user.displayName
        //     }else {
        //         onSnapshot(doc(db, "users", user.uid), (doc) => {
        //             // console.log("Current data: ", doc.data());
        //             this.name = doc.data().name
        //         })
        //     }
        // }
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