<template>
    <div class="container bg-light pb-4 rounded-2 cover">
        <table class="table table-sm table-hover" id="table_id">
            <thead class="border-bottom-none">
                <tr>
                    <th scope="col" class="py-4">Recent Task</th>
                    <th scope="col" class="py-4">Priority</th>
                    <th scope="col" class="py-4">Status</th>
                    <th scope="col" class="py-4 dropdownIndex"> 
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
                <nav aria-label="Page navigation example">
                    <ul class="pagination fw-bold justify-content-center">
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Previous" @click="previous">
                            <span aria-hidden="true">&laquo; Previous</span>
                        </a>
                        </li>
                        <!-- <li class="page-item" :class="[active1 == true ? 'active' : '']" @click="viewAll"><a class="page-link" href="#">1</a></li>
                        <li class="page-item" :class="[active == true ? 'active' : '']" @click="nextTableData"><a class="page-link" href="#">2</a></li>
                        <li class="page-item" @click="nextTableData"><a class="page-link" @click="nextTableData" href="#">3</a></li> -->
                        <li class="page-item">
                        <a class="page-link" href="#" aria-label="Next" @click="nextTableData">
                            <span aria-hidden="true">Next &raquo;</span>
                        </a>
                        </li>
                    </ul>
                </nav>
    </div>

    <!-- <div class="container mt-3">
        <EasyDataTable :headers="headers" :items="tasks" buttons-pagination>
        <template #tasks-operation="">
            <div class="operation-wrapper">
                <i class="fa-solid fa-eye text-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal1" @click="viewTask(task.id)"></i>
                <i class="fa-solid fa-pen-to-square text-primary mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal2" @click="editTask(task.id)"></i>
                <i class="fa-solid fa-trash text-danger ms-2" @click.prevent="deleteTask(task.id)"></i>
            </div>
        </template>
        </EasyDataTable>
    </div> -->

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
import EasyDataTable from 'vue3-easy-data-table';
import nkselector from '@/components/UI/nkselector.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, where, getDoc, startAfter, getDocs, limit, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        spinner,
        nkselector,
        Datepicker,
        EasyDataTable
    }
})

export default class todos extends Vue {
    spinnerShow = false
    spinnerSize = "spinner-border-lg"
    tasks = []
    task
    currentTask
    lastdoc = null
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    date = ""
    active = false
    active1 = false
    editTitle = ""
    editPriority = ""
    editDesc = ""
    editStatus = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `users/${this.id}/tasks`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), limit(20));
    statusList = [ 
        {sText: 'Not started'},
        {sText: 'In progress'},
        {sText: 'Completed'},
        {sText: 'Overdue'}
    ]
    headers = [
          { text: "Recent Task", value: "title" },
          { text: "Priority", value: "priority"},
          { text: "Status", value: "status"},
          { text: "Operation", value: "operation"},
    ]

    mounted(){ 
        this.active1 = true
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

    async nextTableData(){
        let next
        // this.spinnerShow = true
        const first = query(this.todosCollectionRef, orderBy("date", "desc"), limit(20))
        const documentSnapshots = await getDocs(first);

        // Get the last visible document
        this.lastdoc = documentSnapshots.docs[documentSnapshots.docs.length-1];
        // console.log("last", this.lastdoc);

        // Construct a new query starting at this document,
        if (this.lastdoc) {
            next = query(this.todosCollectionRef, orderBy("date", "desc"), startAfter(this.lastdoc), limit(20));
            // console.log(first, 'first and next data logged', next)
        } else {
            // console.log(first, 'first and next data', next)
        }
        
        onSnapshot(next, (querySnapshot) => {
            const fbTasks = [] 
            querySnapshot.forEach((doc) => {
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
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
    
    // async nextTableData(){
    //     let q
    //     // this.spinnerShow = true
        
    //     // if (this.lastdoc) {
    //     //     q = query(this.todosCollectionRef, orderBy("date", "desc"), startAfter(this.lastdoc), limit(10));
    //     //     console.log(q, this.lastdoc);
    //     // } else {
    //     //     q = query(this.todosCollectionRef, orderBy("date", "desc"), limit(15))
    //     //     console.log(q, this.lastdoc);
    //     // }
    //     onSnapshot(q, (querySnapshot) => {
    //         this.lastdoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    //         const fbTasks = [] 
    //             console.log(querySnapshot); 
    //         querySnapshot.forEach((doc) => {
    //             const task = {
    //                 id: doc.id,
    //                 title: doc.data().title,
    //                 priority: doc.data().priority,
    //                 status: doc.data().status,
    //                 desc: doc.data().desc
    //             }
    //             fbTasks.push(task)
    //         })
    //             this.tasks = fbTasks
    //             this.spinnerShow = false
    //     })
    
    // }

    // next(){
    //     this.nextTableData()
    // }

    async previous(){
        let prev
        let prevdoc
        // this.spinnerShow = true
        const first = query(this.todosCollectionRef, orderBy("date", "desc"), limit(20))
        const documentSnapshots = await getDocs(first);

        // Get the last visible document
        prevdoc = documentSnapshots.docs[0];
        // console.log("last", prevdoc);

        // Construct a new query starting at this document,
        if (prevdoc) {
            prev = query(this.todosCollectionRef, orderBy("date", "desc"), startAfter(prevdoc), limit(20));
            // console.log(first, 'first and prev data logged', prev)
        } else {
            // console.log(first, 'first and prev data', prev)
        }
        
        onSnapshot(prev, (querySnapshot) => {
            const fbTasks = [] 
            querySnapshot.forEach((doc) => {
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
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

    viewAll(){
        this.active1 = true
        this.active = false
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
        const q = query(this.todosCollectionRef, where("status", "==", status));
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