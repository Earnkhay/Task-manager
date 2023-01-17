<template>
    <nav class="navbar navbar-expand-lg bg-white p-3 border-bottom shadow">
      <div class="container">
        <button class="border-light menubar rounded-2 bg-transparent" @click="$store.commit('toggleSidebar')">
            <i class="fa-solid fa-bars text-secondary fs-4"></i>   
        </button>
        <router-link class="navbar-brand fw-bold navtitle" :to="{name: 'landingpage'}">{{navTitle}}</router-link>
        <button class="navbar-toggler p-0 border-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item mt-1">
              <div class="p-2">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
            </li>
            <li class="nav-item mt-1">
              <div class="p-2">
                <i class="fa-regular fa-bell"></i>
              </div>
            </li>
            <li class="nav-item mt-1">
              <router-link class="nav-link link-dark fw-bold" :to="{name: 'profile'}">
                <i class="fa-solid fa-gear"></i>
              </router-link>
            </li>
            <li class="nav-item px-2 avatar">
              <router-link class="nav-link link-dark fw-bold" active-class="text-success" :to="{name: 'profile'}">
                <img :src="photoURL" alt="avatar" v-if="photoURL"  width="35" height="35" class="rounded-circle bg-transparent">
                <img src="@/assets/undraw_Pic_profile_re_7g2h.png" v-else alt="avatar" width="35" height="35" class="rounded-circle bg-transparent">
                <span class="ms-2">{{ name }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import {Options, Vue} from "vue-class-component"
import { getAuth, onAuthStateChanged  } from '@firebase/auth';
import { db } from "@/firebase"
import { onSnapshot, doc } from "firebase/firestore";

@Options({
  props: {
    navTitle: String,
  }
})
export default class navBar extends Vue {
    // navText = "emitted parameter"
    auth = getAuth()
    photoURL = ""
    name = ""
    // $store: any;
    // mounted(){
    //   setTimeout(
    //     () => {
    //     this.$emit('actionText', this.navText);
    //   },5000)
    // }

  mounted(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        if(user.displayName != null && user.photoURL != null){
                this.name = user.displayName,
                this.photoURL = user.photoURL
            }else{
                onSnapshot(doc(db, `users/${user.uid}`, ), (doc) => {
                    this.name = doc.data().name
                    this.photoURL = doc.data().photoURL
                })
            }
      }
    })
  }
  
  // logOutAction(){
  //   signOut(this.auth).then(() => {
  //     this.$router.push("/login")
  //   })
  //   .catch(() => {
  //     // console.error(error, 'what is the error')
  //   });
  // }
}
</script>

<style scoped>
.avatar a:hover{
  color: red !important;
}
.avatar{
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
@media screen and (max-width: 300px){
    .navtitle{
      font-size: 12px;
    }
}
</style>