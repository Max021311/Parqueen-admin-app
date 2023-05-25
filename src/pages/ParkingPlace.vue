<script setup lang="ts">
  import { useRoute, useRouter } from 'vue-router'
  import { reactive, ref, watch, onMounted } from 'vue'
  import Card from './../components/Card.vue'
  import Button from './../components/Button.vue'
  import Toggle from './../components/Toggle.vue'
  import Spinner from './../components/Spinner.vue'
  import axios from './../common/axios'
  import { useLogging } from '../composables/use-logging'
  import Message from './../components/Message.vue'
  import { isAxiosError } from 'axios'

  useLogging()

  type Behavior = 'create' | 'update'
  
  let isLoading = ref(true)
  let isDisabled = ref(false)
  let showMessage = ref(false)
  let messageDescription = ref('')
  let timeout = ref<number|null>(null)

  const route = useRoute()
  const router = useRouter()
  const behavior: Behavior = isBehavior(route.query.behavior) ? route.query.behavior : 'create'
  const required = behavior === 'create'

  const form = reactive<Omit<ParkingPlace, 'tickets' | 'id'>>({
    slug: '',
    type: 'normal',
    position: {
      type: 'Point',
      coordinates: [0, 0]
    },
    isActive: true
  })

  watch(form, () => {
    console.log(form)
  })

  async function fetchParkingPlace () {
    const token = localStorage.getItem('token') as string
    const res = await axios.get<ParkingPlace|null>('/parking-place/' + route.query.id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    if (res.data === null) { return }
    form.slug = res.data.slug
    form.type = res.data.type
    form.position = res.data.position
    form.isActive = res.data.isActive
  }

  function isBehavior (behavior: any): behavior is Behavior {
    return ['create', 'update'].includes(behavior)
  }

  async function submit (event: Event) {
    event.preventDefault()
    isDisabled.value = true

    try {
      const token = localStorage.getItem('token') as string
      const res = await axios({
        method: behavior === 'create' ? 'POST' : 'PUT',
        url: behavior === 'create' ? '/parking-place' : '/parking-place/' + route.query.id,
        headers: {
          Authorization: 'Bearer ' + token
        },
        data: form
      })
      console.log(res.data)
      router.push('/parking-places')
    } catch (err) {
      console.error(err)
      if (isAxiosError(err) && err?.response?.status === 409) {
        console.log(err.response)
        messageDescription.value = 'Ya existe otro lugar con el mismo ID'
        showMessage.value = true
      } else {
        messageDescription.value = 'Algo sucedio, intentalo de nuevo. Si el problema persiste contacta a soporte'
        showMessage.value = true
      }

      timeout.value = window.setTimeout(() => {
        window.clearTimeout(timeout.value!)
        timeout.value = null
        showMessage.value = false
      }, 1000 * 5)
    }
    isDisabled.value = false
  }

  onMounted(async () => {
    isLoading.value = true
    if (behavior === 'update') {
      await fetchParkingPlace()
    }
    isLoading.value = false
  })

  const log = console.log
</script>

<template>
  <Card class="m-4 h-full">
    <Spinner class="self-center" v-if="isLoading" />
    <div
      v-else
    >
      <Button class="mb-2" color="primary" @click="router.back()">&#60</Button>
      <form
        class="space-y-4 shadow-sm bg-white rounded-md p-2"
        @submit.prevent="submit"
      >
        <div class="flex flex-col">
          <label for="slug">ID del lugar </label>
          <input
            class='h-6 border rounded-md border-gray-500'
            type="text"
            id="slug"
            pattern="^[A-Z0-9]*$"
            placeholder="A01"
            v-model="form.slug"
            :required="required"
          />
        </div>
        <div class="flex flex-col">
          <label for="type">Tipo de lugar</label>
          <select
            id="type"
            name="type"
            class="rounded-md p-0 px-2"
            v-model="form.type"
            :required="required"
          >
            <option selected value="normal">Normal</option>
            <option value="big">Grande</option>
            <option value="worker">Trabajador</option>
            <option value="special">Discapacitado</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <span>Posición</span>
          <div class="flex gap-1">
            <label for="positionY">X</label>
            <input
              class='h-6 w-14 border rounded-md border-gray-500'
              type="text"
              id="positionX"
              pattern="^[0-9]*$"
              placeholder="0"
              v-model.number="form.position.coordinates[0]"
              :required="required"
            />
          </div>
          <div class="flex gap-1">
            <label for="positionY">Y</label>
            <input
              class='h-6 w-14 border rounded-md border-gray-500'
              type="text"
              id="positionY"
              pattern="^[0-9]*$"
              placeholder="0"
              v-model.number="form.position.coordinates[1]"
              :required="required"
            />
          </div>
        </div>
        <div class="flex flex-col">
          <label for="isActive">Estado</label>
          <Toggle
            id="isActive"
            v-model="form.isActive"
          />
        </div>
        <Button
          color="primary"
          class="flex justify-center items-center"
          type="submit"
          :disabled="isDisabled"
        >
          <span :class="!isDisabled ? 'visible' : 'invisible'">
            {{ behavior === 'create' ? 'Crear' : 'Actualizar' }}
          </span>
          <Spinner :class="[
            'fixed',
            isDisabled ? 'visible' : 'invisible'
          ]" />
        </Button>
        <Message v-show="showMessage" type="error" title="Error" :description="messageDescription" />
      </form>
    </div>
  </Card>
</template>
