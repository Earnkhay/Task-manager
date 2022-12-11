<template>
    <nav class="navbar navbar-expand-lg bg-transparent p-3 border-bottom shadow">
  <div class="container">
    <router-link class="navbar-brand fw-bold" :to="{name: 'landingpage'}">Task Manager</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link link-dark fw-bold" active-class="text-success" :to="{name: 'landingpage'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link link-dark fw-bold" active-class="text-success" :to="{name: 'dashboard'}">{{navlink1}}</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link link-dark fw-bold" active-class="text-success" :to="{name: 'todo'}">Tasks</router-link>
        </li>
        <li class="nav-item logout">
          <a class="nav-link link-dark fw-bold" @click="logOutAction" v-if="isLoggedIn">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import { getAuth, onAuthStateChanged, signOut  } from '@firebase/auth';

// let auth;
  @Options({
    props: {
      navlink1: String,
    }
  })
    // export default {
    //     name: 'navBar'
    // }
  export default class navBar extends Vue {
      navText = "emitted parameter"
      auth = getAuth()
      isLoggedIn = false
      // mounted(){
      //   setTimeout(
      //     () => {
      //     this.$emit('actionText', this.navText);
      //   },5000)
      // }

    mounted(){
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
    }
    
    logOutAction(){
      signOut(this.auth).then(() => {
        this.$router.push("/")
      }).catch((error) => {
        console.error(error, 'what is the error')
        console.log(error, 'error please');
      });
    }
  }
</script>

<style scoped>
.nav-link:hover{
  color: red !important;
}

.logout{
  cursor: pointer;
}
</style>