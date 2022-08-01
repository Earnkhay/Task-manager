import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.css'
// import swal from 'sweetalert';
import "../node_modules/izitoast/dist/css/iziToast.css";
// import Emitter from 'tiny-emitter'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(VueApexCharts);



createApp(App).use(store).use(router).mount('#app')
