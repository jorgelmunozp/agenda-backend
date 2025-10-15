import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from 'src/common/filters/all-exception.filter';
import { LoggingInterceptor } from './src/common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
  console.log(`🚀 Server running on ${process.env.FRONTEND_URL}`);
}
bootstrap();