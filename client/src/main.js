import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import components from './components/ui/index'

// Global Sass
import '@/assets/sass/main.sass'

const app = createApp(App);

components.forEach(component => {
    app.component(component.name ?? "", component)
})

app
    .use(store)
    .use(router)
    .mount('#app')
