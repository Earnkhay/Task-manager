<template>
    <router-view/>
    <div>Hello</div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
    export default class axios extends Vue{
        getTodos(){
            axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos'
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
    }
</script>

<style>

</style>