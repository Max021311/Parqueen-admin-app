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
        v-model="user"
        placeholder="example@example.com"
        required
      />
      <Input
        class="flex-col"
        type="password"
        id="password"
        label="Contraseña:"
        v-model="password"
        required
      />
      <Button color="primary" class="w-full" type="submit">Iniciar sesión</Button>
      <Message v-show="showMessage" type="error" title="Error" description="Ha sucedido un error intentando iniciar sesión" />
    </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
  import Input from './../components/Input.vue'
  import Button from './../components/Button.vue'
  import Message from './../components/Message.vue'
  import Card from './../components/Card.vue'
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'

  const route = useRoute()
  const router = useRouter()
  let user = ref('')
  let password = ref('')
  let showMessage = ref(false)

  function submit (event: Event) {
    event.preventDefault()
    localStorage.setItem(
      'credential',
      JSON.stringify({ user: user.value, password: password.value })
    )
    if (typeof route.query?.redirect === 'string') {
      router.push({ path: route.query.redirect })
    } else {
      router.push({ path: '/' })
    }
    // showMessage.value = true
    // setTimeout(() => {
    //   showMessage.value = false
    // }, 1000 * 5)
  }
</script>
