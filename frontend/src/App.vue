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
          Consulte los turnos disponibles y reservados.
        </p>
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
        v-else-if="error"
        class="rounded-lg bg-red-50 p-6 text-red-700 shadow"
      >
        {{ error }}
      </div>

      <div
        v-else
        class="overflow-hidden rounded-lg bg-white shadow"
      >
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