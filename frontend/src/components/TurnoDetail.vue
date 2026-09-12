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
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm"
    @click.self="emit('close')"
  >
    <div class="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

      <div class="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-6 text-white">

        <div class="flex items-start justify-between">

          <div class="flex items-center gap-4">

            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
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
              <p class="text-sm font-medium text-cyan-100">
                Información del turno
              </p>

              <h2 class="mt-1 text-xl font-bold">
                Turno #{{ turno.id }}
              </h2>
            </div>

          </div>

          <button
            type="button"
            class="rounded-lg p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Cerrar"
            @click="emit('close')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </button>

        </div>

      </div>

      <div class="max-h-[55vh] overflow-y-auto p-6">

        <div class="mb-6 flex items-center gap-4 rounded-xl bg-slate-50 p-4">

          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-100 text-lg font-bold text-cyan-700">
            {{ turno.paciente.charAt(0).toUpperCase() }}
          </div>

          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
              Paciente
            </p>

            <p class="mt-1 text-lg font-semibold text-slate-900">
              {{ turno.paciente }}
            </p>
          </div>

        </div>

        <div class="grid gap-4 sm:grid-cols-2">

          <div class="rounded-xl border border-slate-200 p-4">
            <div class="flex items-center gap-3">

              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
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

              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Fecha
                </p>

                <p class="mt-1 font-semibold text-slate-900">
                  {{ turno.fecha }}
                </p>
              </div>

            </div>
          </div>

          <div class="rounded-xl border border-slate-200 p-4">
            <div class="flex items-center gap-3">

              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
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

              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Hora
                </p>

                <p class="mt-1 font-semibold text-slate-900">
                  {{ turno.hora }}
                </p>
              </div>

            </div>
          </div>

        </div>

        <div class="mt-4 rounded-xl border border-slate-200 p-4">

          <div class="flex items-center justify-between gap-4">

            <div class="flex items-center gap-3">

              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
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
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>
              </div>

              <div>
                <p class="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Estado
                </p>

                <p class="mt-1 font-medium text-slate-700">
                  Estado actual del turno
                </p>
              </div>

            </div>

            <span
              v-if="turno.estado === 'DISPONIBLE'"
              class="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              Disponible
            </span>

            <span
              v-else
              class="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
              Reservado
            </span>

          </div>

        </div>

      </div>

      <div class="flex justify-end border-t border-slate-200 bg-slate-50 px-6 py-4">

        <button
          type="button"
          class="rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
          @click="emit('close')"
        >
          Cerrar
        </button>

      </div>

    </div>
  </div>
</template>