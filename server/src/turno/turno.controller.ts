import { Controller } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';

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
  async obtenerTurno(data: { id: number }) {
    const turno = await this.turnoService.obtenerTurno(data.id);

    if (!turno) {
      throw new RpcException({
        code: 5,
        message: 'Turno no encontrado',
      });
    }

    return turno;
  }

  @GrpcMethod('TurnoService', 'CrearTurno')
  crearTurno(data: CrearTurnoDto) {
    return this.turnoService.crearTurno(data);
  }

  @GrpcMethod('TurnoService', 'ReservarTurno')
  async reservarTurno(data: { id: number }) {
    const turno = await this.turnoService.reservarTurno(data.id);

    if (!turno) {
      throw new RpcException({
        code: 5,
        message: 'Turno no encontrado',
      });
    }

    return turno;
  }
}