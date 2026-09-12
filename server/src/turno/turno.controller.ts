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
}