<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  created: []
}>()

const paciente = ref('')
const fecha = ref('')
const hora = ref('')
const creating = ref(false)
const error = ref('')

async function crearTurno() {
  creating.value = true
  error.value = ''

  try {
    const response = await fetch('http://localhost:8000/turnos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paciente: paciente.value,
        fecha: fecha.value,
        hora: hora.value,
      }),
    })

    if (!response.ok) {
      throw new Error('No se pudo crear el turno.')
    }

    paciente.value = ''
    fecha.value = ''
    hora.value = ''

    emit('created')
  } catch (err) {
    error.value = 'No se pudo crear el turno.'
  } finally {
    creating.value = false
  }
}
</script>

<template>
  <div class="rounded-lg bg-white p-6 shadow">
    <h2 class="mb-6 text-xl font-semibold text-gray-900">
      Nuevo turno
    </h2>

    <form
      class="grid gap-4 md:grid-cols-4"
      @submit.prevent="crearTurno"
    >
      <div class="md:col-span-2">
        <label
          for="paciente"
          class="mb-2 block text-sm font-medium text-gray-700"
        >
          Paciente
        </label>

        <input
          id="paciente"
          v-model="paciente"
          type="text"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          placeholder="Ingrese el nombre del paciente"
        />
      </div>

      <div>
        <label
          for="fecha"
          class="mb-2 block text-sm font-medium text-gray-700"
        >
          Fecha
        </label>

        <input
          id="fecha"
          v-model="fecha"
          type="date"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div>
        <label
          for="hora"
          class="mb-2 block text-sm font-medium text-gray-700"
        >
          Hora
        </label>

        <input
          id="hora"
          v-model="hora"
          type="time"
          required
          class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
      </div>

      <div class="md:col-span-4">
        <button
          type="submit"
          :disabled="creating"
          class="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ creating ? 'Creando...' : 'Crear turno' }}
        </button>
      </div>
    </form>

    <div
      v-if="error"
      class="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
    </div>
  </div>
</template>