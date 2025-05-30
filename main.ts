import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Lab4 API')
    .setDescription('OAuth2 flows via Keycloak for lab 4')
    .setVersion('1.0')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/auth',
          tokenUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/token',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
        implicit: {
          authorizationUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/auth',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
        password: {
          tokenUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/token',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
        clientCredentials: {
          tokenUrl: 'http://localhost:8080/realms/Sofa/protocol/openid-connect/token',
          scopes: {
            openid: 'OpenID Connect scope',
          },
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
