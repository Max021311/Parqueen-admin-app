import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useLogging () {
  onMounted(() => {
    const route = useRoute()
    const router = useRouter()
    if (route.name !== 'logging' && localStorage.getItem('credential') === null) {
      router.push({ name: 'LogIn', query: { redirect: route.path } })
    }
  })
}
