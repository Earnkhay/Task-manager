<template>
  <div>
    <div class="py-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
        <i class="fa-regular fa-bell"></i>
        <span v-if="tasks.length != 0" class="position-absolute top-2 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
        <span class="visually-hidden">New alerts</span>
        </span>
    </div>
    
    <ul class="dropdown-menu dropdown-menu-end" >
        <li><h6 class="dropdown-header">Notification</h6></li>
        <li><hr class="dropdown-divider"></li>
        <li v-if="tasks.length == 0"><p class="dropdown-item text-center" href="#">No notifications.</p></li>
        <li v-else v-for="(task, id) in tasks" :key="id">
        <p class="dropdown-item" @click.prevent="removeNotification(task)">New task was assigned to you by <br>{{ task.createdByName }} on {{ task.date }}
        </p></li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import { getAuth, onAuthStateChanged  } from '@firebase/auth';
import { db } from "@/firebase"
import { collection, onSnapshot, doc, limit, query, orderBy, updateDoc } from "firebase/firestore";

@Options({
  props: {
    navTitle: String,
  }
})
export default class notifiction extends Vue {
  auth = getAuth()
  user = this.auth.currentUser
  id = this.user?.uid
  tasks: { id: string; title: string; priority: string; status: string; desc: string; date: string; createdByName: string; viewed: boolean;}[] = []
  createdBy = ""
  todosCollectionRef = collection(db, `tasks`)
  todosCollectionQuery = query(this.todosCollectionRef, orderBy("date", "desc"), limit(6));

  mounted(){
    onAuthStateChanged(this.auth, (user) => {
      if (user){
        onSnapshot(this.todosCollectionQuery, (querySnapshot) => {
          const fbTasks: { id: string; title: string; priority: string; status: string; desc: string; date: string; createdByName: string; viewed: boolean; }[] = []
          querySnapshot.forEach((doc) => {
                const date = new Date(doc.data().date);
                const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'});
              if (doc.data().assignedTo == this.id && doc.data().viewed == false) {
                  const task = {
                      id: doc.id,
                      title: doc.data().title,
                      priority: doc.data().priority,
                      status: doc.data().status,
                      desc: doc.data().desc,
                      viewed: doc.data().viewed,
                      date: formattedDate,
                      createdByName: doc.data().createdByName,
                  }
                  fbTasks.push(task)
              }
          })
              this.tasks = fbTasks
        })
      }
    })
  }

  removeNotification(task: { id: string; }) {
    updateDoc(doc(db, `tasks`, task.id), {
       viewed: true
    });
  }
}
</script>

<style>

</style>