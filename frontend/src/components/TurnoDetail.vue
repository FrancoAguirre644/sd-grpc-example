<script setup lang="ts">
import type { Turno } from '../api/turnos'

defineProps<{
  turno: Turno
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
    @click.self="emit('close')"
  >
    <div class="w-full max-w-lg rounded-lg bg-white shadow-xl">

      <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
        <h2 class="text-xl font-semibold text-gray-900">
          Detalle del turno
        </h2>

        <button
          type="button"
          class="text-2xl leading-none text-gray-400 transition hover:text-gray-700"
          aria-label="Cerrar"
          @click="emit('close')"
        >
          &times;
        </button>
      </div>

      <div class="p-6">
        <div class="grid gap-5 md:grid-cols-2">

          <div>
            <p class="text-sm font-medium text-gray-500">
              ID
            </p>

            <p class="mt-1 text-gray-900">
              {{ turno.id }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500">
              Paciente
            </p>

            <p class="mt-1 text-gray-900">
              {{ turno.paciente }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500">
              Fecha
            </p>

            <p class="mt-1 text-gray-900">
              {{ turno.fecha }}
            </p>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-500">
              Hora
            </p>

            <p class="mt-1 text-gray-900">
              {{ turno.hora }}
            </p>
          </div>

          <div class="md:col-span-2">
            <p class="text-sm font-medium text-gray-500">
              Estado
            </p>

            <span
              class="mt-1 inline-block rounded-full px-3 py-1 text-xs font-semibold"
              :class="
                turno.estado === 'DISPONIBLE'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              "
            >
              {{ turno.estado }}
            </span>
          </div>

        </div>
      </div>

      <div class="flex justify-end border-t border-gray-200 px-6 py-4">
        <button
          type="button"
          class="rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700"
          @click="emit('close')"
        >
          Cerrar
        </button>
      </div>

    </div>
  </div>
</template>