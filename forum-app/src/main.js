import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import your router instance

createApp(App).use(router).mount('#app'); // Use the router instance

//I dont even know what a pinia is, but it sounds like a tasty fruit
//import { createPinia } from 'pinia'
//app.use(createPinia())