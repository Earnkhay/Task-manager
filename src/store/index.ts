import { createStore } from 'vuex'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase" 
import { collection, onSnapshot, query, updateDoc, doc, orderBy, } from "firebase/firestore"

export default createStore({
  state: {
    sidebarVisible: true,
    tasks: [],
    statusCount: [],
    priorityCount: [],
  },
  getters: {
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    setSidebarVisibility(state, payload) {
      state.sidebarVisible = payload;
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    },
    setStatusCount(state, statusCount) {
      state.statusCount = statusCount
    },
    setPriorityCount(state, priorityCount) {
      state.priorityCount = priorityCount
    },
  },
  actions: {
   getTasks({ commit }) {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth()
      const user = auth.currentUser
      const id = user?.uid
      let tasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; assignedTo: string; }[] = []
      const statusCount: number[] = []
      const priorityCount: number[] = []
      const todosCollectionRef = collection( db, `tasks` )
      const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"))
       onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(todosCollectionQuery, (querySnapshot) => {
            const fbTasks: { id: string; title: string; duedate: string; startdate: string; priority: string; status: string; desc: string; createdBy: string; assignedTo: string; }[] = []
            const fbNotStartedTasks: { status: string }[] = [];
            const fbInProgressTasks: { status: string }[] = [];
            const fbCompletedTasks: { status: string }[] = [];
            const fbOverdueTasks: { status: string }[] = [];
            const fbHighTasks: { priority: string }[] = [];
            const fbLowTasks: { priority: string }[] = [];
            const fbMediumTasks: { priority: string }[] = [];
            querySnapshot.forEach((doc) => {
              const duedate = new Date(doc.data().duedate.seconds * 1000);
              const formattedDate = duedate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              const startdate = new Date(doc.data().startdate.seconds * 1000);
              const formattedStartDate = startdate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              if (doc.data().assignedTo == id) {
                const task = {
                  id: doc.id,
                  title: doc.data().title,
                  duedate: formattedDate,
                  startdate: formattedStartDate,
                  priority: doc.data().priority,
                  status: doc.data().status,
                  desc: doc.data().desc,
                  createdBy: doc.data().createdBy,
                  assignedTo: doc.data().assignedTo,
                }
                fbTasks.push(task)
              
                switch (doc.data().status) {
                    case "Not started":
                        fbNotStartedTasks.push({ status: doc.data().status });
                    break;
                    case "In progress":
                        fbInProgressTasks.push({ status: doc.data().status });
                    break;
                    case "Completed":
                        fbCompletedTasks.push({ status: doc.data().status });
                    break;
                    case "Overdue":
                        fbOverdueTasks.push({ status: doc.data().status });
                    break;
                }

                switch (doc.data().priority) {
                    case "High":
                        fbHighTasks.push({ priority: doc.data().priority });
                    break;
                    case "Low":
                        fbLowTasks.push({ priority: doc.data().priority });
                    break;
                    case "Medium":
                        fbMediumTasks.push({ priority: doc.data().priority });
                    break;
                }
              } 
            })
                statusCount.push(fbNotStartedTasks.length, fbInProgressTasks.length, fbCompletedTasks.length, fbOverdueTasks.length)
                priorityCount.push(fbHighTasks.length, fbMediumTasks.length, fbLowTasks.length)
                tasks = fbTasks
                const overdueTasks = tasks.filter((task: { duedate: string|number|Date; }) => {
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
                commit('setTasks', tasks)
                commit('setStatusCount', statusCount);
                commit('setPriorityCount', priorityCount);
                // console.log(statusCount, 'status from vuex');
                resolve()
          })
        }else{
          reject()
        }
       })
    })
   },
  },
  modules: {
  }
})
