<template>
    <div id="app">    
        <nav-bar :navTitle="navTitle"/>
    <!-- <h1 class="text-center p-3 fw-bold text-success mt-2">Tasks</h1> -->

    <!-- <h5 class="mb-3 fs-4 fw-bold container text-center mt-5">Hello <span class="text-success">{{ name }}</span>, Welcome to your Task Manager app</h5> -->

        <div class="d-flex justify-content-end mb-3 container mt-5">
            <i class="fa-solid text-primary fs-2 mt-3 fa-circle-plus add-icon"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
        </div>

        <add-modal/>
        <div class="mb-4">
            <todos/>
    </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import todos from '@/components/todos.vue'
import addModal from '@/components/addModal.vue'
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, doc } from "firebase/firestore";

@Options({
    components: {
        navBar,
        addModal,
        todos,
    }
})

export default class todo extends Vue {
    navTitle = "My Tasks"
    name = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user?.uid
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
    mounted(){ 
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                if(user.displayName != null){
                    this.name = user.displayName
                }else {
                    onSnapshot(doc(db, "users", user.uid), (doc) => {
                        this.name = doc.data()?.name
                    })
                }
            }
        })
    }
}
</script>

<style scoped>
#app{
    min-height: 100vh;
}
.add-icon:hover{
    cursor: pointer;
}

@media screen and (max-width: 294px) {
    h5{
        font-size: 1.1rem !important;
    }
}
</style>