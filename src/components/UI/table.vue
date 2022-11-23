<template>
    <table class="table table-secondary table-striped-columns table-hover text-start">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Task</th>
      <th scope="col">Details</th>
      <th scope="col">Time</th>
    </tr>
  </thead>
  <tbody class="table-group-divider border-top-color-success">
    <tr>
      <th scope="row">1</th>
      <td>Website Deployment</td>
      <td>Deploy website</td>
      <td>Tue 01, Feb</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Web design</td>
      <td>Design a website for the new product</td>
      <td>Mon 21, Mar</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Graphics deisgn</td>
      <td>Design logos and graphics for the webpage</td>
      <td>Wed 29, Jun</td>
    </tr>
  </tbody>
</table>
</template>

<script lang="ts">
    import { Vue} from "vue-class-component"

    export default class maintable extends Vue {

    }
</script>

<style scoped>

</style>