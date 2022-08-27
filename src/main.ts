import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import swal from 'sweetalert';
// import "../node_modules/izitoast/dist/css/iziToast.css";
// import Emitter from 'tiny-emitter'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'
import VueAxios from 'vue-axios'
import mitt from "mitt"
const emitter = mitt()

const app = createApp(App);
app.use(VueApexCharts);
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.config.globalProperties.emitter = emitter;



createApp(App).use(store).use(router).mount('#app')
