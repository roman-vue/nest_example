import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { LoggingInterceptor, ResponseInterceptor, TimeoutInterceptor } from "./config/interceptors";
import { AllExceptionFilter } from "./config/filters/index.filter";
import { Logger, ValidationPipe } from "@nestjs/common";
import { SwaggerConfig } from "./config/swagger";


async function bootstrap() {
  const configService = new ConfigService();

  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
    new TimeoutInterceptor(),
    new LoggingInterceptor(),
  );
  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api/v1/infinitum/');
  SwaggerConfig.ConfigSwaggerModule(app);
  let port = 3000;
  await app.listen(port, () => {
    // Logger.debug(`${configService.get<string>('URI_MONGODB')}`);
    Logger.log('APP', `Infinitum is running on http://localhost:${port}`);
    Logger.debug(
      'APP',
      `Swagger is running on http://localhost:${port}/api/v1/infinitum/docs`,
    );
  });
}
bootstrap();