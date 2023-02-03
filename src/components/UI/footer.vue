<template>
      <div class="container">
        <footer class="row row-cols-2 row-cols-sm-2 row-cols-md-5 py-5">
            <div class="col-md-3 col-sm-3 mb-3">
                <router-link :to="{name: 'homepage'}"><img src="@/assets/Tictask-01.png" class="img-fluid" alt=""></router-link>
                <p class="text-muted ms-3">© 2023</p>
            </div>

            <div class="col-md-3 col-sm-3 mb-3">

            </div>

            <div class="col-md-3 col-sm-3 mb-3 text-primary fw-bold">
            <h5>Navigation</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2"><router-link :to="{name: 'homepage'}" class="text-decoration-none link-dark ftr-link">Home</router-link></li>
                <li class="nav-item mb-2"><router-link :to="{name: 'dashboard'}" class="text-decoration-none link-dark ftr-link">Dashboard</router-link></li>
                <li class="nav-item mb-2"><router-link :to="{name: 'todo'}" class="text-decoration-none link-dark ftr-link">Tasks</router-link></li>
                <li class="nav-item mb-2"><router-link :to="{name: 'profile'}" class="link-dark ftr-link text-decoration-none">Profile</router-link></li>
            </ul>
            </div>

            <div class="col-md-3 col-sm-3 mb-3 text-primary fw-bold">
            <h5>Socials</h5>
            <ul class="nav flex-column">
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Instagram</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">LinkedIn</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Twitter</a></li>
                <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Facebook</a></li>
            </ul>
            </div>
        </footer>
    </div>
</template>

<style scoped>
.nav-link:hover{
  color: red !important;
}
.ftr-link:hover{
  color: red !important;
}
</style>