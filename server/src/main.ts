import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'turnos',
        protoPath: join(__dirname, '../../proto/turnos.proto'),
        url: 'localhost:5000',
      },
    },
  );

  await app.listen();
}

bootstrap();