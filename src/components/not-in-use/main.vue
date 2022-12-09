<template>
  <!-- <nav-bar :navTitle="navText" @actionText="setTitleEmit"/> -->
  <!-- <button @click.prevent="setTitle" >Change Title</button> -->
  <div class="container mt-3">
    <EasyDataTable
    :headers="headers"
    :items="items"
    buttons-pagination
  />
  </div>
  <router-view/>
  <my-footer/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import myFooter from '@/components/UI/footer.vue'
import EasyDataTable from 'vue3-easy-data-table';
// import type { Header, Item } from "vue3-easy-data-table";

@Options({
  components: {
    myFooter,
    EasyDataTable
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
  // navText = "horizon"
  // setTitle(){
  //   this.navText = "Amazon"
  // }
  // setTitleEmit(emittedParam : string){
  //   this.navText = emittedParam
  // }

  headers = [
          { text: "PLAYER", value: "player" },
          { text: "TEAM", value: "team"},
          { text: "NUMBER", value: "number"},
          { text: "POSITION", value: "position"},
          { text: "HEIGHT", value: "indicator.height"},
          { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true},
          { text: "LAST ATTENDED", value: "lastAttended", width: 200},
          { text: "COUNTRY", value: "country"},
  ]
  items = [
    { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: {"height": '6-2', "weight": 185}, lastAttended: "Davidson", country: "USA"},
    { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: {"height": '6-9', "weight": 250}, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA"},
    { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: {"height": '6-10', "weight": 240}, lastAttended: "Texas-Austin", country: "USA"},
    { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: {"height": '6-11', "weight": 242}, lastAttended: "Filathlitikos", country: "Greece"},
  ]
}
</script>

<style lang="scss">

</style>
