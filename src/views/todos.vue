<template>
    <div id="app">
    <nav-bar :navTitle="navTitle"/>
    <add-modal/>
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
                    <h6 class="fw-bold">Assigned To</h6>
                </div>
                <div class="col-md-9">
                    <p> {{assignedTo}}  </p>
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
                <label for="selector" class="form-label">Assign Task</label>
                <VueMultiselect
                    v-model="selected"
                    :options="options"
                    :custom-label="email"
                    track-by="email"
                    label="email"
                />
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

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import { db } from "@/firebase"
import spinner from '@/components/UI/spinner.vue'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import EasyDataTable from 'vue3-easy-data-table';
// import nkselector from '@/components/UI/nkselector.vue'
import VueMultiselect from 'vue-multiselect'
import addModal from '@/components/addModal.vue'
import navBar from '@/components/UI/navbar.vue'
import Swal from "sweetalert2";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot, doc, updateDoc, deleteDoc, where, getDoc, getDocs, limit, query, orderBy } from "firebase/firestore";

@Options({
    components: {
        spinner,
        VueMultiselect,
        Datepicker,
        EasyDataTable,
        addModal,
        navBar
    }
})

export default class todos extends Vue {
    spinnerShow = false
    spinnerSize = "spinner-border-lg"
    tasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; }[] = []
    currentTask: { id: string; }|undefined
    toastIcon = ''
    navTitle = "Task Created"
    toastTitle = ''
    viewTitle = ""
    viewPriority = ""
    viewStatus = ""
    viewDesc = ""
    viewDuedate = ""
    // eslint-disable-next-line
    selected: any = []
    options: object = []
    assignedTo = ""
    date = ""
    editTitle = ""
    editPriority = ""
    editDuedate = ""
    editStartdate = ""
    editDesc = ""
    editStatus = ""
    team = ""
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user?.uid
    todosCollectionRef = collection(db, `tasks`)
    todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), limit(25));
    todosCollectionQueries = query(this.todosCollectionRef, where("createdBy", "==", this.id));
    statusList = [ 
        {sText: 'Not started'},
        {sText: 'In progress'},
        {sText: 'Completed'},
    ]
    // eslint-disable-next-line
    $swal: any;

    mounted(){ 
        this.spinnerShow = true
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
                const fbTasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; }[] = []
                querySnapshot.forEach((doc) => {
                    const duedate = new Date(doc.data().duedate.seconds * 1000);
                    const formattedDate = duedate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const startdate = new Date(doc.data().startdate.seconds * 1000);
                    const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    if (doc.data().createdBy == this.id) {
                        const task = {
                            id: doc.id,
                            title: doc.data().title,
                            duedate: formattedDate,
                            startdate: formattedStartDate,
                            priority: doc.data().priority,
                            status: doc.data().status,
                            desc: doc.data().desc,
                            createdBy: doc.data().createdBy,
                        }
                        fbTasks.push(task)
                    }
                })
                    this.tasks = fbTasks
                    this.spinnerShow = false
                    const overdueTasks = this.tasks.filter((task: { duedate: string|number|Date; }) => {
                        const currentDate = new Date();
                        const duedate = new Date(task.duedate);
                        return currentDate > duedate;
                    });
                    overdueTasks.forEach((task: { status: string; id: string; }) => {
                        if(task.status != 'Completed'){
                            task.status = 'Overdue';
                            updateDoc(doc(db, `tasks`, task.id), {
                                status: task.status,
                            });
                        }
                    });
                })
            }
        })
    }

    created(){
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                onSnapshot(doc(db, "users", user.uid), (doc) => {
                    this.team = doc.data()?.team
                })
                const usersRef = collection(db, "users");
                const q = query(usersRef);
                onSnapshot(q, (querySnapshot) => {
                    const fbUsers: { id: string; email: string; name: string; }[] = []
                    querySnapshot.forEach((doc) => {
                        if (doc.data().team == this.team) {
                            const user = {
                                id: doc.id,
                                email: doc.data().email,
                                name: doc.data().name,
                            }
                            fbUsers.push(user)
                        }
                    })
                    this.options = fbUsers
                })
            }
        });        
    }

    viewAll(){
        onSnapshot(this.todosCollectionQueries, (querySnapshot) => {
            const fbTasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; }[] = []
            querySnapshot.forEach((doc) => {
                const startdate = new Date(doc.data().startdate.seconds * 1000);
                const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
                        startdate: formattedStartDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc,
                        createdBy: doc.data().createdBy,
                    }
                fbTasks.push(task)
            })
                this.tasks = fbTasks
            })
    }
    filterStatus(status: string){
        onSnapshot(this.todosCollectionQueries, (querySnapshot) => {
            const fbTasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; }[] = []
            querySnapshot.forEach((doc) => {
                const startdate = new Date(doc.data().startdate.seconds * 1000);
                const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (doc.data().status == status) {
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
                        startdate: formattedStartDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc,
                        createdBy: doc.data().createdBy,
                    }
                    fbTasks.push(task)
                }
            })
                this.tasks = fbTasks
        })
    }

    filterPriority(priority: string){
        onSnapshot(this.todosCollectionQueries, (querySnapshot) => {
            const fbTasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; }[] = []
            querySnapshot.forEach((doc) => {
                const startdate = new Date(doc.data().startdate.seconds * 1000);
                const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                const date = new Date(doc.data().duedate.seconds * 1000);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                if (doc.data().priority == priority) {
                    const task = {
                        id: doc.id,
                        title: doc.data().title,
                        duedate: formattedDate,
                        startdate: formattedStartDate,
                        priority: doc.data().priority,
                        status: doc.data().status,
                        desc: doc.data().desc,
                        createdBy: doc.data().createdBy,
                    }
                    fbTasks.push(task)
                }
            })
                this.tasks = fbTasks
        })
    }

    editTask(id: string){
        const taskToUpdate = this.tasks.find((task: { id: string; }) => task.id === id)
        if(taskToUpdate != undefined){
            this.editTitle = taskToUpdate.title,
            this.editPriority = taskToUpdate.priority,
            this.editDesc = taskToUpdate.desc,
            this.editDuedate = taskToUpdate.duedate,
            this.editStartdate = taskToUpdate.startdate,
            this.currentTask = taskToUpdate
        }
    }

    updateStatus(id: string, status: string){
        updateDoc(doc(db, `tasks`, id), {
            status: status,
        });
    }
    email (option: { email: string; }) {
      return `${option.email}`
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
        const duedate = new Date(this.editDuedate);
        const startdate = new Date(this.editStartdate);

        await updateDoc(doc(db, `tasks`, this.currentTask!.id), {
            title: this.editTitle,
            priority: this.editPriority,
            desc: this.editDesc,
            duedate: duedate,
            startdate: startdate,
            assignedTo: this.selected.id,
            assignedToEmail: this.selected.email,
            assignedToName: this.selected.name,
        });
        this.toastIcon = 'success'
        this.toastTitle = 'Task updated successfully'
        this.$swal = Swal;
        this.displayToast()
    }

    async viewTask(id: string){
        const docRef = doc(db, `tasks`, id );
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const date = new Date(docSnap.data().duedate.seconds * 1000);
            const formattedDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
            // onSnapshot(doc(db, "users", docSnap.data().assignedTo), (doc) => {
            //     this.assignedTo = doc.data()?.name
            // })
            this.viewTitle = docSnap.data().title
            this.viewPriority = docSnap.data().priority
            this.viewStatus = docSnap.data().status
            this.viewDesc = docSnap.data().desc
            this.viewDuedate = formattedDate
            this.assignedTo = docSnap.data().assignedToName
        }
    }

    deleteTask(id: string){
        deleteDoc(doc(db, `tasks`, id));
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
        z-index: 10;
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
        z-index: 1;
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