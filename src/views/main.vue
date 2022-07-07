<template>
  <nav-bar :navTitle="navText" @actionText="setTitleEmit"/>
  <div class="mt-2 mb-2 container">
  <button @click.prevent="setTitle" >Change Title</button>
  </div>
  <router-view/>
  <my-footer/>
  
</template>

<script lang="ts">
import navBar from '../components/navbar.vue'
import myFooter from '../components/footer.vue'
import {Options, Vue} from "vue-class-component"

@Options({
  components: {
    navBar,
    myFooter
  }
})

// export default {
//   name: 'main',
//   components: {
//     navBar,
//     myFooter
//   }
// }
export default class main extends Vue {
  navText = "horizon"
  setTitle(){
    this.navText = "Amazon"
  }
  setTitleEmit(emittedParam : string){
    this.navText = emittedParam
  }
}
</script>

<style lang="scss">

</style>
