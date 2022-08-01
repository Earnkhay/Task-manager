<template>
    <div>
       <p v-text="msg"></p>
       <div v-html="html"></div>
       <div v-show="show"><h2>Let's do this</h2></div>
       <div v-if="check"><h3>Whatever</h3></div>
       <div v-if="Math.random() > 0.5">
            Now you see me
       </div>
       <div v-else>
            Now you don't
       </div>
       <div v-for="(item, index) in items" :key="index">
            {{ item }}
       </div>
       <!-- method handler -->
        <img :src="image" v-show="img">
        <button v-on:click="img = !img">imageButton</button>
        
        <div class="mt-4 container" style="">
        <label for=""  style="display:block" ><b>Feedback</b></label>
        <input type="number" class="mb-2" placeholder="send a message" v-model.number.lazy="feedback" >
        </div>
        <p>Feedback: {{feedback}}</p>
    </div>
</template>

<script>
    export default{
        name: 'example',
        components: "",
        data(){
            return{
                msg: "Hello World. How do you do?",
                html: `
                    <p>Vue is nice</p>                
                `,
                show: true,
                check: true,
                items: ['orange', 'apples', 'banana'],
                image: "https://randomuser.me/api/portraits/men/20.jpg",
                img: false,
                feedback: ""
            }
        },
        methods: {
           
        } 
    }
</script>

<style scoped>
    p{
        background-color: blue;
        padding: 10px;
    }
</style>