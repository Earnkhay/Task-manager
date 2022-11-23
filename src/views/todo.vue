<template>
    <nav-bar :navlink1="navText1"/>
   <h1 class="text-center p-3 fw-bold text-success mt-2">Todo List</h1>

   <h5 class="mb-3 fs-4 fw-bold container text-center">Hello {{ name }}, kindly add new todo below</h5>

   <div class="d-flex justify-content-center mb-3">
        <div>
            <input class="form-control" v-model="newTodo" type="text" @keyup.prevent.enter="addTodo" placeholder="New to-do" aria-label="default input example">
        </div>
        <div>
            <button type="button" class="btn btn-primary" @click.prevent="addTodo">Add</button>
        </div>
    </div>

    <buttongroup class="mb-3"/>

</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/navbar.vue"
import buttongroup from '@/components/buttongroup.vue'
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, doc, addDoc } from "firebase/firestore";

@Options({
    components: {
        navBar,
        buttongroup,
    }
})

export default class todo extends Vue {
    navText1 = "Dashboard"
    name = ""
    newTodo = ""
    todos = []
    done = false
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    d = new Date()
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
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
}
</script>

<style scoped>
@media screen and (max-width: 294px) {

    h5{
        font-size: 1.1rem !important;
    }
}
</style>