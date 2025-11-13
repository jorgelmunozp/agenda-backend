import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './src/common/filters/all-exceptions.filterX';
import { LoggingInterceptor } from './src/common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aplica el filtro global de excepciones (Front)
  app.useGlobalFilters(new AllExceptionsFilter());

  // Aplica el interceptor global formato de logs HALL (Back)
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Habilitar validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina propiedades que no están en el DTO
      forbidNonWhitelisted: true, // lanza error si vienen propiedades extra
      transform: true, // convierte automáticamente los tipos
    }),
  );

  // Habilita CORS para ambos frontend: Web y Mobil
  const allowedOrigins = ['*', process.env.FRONTEND_URL_WEB, process.env.FRONTEND_URL_MOBILE].filter((o): o is string => !!o); // <- type guard: elimina undefined

  app.enableCors({
    origin: allowedOrigins,         // Frontend que hará las peticiones
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,              // Recibe cookies o headers de auth
  });

  await app.listen(3000);
  console.log(`🚀 Server running on ${process.env.BACKEND_URL}`);
}
bootstrap();
