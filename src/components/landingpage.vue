<template>
    <div class="container mt-5">
    <div class="row gx-5">
    <div class="col-md-6">
      <!-- <h2>Good {{hour >= 0 && hour <= 11 ? "morning" :  hour >= 12 && hour <= 17 ? "afternoon" :  "evening"}}, </h2> -->
      <h2>Good {{greet()}},</h2>
      <h1 class="mb-4">{{name}}</h1>
      <!-- <p>{{hour}}</p> -->
      <div class="row mb-4 g-0">
      <div class="col-lg-4 mx-0 mb-4">
      <router-link :to="{name: ''}" id="new"><span class="ps-3 pe-1"><i class="fa-solid fa-circle-plus"></i></span> Create New</router-link>      
      <!-- <button><router-link :to="{name: 'mainbody'}">Create New</router-link></button>
      <button><router-link :to="{name: 'mainbody'}">Go to Dashboard</router-link></button> -->
      </div>
      <div class="col-lg-6 mx-0">
      <router-link :to="{name: 'dashboard'}" id="dashboard"><span class="ps-3 pe-2"><i class="fa-solid fa-rocket"></i></span> Go to Dashboard</router-link>
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
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing due soon/today</b> 
                  EMAIL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">Testing due soon/today</b>
                  PHONE CALL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing due soon</b>
                  APPOINTMENT
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">New Testing Matter</b> <br>
                  GENERAL
              </li>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">First Milestone</b></li> <br>
              <li><span style="margin-left: -30px;" class="p-2"><i class="fa-solid fa-list-check"></i></span><b class="text-primary">Merge Testing</b></li>
              </ul>
          </div>
      </div>
    </div>
    <div class="col-md-6 mt-3">
      <img :src="'assets/'+greetImage()+'.png'" alt="">
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
    d = new Date()
    hour = this.d.getHours()
    // greetImage = "../assets/morningsvg.png"
    greetImage(){
        if (this.hour >= 0 && this.hour <= 11) {
            return 'morningsvg'          
        } else if(this.hour >= 12 && this.hour <= 17) {
            return 'afternoonsvg'    
        }else{
            return 'eveningsvg'
        }
    }
    greet(){
        if (this.hour >= 0 && this.hour <= 11) {
            return "morning"            
        } else if(this.hour >= 12 && this.hour <= 17) {
            return "afternoon"
        }else{
            return "evening"
        }
    }
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
        font-weight: bold;
    }
    #new:hover{
        color: black;
    }

    #dashboard{
        text-decoration: none;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        color: black;
        font-weight: bold;
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
        list-style: none;
    }

    img{
    max-width: 100%;
    height: auto;
    }
</style>