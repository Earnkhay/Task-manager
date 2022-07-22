<template>
    <router-view/>
    <div>Hello</div>
</template>

<script>
import {Options, Vue} from "vue-class-component"
    export default class axios extends Vue{
         // Now call above function after 2 seconds
        // timeoutObj = 
        getTodos(){
            axios({
                method: 'get',
                url: 'https://jsonplaceholder.typicode.com/todos'
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }
        printHello() {
        setTimeout(console.log( "Hello, World!"), 2000);
        }

       
    }
</script>

<style>

</style>