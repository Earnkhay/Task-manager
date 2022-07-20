<template>
    <div class="m-4">
        <h5>Global Administrator</h5>
    </div>
    <div class="container">
    <div class="row gx-5">
    <div class="col-md-6">
      <h2>Good Evening, </h2>
      <h1 class="mb-4">{{name}}</h1>
      <div class="row mb-5 gx-0">
      <div class="col-lg-3 mb-3 mx-0">
      <router-link :to="{name: 'mainbody'}" id="new">Create New</router-link>
      
      <!-- <button><router-link :to="{name: 'mainbody'}">Create New</router-link></button>
      <button><router-link :to="{name: 'mainbody'}">Go to Dashboard</router-link></button> -->
      </div>
      <div class="col-lg-4 mx-0">
      <router-link :to="{name: 'mainbody'}" id="dashboard">Go to Dashboard</router-link>
      </div>
      </div>
      <h6>Recent Tasks</h6>
      <div class="row">
          <div class="col-lg-4">
              <ul>
              <li> Tue 01, Feb
                   09:23am
              </li>
              <li>Mon 21, Mar
                  10:20am
              </li>
              <li>Wed 29, Jun
                  05:32am
              </li>
              <li>Thu 23, Jun
                  09:12am
              </li>
              <li>Tue 19, Apr
                  00:00am
              </li>
              <li>Wed 06, Apr
                  00:00am
              </li>
              </ul>
          </div>
          <div class="col-lg-6">
              <ul>
              <li><b> New Testing due soon/today</b> 
                  EMAIL
              </li>
              <li><b> Testing due soon/today</b>
                  PHONE CALL
              </li>
              <li><b> New Testing due soon</b>
                  APPOINTMENT
              </li>
              <li><b>New Testing Matter</b> <br>
                  GENERAL
              </li>
              <li>First Milestone</li> <br>
              <li>Merge Testing</li>
              </ul>
          </div>
      </div>
    </div>
    <div class="col-md-6 mt-3">
      <img src="../assets/istockphoto-1179158215-612x612.jpg" alt="">
    </div>
    </div>
    </div>
    <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"

@Options({
  components: {
  }
})

export default class landingpage extends Vue {
    name = "Sam"
}
</script>

<style scoped>
    #new{
        text-decoration: none;
        color: white;
        width: 100%;
        background-color: rgb(68, 68, 170);
        padding: 10px;
        border-radius: 5px;
        border-color:  rgb(68, 68, 170);
    }
    #new:hover{
        color: darkblue;
    }

    #dashboard{
        text-decoration: none;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        color: black;
    }
    #dashboard:hover{
        background-color: rgb(68, 68, 170);
        color: white;
    }

    h6{
        border-bottom: 1px groove;
        padding: 20px;
        font-weight: bold;
    }

    h1{
        font-weight: bold;
    }

    h2{
        font-weight: bold;
    }

    li{
        padding-bottom: 15px;
    }

    img{
    max-width: 100%;
    height: 80%;
    }
</style>