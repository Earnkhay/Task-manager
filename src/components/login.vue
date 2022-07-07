<template>
    <div id="login-page">
        <router-view/>
         <div class="p-5">
        <div class="container ">
            <div class="row gx-0">
                <div class="col-md-6 bg-light form">
                    <div class="text-center mb-3">
                        <h1 id="header" class="mb-4">{{pageType == "signUp" ? 'Create Account' : 'Log In'}}</h1>
                        <div>User {{ $route.params.id }}</div>
                    </div>
                    <div class="row justify-content-center ">
                        
                            <form action="" id="login-form" class=" col-md-10 text-xs-center">                                
                                 <div class="mb-3 text-xs-center">
                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email">
                                  </div>
                    
                                <div class="mb-4 text-xs-center">
                                    <label for="inputPassword" class=" form-label">Password</label>
                                    <div class="password-icon">
                                      <input :type="passwordType" class="form-control password" id="inputPassword" placeholder="Enter your password" >
                                      <i class="fa-solid icon" :class="{'fa-eye': showEye, 'fa-eye-slash': !showEye}" id="togglePassword" @click="toggleVisibility"></i>
                                      </div>
                                    </div>
                            
                                <div class="text-center">
                                <button type="submit" class="mb-3" id="signup">{{pageType == "signUp" ? "Sign Up" : "Sign In"}}</button>
                                </div>
                    
                            <p id="account" class="text-center"> {{pageType == "signUp" ? "Already have an account?" : "Don't have an account?"}} <a href="" id="link" @click.prevent="setLoginPage">{{pageType == "signUp" ? "Log in here" : "Sign up here"}}</a></p>
                        </form>
                       
                    </div>
                </div>
                <div class="col-md-6 d-none d-sm-block login-image">
                    <img src="../assets/Kingdom_sign_in_by_Icons8.gif" alt=""  >
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
    export default class mainbody extends Vue{
        passwordType = 'password'
        pageType ="signUp"
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
       }   

</script>

<style scoped>
body{
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

button{
    color: white;
}

button:hover{
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