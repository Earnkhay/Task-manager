<template>
    <nav class="navbar navbar-expand-lg bg-light" >
  <div class="container-fluid">
    <a class="navbar-brand" href="#" >{{navTitle}}</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" aria-current="page" active-class="active" :to="{name: 'landingpage'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'dashboard'}">{{navlink1}}</router-link>
        </li>
        <!-- <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li> -->
        <li class="nav-item">
          <router-link class="nav-link" active-class="active" :to="{name: 'login'}">{{navlink2}}</router-link>
        </li>
      </ul>
      <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
    </div>
  </div>
</nav>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"

  @Options({
    props: {
      navTitle: String,
      navlink1: String,
      navlink2: String
    }
  })
    // export default {
    //     name: 'navBar'
    // }
    export default class navBar extends Vue {
      navText = "emitted parameter"
      mounted(){
        setTimeout(
          () => {
          this.$emit('actionText', this.navText);
        },5000)
      }
    }
</script>

<style>

</style>