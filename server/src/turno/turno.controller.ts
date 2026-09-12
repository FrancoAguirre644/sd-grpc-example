import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { TurnoService } from './turno.service';

@Controller()
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @GrpcMethod('TurnoService', 'ListarTurnos')
  listarTurnos() {
    return {
      turnos: this.turnoService.listarTurnos(),
    };
  }

  @GrpcMethod('TurnoService', 'ObtenerTurno')
  obtenerTurno(data: { id: number }) {
    return this.turnoService.obtenerTurno(data.id);
  }

  @GrpcMethod('TurnoService', 'CrearTurno')
  crearTurno(data: {
    paciente: string;
    fecha: string;
    hora: string;
  }) {
    return this.turnoService.crearTurno(
      data.paciente,
      data.fecha,
      data.hora,
    );
  }

  @GrpcMethod('TurnoService', 'ReservarTurno')
  reservarTurno(data: { id: number }) {
    return this.turnoService.reservarTurno(data.id);
  }
}