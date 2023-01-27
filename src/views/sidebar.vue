<template>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <!-- <button class="border-light menubar" @click="toggleSidebar">
        <i class="fa-solid fa-bars text-dark"></i>   
    </button> -->
    <div class="d-flex" id="app">
        <div class="border-end bg-white adminbar" id="app" v-if="$store.state.sidebarVisible">
            <div class="d-flex justify-content-between py-3 px-2">
                <router-link :to="{name: 'dashboard'}" class="text-decoration-none fs-5 link-dark"><img src="../assets/Tictask-01.png" class="img-fluid" alt=""></router-link>
                <i class="fa-solid fa-x menubar" @click="$store.commit('toggleSidebar')"></i> 
            </div>
            <ul class="nav flex-column mb-auto py-3">
                <li class="nav-item mb-1">
                    <router-link :to="{name: 'dashboard'}" class="nav-link link-dark fw-bold" aria-current="page">
                        <!-- <i class="fa-solid fa-chart-line p-1"></i> -->
                        <i class="fa-solid fa-border-all p-1 me-1"></i>
                       <span class="me-5">Dashboard</span> 
                        <span class="ms-3"><i class="fa-solid fa-angle-right ms-5" ></i></span>
                    </router-link>
                </li>
                <li class="nav-item mb-1">
                    <a class="nav-link text-dark fw-bold" @click="minitodos = !minitodos">
                        <i class="fa-regular fa-square-check p-1 me-1"></i>
                        <span class="me-5 pe-2">Tasks</span>
                        <span class="ms-5 ps-1" v-if="minitodos"><i class="fa-solid fa-angle-down ms-4 ps-3"></i></span>
                        <span class="ms-5" v-else><i class="fa-solid fa-angle-right ms-5"></i></span>
                    </a>
                    <ul class="minitodos" v-if="minitodos">
                        <li>
                            <router-link :to="{name: 'todos'}" active-class="active" class="nav-link text-dark fw-bold">
                                Tasks Created 
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{name: 'todo'}" active-class="active" class="nav-link text-dark fw-bold">
                                Your Tasks
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li class="nav-item mb-1">
                    <router-link :to="{name: 'profile'}" active-class="active" class="nav-link text-dark fw-bold">
                        <i class="fa-solid fa-user p-1 me-1"></i>
                        <span class="me-5">Profile</span>
                        <span class="ms-5"><i class="fa-solid fa-angle-right ms-5"></i></span>
                    </router-link>
                </li>
                <li class="nav-item mb-1">
                    <a href="#" class="nav-link text-dark fw-bold" @click="logout">
                        <i class="fa-solid fa-right-from-bracket p-1"></i>
                        Logout
                    </a>
                </li>
            </ul>
            <!-- <hr> -->
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
    minitodos = false
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

    // toggleSidebar() {
    //     this.sidebarVisible = !this.sidebarVisible;
    // }

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
    .minitodos{
        list-style: none;
    }

    li a:hover{
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