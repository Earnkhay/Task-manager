<template>
    <div class="container mt-2">
    <div class="row">
        <div class="col">
            <div class="card" style="width: 18rem;">
            <img src="../assets/logo.png" class="card-img-top" alt="...">
            <div class="card-body text-center">
                <h5 class="card-title " v-text="cardTitle"></h5>
                <p class="card-text" v-html="cardDesc" v-if="showList"></p>
                <p class="card-text" v-html="cardDesc2" v-else></p>
                <a href="#" class="btn btn-success" @click.once.prevent="showList = !showList">Show List</a>
            </div>
            </div>
            </div>
        <div class="col">
        <div class="card" style="width: 18rem;">
            <img src="../assets/logo.png" class="card-img-top " alt="...">
            <div class="card-body text-center">
                <p class="card-text"  v-for="(fruit, index) in fruits" :key="index"><span :class="{'text-danger': fruit == 'Oranges', 'text-success': fruit == 'Grapes', 'text-warning': fruit == 'Mangoes', 'text-primary': fruit == 'Apples'}">{{ fruit }}</span></p>
                <h6>Feedback : </h6><p>{{feedback}}</p>
                <h6>Age : </h6><p>{{age}}</p>
            </div>
            </div>
        </div>
        <div class="col">
            <div class="card" style="width: 18rem;">
            <img src="../assets/logo.png" class="card-img-top" alt="..." v-show="showImage">
            <div class="card-body text-center" >
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <!-- <img src="../assets/sharon-mccutcheon-NkQD-RHhbvY-unsplash.jpg" > -->
            <img :src="image" v-show="img">
            <div class="card-body text-center">
                <a href="#" class="card-link" @click.left.self.prevent="showImage = !showImage">Card link</a>
                <a href="#" class="card-link" @click.right.prevent="img = !img">Another link</a>
            </div>
            </div>
        </div>
    </div>
    </div>

    <div class="mt-4 container" style="">
    <label for=""  style="display:block" ><b>Feedback</b></label>
    <input type="text" class="mb-2" placeholder="send a message" v-model.lazy="feedback" >
    <label for="" style="display:block" ><b>Age</b></label>
    <input type="number" placeholder="Enter age" v-model.number="age">
    </div>

    <div class="card mt-4">
    <div class="card-header">
        Quote
    </div>
    <div class="card-body">
        <blockquote class="blockquote mb-0">
        <p>A well-known quote, contained in a blockquote element.</p>
        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
        </blockquote>
    </div>
    </div>
</template>

<script lang="ts">
    // export default {
    //     name: "mainbody",
    //     data(){
    //         return {
    //             cardTitle: "New List",
    //             cardDesc: `
    //                 <ol>
    //                     <li>Oranges</li>
    //                     <li>Grapes</li>
    //                     <li>Apples</li>
    //                     <li>Mangoes</li>
    //                 </ol>
    //             `,
    //             cardDesc2: `
    //                 <ol>
    //                     <li>Red</li>
    //                     <li>Blue</li>
    //                     <li>Green</li>
    //                     <li>Purple</li>
    //                 </ol>
    //             `,
    //             showList: true,
    //             fruits: ["Oranges", "Apples", "Grapes", "Mangoes"],
    //             showImage: true,
    //             image: "https://randomuser.me/api/portraits/men/20.jpg",
    //             feedback: "",
    //             img: false,
    //             age: ""
 
    //         }
    //     },
    //     methods: {
    //        setDescription() {
    //             // this.cardDesc = "lorem"
    //         },
    //     }
    // }
    import { Vue} from "vue-class-component"
    export default class mainbody extends Vue {
        cardTitle = "New List"
                cardDesc = `
                    <ol>
                        <li>Oranges</li>
                        <li>Grapes</li>
                        <li>Apples</li>
                        <li>Mangoes</li>
                    </ol>
                `
                cardDesc2 = `
                    <ol>
                        <li>Red</li>
                        <li>Blue</li>
                        <li>Green</li>
                        <li>Purple</li>
                    </ol>
                `
                showList = true
                fruits = ["Oranges", "Apples", "Grapes", "Mangoes"]
                showImage = true
                image = "https://randomuser.me/api/portraits/men/20.jpg"
                feedback = ""
                img = false
                age = ""
                beforeCreate(){
                    console.log("before create");
                }
                created(){
                    console.log("component has been created");
                }
                beforeMount(){
                    console.log("before mounting");
                }
                mounted() {
                    console.log(`the component is now mounted.`) 
                }
                beforeUpdate(){
                    console.log("before update");
                }
                updated(){
                    console.log("component has been updated");      
                }
                beforeUnmount(){
                    console.log("before unmount");
                }
                unmounted(){
                    console.log("component has been unmounted"); 
                }
    }
</script>

<style scoped>
    img{
        padding: 50px;
    }

    .card h5{
        font-weight: bold;
    }

    .card{
        box-shadow: 5px 5px #888;
    }
</style>