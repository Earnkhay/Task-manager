<template>
      <footer class="p-2 mt-auto footer">
        <div class="container d-flex justify-content-between align-items-center border-top p-2">
          <div>
            <span class="text-muted"> © 2022. Made with love by Julia</span>
          </div>

          <div>
            <!-- <h6 class="ms-3 fw-bold">Navigation</h6> -->
          
            <ul class="nav">
              <li class="nav-item">
                <router-link class="nav-link link-dark" active-class="text-success" :to="{name: 'landingpage'}">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link link-dark" active-class="text-success" :to="{name: 'dashboard'}">Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link link-dark" active-class="text-success" :to="{name: 'todo'}">Tasks</router-link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
</template>

<style scoped>
.nav-link:hover{
  color: red !important;
}
</style>