import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TurnoModule } from './turno/turno.module';

@Module({
  imports: [TurnoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
