import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CrearTurnoDto } from './dto/crear-turno.dto';
import { Turno } from './turno.entity';

@Injectable()
export class TurnoService {
  constructor(
    @InjectRepository(Turno)
    private readonly turnoRepository: Repository<Turno>,
  ) {}

  async listarTurnos(): Promise<Turno[]> {
    return this.turnoRepository.find();
  }

  async obtenerTurno(id: number): Promise<Turno | null> {
    return this.turnoRepository.findOne({
      where: { id },
    });
  }

  async crearTurno(data: CrearTurnoDto): Promise<Turno> {
    const turno = this.turnoRepository.create({
      paciente: data.paciente,
      fecha: data.fecha,
      hora: data.hora,
      estado: 'DISPONIBLE',
    });

    return this.turnoRepository.save(turno);
  }

  async reservarTurno(id: number): Promise<Turno | null> {
    const turno = await this.turnoRepository.findOne({
      where: { id },
    });

    if (!turno) {
      return null;
    }

    turno.estado = 'RESERVADO';

    return this.turnoRepository.save(turno);
  }
}