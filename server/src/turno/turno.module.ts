import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TurnoController } from './turno.controller';
import { Turno } from './turno.entity';
import { TurnoService } from './turno.service';

@Module({
  imports: [TypeOrmModule.forFeature([Turno])],
  controllers: [TurnoController],
  providers: [TurnoService],
})
export class TurnoModule {}