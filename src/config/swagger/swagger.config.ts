import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class SwaggerConfig {
  static ConfigSwaggerModule(app: INestApplication): void {
    const configService = new ConfigService();
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('infinitum')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/infinitum/docs', app, document, {
      swaggerOptions: {
        filter: true,
        showRequestDuration: true,
      },
    });
  }
}