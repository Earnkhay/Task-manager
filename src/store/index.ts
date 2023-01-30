import { createStore } from 'vuex'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from "@/firebase" 
import { collection, onSnapshot, query, where} from "firebase/firestore"

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
      let tasks: { title: string }[] = []
      const statusCount: number[] = []
      const priorityCount: number[] = []
      const todosCollectionRef = collection( db, `tasks` )
      const todosCollectionQuery = query(todosCollectionRef, where("assignedTo", "==", id))
       onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(todosCollectionQuery, (querySnapshot) => {
            const fbTasks: { title: string }[] = []
            const fbNotStartedTasks: { status: string }[] = [];
            const fbInProgressTasks: { status: string }[] = [];
            const fbCompletedTasks: { status: string }[] = [];
            const fbOverdueTasks: { status: string }[] = [];
            const fbHighTasks: { priority: string }[] = [];
            const fbLowTasks: { priority: string }[] = [];
            const fbMediumTasks: { priority: string }[] = [];
            querySnapshot.forEach((doc) => {
                const task = {
                    title: doc.data().title
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
            })
                statusCount.push(fbNotStartedTasks.length, fbInProgressTasks.length, fbCompletedTasks.length, fbOverdueTasks.length)
                priorityCount.push(fbHighTasks.length, fbMediumTasks.length, fbLowTasks.length)
                tasks = fbTasks
                commit('setTasks', tasks)
                commit('setStatusCount', statusCount);
                commit('setPriorityCount', priorityCount);
                // console.log(statusCount, 'status from vuex');
                resolve()
          })
        }
       })
      })
    },
  },
  modules: {
  }
})
