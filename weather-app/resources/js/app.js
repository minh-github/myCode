require('./bootstrap');

import{ createApp } from 'vue';

import WeatherApp from './components/WeatherApp.vue'

const app = createApp({})

app.component('weather-app', WeatherApp)

app.mount('#app')
