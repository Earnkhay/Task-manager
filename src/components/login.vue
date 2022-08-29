<template>
    <div id="login-page">
        <!-- <nav-bar :navTitle="pageName" :navlink1="pageLink" :navlink2="pageLink1"/> -->
        <router-view/>
         <div class="p-5">
        <div class="container ">
            <div class="row gx-0">
                <div class="col-md-6 bg-light form">
                    <div class="text-center ">
                        <h1 id="header" class="mb-3">{{pageType == "signUp" ? 'Create Account' : 'Log In'}}</h1>
                        <!-- <div>User {{ $route.params.id }}</div> -->
                        <alert v-if="alertShow" :alertText="alertTitle" :alertType="alertType"></alert><br>

                    </div>
                    <div class="row justify-content-center ">
                        
                            <form action="" id="login-form" class=" col-md-10 text-xs-center">   
                                <div class="mb-3 text-xs-center" v-if="pageType == 'signUp'">
                                    <label for="exampleFormControlInput1" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="username" placeholder="Enter username" v-model="username"  required>
                                  </div>
                                
                                <div class="mb-3 text-xs-center">
                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email" @blur="validateEmail"  required>
                                  </div>
                    
                                <div class="mb-4 text-xs-center">
                                    <label for="inputPassword" class=" form-label">Password</label>
                                    <div class="password-icon">
                                      <input :type="passwordType" class="form-control password" id="inputPassword" placeholder="Enter your password" v-model="password" @blur="checkPageType"  required>
                                      <i class="fa-solid icon" :class="{'fa-eye': showEye, 'fa-eye-slash': !showEye}" id="togglePassword" @click="toggleVisibility"></i>
                                      </div>
                                    </div>
                            
                                <div class="text-center">
                                <button type="submit" class="mb-3" id="signup" @click.prevent="submitAction(pageType)">{{pageType == "signUp" ? "Sign Up" : "Sign In"}}</button>
                                <!-- <router-link :to="{name: 'landingpage'}" type="submit" class="mb-3 " id="signup">{{pageType == "signUp" ? "Sign Up" : "Sign In"}}</router-link> -->
                                <!-- <button><router-link :to="{name: 'landingpage'}" type="submit" class="mb-3 " id="signup">{{pageType == "signUp" ? "Sign Up" : "Sign In"}}</router-link></button> -->
                                </div>
                    
                            <p id="account" class="text-center"> {{pageType == "signUp" ? "Already have an account?" : "Don't have an account?"}} <a href="" id="link" @click.prevent="setLoginPage">{{pageType == "signUp" ? "Log in here" : "Sign up here"}}</a></p>
                        </form>
                       
                    </div>
                </div>
                <div class="col-md-6 d-none d-sm-block login-image">
                    <img src="../assets/loginimage.png" alt=""  >
                </div>
            </div>
        </div>
     </div>
    </div>
</template>

<script lang="ts">
    // export default {
    //     name: 'loginPage',
    //     data(){
    //         return{
    //             passwordType: 'password',
    //             pageType: "signUp"
    //         }
    //     },
    //     methods: {
    //         setLoginPage(){     
    //            if(this.pageType == "signUp"){
    //                this.pageType = "login"
    //            }else if(this.pageType == "login"){
    //                this.pageType = "signUp"
    //            }
                
    //         },
    //         toggleVisibility() {
    //             if (this.showEye) this.passwordType = "text";
    //             else this.passwordType = "password";
    //         }
    //    },    
    //    computed:{
    //         showEye: function() {
    //             return this.passwordType == "password";
    //         },
    //     }    
        
    // }

    
    import {Options, Vue} from "vue-class-component"
    import alert from './alert.vue'
    import axios from 'axios'
    @Options({
        components: {
            alert
        }
    })
    export default class login extends Vue{
        passwordType = 'password'
        pageType ="signUp"
        username = ""
        newUser = ""
        email = ""
        password = ""
        alertTitle = ""
        alertType = ""
        alertShow = false
        mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
        regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
        
        setLoginPage(){     
            if(this.pageType == "signUp"){
                this.pageType = "login"
            }else if(this.pageType == "login"){
                this.pageType = "signUp"
            }
                
            }
            toggleVisibility() {
                if (this.showEye) this.passwordType = "text";
                else this.passwordType = "password";
            }
            get showEye() {
                return this.passwordType == "password";
            }
            validateEmail() {
                // console.log('work................', this.mailformat, 'hello', this.email);
                    if (this.mailformat.test(this.email)) {
                        // console.log('valid email address');
                        
                    } else if(this.email == ""){
                         
                        this.alertTitle = "Please input Email address"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.alertShow = false
                        },3000)
                    }else{
                        this.alertTitle = "Please input valid Email address"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.alertShow = false
                                this.email = ""
                        },3000)
                    }
                }
            validatePassword() {

                    if (this.regPassword.test(this.password)) {
                        console.log('valid password');   
                        
                    }else if(this.password == ""){
                        this.alertTitle = "Please input Password"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.alertShow = false
                        },3000)
                        console.log('blur event for no password entered');
                        
                    }else{
                        this.alertTitle = "Password should be at least 6 characters long, contain at least one uppercase & one digit"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.alertShow = false
                                this.password = ""
                        },3000)
                        console.log('blur event for wrong password format');
                    }
                }

            checkPageType(){
                if (this.pageType == 'signUp') {
                    this.validatePassword()
                    console.log(this.checkPageType, 'why are you not working');
                    
                } else {
                    return null
                }
            }
            // eslint-disable-next-line
            async submitAction(pageType: string){
                const formData = {
                    email: this.email,
                    password: this.password,
                    username: this.username
                }
                // console.log(pageType, "PAGE TYPE", formData);
                if(this.email != "" && this.password != "" && this.username != "" && this.pageType == 'signUp' && this.mailformat.test(this.email) && this.regPassword.test(this.password)){
                    
                    await axios.post('https://vue-http-learning-b7e81-default-rtdb.firebaseio.com/loginPage.json', {
                        formData: formData
                    })
                    .then((res) => {
                        console.log(res)
                        this.alertTitle = "Success !, You're Welcome"
                        this.alertType = "Success"
                        this.alertShow = true
                        setTimeout(() => {         
                                this.$router.push('landingpage')
                        },3000) 
                        // this.emitter.emit("changeName", this.username);
                    })
                    .catch((err) => {
                        console.error(err)
                        this.alertTitle = 'Failed to save data - please try again later'
                        this.alertType = "danger"
                        this.alertShow = true
                        setTimeout(() => {         
                                this.alertShow = false
                                this.email = ''
                                this.password = ''
                                this.username = ''
                        },3000) 
                    });
                }else if(this.username == "" && this.pageType == 'signUp' && this.mailformat.test(this.email) && this.regPassword.test(this.password)){
                    this.alertTitle = "Please input Username"
                    this.alertType = "Danger"
                    this.alertShow = true
                    setTimeout(
                        () => {
                            this.alertShow = false
                            this.username = ''
                        },3000)
                }else if(this.email != "" && this.password != "" && this.pageType == 'login' && this.mailformat.test(this.email)){
                    this.alertTitle = "Error !, You do not have an Account"
                    this.alertType = "Danger"
                    this.alertShow = true
                    setTimeout(
                        () => {
                            this.alertShow = false
                            this.email = ''
                            this.password = ''
                        },3000)
                }else{
                    this.alertTitle = "Error !, Please input Required details"
                    this.alertType = "Danger"
                    this.alertShow = true
                    setTimeout(
                        () => {
                            this.alertShow = false
                            this.email = ''
                            this.username = ''
                            this.password = ''
                        },3000)
                    return 
                }
            }
       }   

</script>

<style scoped>
#login-page{
    background-image: url(../assets/sharon-mccutcheon-NkQD-RHhbvY-unsplash.jpg);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
}

img{
    max-width: 100%;
    height: 100%;
    border-bottom-right-radius: 20px;
    border-top-right-radius: 20px;
    background-color: rgb(240, 235, 235);
}

.form{
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    padding: 90px;
}

form button{
    width: 100%;
    background-color: #0096FF;
    padding: 10px;
    border-radius: 10px;
    border-color:  #0096FF;
}

#signup{
    text-decoration: none;
    color: white;
    width: 100%;
    background-color: #0096FF;
    padding: 10px;
    border-radius: 10px;
    border-color:  #0096FF;
}

button{
    color: white;
}

#signup:hover{
    color: red;
}

p a{
    text-decoration: none;
    color: green;
}

form a:hover{
    color: red;
}

.form input{
    border: none;
    border-bottom: 2px solid grey;
}

.password-icon{
    display: flex;
}

.icon{
    margin-left: -30px; 
    margin-top: 10px;
}

@media screen and (max-width: 767px) {
    .login-image img{
        display: none;
    }
    
    .form{
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 80px; 
    }

    .form input{
        width: 70%;
        margin: auto;
    }

    #header{
        padding-bottom: 13px;
    }

    .form label{
        margin-left: 15%;
    }
    
    form button{
        width: 80%;
    }

    /* .password-icon input{
        margin-right: 2px;
        margin-left: 40px;
    } */
    
    .icon{
        margin-right: 20px; 
        margin-top: 10px;
    }

    /* .password{
        margin-right: 20px;
    } */
}


</style>