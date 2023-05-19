<script setup lang="ts">
  import { useLogging } from './../composables/use-logging'
  import Card from './../components/Card.vue'
  import Button from './../components/Button.vue'
  useLogging()
</script>

<template>
  <Card class="m-4 h-full flex flex-col gap-4">
    <Button color="primary" class="w-full">Crear lugar</Button>
    <RouterLink to="/parking-places">
      <Button color="primary" class="w-full">
          Listado de lugares
      </Button>
    </RouterLink>
  </Card>
</template>
