import { createApp } from 'vue';
import { createStore } from 'vuex'
import { createPinia } from 'pinia'
import App from './App.vue';
import router from './router'; // Import your router instance


const store = createStore({
    state()
    {
        return{
            count: 0
        }
}, 
    mutations: {
        incremenet(state)
        {
            state.count++
        }
    }

})

createApp(App).use(router).mount('#app'); // Use the router instance


app.use(createPinia())
app.use(store)