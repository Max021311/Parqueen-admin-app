<script setup lang="ts">
  import { computed, ref } from 'vue'
  import Toggle from './Toggle.vue'
  import EditIcon from './EditIcon.vue'
  import InfoIcon from './InfoIcon.vue'
  import CarIcon from './icons/vehicle/CarIcon.vue'
  import TruckIcon from './icons/vehicle/TruckIcon.vue'
  import WorkerIcon from './icons/vehicle/WorkerIcon.vue'
  import WheelChairIcon from './icons/vehicle/WheelChairIcon.vue'
  import axios from './../common/axios'
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const props = defineProps<{ value: ParkingPlace }>()
  const ticket = Array.isArray(props.value.tickets) && props.value.tickets[0]
    ? props.value.tickets[0]
    : null
  const isTaken = computed(() => Array.isArray(props.value.tickets) && props.value.tickets.length > 0)
  let isFetching = ref<boolean>(false)

  async function toggleActiveState (newState: boolean) {
    const token = localStorage.getItem('token') as string
    if (isFetching.value) { return }
    isFetching.value = true
    try {
      await axios.put('/parking-place/' + props.value.id, {
        isActive: newState
      }, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      }) 
      props.value.isActive = newState
    } catch (err) {
      console.error(err)
    }
    isFetching.value = false
  }

  function navigateToTicket () {
    if (ticket === null) { return }
    router.push('/ticket/' + ticket.id)
  }
</script>

<template>
  <div class="shadow-sm bg-white rounded-md p-2 divide-y">
    <div class="grid grid-cols-2 pb-2">
      <div class="flex justify-self-start items-center">
        <span>{{ value.slug }}</span>
      </div>
      <div class="flex justify-self-end items-center gap-2">
        <Toggle
          :modelValue="value.isActive"
          @update:model-value="toggleActiveState"
        />
        <EditIcon
          @click="router.push({ path: '/parking-place', query: { behavior: 'update', id: value.id } })"
          class="w-6 h-6 cursor-pointer"
        />
        <InfoIcon
          @click="navigateToTicket"
          :class="[
            'w-6 h-6 cursor-not-allowed',
            ticket === null ? 'opacity-50' : 'cursor-pointer'
          ]"
        />
      </div>
    </div>
    <div
      :class="[
        'flex items-center justify-center col-span-5 pt-2',
        isTaken ? 'opacity-50' : 'opacity-100'
      ]"
    >
      <CarIcon v-if="value.type === 'normal'" class="w-12 h-12" />
      <TruckIcon v-else-if="value.type === 'big'" class="w-12 h-12" />
      <WheelChairIcon v-else-if="value.type === 'special'" class="w-12 h-12" />
      <WorkerIcon v-else-if="value.type === 'worker'" class="w-12 h-12" />
    </div>
  </div>
</template>
