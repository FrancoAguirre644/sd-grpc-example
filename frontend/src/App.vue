<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Turno {
  id: number
  paciente: string
  fecha: string
  hora: string
  estado: string
}

const turnos = ref<Turno[]>([])
const loading = ref(false)
const error = ref('')
const creating = ref(false)
const success = ref('')

const paciente = ref('')
const fecha = ref('')
const hora = ref('')

async function cargarTurnos() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('http://localhost:8000/turnos')

    if (!response.ok) {
      throw new Error('No se pudieron obtener los turnos.')
    }

    const data = await response.json()

    turnos.value = data.turnos
  } catch (err) {
    error.value = 'No se pudieron cargar los turnos.'
  } finally {
    loading.value = false
  }
}

async function crearTurno() {
  creating.value = true
  error.value = ''
  success.value = ''

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

    success.value = 'Turno creado correctamente.'

    await cargarTurnos()
  } catch (err) {
    error.value = 'No se pudo crear el turno.'
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  cargarTurnos()
})
</script>

<template>
  <main class="min-h-screen bg-gray-100 py-10">
    <div class="mx-auto max-w-6xl px-4">

      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Gestión de turnos
        </h1>

        <p class="mt-2 text-gray-600">
          Consulte y gestione los turnos disponibles.
        </p>
      </div>

      <div class="mb-8 rounded-lg bg-white p-6 shadow">
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
          v-if="success"
          class="mt-4 rounded-lg bg-green-50 p-4 text-sm text-green-700"
        >
          {{ success }}
        </div>

        <div
          v-if="error"
          class="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
        >
          {{ error }}
        </div>
      </div>

      <div
        v-if="loading"
        class="rounded-lg bg-white p-6 text-center shadow"
      >
        <p class="text-gray-600">
          Cargando turnos...
        </p>
      </div>

      <div
        v-else
        class="overflow-hidden rounded-lg bg-white shadow"
      >
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900">
            Turnos registrados
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="bg-gray-50 text-gray-700">
              <tr>
                <th class="px-6 py-4 font-semibold">
                  Paciente
                </th>

                <th class="px-6 py-4 font-semibold">
                  Fecha
                </th>

                <th class="px-6 py-4 font-semibold">
                  Hora
                </th>

                <th class="px-6 py-4 font-semibold">
                  Estado
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr
                v-for="turno in turnos"
                :key="turno.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 text-gray-900">
                  {{ turno.paciente }}
                </td>

                <td class="px-6 py-4 text-gray-600">
                  {{ turno.fecha }}
                </td>

                <td class="px-6 py-4 text-gray-600">
                  {{ turno.hora }}
                </td>

                <td class="px-6 py-4">
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="
                      turno.estado === 'DISPONIBLE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    "
                  >
                    {{ turno.estado }}
                  </span>
                </td>
              </tr>

              <tr v-if="turnos.length === 0">
                <td
                  colspan="4"
                  class="px-6 py-8 text-center text-gray-500"
                >
                  No hay turnos registrados.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </main>
</template>