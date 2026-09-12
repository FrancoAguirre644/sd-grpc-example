<script setup lang="ts">
import { ref } from 'vue'

import {
  reservarTurno,
  type Turno,
} from '../api/turnos'

defineProps<{
  turnos: Turno[]
}>()

const emit = defineEmits<{
  reserved: []
  selected: [id: number]
}>()

const reserving = ref<number | null>(null)
const error = ref('')

async function reservar(id: number) {
  reserving.value = id
  error.value = ''

  try {
    await reservarTurno(id)

    emit('reserved')
  } catch (err) {
    error.value = 'No se pudo reservar el turno.'
  } finally {
    reserving.value = null
  }
}
</script>

<template>
  <div class="overflow-hidden rounded-lg bg-white shadow">
    <div class="p-6">
      <h2 class="text-xl font-semibold text-gray-900">
        Turnos registrados
      </h2>
    </div>

    <div
      v-if="error"
      class="mx-6 mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700"
    >
      {{ error }}
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

            <th class="px-6 py-4 font-semibold">
              Acciones
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

            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button
                  type="button"
                  class="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
                  @click="emit('selected', turno.id)"
                >
                  Ver
                </button>

                <button
                  v-if="turno.estado === 'DISPONIBLE'"
                  type="button"
                  :disabled="reserving === turno.id"
                  class="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  @click="reservar(turno.id)"
                >
                  {{ reserving === turno.id ? 'Reservando...' : 'Reservar' }}
                </button>

                <span
                  v-else
                  class="px-2 py-2 text-sm text-gray-500"
                >
                  No disponible
                </span>
              </div>
            </td>
          </tr>

          <tr v-if="turnos.length === 0">
            <td
              colspan="5"
              class="px-6 py-8 text-center text-gray-500"
            >
              No hay turnos registrados.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>