<template>
    <div id="login-page" class="py-5">
        <!-- <router-view/> -->
         <div class="p-5 bg">
        <div class="container ">
            <div class="row gx-0">
                <div class="col-md-6 bg-light form">
                    <div class="text-center">
                        <h1 id="header" class="mb-3">{{pageType == "signUp" ? 'Create Account' : 'Log In'}}</h1>
                        <!-- <div>User {{ $route.params.id }}</div> -->
                        <alert v-if="alertShow" :alertText="alertTitle" :alertType="alertType"></alert>
                    </div>
                    <div class="row justify-content-center mt-2">
                            <form action="" id="login-form" class=" col-md-10 text-xs-center">   
                                <div class="mb-3 text-xs-center" v-if="pageType == 'signUp'">
                                    <label for="exampleFormControlInput1" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="username" placeholder="Username" v-model="name"  required>
                                  </div>
                                
                                <div class="mb-3 text-xs-center">
                                    <label for="exampleFormControlInput1" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Email" v-model="email" @blur="validateEmail"  required>
                                  </div>
                    
                                <div class="mb-4 text-xs-center">
                                    <label for="inputPassword" class=" form-label">Password</label>
                                    <div class="password-icon">
                                      <input :type="passwordType" class="form-control password" id="inputPassword" placeholder="Password" v-model="password" @blur="checkPageTypePassword"  required>
                                      <i class="fa-solid icon" :class="{'fa-eye': showEye, 'fa-eye-slash': !showEye}" id="togglePassword" @click="toggleVisibility"></i>
                                      </div>
                                    </div>
                            
                                <div class="text-center">
                                    <button type="submit" class="mb-2 btn bg-primary mainBtn" id="signup" @click.prevent="checkPageTypeAuth(pageType)" >
                                        <spinner v-if="spinnerShow"/>
                                        <div v-else>
                                            {{ pageType == "signUp" ? "Sign Up" : "Sign In"}}
                                        </div>
                                    </button>
                                    <div class="d-grid gap-2 mb-2">
                                        <button class="btn bg-transparent text-dark googleBtn" @click.prevent="signUpWithGoogle">
                                            <spinner v-if="spinnerShows"/>
                                            <div v-else>
                                                {{pageType == "signUp" ? "Sign Up with Google" : "Sign In with Google"}}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                    
                            <p id="account" class="text-center"> {{pageType == "signUp" ? "Already have an account?" : "Don't have an account?"}} <a href="" id="link" @click.prevent="setLoginPage"> {{ pageType == "signUp" ? "Log in here" : "Sign up here" }}</a></p>
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

<script>
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
    import alert from '@/components/alert.vue'
    import axios from 'axios'
    import spinner from '@/components/spinner.vue'
    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
    import { db } from "@/firebase.js"
    import { doc, setDoc } from "firebase/firestore";

    @Options({
        components: {
            alert,
            spinner
        }
    })


    export default class login extends Vue{
        passwordType = 'password'
        pageType ="signUp"
        spinnerShow = false
        spinnerShows = false
        name = ""
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
                this.email = ""
                this.password = ""
            }else if(this.pageType == "login"){
                this.pageType = "signUp"
                this.email = ""
                this.password = ""
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
                        // console.log('valid password');   
                        this.alertShow = false
                    }else if(this.password == ""){
                        this.alertTitle = "Please input Password"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.alertShow = false
                        },3000)
                        // console.log('blur event for no password entered');
                    }else{
                        this.alertTitle = "Password should be at least 6 characters long, contain at least one uppercase & one digit"
                        this.alertType = "Danger"
                        this.alertShow = true
                        setTimeout(
                            () => {
                                this.password = ""
                        },3000)
                        // console.log('blur event for wrong password format');
                    }
                }
            checkPageTypePassword() {
                if (this.pageType == 'signUp') {
                    this.validatePassword()
                }else {
                    return null
                }
            }

            async checkPageTypeAuth(pageType){
                const formData = {
                    email: this.email,
                    password: this.password,
                    name: this.name
                }
                const auth = getAuth()
                // const user = auth.currentUser
                if (pageType == 'signUp' && this.name != "" && this.email != "" && this.password != '' && this.mailformat.test(this.email) && this.regPassword.test(this.password)) {
                    await createUserWithEmailAndPassword(getAuth(), this.email, this.password)
                    .then((user) => {
                        setDoc(doc(db, "users", user.user.uid), {
                            name: this.name
                        });
                        axios.post('https://vue-http-learning-b7e81-default-rtdb.firebaseio.com/loginPage.json', {
                            formData: formData
                        })
                        // console.log(user.user.uid, "Successfully registered");
                        this.alertTitle = "Success !, You're Welcome"
                        this.alertType = "Success"
                        this.alertShow = true
                        this.spinnerShow = true
                        setTimeout(() => {  
                                this.alertShow = false 
                                this.spinnerShow = false 
                                this.$router.push(`/landingPage`)
                                // this.pageType = 'login'   
                                this.email = ''
                                this.password = '' 
                                this.name = '' 
                        },3000) 
                    })
                    .catch((err) => {
                        // this.alertTitle = err.code
                        this.alertType = "danger"
                        this.alertShow = true
                        this.spinnerShow = true
                        switch (err.code) {
                            case "auth/email-already-in-use":
                                this.alertTitle = "Email is already in use";
                                break;
                            case "auth/invalid-email":
                                this.alertTitle = "The email address is Invalid";
                                break;
                            case "auth/operation-not-allowed":
                                this.alertTitle = "Operation not allowed";
                                break;
                            default:
                                this.alertTitle = "Email or password was incorrect";
                                break;
                        }
                        setTimeout(() => {         
                                this.alertShow = false
                                this.spinnerShow = false
                                this.email = ''
                                this.password = ''
                                this.name = ''
                        },3000) 
                    });
                }else if(pageType == 'login'){
                    signInWithEmailAndPassword(auth, this.email, this.password)
                    .then(() => {
                        // console.log(res, "Successfully logged in");
                        // console.log(auth.currentUser);
                        this.alertTitle = "Success !, You're Welcome"
                        this.alertType = "Success"
                        this.alertShow = true
                        this.spinnerShow = true
                        setTimeout(() => {  
                                this.alertShow = false  
                                this.spinnerShow = false
                                this.$router.push('/landingpage')    
                        },3000) 
                    })
                    .catch((err) => {
                        // console.error(err)
                        // console.log(err.code);
                        this.alertType = "danger"
                        this.alertShow = true
                        this.spinnerShow = true
                        switch (err.code) {
                            case "auth/invalid-email":
                                this.alertTitle = "Invalid email";
                                break;
                            case "auth/user-not-found":
                                this.alertTitle = "No Account with that email was found";
                                break;
                            case "auth/wrong-password":
                                this.alertTitle = "Incorrect password";
                                break;
                            default:
                                this.alertTitle = "Email or password was incorrect";
                                break;
                        }
                        setTimeout(() => {         
                                this.alertShow = false
                                this.spinnerShow = false
                                this.email = ''
                                this.password = ''
                        },3000) 
                    });
                }else if(this.name == "" && this.pageType == 'signUp' && this.mailformat.test(this.email) && this.regPassword.test(this.password)){
                    this.alertTitle = "Please input your Name"
                    this.alertType = "Danger"
                    this.alertShow = true
                    this.spinnerShow = true
                    setTimeout(
                        () => {
                            this.alertShow = false
                            this.spinnerShow = false
                            this.name = ''
                        },3000)
                }else{
                    // console.log('why');
                    this.alertTitle = "Error !, Please input Required details"
                    this.alertType = "Danger"
                    this.alertShow = true
                    this.spinnerShow = true
                    setTimeout(
                        () => {
                            this.alertShow = false
                            this.spinnerShow = false
                            this.email = ''
                            this.name = ''
                            this.password = ''
                        },3000)
                    return 
                }
            }

            signUpWithGoogle(){
                // let auth = getAuth();
                const provider = new GoogleAuthProvider();
                signInWithPopup(getAuth(), provider)
                    .then(() => {
                        this.alertTitle = "Success !, You're Welcome"
                        this.alertType = "Success"
                        this.alertShow = true
                        this.spinnerShows = true
                        setTimeout(() => {  
                                this.alertShow = false  
                                this.spinnerShows = false
                                this.$router.push('/landingpage')    
                        },3000) 
                    })
                    .catch((err) => {
                        this.alertType = "danger"
                        this.alertShow = true
                        this.spinnerShows = true
                        switch (err.code) {
                            case "auth/email-already-in-use":
                                this.alertTitle = "Email is already in use";
                                break;
                            case "auth/cancelled-popup-request":
                                this.alertTitle = "You cancelled the popup request";
                                break;
                            case "auth/operation-not-allowed":
                                this.alertTitle = "Operation not allowed";
                                break;
                            default:
                                this.alertTitle = "Email or password was incorrect";
                                break;
                        }
                        setTimeout(() => {         
                                this.alertShow = false
                                this.spinnerShows = false
                        },3000)
                    })
            }

            //register a new user using the cdn
            // eslint-disable-next-line
            // async checkPageTypeAuth(pageType: string){
            //     if (pageType == 'signUp') {
            //         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDISfT_jx0hkD-SDgy5Z8tlPVT79dNEdXg', {
            //             email: this.email,
            //             password: this.password,
            //             username: this.username,
            //             returnSecureToken: true
            //         })
            //         .then((res) => {
                        // console.log(res, 'successful authentication')
            //             setTimeout(() => {         
            //                     this.email = ''
            //                     this.password = ''
            //                     this.username = ''
            //             },3000) 
            //         })
            //         .catch((err) => {
            //             console.error(err.message, "what's the error msg")
            //             this.alertTitle = 'Error !, Account already exists... '
            //             this.alertType = "danger"
            //             this.alertShow = true
            //             setTimeout(() => {         
            //                     this.alertShow = false
            //                     this.email = ''
            //                     this.password = ''
            //                     this.username = ''
            //             },3000) 
                        
            //         });
            //     }else{
            //         await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDISfT_jx0hkD-SDgy5Z8tlPVT79dNEdXg', {
            //             email: this.email,
            //             password: this.password,
            //             username: this.username,
            //             returnSecureToken: true
            //         })
            //         .then((res) => {
            //             console.log(res, 'successful authentication')
            //             this.alertTitle = "Success !, You're Welcome"
            //             this.alertType = "Success"
            //             this.alertShow = true
            //             setTimeout(() => {         
            //                     this.alertShow = false
            //                     this.email = ''
            //                     this.password = ''
            //                     this.username = ''
            //                     this.$router.push('landingpage') 
            //             },3000) 
            //         })
            //         .catch((err) => {
            //             console.error(err.message, "what's the error msg")
            //             this.alertTitle = 'Error !, wrong email or password. Please try again...'
            //             this.alertType = "danger"
            //             this.alertShow = true
            //             setTimeout(() => {         
            //                     this.alertShow = false
            //                     this.email = ''
            //                     this.password = ''
            //                     this.username = ''
            //             },3000) 
                        
            //         });
            //     }
            //     return
            // }
            // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDISfT_jx0hkD-SDgy5Z8tlPVT79dNEdXg
            // eslint-disable-next-line
            // async submitAction(pageType: string){
            //     const formData = {
            //         email: this.email,
            //         password: this.password,
            //         username: this.username
            //     }
            //     // console.log(pageType, "PAGE TYPE", formData);
            //     if(this.username != "" && this.pageType == 'signUp' && this.mailformat.test(this.email) && this.regPassword.test(this.password)){
                    
            //         await axios.post('https://vue-http-learning-b7e81-default-rtdb.firebaseio.com/loginPage.json', {
            //             formData: formData
            //         })
            //         .then((res) => {
            //             console.log(res)
            //             this.alertTitle = "Success !, You're Welcome"
            //             this.alertType = "Success"
            //             this.alertShow = true
            //             setTimeout(() => {  
            //                     this.alertShow = false      
            //                     // this.$router.push('landingpage') 
            //             },3000) 
            //         })
            //         .catch((err) => {
            //             console.error(err)
            //             this.alertTitle = 'Failed to save data - please try again later'
            //             this.alertType = "danger"
            //             this.alertShow = true
            //             setTimeout(() => {         
            //                     this.alertShow = false
            //                     this.email = ''
            //                     this.password = ''
            //                     this.username = ''
            //             },3000) 
            //         });
            //     }else if(this.username == "" && this.pageType == 'signUp' && this.mailformat.test(this.email) && this.regPassword.test(this.password)){
            //         this.alertTitle = "Please input Username"
            //         this.alertType = "Danger"
            //         this.alertShow = true
            //         setTimeout(
            //             () => {
            //                 this.alertShow = false
            //                 this.username = ''
            //             },3000)
            //     }else if(pageType == 'signUp') {
            //         this.alertTitle = "Error !, Please input Required details"
            //         this.alertType = "Danger"
            //         this.alertShow = true
            //         setTimeout(
            //             () => {
            //                 this.alertShow = false
            //                 this.email = ''
            //                 this.username = ''
            //                 this.password = ''
            //             },3000)
            //         return 
            //     }
            // }
       }   

</script>

<style scoped>

#login-page{
    background-image: url(../assets/sharon-mccutcheon-NkQD-RHhbvY-unsplash.jpg);
    background-position: center;
    /* background-attachment: fixed; */
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
}

/* .bg{
    min-height: 100vh;
} */
.googleBtn:hover{
    background-color: rgb(2, 117, 216) !important;
    color: white !important;
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
    padding: 63px;
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

@media (min-width: 768px) and (max-width: 991px) {
    .form{
        padding: 40px; 
    }

    .googleBtn{
        font-size: 14.5px;
        padding: 7px;
    }

    #header{
        font-size: 1.8rem;
    }

    
}

@media (min-width: 488px) and (max-width: 767px) {
    .login-image img{
        display: none;
    }
    
    .form{
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 50px; 
    }
}

@media (min-width: 400px) and (max-width: 487px){  
    .form{
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 35px; 
    }

    #header{
        font-size: 1.6rem;
    }

    .googleBtn{
        font-size: 13.5px;
        padding: 7px;
    }
}

@media (min-width: 353px) and (max-width: 399px){
    .form{
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding: 30px; 
    }

    #login-form p{
        font-size: 0.9rem;
    }

    label{
        font-size: 0.9rem;
    }

    #header{
        font-size: 1.1rem;
        padding: 0;
        margin: 0;
    }
    .googleBtn{
        font-size: 12px;
        padding: 7px;
    }

    .mainBtn{
        font-size: 15px;
        padding: 6px !important;
    }

}

@media screen and (max-width: 352px){
    .form{
        border-top-right-radius: 20px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        padding:  20px; 
    }

    #header{
        font-size: 0.9rem;
        margin-bottom: 0;
        padding-bottom: 0;
    }

    
    /* #login-page{
        padding: 80px 0px !important;
    } */

    #login-form p{
        font-size: 0.7rem;
    }

    label{
        font-size: 0.8rem;
    }

    .googleBtn{
        font-size: 11px;
        padding: 7px;
    }

    .mainBtn{
        font-size: 15px;
        padding: 4px !important;
    }
}


</style>