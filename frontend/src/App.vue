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

async function cargarTurnos() {
  loading.value = true
  error.value = ''

  try {
    turnos.value = await listarTurnos()
  } catch (err) {
    error.value = 'No se pudieron cargar los turnos.'
  } finally {
    loading.value = false
  }
}

async function manejarCreacion() {
  success.value = 'Turno creado correctamente.'

  await cargarTurnos()
}

async function manejarReserva() {
  success.value = 'Turno reservado correctamente.'

  await cargarTurnos()
}

async function mostrarTurno(id: number) {
  loadingDetail.value = true
  error.value = ''
  turnoSeleccionado.value = null

  try {
    turnoSeleccionado.value = await obtenerTurno(id)
  } catch (err) {
    error.value = 'No se pudo obtener el turno.'
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

      <div class="mb-8">
        <TurnoForm @created="manejarCreacion" />
      </div>

      <div
        v-if="success"
        class="mb-8 rounded-lg bg-green-50 p-4 text-sm text-green-700"
      >
        {{ success }}
      </div>

      <div
        v-if="error"
        class="mb-8 rounded-lg bg-red-50 p-4 text-sm text-red-700"
      >
        {{ error }}
      </div>

      <div
        v-if="loading"
        class="rounded-lg bg-white p-6 text-center shadow"
      >
        <p class="text-gray-600">
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div class="rounded-lg bg-white px-6 py-4 shadow-xl">
        <p class="text-gray-600">
          Cargando detalle...
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