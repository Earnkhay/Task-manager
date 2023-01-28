<template>
  <div>
    <VueMultiselect
      v-model="selected"
      :options="options"
      :custom-label="email"
      track-by="email"
      label="email"
      >
    </VueMultiselect>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import VueMultiselect from 'vue-multiselect'
import { db } from "@/firebase"
import { collection, query, getDocs } from "firebase/firestore";

@Options({
  components: {
    VueMultiselect
  },
  // props: {
  //   selected: Object
  // }
})
export default class nkselector extends Vue {
    selected = ''
    options: object = []
    async mounted(){
      const citiesRef = collection(db, "users");
      const q = query(citiesRef);

      const querySnapshot = await getDocs(q);

      const fbUsers: { id: string; email: string; name: string; }[] = []
      querySnapshot.forEach((doc) => {
        const user = {
            id: doc.id,
            email: doc.data().email,
            name: doc.data().name,
        }
        fbUsers.push(user)
      });
      this.options = fbUsers
    }
    // email ({ email }) {
    //   return `${email}`
    // }
    email (option: { email: string; }) {
      return `${option.email}`
    }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>