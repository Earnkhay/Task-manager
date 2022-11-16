<template>
    <nav-bar :navlink1="navText1"/>
   <h1 class="text-center p-3 fw-bold text-success mt-2">To-do List</h1>

   <h5 class="mb-3 fs-4 fw-bold container text-center">Hello {{ name }}, kindly add new todo below</h5>

    <div class="d-flex justify-content-center mb-3">
        <div class="">
            <input class="form-control" v-model="newTodo" type="text" @keyup.prevent.enter="addTodo" placeholder="New to-do" aria-label="default input example">
        </div>
        <div class="">
            <button type="button" class="btn btn-primary" @click.prevent="addTodo">Add</button>
        </div>
    </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class=" d-flex justify-content-center " v-if="spinnerShow">
                <spinner class="mt-5 spinner-border"/>
        </div>
        <div v-else class="card row m-2 col-md-6 todocard" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
            <div class="card-body d-flex justify-content-between">
                <div class="fw-bold" :class="[todo.done ?  'text-decoration-line-through' : 'text-dark']">{{ todo.name }}</div>
                <div><button class=" border-secondary" @click.prevent="toggleDone(todo.id)" :class="[todo.done ? 'success' : 'bg-light' ]"><i class="fa-solid fa-check text-dark"></i></button>
                    <button class="bg-danger border-danger mx-1" @click.prevent="deleteTodo(todo.id)"><i class="fa-solid fa-trash text-light" ></i></button>
                </div>
            </div>
      </div>
     </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/navbar.vue"
import { db } from "@/firebase.js"
import spinner from '@/components/spinner.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        navBar,
        spinner
    }
})

export default class todo extends Vue {
    navText1 = "Dashboard"
    spinnerShow = false
    newTodo = ""
    todos = []
    done = false
    name = ""
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    d = new Date()
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
    // todosDocRef = doc(db, `users/${this.id}/todos`, id)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"));
    
    mounted(){ 
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

                if(this.user.displayName != null){
                    this.name = this.user.displayName
                }else {
                    onSnapshot(doc(db, "users", user.uid), (doc) => {
                        this.name = doc.data().name
                    })
                }
            }
        })
        // if (this.user !== null) {
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

        //     if(this.user.displayName != null){
        //         this.name = this.user.displayName
        //     }else {
        //         onSnapshot(doc(db, "users", user.uid), (doc) => {
        //             // console.log("Current data: ", doc.data());
        //             this.name = doc.data().name
        //         })
        //     }
        // }
    }

    addTodo(){
        if(this.newTodo) {
            addDoc(this.todosCollectionRef, { 
                name: this.newTodo,
                done: this.done,
                date: Date.now(),
                day: this.day,
                month: this.month
            })
         this.newTodo = "" 
        }
    }

    toggleDone(id){
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
        // todoToUpdate.done = !todoToUpdate.done
        updateDoc(doc(db, `users/${this.id}/todos`, id), {
            done: !todoToUpdate.done
        })
    }

    deleteTodo(id){
        deleteDoc(doc(db, `users/${this.id}/todos`, id));
    }

    
}
</script>

<style scoped>
    .success{
        background-color: rgb(164, 243, 164);
    }

@media (min-width: 295px) and (max-width: 575px) {
    .todocard{
        width: 90%;
    }
}
@media screen and (max-width: 294px) {
    .todocard{
        padding: 1px !important;
        width: 95%
    }

    h5{
        font-size: 1.1rem !important;
    }
}
</style>