<template>
  <div class="grid grid-cols-4">
    <Card class="col-start-2 col-end-4 mt-8">
    <form
      id="LogIn"
      class="w-full space-y-4"
      v-on:submit="submit"
    >
      <Input
        class="flex-col"
        type="email"
        id="user"
        label="Usuario:"
        v-model="email"
        placeholder="example@example.com"
        required
      />
      <Input
        class="flex-col"
        type="password"
        id="password"
        label="Contraseña:"
        v-model="password"
        minlength="8"
        required
      />
      <Button color="primary" class="flex justify-center items-center" type="submit" :disabled="isDisabled">
        <span :class="!isDisabled ? 'visible' : 'invisible'">
          Iniciar sesión
        </span>
        <Spinner :class="[
          'fixed',
          isDisabled ? 'visible' : 'invisible'
        ]" />
      </Button>
      <Message v-show="showMessage" type="error" title="Error" :description="messageDescription" />
    </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import Input from './../components/Input.vue'
  import Button from './../components/Button.vue'
  import Message from './../components/Message.vue'
  import Card from './../components/Card.vue'
  import Spinner from './../components/Spinner.vue'
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import axios from './../common/axios'
  import { isAxiosError } from 'axios'
  import { Ref } from 'vue'


  const route = useRoute()
  const router = useRouter()
  let email = ref('')
  let password = ref('')
  let showMessage = ref(false)
  let messageDescription = ref('')
  let isDisabled = ref(false)
  let timeout: Ref<number | null> = ref(null)

  async function submit (event: Event) {
    event.preventDefault()
    
    try {
      isDisabled.value = true
      // await new Promise(resolve => setTimeout(resolve, 50000))
      const res = await axios.post<{ token: string }>('/auth', { email: email.value, password: password.value })
      isDisabled.value = false
    
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token)
      }

      if (typeof route.query?.redirect === 'string') {
        router.push({ path: route.query.redirect })
      } else {
        router.push({ path: '/' })
      }
    } catch (err) {
      if (timeout.value !== null) {
        window.clearTimeout(timeout.value)
      }

      isDisabled.value = false
      console.error(err)

      if (isAxiosError(err) && err?.response?.status === 401) {
        console.log(err.response)
        messageDescription.value = 'Usuario o contraseña incorrecto'
        showMessage.value = true
      } else {
        messageDescription.value = 'Algo sucedio, intentalo de nuevo. Si el problema persiste contacta a soporte'
        showMessage.value = true
      }

      timeout.value = window.setTimeout(() => {
        timeout.value = null
        showMessage.value = false
      }, 1000 * 5)
    }
  }
</script>
