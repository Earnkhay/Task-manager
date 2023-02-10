<template>
<div id="homepage">
  <nav class="navbar navbar-expand-lg bg-transparent border-bottom border-secondary shadow-sm">
    <div class="container">
        <router-link :to="{name: 'homepage'}" class="navbar-img"><img src="../assets/Tictask-01.png" class="img-fluid" alt=""></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon nav-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-4 nlink">
            <li class="nav-item">
                <router-link :to="{name: 'homepage'}" active-class="fw-bold" class="text-decoration-none link-dark nav-link me-2 ms-1">Home</router-link>
            </li>
            <li class="nav-item">
                <a class="nav-link mx-1 link-secondary" href="#">Features</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mx-1 link-secondary" href="#">Contact</a>
            </li>
            </ul>
            <div>
                <router-link :to="{name: 'login'}" class="text-decoration-none link-dark"><button type="button" class="btn btn-primary btn-lg text-light px-3 py-2">Get Started</button></router-link>
            </div>
        </div>
    </div>
  </nav>

    <div class="container-fluid py-2">
    <div class="row justify-content-center tictask align-items-center p-5">
        <div class="col-md-6 py-5">
            <h1 class="mb-4 fw-bold text-primary lh-base task">TICTASK TASK MANAGEMENT APPLICATION</h1>
            <P class="mb-4 fw-bold fs-5">Our product is geared towards improving <br> productivity and improving time management</P>
            <div>
                <router-link :to="{name: 'login'}" class="text-decoration-none link-dark me-2"><button type="button" class="btn btn-primary text-light btn-lg">Get Started</button></router-link>
                <a href="https://twitter.com/intent/tweet?text=I'm inviting you to collaborate on Tictask. A cool Task management application. Click on the link to join: https://tictask.netlify.app/" target="_blank" type="button" class="btn btn-outline-primary btn-lg iv ">Invite Friend</a>
            </div>
        </div>
        <div class="col-md-5 me-3 ticktask-img"><img src="@/assets/Ticktask-Illustration.png" class="img-fluid" alt="header image"> </div>
    </div>
    </div>

    <div class="container-fluid bg-light todo-app text-dark p-3">
    <div class="row justify-content-between todoapp align-items-center px-6 py-5">
        <div class="col-md-5 py-5 ps-5">
        <h2 class="mb-4 fw-bold text-primary">Why you need the Task Management Application</h2>
        <p class="mb-4 fw-bolder">Recent survey has indicated that individuals, small businesses
        and large companies recognise the need to increase productivity
        and collaborate with modern automated applications.</p>
        <ul class="listed-styled text-primary fw-bold">
            <li class="mb-3">Task Management</li>
            <li class="mb-3">Time Tracking</li>
            <li class="mb-3">To Do list</li>
            <li class="mb-3">Calendar</li>
        </ul>
        </div>

        <div class="col-md-6 nav-image">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
            <img  class="img-fluid rounded-4 " src="@/assets/tictaskajpg.jpg" alt="body image">
            </div>
            <div class="col-md-6">
                <img class="img-fluid rounded-4 mb-2 " src="@/assets/tictaskbjpg.jpg" alt="body image">
                <img class="img-fluid rounded-4  " src="@/assets/tictaskc.jpg" alt="body image">
            </div>
        </div>
        </div>
    </div>
    </div>

    <my-footer/>
</div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import myFooter from '@/components/UI/myFooter.vue'

@Options({
  components: {
    myFooter
  }
})
export default class homepage extends Vue {
}
</script>

<style scoped>
#homepage{
    overflow: hidden;
}
.nav-link:hover{
    color: red !important;
}
.color{
    color: #C366FC;
}
.bg-color{
    background-color: #C366FC;
}
.bg-color:hover{
    background-color: #C366FC;
}

.btn-transparent:hover{
    background-color: #C366FC !important;
    color: white !important;
}
.btn-transparent{
    border-color: #C366FC !important;
}

@media (min-width: 966px) and (max-width: 1115px) {
    .tictask h1{
        font-size: 29px !important;
    }
}
@media (min-width: 768px) and (max-width: 965px) {
    .tictask h1{
        font-size: 28px !important;
    }
    .tictask p{
        font-size: 17px !important;
    }
    
}
@media screen and (max-width: 767px) {
    .tictask{
        padding: 10px !important;
        text-align: center;
    }
    .nav-image {
        display: none;
    }
    .ticktask-img{
        margin-right: 0 !important;
    }
    .navbar-img{
        max-width: 60%;
    }
}
@media (min-width: 413px) and (max-width: 554px) {
    .tictask{
        padding: 20px !important;
    }
    .tictask h1{
        font-size: 24px !important;
    }
    .tictask p{
        font-size: 17px !important;
    }
}
@media screen and (max-width: 412px) {
    .tictask h1{
        font-size: 20px !important;
    }
    .tictask p{
        font-size: 16px !important;
    }
}
@media screen and (max-width: 341px) {
    .iv{
        margin-top: 10px !important;
        margin-right: 8px !important;
    }

    .todoapp{
        padding: 0px !important;
        margin-right: 10px !important;
    }
    .todo-app{
        padding: 0px !important;
    }

    .tictask h1{
        font-size: 16px !important;
    }
}
</style>