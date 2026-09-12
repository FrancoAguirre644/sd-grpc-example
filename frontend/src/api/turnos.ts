export interface Turno {
  id: number
  paciente: string
  fecha: string
  hora: string
  estado: string
}

const API_URL = 'http://localhost:8000'

export async function listarTurnos(): Promise<Turno[]> {
  const response = await fetch(`${API_URL}/turnos`)

  if (!response.ok) {
    throw new Error('No se pudieron obtener los turnos.')
  }

  const data = await response.json()

  return data.turnos
}

export async function obtenerTurno(id: number): Promise<Turno> {
  const response = await fetch(`${API_URL}/turnos/${id}`)

  if (!response.ok) {
    throw new Error('No se pudo obtener el turno.')
  }

  return response.json()
}

export async function crearTurno(
  paciente: string,
  fecha: string,
  hora: string,
): Promise<Turno> {
  const response = await fetch(`${API_URL}/turnos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paciente,
      fecha,
      hora,
    }),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear el turno.')
  }

  return response.json()
}

export async function reservarTurno(id: number): Promise<Turno> {
  const response = await fetch(
    `${API_URL}/turnos/${id}/reservar`,
    {
      method: 'POST',
    },
  )

  if (!response.ok) {
    throw new Error('No se pudo reservar el turno.')
  }

  return response.json()
}