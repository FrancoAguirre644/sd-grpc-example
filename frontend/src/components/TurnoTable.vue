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
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

    <div class="border-b border-slate-200 px-6 py-5">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div class="flex items-center gap-3">

          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <rect
                width="18"
                height="18"
                x="3"
                y="3"
                rx="2"
              />

              <path
                stroke-linecap="round"
                d="M16 2v4M8 2v4M3 10h18"
              />

              <path
                stroke-linecap="round"
                d="M8 14h2M14 14h2M8 18h2M14 18h2"
              />
            </svg>
          </div>

          <div>
            <h2 class="text-lg font-semibold text-slate-900">
              Turnos registrados
            </h2>

            <p class="text-sm text-slate-500">
              Consulte y gestione las consultas programadas
            </p>
          </div>

        </div>

        <span class="inline-flex w-fit items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {{ turnos.length }} {{ turnos.length === 1 ? 'turno' : 'turnos' }}
        </span>

      </div>
    </div>

    <div
      v-if="error"
      class="mx-6 mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mt-0.5 h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle
          cx="12"
          cy="12"
          r="9"
        />

        <path
          stroke-linecap="round"
          d="M12 8v4M12 16h.01"
        />
      </svg>

      <span>
        {{ error }}
      </span>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full min-w-[760px] text-left text-sm">

        <thead class="border-b border-slate-200 bg-slate-50">
          <tr>
            <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Paciente
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Fecha
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hora
            </th>

            <th class="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Estado
            </th>

            <th class="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-100">

          <tr
            v-for="turno in turnos"
            :key="turno.id"
            class="transition hover:bg-slate-50"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">

                <div class="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-50 text-sm font-semibold text-cyan-700">
                  {{ turno.paciente.charAt(0).toUpperCase() }}
                </div>

                <div>
                  <p class="font-medium text-slate-900">
                    {{ turno.paciente }}
                  </p>

                  <p class="text-xs text-slate-400">
                    Turno #{{ turno.id }}
                  </p>
                </div>

              </div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-slate-600">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect
                    width="18"
                    height="18"
                    x="3"
                    y="3"
                    rx="2"
                  />

                  <path
                    stroke-linecap="round"
                    d="M16 2v4M8 2v4M3 10h18"
                  />
                </svg>

                <span>
                  {{ turno.fecha }}
                </span>

              </div>
            </td>

            <td class="px-6 py-4">
              <div class="flex items-center gap-2 text-slate-600">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-slate-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                  <path
                    stroke-linecap="round"
                    d="M12 7v5l3 2"
                  />
                </svg>

                <span>
                  {{ turno.hora }}
                </span>

              </div>
            </td>

            <td class="px-6 py-4">
              <span
                v-if="turno.estado === 'DISPONIBLE'"
                class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                Disponible
              </span>

              <span
                v-else
                class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                Reservado
              </span>
            </td>

            <td class="px-6 py-4">
              <div class="flex justify-end gap-2">

                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
                  @click="emit('selected', turno.id)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z"
                    />

                    <circle
                      cx="12"
                      cy="12"
                      r="2.5"
                    />
                  </svg>

                  Ver
                </button>

                <button
                  v-if="turno.estado === 'DISPONIBLE'"
                  type="button"
                  :disabled="reserving === turno.id"
                  class="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  @click="reservar(turno.id)"
                >
                  <svg
                    v-if="reserving !== turno.id"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12l4 4L19 6"
                    />
                  </svg>

                  {{ reserving === turno.id ? 'Reservando...' : 'Reservar' }}
                </button>

              </div>
            </td>
          </tr>

          <tr v-if="turnos.length === 0">
            <td
              colspan="5"
              class="px-6 py-12 text-center"
            >
              <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.8"
                >
                  <rect
                    width="18"
                    height="18"
                    x="3"
                    y="3"
                    rx="2"
                  />

                  <path
                    stroke-linecap="round"
                    d="M16 2v4M8 2v4M3 10h18"
                  />
                </svg>
              </div>

              <p class="mt-4 font-medium text-slate-700">
                No hay turnos registrados
              </p>

              <p class="mt-1 text-sm text-slate-500">
                Cree un nuevo turno para comenzar.
              </p>
            </td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>