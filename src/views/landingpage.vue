<template>
    <div id="app" class="mb-4">
        <nav-bar :navlink1="navText1"/>
        
        <div class="container mt-5">
            <div class="row gx-5 justify-content-between align-items-center">
                <div class="col-md-6">
                <h2 class="fw-bold">Good {{ greet() }}, </h2>
                <h5 class="mb-4 fs-4 fw-bold text-success">{{ name }}</h5>

                <div class="d-flex flex-wrap mb-4">
                    <!-- Button trigger modal -->
                    <div data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <a class="btn fw-bold" id="new"><span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span>Create New</a>
                    </div>
                    <router-link :to="{name: 'dashboard'}" class="btn fw-bold" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
                </div>

                    <add-modal/>

                <h6 class="fw-bold border-bottom p-2">Recent Tasks</h6> 
                    <div class="table-responsive">        
                        <table class="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Task</th>
                                    <th scope="col">Due Date</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                <tr v-if="spinnerShow">
                                    <td colspan="4"> <spinner :spinnerSize="spinnerSize"></spinner></td>  
                                </tr>
                                <tr data-bs-toggle="modal" data-bs-target="#exampleModal1" v-for="(task, id) in tasks" :key="id" @click="viewTask(task.id)">
                                    <th>{{ task.title }}</th>
                                    <td> {{ task.duedate }} </td>
                                    <td class="badge rounded-pill" :class="[task.status == 'Not started' ? 'text-bg-primary' : task.status == 'In progress' ? 'text-bg-warning' : task.status == 'Completed' ? 'text-bg-success' : task.status == 'Overdue' ? 'text-bg-danger' : 'bg-transparent' ]">
                                        {{task.status}}
                                    </td>
                                </tr>
                                <tr v-if="tasks.length == 0 && !spinnerShow " class="fw-bold fs-5">
                                    <i class="fa-solid fa-info text-danger m-3"></i>No Recent Task. 
                                </tr>
                            </tbody>
                        </table> 
                    </div>
                    <div class="fw-bold d-flex justify-content-end">
                        <router-link :to="{name: 'todo'}" id="todolink">View All></router-link>
                    </div>
                </div>

                <!-- View Modal -->
                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">Info</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <h2 class="fw-bold mb-4"> {{ viewTitle }} </h2>
                        <div class="row">
                            <div class="col-md-3">
                                <h6 class="fw-bold">Description </h6>
                            </div>
                            <div class="col-md-9">
                                <p> {{viewDesc}} </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <h6 class="fw-bold">Due on</h6>
                            </div>
                            <div class="col-md-9">
                                <p> {{viewDuedate}} </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <h6 class="fw-bold">Priority </h6>
                            </div>
                            <div class="col-md-9">
                                <p> {{viewPriority}}  </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <h6 class="fw-bold">Assigned By</h6>
                            </div>
                            <div class="col-md-9">
                                <p> {{createdBy}}  </p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <h6 class="fw-bold">Status </h6>
                            </div>
                            <div class="col-md-9">
                                <p class="badge rounded-pill p-2" :class="[viewStatus == 'Not started' ? 'bg-primary' : viewStatus == 'In progress' ? 'bg-warning' : viewStatus == 'Completed' ? 'bg-success' : viewStatus == 'Overdue' ? 'bg-danger' : 'bg-transparent' ]"> {{viewStatus}} </p>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
                </div>
            
                <div class="col-md-6 mt-3">
                    <img :src="'../assets/'+greetImage()+'.png'" alt="" >
                </div>
            </div>
        </div>
    </div>
    <my-footer/>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import spinner from '@/components/UI/spinner.vue'
import addModal from '@/components/addModal.vue'
import myFooter from "@/components/UI/footer.vue"
import { getAuth, onAuthStateChanged, } from "firebase/auth"
import { db } from "@/firebase"
import { collection, doc, getDoc, onSnapshot, query, orderBy, limit, where} from "firebase/firestore"

@Options({
  components: {
    navBar, 
    spinner,
    addModal, 
    myFooter
  }
})

export default class landingpage extends Vue {
    navText1 = "Dashboard"
    spinnerShow = false 
    spinnerSize = "spinner-border-lg"
    name = ""
    createdBy = ""
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    viewDuedate = ""
    tasks = []
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    d = new Date()
    hour = this.d.getHours()
    todosCollectionRef = collection(db, `tasks`)
    todosCollectionQuery = query(this.todosCollectionRef, where("assignedTo", "==", this.id), limit(5));
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
        this.spinnerShow = true
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks = []
                querySnapshot.forEach((doc) => {
                    const date = new Date(doc.data().duedate.seconds * 1000);
                    const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    // if (doc.data().assignedTo == this.id) {
                        const task = {
                            id: doc.id,
                            title: doc.data().title,
                            duedate: formattedDate,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc
                        }
                        fbTasks.push(task)
                    // }
                })
                    this.tasks = fbTasks
                    this.spinnerShow = false
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
    }
    async viewTask(id){
        const docRef = doc(db, `tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const date = new Date(docSnap.data().duedate.seconds * 1000);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            onSnapshot(doc(db, "users", docSnap.data().createdBy), (doc) => {
                this.createdBy = doc.data().email
            })
            this.viewDuedate = formattedDate
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
        }
    }
}
</script>

<style scoped>
    #new{
        background-color: rgb(68, 68, 170);
        border-color:  rgb(68, 68, 170);
        color: white;
    }
    #new:hover{
        color: black;
    }

    tr:hover{
        cursor: pointer;
    }
    .cover{
        white-space: nowrap;
        overflow-x:auto;
    }
    #dashboard:hover{
        background-color: rgb(68, 68, 170);
        color: white;
    }
    #todolink:hover{
        color: green;
        text-decoration: none;
    }
    img{
        max-width: 100%;
        height: auto;
    }
    .success{
        background-color: rgb(164, 243, 164);
    }

    /* @media (min-width: 768px) and (max-width: 990px) {
        img{
            max-width: 100%;
            height: 100%;
        }
    } */
    @media screen and (max-width: 767px) {
        img{
            display: none;
        }

       #app{
            overflow: hidden;
        }
    }

    @media screen and (max-width: 399px){
       h5{
        font-size: 10px;
       }
    }
</style>