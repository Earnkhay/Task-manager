<template>
    <nav class="navbar navbar-expand bg-white p-3 navpad border-bottom shadow">
      <div class="container">
        <button class="border-light menubar rounded-2 bg-transparent" @click="$store.commit('toggleSidebar')">
            <i class="fa-solid fa-bars text-secondary fs-4"></i>   
        </button>
        <router-link class="navbar-brand fw-bold navtitle ms-3" :to="{name: 'dashboard'}">{{navTitle}}</router-link>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 mt-2">
            <!-- <li class="nav-item mt-1">
              <div class="p-2">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </li> -->
            <li class="nav-item mt-1 ms-1 dropdown">
                <notification/>
            </li>
            <li class="nav-item px-2 avatar">
              <router-link class="nav-link link-dark fw-bold" active-class="text-success" :to="{ name: 'profile', params: { name: name } }">
                <img :src="photoURL" alt="avatar" v-if="photoURL"  width="35" height="35" class="rounded-circle bg-transparent">
                <img src="@/assets/undraw_Pic_profile_re_7g2h.png" v-else alt="avatar" width="35" height="35" class="rounded-circle bg-transparent">
                <span class="ms-2 name">{{ name }}</span>
              </router-link>
            </li>
          </ul>
      </div>
    </nav>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import { getAuth, onAuthStateChanged  } from '@firebase/auth';
import { db } from "@/firebase"
import notification from '@/components/UI/notification.vue'
import { onSnapshot, doc } from "firebase/firestore";

@Options({
  props: {
    navTitle: String,
  },
  components: {
    notification
  }
})
export default class navBar extends Vue {
  photoURL = ""
  name = ""
  auth = getAuth()
  user = this.auth.currentUser
  // ? means a property is optional. a property can either have a value based on the type defined or its value can be undefined 
  // eslint-disable-next-line
  $store: any;
  navTitle!: string;

  mounted(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
          onSnapshot(doc(db, `users/${user.uid}`, ), (doc) => {
              this.name = doc.data()?.name
              this.photoURL = doc.data()?.photoURL
          })
      }
    })
  }
}
</script>

<style scoped>
.avatar a:hover{
  color: red !important;
}
.avatar, p:hover{
  cursor: pointer;
}
.menubar{
    display: none;
}

@media screen and (max-width: 1000px){
    .menubar{
        display: block;
    }
}
@media screen and (max-width: 528px){
    .name{
      display: none;
    }

    p{
      font-size: 12px;
    }
}
@media (min-width: 300px) and (max-width: 400px){
    .navtitle{
      font-size: 17px;
    }
    .navpad{
      padding: 10px 0px !important;
    }
}
@media screen and (max-width: 299px){
    .navtitle{
      font-size: 15px;
    }
    .navpad{
      padding: 10px 0px !important;
    }

    p{
      font-size: 10px;
    }
}
</style>