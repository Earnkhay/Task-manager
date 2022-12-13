<template>
      <footer class="container justify-content-center align-items-center p-2 mt-3 border-top">
          <ul class="nav justify-content-center">
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

          <div class="text-center container">
            <span class="text-muted"> © 2022. Made with love by Julia</span>
          </div>
      </footer>
</template>

<style scoped>
.nav-link:hover{
  color: red !important;
}
</style>