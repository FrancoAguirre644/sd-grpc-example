import { Injectable } from '@nestjs/common';

@Injectable()
export class TurnoService {
  private readonly turnos = [
    {
      id: 1,
      paciente: 'Juan Pérez',
      fecha: '2026-09-15',
      hora: '10:30',
      estado: 'DISPONIBLE',
    },
    {
      id: 2,
      paciente: 'María González',
      fecha: '2026-09-15',
      hora: '11:00',
      estado: 'RESERVADO',
    },
    {
      id: 3,
      paciente: 'Pedro Rodríguez',
      fecha: '2026-09-16',
      hora: '09:30',
      estado: 'DISPONIBLE',
    },
  ];

  listarTurnos() {
    return this.turnos;
  }
}