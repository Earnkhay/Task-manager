<template>
  <div>
    <VueMultiselect
      v-model="selected"
      :options="options">
    </VueMultiselect>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueMultiselect from 'vue-multiselect'

@Options({
  components: {
    VueMultiselect
  },
})
export default class nkselector extends Vue {
      selected = ''
      options = ['High', 'Medium', 'Low']
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>