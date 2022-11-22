<template>
    <todo/>
    <div class="container">
      <div class="row justify-content-center">
        <div class=" d-flex justify-content-center " v-if="spinnerShow">
                <spinner class="mt-5 spinner-border"/>
        </div>
        <div v-else class="card row m-2 col-md-7 todocard" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
            <div class="card-body d-flex justify-content-between">
                <div class="fw-bold" :class="[todo.done ?  'text-decoration-line-through' : 'text-dark']">{{ todo.name }}</div>
                <div class="flexbtn">
                    <button class=" border-secondary successbtn" @click.prevent="toggleDone(todo.id)" :class="[todo.done ? 'success' : 'bg-light' ]"><i class="fa-solid fa-check text-dark"></i></button>
                    <button class="bg-danger border-danger mx-1 delbtn" @click.prevent="deleteTodo(todo.id)"><i class="fa-solid fa-trash text-light" ></i></button>
                </div>
            </div>
      </div>
     </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import { db } from "@/firebase.js"
import spinner from '@/components/spinner.vue'
import todo from '@/views/todo.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        spinner,
        todo
    }
})

export default class undone extends Vue {
    spinnerShow = false
    newTodo = ""
    todos = []
    done = false
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
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
                    if (doc.data().done == false) {
                        const todo = {
                            id: doc.id,
                            name: doc.data().name,
                            done: doc.data().done
                        }
                        fbTodos.push(todo)
                    }
                    
                })
                    this.todos = fbTodos
                })
            }
        })
    }

    toggleDone(id){
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
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

    .flexbtn{
        display: block !important;
    }

    .successbtn{
        margin-bottom: 5px;
        margin-left: 4px !important;
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

}
</style>