import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '@fortawesome/fontawesome-free/css/all.css'
import VueApexCharts from "vue3-apexcharts"
import axios from 'axios'
import VueAxios from 'vue-axios'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App);

app.component('Datepicker', Datepicker);
app.use(VueApexCharts);
app.use(VueSweetalert2);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)



createApp(App).use(store).use(router).mount('#app')
