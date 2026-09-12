import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { CrearTurnoDto } from './dto/crear-turno.dto';
import { TurnoService } from './turno.service';

@Controller()
export class TurnoController {
  constructor(private readonly turnoService: TurnoService) {}

  @GrpcMethod('TurnoService', 'ListarTurnos')
  listarTurnos() {
    return this.turnoService.listarTurnos().then((turnos) => ({
      turnos,
    }));
  }

  @GrpcMethod('TurnoService', 'ObtenerTurno')
  obtenerTurno(data: { id: number }) {
    return this.turnoService.obtenerTurno(data.id);
  }

  @GrpcMethod('TurnoService', 'CrearTurno')
  crearTurno(data: CrearTurnoDto) {
    return this.turnoService.crearTurno(data);
  }

  @GrpcMethod('TurnoService', 'ReservarTurno')
  reservarTurno(data: { id: number }) {
    return this.turnoService.reservarTurno(data.id);
  }
}