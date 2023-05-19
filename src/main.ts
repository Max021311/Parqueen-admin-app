import { createApp } from 'vue'
import "./style.css"
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import LogIn from './pages/LogIn.vue'
import ParkingPlaces from './pages/ParkingPlaces.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: LogIn, name: 'LogIn' },
    { path: '/parking-places', component: ParkingPlaces, name: 'ParkingPlaces' }
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
