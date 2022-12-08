<template>
    <div class="container bg-light pb-4 rounded-2 cover">
        <table class="table table-hover dropdownIndex">
            <thead class="border-bottom-none">
                <tr>
                    <th scope="col" class="py-4">Recent Task</th>
                    <!-- <th scope="col">Due Date</th> -->
                    <th scope="col" class="py-4">Priority</th>
                    <th scope="col" class="py-4">Status</th>
                    <th scope="col" class="py-4"> 
                        <div class="dropstart d-flex justify-content-end dropdownIndex">
                            <i class="fa-solid fa-ellipsis-vertical text-primary fs-5" data-bs-toggle="dropdown"></i>
                            <ul class="dropdown-menu dropdownIndex">
                                <div class="dropdstart">
                                    <li class="submenu">
                                        <a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown">Status</a>
                                        <ul class="dropdown-menu tablemenu">
                                            <li><a class="dropdown-item text-primary fw-bold" @click="filterStatus('Not started')" href="#">Not Started</a></li>
                                            <li><a class="dropdown-item text-warning fw-bold" @click="filterStatus('In progress')" href="#">In Progress</a></li>
                                            <li><a class="dropdown-item text-success fw-bold" @click="filterStatus('Completed')" href="#">Completed</a></li>
                                            <li><a class="dropdown-item text-danger fw-bold" @click="filterStatus('Overdue')" href="#">Overdue</a></li>
                                            <li><a class="dropdown-item fw-bold" @click="viewAll" href="#">All</a></li>
                                        </ul>
                                    </li>
                                </div>
                                <div class="dropstart">
                                    <li class="submenu"><a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown">Priority</a>
                                        <ul class="dropdown-menu tablemenu">
                                            <li><a class="dropdown-item text-danger fw-bold" @click="filterPriority('High')" href="#">High</a></li>
                                            <li><a class="dropdown-item text-warning fw-bold" @click="filterPriority('Medium')" href="#">Medium</a></li>
                                            <li><a class="dropdown-item text-secondary fw-bold" @click="filterPriority('Low')" href="#">Low</a></li>
                                            <li><a class="dropdown-item fw-bold" @click="viewAll" href="#">All</a></li>
                                        </ul>
                                    </li>
                        </div>
                        <div class="dropstart">
                            <li class="submenu"><a class="dropdown-item dropdown-toggle" href="#">Date</a>
                                <ul class="dropdown-menu tablemenu">
                                    <li><Datepicker v-model="date" inline auto-apply /></li>
                                </ul>
                            </li>
                        </div>
                        
                    </ul>
                        </div>
                    </th>
                </tr>
        </thead>
 
        <tbody>
            <tr v-if="spinnerShow">
              <td colspan="4"> <spinner :spinnerSize="spinnerSize"></spinner></td>  
            </tr>
            <tr v-for="(task, id) in tasks" :key="id">
                <th>{{ task.title }}</th>
                <!-- <td> {{ task.duedate }} </td> -->
                <td><i class="fa-solid fa-flag" v-if="task.priority" :class="[task.priority == 'High' ? 'text-danger' : task.priority == 'Medium' ? 'text-warning' : task.priority == 'Low' ? 'text-secondary' : '']"></i> {{ task.priority }} </td>
                <td>
                    <select class="form-select text-light rounded-5 w-75 selectStatus" v-model="task.status" @change="updateStatus(task.id, task.status)" :class="[task.status == 'Not started' ? 'bg-primary' : task.status == 'In progress' ? 'bg-warning' : task.status == 'Completed' ? 'bg-success' : task.status == 'Overdue' ? 'bg-danger' : 'bg-transparent' ]" aria-label="Default select example">
                        <option selected  v-text="task.status"> </option>
                        <option v-for="(s, i) in statusList" :key="i" :value="s.sText">{{s.sText}}</option>
                    </select>
                </td>
                <td>
                    <i class="fa-solid fa-eye text-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="viewTask(task.id)"></i>
                    <i class="fa-solid fa-pen-to-square text-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="editTask(task.id)"></i>
                    <i class="fa-solid fa-trash text-danger ms-2" @click.prevent="deleteTask(task.id)"></i>
                </td>
            </tr>
            <tr v-if="tasks.length == 0 && !spinnerShow " class="fw-bold fs-5">
                <i class="fa-solid fa-info text-danger m-4"></i> No Records Found. 
            </tr>
        </tbody>
    </table>
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
            <div class="row justify-content-center">
                <div class="col-md-3">
                    <h6 class="fw-bold">Description </h6>
                </div>
                <div class="col-md-9">
                    <p> {{viewDesc}} </p>
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

    <!-- Edit Modal -->
    <div class="modal fade" id="exampleModal2" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input class="form-control" v-model="editTitle" type="text" aria-label="default input example">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Task Priority</label>
                <select class="form-select" aria-label="Default select example" v-model="editPriority">
                    <option selected></option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="editDesc"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateTask">Update Task</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import { db } from "@/firebase.js"
import spinner from '@/components/UI/spinner.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import nkselector from '@/components/UI/nkselector.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, where, getDoc, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        spinner,
        nkselector,
        Datepicker
    }
})

export default class todos extends Vue {
    spinnerShow = false
    spinnerSize = "spinner-border-lg"
    tasks = []
    currentTask
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    date = ""
    editTitle = ""
    editPriority = ""
    editDesc = ""
    editStatus = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"));
    statusList = [ 
        {sText: 'Not started'},
        {sText: 'In progress'},
        {sText: 'Completed'},
        {sText: 'Overdue'}
    ]

    mounted(){ 
        this.spinnerShow = true
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks = []
                querySnapshot.forEach((doc) => {
                    // let timestamp = doc.data().duedate
                    // let myDate = new Date(timestamp * 1000) 
                    let myDate = new Date(doc.data().duedate * 1000).toDateString()
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: myDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                    fbTasks.push(task)
                })
                    this.tasks = fbTasks
                    this.spinnerShow = false
                })
            }
        })
    }

    viewAll(){
        onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
            const fbTasks = []
            querySnapshot.forEach((doc) => {
                let myDate = new Date(doc.data().duedate * 1000).toDateString()
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: myDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                fbTasks.push(task)
            })
                this.tasks = fbTasks
            })
    }

    filterStatus(status){
        console.log(status, "TASK Status");
        const q = query(collection(db, `users/${this.id}/tasks`), where("status", "==", status));
        onSnapshot(q, (querySnapshot) => {
            const fbTasks = []
            querySnapshot.forEach((doc) => {
                let myDate = new Date(doc.data().duedate * 1000).toDateString()
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: myDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                fbTasks.push(task)
            })
                this.tasks = fbTasks
        })
    }

    filterPriority(priority){
        console.log(priority, "TASK priority");
        onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
            const fbTasks = []
            querySnapshot.forEach((doc) => {
                if (doc.data().priority == priority) {
                    let myDate = new Date(doc.data().duedate * 1000).toDateString()
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: myDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                    fbTasks.push(task)
                }
            })
                this.tasks = fbTasks
        })
    }

    editTask(id){
        const taskToUpdate = this.tasks.find((task) => task.id === id)
        this.editTitle = taskToUpdate.title,
        this.editPriority = taskToUpdate.priority,
        this.editDesc = taskToUpdate.desc
        this.currentTask = taskToUpdate
        // console.log(taskToUpdate);
    }

    updateStatus(id, status){
        updateDoc(doc(db, `users/${this.id}/tasks`, id), {
            status: status,
        });
    }

    async updateTask(){
        await updateDoc(doc(db, `users/${this.id}/tasks`, this.currentTask.id), {
            title: this.editTitle,
            priority: this.editPriority,
            desc: this.editDesc
        });
    }

    async viewTask(id){
        const docRef = doc(db, `users/${this.id}/tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
            // console.log("Document data:", docSnap.data());
        }
    }

    deleteTask(id){
        deleteDoc(doc(db, `users/${this.id}/tasks`, id));
    }

}
</script>

<style scoped>
   .success{
        background-color: rgb(164, 243, 164);
    }

    .dropdownIndex{
        z-index: 1000 !important;
    }
    .submenu:hover .tablemenu {
        display: block;
    }

    .submenu a:hover{
        cursor: pointer;
    }

    .tablemenu{
        margin-left: -100px;
    }
    .cover{
        white-space: nowrap;
        overflow-x:auto;
    }

    i{
        cursor: pointer;
    }
    .flexbtn{
        display: block !important;
    }

    .successbtn{
        margin-bottom: 5px;
        margin-left: 4px !important;
    }

@media screen and (max-width: 768px) {
    .selectStatus{
        width: 100% !important;
    }
}
</style>