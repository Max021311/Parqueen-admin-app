import { createApp } from 'vue'
import "./style.css"
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Home from './pages/Home.vue'
import LogIn from './pages/LogIn.vue'
import ParkingPlaces from './pages/ParkingPlaces.vue'
import ParkingPlace from './pages/ParkingPlace.vue'
import Ticket from './pages/Ticket.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: LogIn, name: 'LogIn' },
    { path: '/parking-places', component: ParkingPlaces, name: 'ParkingPlaces' },
    { path: '/parking-place', component: ParkingPlace, name: 'ParkingPlace' },
    { path: '/ticket/:id', component: Ticket, name: 'Ticket'}
  ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
