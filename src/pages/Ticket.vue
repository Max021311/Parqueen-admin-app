<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { ref, onMounted, computed } from 'vue'
  import Card from './../components/Card.vue'
  import Button from './../components/Button.vue'
  import Spinner from './../components/Spinner.vue'
  import axios from './../common/axios'
  import { useLogging } from '../composables/use-logging'
  import Message from './../components/Message.vue'
  import { isAxiosError } from 'axios'
  import formatDistance from 'date-fns/formatDistance'
  import format from 'date-fns/format'
  import es from 'date-fns/locale/es'

  useLogging()

  const route = useRoute()
  const router = useRouter()
  const isLoading = ref(false)
  const isDisabled = ref(false)
  const token = localStorage.getItem('token') as string
  const id = Number(route.params.id)
  let ticket = ref<TicketData|null>(null)
  const timeInterval = computed(() => {
    if (ticket.value === null) {
      return null
    }
    return formatDistance(new Date(ticket.value.entry_date), new Date(), { locale: es })
  })
  const entryDate = computed(() => {
    if (ticket.value === null) { return null }
    return format(new Date(ticket.value.entry_date), 'yyyy/MM/dd HH:mm:ss')
  })
  const departureDate = computed(() => {
    if (ticket.value === null || ticket.value.departure_date === null) { return 'Sin fecha' }
    return format(new Date(ticket.value.departure_date), 'yyyy/MM/dd HH:mm:ss')
  })

  async function fetchTicket () {
    const res = await axios.get<TicketData>('/ticket/' + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    ticket.value = res.data
    console.log(ticket.value)
  }

  async function registerExit () {
    isDisabled.value = true
    try {
      const res = await axios.post<TicketData>(`/ticket/${id}/register-exit`, undefined,{
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      ticket.value = res.data
    } catch (err) {
      console.error(err)
    }
    isDisabled.value = false
  }

  onMounted(async () => {
    isLoading.value = true
    await fetchTicket()
    isLoading.value = false
  })

</script>

<template>
  <Card class="m-4 h-full">
    <Spinner class="self-center" v-if="isLoading" />
    <div
      v-else
    >
      <Button class="mb-2" color="primary" @click="router.back()">&#60</Button>
      <div
        class="shadow-sm bg-white rounded-md p-2 flex flex-col space-y-2"
      >
        <div
          class="grid grid-cols-2"
        >
          <span>ID del boleto</span>
          <span>{{ ticket?.id }}</span>
        </div>
        <hr>
        <div
          class="grid grid-cols-2"
        >
          <span>ID del lugar</span>
          <span>{{ ticket?.parking_place.slug }}</span>
        </div>
        <hr>
        <div
          class="grid grid-cols-2"
        >
          <span>Fecha de entrada</span>
          <span>{{ entryDate }}</span>
        </div>
        <hr>
        <div
          class="grid grid-cols-2"
        >
          <span>Fecha de salida</span>
          <span>{{ departureDate }}</span>
        </div>
        <hr>
        <div
          class="grid grid-cols-2"
        >
        <span>Tiempo transcurrido</span>
          <span>{{ timeInterval }}</span>
        </div>
        <hr>
        <Button
          color="primary"
          type="button"
          :disabled="ticket?.departure_date !== null || isDisabled"
          @click="registerExit"
        >
          Marcar salida
        </Button>
      </div>
    </div>
  </Card>
</template>
