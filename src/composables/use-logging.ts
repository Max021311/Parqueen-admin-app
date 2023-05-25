import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from '../common/axios'

export function useLogging () {
  onMounted(async () => {
    const token = localStorage.getItem('token')
    const route = useRoute()
    const router = useRouter()
    const res = await axios.get<'ok'>('/auth', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    if (route.name !== 'LogIn' && token === null && res.status !== 200) {
      router.push({ name: 'LogIn', query: { redirect: route.path } })
    }
  })
}
