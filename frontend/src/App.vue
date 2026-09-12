<script setup lang="ts">
import { onMounted, ref } from 'vue'

import {
  listarTurnos,
  obtenerTurno,
  type Turno,
} from './api/turnos'
import TurnoDetail from './components/TurnoDetail.vue'
import TurnoForm from './components/TurnoForm.vue'
import TurnoTable from './components/TurnoTable.vue'

const turnos = ref<Turno[]>([])
const loading = ref(false)
const error = ref('')
const success = ref('')

const turnoSeleccionado = ref<Turno | null>(null)
const loadingDetail = ref(false)

const turnosDisponibles = ref(0)
const turnosReservados = ref(0)

async function cargarTurnos() {
  loading.value = true
  error.value = ''

  try {
    turnos.value = await listarTurnos()

    turnosDisponibles.value = turnos.value.filter(
      (turno) => turno.estado === 'DISPONIBLE',
    ).length

    turnosReservados.value = turnos.value.filter(
      (turno) => turno.estado === 'RESERVADO',
    ).length
  } catch (err) {
    error.value = 'No se pudieron cargar los turnos.'
  } finally {
    loading.value = false
  }
}

async function manejarCreacion() {
  success.value = 'El turno fue creado correctamente.'

  await cargarTurnos()
}

async function manejarReserva() {
  success.value = 'El turno fue reservado correctamente.'

  await cargarTurnos()
}

async function mostrarTurno(id: number) {
  loadingDetail.value = true
  error.value = ''
  turnoSeleccionado.value = null

  try {
    turnoSeleccionado.value = await obtenerTurno(id)
  } catch (err) {
    error.value = 'No se pudo obtener el detalle del turno.'
  } finally {
    loadingDetail.value = false
  }
}

function cerrarDetalle() {
  turnoSeleccionado.value = null
}

onMounted(() => {
  cargarTurnos()
})
</script>

<template>
  <main class="min-h-screen bg-slate-50">

    <header class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-5">
        <div class="flex items-center gap-4">

          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 14c1.49-1.46 3-3.21 3-5.5A4.5 4.5 0 0017.5 4c-1.74 0-3.41 1.01-4.5 2.5C11.91 5.01 10.24 4 8.5 4A4.5 4.5 0 004 8.5C4 12.5 8.5 16 13 20c1.27-1.13 2.54-2.21 3.71-3.3"
              />

              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 13v6m-3-3h6"
              />
            </svg>
          </div>

          <div>
            <h1 class="text-2xl font-bold tracking-tight text-slate-900">
              Gestión de turnos
            </h1>

            <p class="text-sm text-slate-500">
              Administración de turnos médicos
            </p>
          </div>

        </div>
      </div>
    </header>

    <div class="mx-auto max-w-6xl px-4 py-8">

      <div class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        <div class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Total de turnos
              </p>

              <p class="mt-2 text-3xl font-bold text-slate-900">
                {{ turnos.length }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
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

                <path
                  stroke-linecap="round"
                  d="M8 14h2M14 14h2M8 18h2"
                />
              </svg>
            </div>

          </div>
        </div>

        <div class="rounded-xl border border-emerald-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Disponibles
              </p>

              <p class="mt-2 text-3xl font-bold text-emerald-600">
                {{ turnosDisponibles }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4"
                />

                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />
              </svg>
            </div>

          </div>
        </div>

        <div class="rounded-xl border border-blue-200 bg-white p-5 shadow-sm">
          <div class="flex items-center justify-between">

            <div>
              <p class="text-sm font-medium text-slate-500">
                Reservados
              </p>

              <p class="mt-2 text-3xl font-bold text-blue-600">
                {{ turnosReservados }}
              </p>
            </div>

            <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                />

                <circle
                  cx="9"
                  cy="7"
                  r="4"
                />

                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                />
              </svg>
            </div>

          </div>
        </div>

      </div>

      <div class="mb-8">
        <TurnoForm @created="manejarCreacion" />
      </div>

      <div
        v-if="success"
        class="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mt-0.5 h-5 w-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4"
          />

          <circle
            cx="12"
            cy="12"
            r="9"
          />
        </svg>

        <span>
          {{ success }}
        </span>
      </div>

      <div
        v-if="error"
        class="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
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

      <div
        v-if="loading"
        class="rounded-xl border border-slate-200 bg-white p-10 text-center shadow-sm"
      >
        <div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600"></div>

        <p class="text-sm text-slate-500">
          Cargando turnos...
        </p>
      </div>

      <TurnoTable
        v-else
        :turnos="turnos"
        @reserved="manejarReserva"
        @selected="mostrarTurno"
      />

    </div>

    <div
      v-if="loadingDetail"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm"
    >
      <div class="rounded-xl bg-white px-8 py-6 text-center shadow-xl">

        <div class="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-cyan-600"></div>

        <p class="text-sm font-medium text-slate-700">
          Consultando turno...
        </p>

      </div>
    </div>

    <TurnoDetail
      v-if="turnoSeleccionado"
      :turno="turnoSeleccionado"
      @close="cerrarDetalle"
    />

  </main>
</template>