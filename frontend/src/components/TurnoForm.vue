<script setup lang="ts">
import { ref } from 'vue'

import { crearTurno } from '../api/turnos'

const emit = defineEmits<{
  created: []
}>()

const paciente = ref('')
const fecha = ref('')
const hora = ref('')
const creating = ref(false)
const error = ref('')

async function crearNuevoTurno() {
  creating.value = true
  error.value = ''

  try {
    await crearTurno(
      paciente.value,
      fecha.value,
      hora.value,
    )

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
  <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

    <div class="border-b border-slate-200 px-6 py-5">
      <div class="flex items-center gap-3">

        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 2v4M16 2v4M3 10h18"
            />

            <rect
              width="18"
              height="17"
              x="3"
              y="4"
              rx="2"
            />

            <path
              stroke-linecap="round"
              d="M12 14v4M10 16h4"
            />
          </svg>
        </div>

        <div>
          <h2 class="text-lg font-semibold text-slate-900">
            Nuevo turno
          </h2>

          <p class="text-sm text-slate-500">
            Programe una nueva consulta médica
          </p>
        </div>

      </div>
    </div>

    <form
      class="p-6"
      @submit.prevent="crearNuevoTurno"
    >
      <div class="grid gap-5 md:grid-cols-4">

        <div class="md:col-span-2">
          <label
            for="paciente"
            class="mb-2 block text-sm font-medium text-slate-700"
          >
            Paciente
          </label>

          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="4"
                />

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 21a8 8 0 0116 0"
                />
              </svg>
            </div>

            <input
              id="paciente"
              v-model="paciente"
              type="text"
              required
              class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              placeholder="Nombre del paciente"
            />
          </div>
        </div>

        <div>
          <label
            for="fecha"
            class="mb-2 block text-sm font-medium text-slate-700"
          >
            Fecha
          </label>

          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
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
              </svg>
            </div>

            <input
              id="fecha"
              v-model="fecha"
              type="date"
              required
              class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div>
          <label
            for="hora"
            class="mb-2 block text-sm font-medium text-slate-700"
          >
            Hora
          </label>

          <div class="relative">
            <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
            </div>

            <input
              id="hora"
              v-model="hora"
              type="time"
              required
              class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

      </div>

      <div
        v-if="error"
        class="mt-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
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

      <div class="mt-6 flex justify-end">
        <button
          type="submit"
          :disabled="creating"
          class="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <svg
            v-if="!creating"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              d="M12 5v14M5 12h14"
            />
          </svg>

          <span>
            {{ creating ? 'Creando turno...' : 'Crear turno' }}
          </span>
        </button>
      </div>
    </form>

  </div>
</template>