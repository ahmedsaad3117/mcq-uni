import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MaterialsModule } from './materials/materials.module';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './_common/config/ormconfig';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './_common/guards/auth.guard';
import { AllExceptionsFilter } from './_common/filters/main.filter';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import path from 'path';
import { RequestLangMiddleware } from './_common/middlewares/lang.middleware';
import { AuthMiddleware } from './_common/middlewares/auth.midleware';
import { McqsModule } from './mcqs/mcqs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/_common/i18n/'), // or '../i18n/'
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    UsersModule,
    MaterialsModule,
    AuthModule,
    McqsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLangMiddleware).forRoutes('*');
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
