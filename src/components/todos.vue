<template>
    <div class="container bg-light pb-4 rounded-2 cover">
        <table class="table table-sm table-hover" id="table_id" style="z-index: 1;">
            <thead class="border-bottom-none">
                <tr>
                    <th scope="col" class="py-4">Recent Task</th>
                    <th scope="col" class="py-4">Due date</th>
                    <th scope="col" class="py-4">Priority</th>
                    <th scope="col" class="py-4">Status</th>
                    <th scope="col" class="py-4"> 
                        <div class="dropstart d-flex justify-content-end" style="z-index: 10;">
                            <i class="fa-solid fa-ellipsis-vertical text-primary fs-5" data-bs-toggle="dropdown"></i>
                            <ul class="dropdown-menu">
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
                        <div class="dropstart" style="z-index: 100;">
                            <li class="submenu"><a class="dropdown-item dropdown-toggle" data-bs-toggle="dropdown" href="#">Date</a>
                                <ul class="dropdown-menu tablemenu">
                                    <li><Datepicker v-model="date" @change="filterDate" inline auto-apply /></li>
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
                    <th>{{ task.duedate }}</th>
                    <td><i class="fa-solid fa-flag" v-if="task.priority" :class="[task.priority == 'High' ? 'text-danger' : task.priority == 'Medium' ? 'text-warning' : task.priority == 'Low' ? 'text-secondary' : '']"></i> {{ task.priority }} </td>
                    <td>
                        <select class="form-select text-light rounded-5 w-75 selectStatus" v-model="task.status" @change="updateStatus(task.id, task.status)" :class="[task.status == 'Not started' ? 'bg-primary' : task.status == 'In progress' ? 'bg-warning' : task.status == 'Completed' ? 'bg-success' : task.status == 'Overdue' ? 'bg-danger' : 'bg-transparent' ]" aria-label="Default select example">
                            <option selected v-text="task.status"> </option>
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
                            <a class="page-link" href="#" aria-label="Next" @click="nextTableData" disabled>
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
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <label class="form-label">Start date</label>
                    <Datepicker v-model="editStartdate" :enable-time-picker="false"/>
                </div>
                <div class="mb-3">
                    <label class="form-label">Due date</label>
                    <Datepicker v-model="editDuedate" :enable-time-picker="false"/>
                </div>
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
import { db } from "@/firebase"
import spinner from '@/components/UI/spinner.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import EasyDataTable from 'vue3-easy-data-table';
import nkselector from '@/components/UI/nkselector.vue'
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, where, getDoc, startAfter, getDocs, limit, query, orderBy, } from "firebase/firestore";

@Options({
    components: {
        spinner,
        nkselector,
        Datepicker,
        EasyDataTable,
    }
})

export default class todos extends Vue {
    spinnerShow = false
    spinnerSize = "spinner-border-lg"
    tasks = []
    task
    currentTask
    lastdoc = null
    toastIcon = ''
    toastTitle = ''
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    viewDuedate = ""
    date = ""
    editTitle = ""
    editPriority = ""
    editDuedate = ""
    editStartdate = ""
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
        // {sText: 'Overdue'}
    ]
    // headers = [
    //       { text: "Recent Task", value: "title" },
    //       { text: "Priority", value: "priority"},
    //       { text: "Status", value: "status"},
    //       { text: "Operation", value: "operation"},
    // ]

    mounted(){ 
        this.spinnerShow = true
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks = []
                querySnapshot.forEach((doc) => {
                    // const date = new Date(doc.data().duedate);
                    const duedate = new Date(doc.data().duedate.seconds * 1000);
                    const formattedDate = duedate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const startdate = new Date(doc.data().startdate.seconds * 1000);
                    const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
                        startdate: formattedStartDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                    fbTasks.push(task)
                })
                    this.tasks = fbTasks
                    this.spinnerShow = false
                    const overdueTasks = this.tasks.filter(task => {
                        const currentDate = new Date();
                        const duedate = new Date(task.duedate);
                        return currentDate > duedate;
                    });
                    overdueTasks.forEach(task => {
                        if(task.status != 'Completed'){
                            task.status = 'Overdue';
                            updateDoc(doc(db, `users/${this.id}/tasks`, task.id), {
                                status: task.status,
                            });
                        }
                    });
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
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
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
        const first = query(this.todosCollectionRef, orderBy("date", "desc"), limit(20))
        const documentSnapshots = await getDocs(first);

        prevdoc = documentSnapshots.docs[0];

        if (prevdoc) {
            prev = query(this.todosCollectionRef, orderBy("date", "desc"), startAfter(prevdoc), limit(20));
        } else {
            //
        }
        
        onSnapshot(prev, (querySnapshot) => {
            const fbTasks = [] 
            querySnapshot.forEach((doc) => {
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
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
        onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
            const fbTasks = []
            querySnapshot.forEach((doc) => {
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc
                    }
                fbTasks.push(task)
            })
                this.tasks = fbTasks
            })
    }

    filterDate(){
        // const fdate = new Date(this.date);
        // const formattedfDate = fdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        console.log(this.date);
        const q = query(this.todosCollectionRef, where("duedate", "==", this.date));
        onSnapshot(q, (querySnapshot) => {
            const fbTasks = []
            querySnapshot.forEach((doc) => {
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
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
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
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
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (doc.data().priority == priority) {
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
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
        this.editDesc = taskToUpdate.desc,
        this.editDuedate = taskToUpdate.duedate,
        this.editStartdate = taskToUpdate.startdate,
        this.currentTask = taskToUpdate
    }

    updateStatus(id, status){
        updateDoc(doc(db, `users/${this.id}/tasks`, id), {
            status: status,
        });
    }

    displayToast() {
        this.$swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        }).fire({
            icon: this.toastIcon,
            title: this.toastTitle,
        })
    } 

    async updateTask(){
        //firebase Timestamp can be used to change the date to a timestamp before saving back to firebase
        // const duedate = Timestamp.fromDate(new Date(this.editDuedate));
        // const startdate = Timestamp.fromDate(new Date(this.editStartdate));

        //or you can also use the js date object
        const duedate = new Date(this.editDuedate);
        const startdate = new Date(this.editStartdate);

        await updateDoc(doc(db, `users/${this.id}/tasks`, this.currentTask.id), {
            title: this.editTitle,
            priority: this.editPriority,
            desc: this.editDesc,
            duedate: duedate,
            startdate: startdate,
        });
        this.toastIcon = 'success'
        this.toastTitle = 'Task updated successfully'
        this.$swal = Swal;
        this.displayToast()
    }

    async viewTask(id){
        const docRef = doc(db, `users/${this.id}/tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const date = new Date(docSnap.data().duedate.seconds * 1000);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
            this.viewDuedate = formattedDate
        }
    }

    deleteTask(id){
        deleteDoc(doc(db, `users/${this.id}/tasks`, id));
        this.toastIcon = 'success'
        this.toastTitle = 'Task deleted successfully'
        this.$swal = Swal;
        this.displayToast()
    }

}
</script>

<style scoped>
   .success{
        background-color: rgb(164, 243, 164);
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