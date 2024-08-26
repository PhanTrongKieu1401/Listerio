import { createApp } from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router'
import pinia from './stores'

import './assets/main.scss'; 

import 'ant-design-vue/dist/reset.css'
import Antd from 'ant-design-vue';

const app = createApp(App);
app.use(Antd);
app.use(router);
app.use(pinia);
app.mount('#app');
