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

  const props = defineProps<{ value: ParkingPlace }>()
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
</script>

<template>
  <div class="shadow-sm bg-white rounded-md p-2 divide-y">
    <div class="grid grid-cols-2 pb-2">
      <div class="flex justify-self-start items-center">
        <span>{{ value.slug }}</span>
      </div>
      <div class="flex justify-self-end items-center gap-2">
        <Toggle :value="value.isActive" @click="toggleActiveState"/>
        <EditIcon class="w-6 h-6" />
        <InfoIcon class="w-6 h-6"/>
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
