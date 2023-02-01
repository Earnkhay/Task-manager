<template>
  <div id="app">
    <nav-bar :navTitle="navTitle"/>
    <toast v-if="toastShow" :icon="toastIcon" :title="toastTitle"/>
    <div class="container p-5">
      <div class="row align-items-center">
        <div class="col">
          <h1>Profile</h1>
          <p>Change your profile settings here.</p>
        </div>
        <div class="col">
          <img src="../assets/undraw_Profile_data_re_v81r.png" alt="" class="img-fluid">
        </div>
      </div>
    </div>

    <div class="container p-4">
      <div class="container">
        <div class="mb-3">
          <button type="button" class="btn me-2" :class="[profileDisplay == false ? 'btn-transparent' : 'btn-primary']" @click="profileDisplay = true, formDisplay = false">Profile</button>
          <button type="button" class="btn btn-transparent" :class="[formDisplay == true ? 'btn-primary' : '']" @click="formDisplay = true, profileDisplay = false">Account settings</button>
        </div>
        
        <form action="" v-if="profileDisplay">
          <input class="form-control mb-3" type="text" v-model="name" placeholder="Name" aria-label="default input example">
          <input class="form-control mb-3" type="text" v-model="role" placeholder="Your role in your team" aria-label="default input example">
          <!-- <input class="form-control mb-3" type="number" v-model="number" placeholder="Phone Number" aria-label="default input example"> -->
          <button type="button" class="btn btn-primary" @click="updateProfile">Save changes</button>
        </form>
        
        <form action="" v-if="formDisplay">
          <input class="form-control mb-3" type="text" v-model="name" placeholder="Name" readonly>
          <input class="form-control mb-3" type="email" v-model="email" placeholder="email" aria-label="default input example" readonly>
          <div class="mb-3">
            <input class="form-control mb-3" type="file" ref="fileInput" id="imageInput" @change="uploadImage" accept=".png, .jpg, .jfif">
            <img :src="photoURL" style="width: 5rem; height: 30%;" alt="preview image"><span class="p-1 delete-img" style="cursor: pointer;" @click="deleteImage()">X</span>
          </div>
          <button type="button" class="btn btn-primary me-2 mb-2" @click="savePicture">Save Avatar</button>
          <button type="button" class="btn btn-success mb-2" @click="updatePass">Reset Password</button>
        </form>

      </div>
    </div>
  </div>
</template>

<script lang="ts" >
import { Options, Vue } from 'vue-class-component';
import toast from '@/components/UI/toast.vue'
import navBar from "@/components/UI/navbar.vue"
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

@Options({
  components: {
    toast,
    navBar
  },
})
export default class profile extends Vue {
  auth = getAuth();
  user = this.auth.currentUser
  id = this.user?.uid
  navTitle = "My Profile"
  name = ""
  role = ""
  email: string|null = ""
  images = []
  toastIcon = ''
  toastTitle = ''
  toastShow = false
  formDisplay = false
  profileDisplay = true
  storage = getStorage();
  photoURL = ""

  created(){
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.email = user.email;
        onSnapshot(doc(db, "users", user.uid), (doc) => {
            this.name = doc.data()?.name
            this.role = doc.data()?.role
            this.photoURL = doc.data()?.photoURL
        })
      }
    });
  }

  async uploadImage() {
    // const file = document.getElementById('imageInput').files[0];
    const file = (document.getElementById('imageInput') as HTMLInputElement).files![0];
    
    const storageRef = ref(this.storage, 'avatar/' + file.name);

    // 'file' comes from the Blob or File API
    await uploadBytes(storageRef, file).then(() => {
        // this.images.push(snapshot);
        // this.fileName = snapshot.metadata.name
        this.toastIcon = 'success'
        this.toastTitle = 'Image uploaded successfully'
        this.toastShow = true
      });

    // Get the download URL
    getDownloadURL(storageRef)
      .then((url) => {
        // Insert url into an <img> tag to "download"
        this.photoURL = url
      })
      .catch((error) => {
        this.toastShow = true
        this.toastIcon = 'error'
        switch (error.code) {
          case 'storage/object-not-found':
            this.toastTitle = 'object not found'
            break;
          case 'storage/unauthorized':
            this.toastTitle = 'unauthorized'
            break;
          case 'storage/canceled':
            this.toastTitle = 'canceled'
            break;
          case 'storage/unknown':
            this.toastTitle = 'unknown'
            break;
        }
      });
  }

  deleteImage(){
    // Create a reference to the file to delete
    const imageRef = ref(this.storage, `${this.photoURL}`)

    // Delete the file
    deleteObject(imageRef).then(() => {
      (document.getElementById('imageInput')as HTMLInputElement).value = ''
      this.toastShow = true
      this.toastIcon = 'success'
      this.toastTitle = 'Image deleted successfully'
      this.photoURL = "" 
    }).catch((error) => {
      this.toastShow = true
      this.toastIcon = 'error'
      this.toastTitle = error
    });
  }

  updatePass(){
    sendPasswordResetEmail(this.auth, this.email!)
    .then(() => {
      this.toastShow = true
      this.toastIcon = 'success'
      this.toastTitle = 'Password reset email sent!'
    })
    .catch((error) => {
      this.toastShow = true
      this.toastIcon = 'error'
      this.toastTitle = error.message
    });
  }

  updateProfile(){
    updateDoc(doc(db, `users/${this.id}`), {
        name: this.name,
        role: this.role
    })
    this.toastShow = true
    this.toastIcon = 'success'
    this.toastTitle = 'Profile updated successfully'
  }
  savePicture(){
    updateDoc(doc(db, `users/${this.id}`), {
        photoURL: this.photoURL,
    });
    (document.getElementById('imageInput')as HTMLInputElement).value = '';
    this.toastIcon = 'success'
    this.toastTitle = 'Avatar uploaded successfully'
    this.toastShow = true
    this.photoURL = ""
  }
}
</script>

<style scoped>
  #app{
    min-height: 100vh;
  }
  @media screen and (max-width: 405px){
      p{
        font-size: 13px;
      }
  }
</style>
