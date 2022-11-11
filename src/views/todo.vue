<template>
    <nav-bar :navTitle="navText" :navlink1="navText1" :navlink2="navText2"/>
   <h1 class="text-center p-3 fw-bold text-success">To-do List</h1>

   <h5 class="mb-3 fs-4 fw-bold container text-center">Hello {{ name }}, kindly add new todo below</h5>

   <div class="container me-5 p-3">
    <div class="row justify-content-center g-0">
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
import { getAuth } from "firebase/auth";
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
    name = ""
    auth = getAuth();
    user = this.auth.currentUser;
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/todos`)
    // todosDocRef = doc(db, `users/${this.id}/todos`, id)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"));
    
    mounted(){
        // const querySnapshot = await getDocs(collection(db, "todos"))
        // querySnapshot.forEach((doc) => {
        //     console.log(`${doc.id} => ${doc.data().name}`);
        //     this.todos.push(
        //         doc.data())
        // })
        
        if (this.user !== null) {
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

            // console.log(this.todosCollectionQuery);
            onSnapshot(doc(db, "users", this.id), (doc) => {
                console.log("Current data: ", doc.data());
                this.name = doc.data().name
            });
        }
        
    }

    addTodo(){
        console.log(this.newTodo);
        if(this.newTodo) {
            addDoc(this.todosCollectionRef, { 
                name: this.newTodo,
                done: this.done,
                date: Date.now()
            })
         this.newTodo = "" 
        }
        // if (this.newTodo) {
        //     setDoc(doc(db, "todos", this.user.uid), {
        //         name: this.newTodo,
        //         done: this.done,
        //         date: Date.now()
        //     })
        //     this.newTodo = ''
        // }
        // console.log(this.user.uid, 'successfully added');
    }

    toggleDone(id){
        // this.done = !this.done
        const todoToUpdate = this.todos.find((todo) => todo.id === id)
        // todoToUpdate.done = !todoToUpdate.done
        updateDoc(doc(db, `users/${this.id}/todos`, id), {
            done: !todoToUpdate.done
        })
        console.log(id, todoToUpdate.done);
    }

    deleteTodo(id){
        deleteDoc(doc(db, `users/${this.id}/todos`, id));
        console.log('successfully deleted', id, this.user.uid);
    }

    
}
</script>

<style scoped>
    .success{
        background-color: rgb(164, 243, 164);
    }
</style>