import './assets/styles/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import BtnMore from "./components/UI/BtnMore.vue"
import Loader from "./components/UI/Loader.vue"
import Actors from "./components/UI/Actors.vue"
import RecActors from "./components/UI/RecActors.vue"
import VueLazyload from 'vue-lazyload'
import errorImage from '@/assets/images/error.png'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueLazyload, {
    error: errorImage
})

app.component('BtnMore', BtnMore)
app.component('Loader', Loader)
app.component('Actors', Actors)
app.component('RecActors', RecActors)

app.mount('#app')
