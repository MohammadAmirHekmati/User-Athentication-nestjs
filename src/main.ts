import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import {SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config=new DocumentBuilder()
    .setTitle('auth-practice')
    .setDescription('The auth swagger ')
    .setVersion('1.0')
    .addBearerAuth({
      type:'http', scheme:'bearer', bearerFormat:'JWT'},
      'JWT token auth'
      )
    .build()
  const  document=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('docs',app,document)
  await app.listen(3000);
}
bootstrap();
