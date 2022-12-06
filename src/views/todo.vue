<template>
    <nav-bar :navlink1="navText1"/>
   <!-- <h1 class="text-center p-3 fw-bold text-success mt-2">Tasks</h1> -->

   <h5 class="mb-3 fs-4 fw-bold container text-center mt-5">Hello <span class="text-success">{{ name }}</span>, Welcome to your Task Manager app</h5>

    <div class="d-flex justify-content-end mb-3 container">
        <i class="fa-solid text-primary fs-2 fa-circle-plus add-icon"  data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
    </div>

    <add-modal/>
    <todos/>
    <my-footer/>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import todos from '@/components/todos.vue'
import addModal from '@/components/addModal.vue'
import myFooter from "@/components/UI/footer.vue"
import { db } from "@/firebase.js"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, onSnapshot, doc } from "firebase/firestore";

@Options({
    components: {
        navBar,
        addModal,
        todos,
        myFooter
    }
})

export default class todo extends Vue {
    navText1 = "Dashboard"
    name = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
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
}
</script>

<style scoped>
.add-icon:hover{
    cursor: pointer;
}

@media screen and (max-width: 294px) {
    h5{
        font-size: 1.1rem !important;
    }
}
</style>