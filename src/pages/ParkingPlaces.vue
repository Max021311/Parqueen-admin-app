<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Button from './../components/Button.vue'
  import Card from './../components/Card.vue'
  import ParkingPlaceListItem from './../components/ParkingPlaceListItem.vue'
  import { useRouter } from 'vue-router'
  import axios from './../common/axios'
  import Spinner from './../components/Spinner.vue'
  import { useLogging } from './../composables/use-logging'

  useLogging()

  const parkinPlace = ref<{ state: boolean }>({ state: false })
  const router = useRouter()
  let isLoading = ref<boolean>(true)
  let parkingPlaces = ref<ParkingPlace[]>([])

  async function getParkingPlaces () {
    const token = localStorage.getItem('token') as string
    const res = await axios.get<ParkingPlace[]>('/parking-places', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    parkingPlaces.value = res.data
    await new Promise((resolve) => setTimeout(resolve, 500))
    isLoading.value = false
  }

  onMounted(getParkingPlaces)
</script>

<template>
  <Card class="m-4 h-full flex flex-col gap-4">
    <Spinner class="self-center" v-if="isLoading" />
    <div v-else>
      <Button class="mb-2" color="primary" @click="router.back()">&#60</Button>
      <div class="grid grid-cols-3 gap-2 grid-flow-row">
        <ParkingPlaceListItem
          v-for="parkingPlace in parkingPlaces"
          :value="parkingPlace"
        />
      </div>
    </div>
  </Card>
</template>
