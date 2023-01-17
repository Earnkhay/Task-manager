<template>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <!-- <button class="border-light menubar" @click="toggleSidebar">
        <i class="fa-solid fa-bars text-dark"></i>   
    </button> -->
    <div class="d-flex" id="app">
            <div class="p-3 border-end bg-white adminbar" id="app" v-if="$store.state.sidebarVisible">
                <div class="d-flex justify-content-between border-bottom mb-3 py-3">
                    <router-link to="/task/dashboard" class="text-decoration-none fs-5 link-dark"><img src="../assets/Tictask-logo.png" class="img-fluid" alt=""></router-link>
                    <i class="fa-solid fa-x menubar" @click="$store.commit('toggleSidebar')"></i> 
                </div>
                <ul class="nav nav-pills flex-column mb-auto py-3">
                    <li class="nav-item mb-1 p-1">
                        <router-link to="/task/dashboard" active-class="active" class="nav-link link-dark fw-bold" aria-current="page">
                            <!-- <i class="fa-solid fa-chart-line p-1"></i> -->
                            <i class="fa-solid fa-border-all p-1"></i>
                            Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item mb-1 p-1">
                        <router-link to="/task/todo" active-class="active" class="nav-link text-dark fw-bold">
                            <i class="fa-regular fa-square-check p-1"></i>
                            To do
                        </router-link>
                    </li>
                    <li class="nav-item mb-1 p-1">
                        <router-link to="/task/profile" active-class="active" class="nav-link text-dark fw-bold">
                            <i class="fa-solid fa-user p-1"></i>
                                Profile
                        </router-link>
                    </li>
                    <li class="nav-item mb-1 p-1">
                        <a href="#" class="nav-link text-dark fw-bold" @click="logout">
                            <i class="fa-solid fa-right-from-bracket p-1"></i>
                            Logout
                        </a>
                    </li>
                </ul>
                <hr>
                <!-- <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2">
                        <strong>taskr</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div> -->
            </div>
        <div class="content">
            <div class="dashboard-content bg-light">
                <router-view/>
              </div>
        </div>
    </div>
  
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import toast from '@/components/UI/toast.vue'
import { getAuth, signOut } from "firebase/auth";


@Options({
  components: {
    toast
  },
})
export default class sidebar extends Vue {
    auth = getAuth();
    user = this.auth.currentUser
    id = this.user.uid
    sidebarVisible = true
    name = ""
    email = ""
    photoURL = ""
    toastIcon = ''
    toastTitle = ''
    toastShow = false

    // handleResize() {
    //     if (window.innerWidth <= 1000) {
    //         this.sidebarVisible = false;
    //     } else {
    //         this.sidebarVisible = true;
    //     }
    // }
    handleResize() {
    if (window.innerWidth <= 1000) {
        this.$store.commit('setSidebarVisibility', false);
    } else {
        this.$store.commit('setSidebarVisibility', true);
    }
}
    mounted() {
        window.addEventListener('resize', this.handleResize);
    }

    toggleSidebar() {
        this.sidebarVisible = !this.sidebarVisible;
    }

    async logout(){
        const auth = getAuth();
        await signOut(auth).then(() => {
            this.toastShow = true
            this.toastIcon = 'success'
            this.toastTitle = 'Logged out successfully'
        }).catch(() => {
            // An error happened.
        });
    }
}
</script>

<style scoped>
    #app{
        overflow: hidden;
    }

    .content{
        min-height: 100vh;
        width: 100%;
        margin-left: 260px;
    }

    .adminbar{
        min-height: 100vh;
        min-width: 260px;
        max-width: 260px;
        transition: all 2s;
        z-index: 1;
        position: fixed;
    }

    li:hover{
        background-color: #c5ddf3 !important;
        border-radius: 5px;
    }

    .active{
        background-color: #c5ddf3 !important;
        color: blue !important;
    }

    .menubar{
        display: none;
    }

    @media screen and (max-width: 1000px){
        .content{
            margin-left: 0px;
        }
        .menubar{
            display: block;
        }
    }
</style>