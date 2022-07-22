<template>
  <router-view/>
</template>

<script lang="ts">
// import loginPage from './components/login.vue'
// import areaComp from './components/area.vue'
// import navBar from './components/navbar.vue'
// import myFooter from './components/footer.vue'
import {Options, Vue} from "vue-class-component"

// export default {
//   name: 'App',
//   components: {
//     // loginPage,
//     // navBar,
//     // myFooter
//   }
// }
@Options({
  components: {}
})

export default class App extends Vue {}
</script>

<style>
  #app{
    font-family: 'Raleway', sans-serif;
  }
</style>
