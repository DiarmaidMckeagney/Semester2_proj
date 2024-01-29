import { createApp } from 'vue';
import { createStore } from 'vuex'
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router'; // Import your router instance



createApp(App).use(router).use(createPinia()).mount('#app'); // Use the router instance


