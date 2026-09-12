import { Injectable } from '@nestjs/common';

import { CrearTurnoDto } from './dto/crear-turno.dto';
import { Turno } from './interfaces/turno.interface';

@Injectable()
export class TurnoService {
  private readonly turnos: Turno[] = [
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

  listarTurnos(): Turno[] {
    return this.turnos;
  }

  obtenerTurno(id: number): Turno | undefined {
    return this.turnos.find((turno) => turno.id === id);
  }

  crearTurno(data: CrearTurnoDto): Turno {
    const nuevoTurno: Turno = {
      id: this.turnos.length + 1,
      paciente: data.paciente,
      fecha: data.fecha,
      hora: data.hora,
      estado: 'DISPONIBLE',
    };

    this.turnos.push(nuevoTurno);

    return nuevoTurno;
  }

  reservarTurno(id: number): Turno | undefined {
    const turno = this.turnos.find((turno) => turno.id === id);

    if (!turno) {
      return undefined;
    }

    turno.estado = 'RESERVADO';

    return turno;
  }
}