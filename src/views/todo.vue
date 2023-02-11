<template>
    <div id="app">    
        <nav-bar :navTitle="navTitle"/>

        <add-modal/>
        <div class="mb-4">
            <todos/>
         </div>
    </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component"
import navBar from "@/components/UI/navbar.vue"
import todos from '@/components/todos.vue'
import addModal from '@/components/addModal.vue'

@Options({
    components: {
        navBar,
        addModal,
        todos,
    }
})

export default class todo extends Vue {
    navTitle = "My Tasks"
}
</script>

<style scoped>
#app{
    min-height: 100vh;
}
</style>