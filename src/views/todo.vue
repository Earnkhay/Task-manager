<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>
   <h1 class="text-center p-3 fw-bold">To-do List</h1>

   <div class="container p-5 ">
    <div class="row justify-content-center">
    <div class="col-md-4">
        <input class="form-control" v-model="newTodo" type="text" @keyup.prevent.enter="addTodo" placeholder="New to-do" aria-label="default input example">
    </div>
    <div class="col-md-2">
        <button type="button" class="btn btn-primary" @click.prevent="addTodo">Add</button>
    </div>
    </div>
   </div>

    <div class="container">
      <div class="row justify-content-center">
        <div class="card row m-3 col-md-6" v-for="(todo, id) in todos" :key="id" :class="[todo.done ? 'success' : 'bg-light' ]">
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
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        navBar
    }
})

export default class todo extends Vue {
    navText = "Task Manager"
    navText1 = "Dashboard"
    navText2 = "To-do list"
    newTodo = ""
    todos = []
    done = false
    // todosCollectionRef = collection(db, 'todos')
    todosCollectionQuery = query(collection(db, "todos"), orderBy("date", "desc"));

    mounted(){
        // const querySnapshot = await getDocs(collection(db, "todos"))
        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data().name}`);
        //     this.todos.push(
        //         doc.data())
        // })
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
    }

    addTodo(){
        console.log(this.newTodo);
        if(this.newTodo) {
            addDoc(collection(db, "todos"), { 
                name: this.newTodo,
                done: this.done,
                date: Date.now()
            })
         this.newTodo = "" 
        }
    }

    toggleDone(id){
        // this.done = !this.done
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
        // todoToUpdate.done = !todoToUpdate.done
        updateDoc(doc(db, "todos", id), {
            done: !todoToUpdate.done
        })
        console.log(id, todoToUpdate.done);
    }

    // updateTodo(id){
    //     console.log(id, this.done);
    //     
    // }

    deleteTodo(id){
        deleteDoc(doc(db, "todos", id));
        console.log('successfully deleted', id);
    }

    
}
</script>

<style scoped>
    .success{
        background-color: rgb(164, 243, 164);
    }
</style>