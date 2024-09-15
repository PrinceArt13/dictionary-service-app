import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DataSource from '../ormconfig'

async function bootstrap() {
  await DataSource.initialize();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
