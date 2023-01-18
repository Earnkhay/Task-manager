<template>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" data-bs-backdrop="static" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Add a New Task</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input class="form-control" v-model="newTask" type="text" aria-label="default input example">
            </div>
            <div class="d-flex justify-content-between mb-3">
                <div>
                    <label class="form-label">Start date</label>
                    <Datepicker v-model="startDate" :enable-time-picker="false" auto-apply/>
                </div>
                <div>
                    <label class="form-label">End date </label>
                    <Datepicker v-model="dueDate" :enable-time-picker="false" auto-apply/>
                    <!-- <input type="date" v-model="dueDate"> -->
                </div>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Task Priority</label>
                <select class="form-select" aria-label="Default select example" v-model="priority" :class="[priority == 'High' ? 'text-danger' : priority == 'Medium' ? 'text-warning' : priority == 'Low' ? 'text-secondary' : '']">
                    <option selected></option>
                    <option value="High" class="text-danger"><i class="fa-solid fa-flag">High</i></option>
                    <option value="Medium" class="text-warning">Medium</option>
                    <option value="Low" class="text-secondary">Low</option>
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
                <!-- {{ selected.id }} -->
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="description"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearAll">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addTask">Add</button>
        </div>
        </div>
    </div>
    </div>
</template>
  
<script>
import { Options, Vue } from 'vue-class-component';
import { db } from "@/firebase"
import { getAuth } from "firebase/auth"
// import nkselector from '@/components/UI/nkselector.vue'
import VueMultiselect from 'vue-multiselect'
import toast from '@/components/UI/toast.vue'
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

@Options({
    components: {
        Datepicker,
        VueMultiselect,
        toast
    },
})
export default class addModal extends Vue {
    newTask = ""
    description = ""
    startDate = ""
    dueDate = ""
    priority = ""
    tasks = []
    selected = []
    options = []
    status = "Not started"
    toastIcon = ''
    toastTitle = ''
    toastShow = false
    months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    d = new Date()
    month = this.months[this.d.getMonth()]
    day = this.weekday[this.d.getDay()]
    auth = getAuth()
    user = this.auth.currentUser
    id = this.user.uid
    todosCollectionRef = collection(db, `tasks`)

    addTask(){
        if(this.newTask && this.dueDate && this.startDate && this.selected) {
            addDoc(this.todosCollectionRef, { 
                title: this.newTask,
                desc: this.description,
                startdate: this.startDate,
                duedate: this.dueDate,
                priority: this.priority,
                status: this.status,
                createdBy: this.id,
                assignedTo: this.selected.id,
                date: Date.now(),
                day: this.day,
                // month: this.month
            })
            this.toastIcon = 'success'
            this.toastTitle = 'Task added successfully'
            this.toastShow = true
         this.newTask = "" 
         this.description = ""
         this.priority = ""
         this.startDate = ""
         this.dueDate = ""
         this.selected = ""
        }else{
            this.toastIcon = 'warning'
            this.toastTitle = 'Please add required fields'
            this.toastShow = true
        }
    }

    async mounted(){
      const citiesRef = collection(db, "users");
      const q = query(citiesRef);

      const querySnapshot = await getDocs(q);

      const fbUsers = []
      querySnapshot.forEach((doc) => {
        const user = {
            id: doc.id,
            email: doc.data().email,
            // name: doc.data().name,
        }
        fbUsers.push(user)
        // console.log(doc.id, " => ", doc.data());
      });
      this.options = fbUsers
    }

    email ({ email }) {
      return `${email}`
    }

    clearAll() {
        this.newTask = "" 
        this.description = ""
        this.priority = ""
        this.startDate = ""
        this.dueDate = ""
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>