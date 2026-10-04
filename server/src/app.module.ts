import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './common/config/configuration.js';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    ObserveModule.forRoot({
      appKey: process.env.OB_NAME ?? '',
      appSecret: process.env.OB_SECKET ?? '',
      serviceId: process.env.OB_KEY ?? '',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql' as const,
        host: configService.get<string>('database.host', 'localhost'),
        port: configService.get<number>('database.port', 3306),
        username: configService.getOrThrow<string>('database.username'),
        password: configService.get<string>('database.password', ''),
        database: configService.getOrThrow<string>('database.database'),
        autoLoadModels: true,
        synchronize: process.env.NODE_ENV !== 'production',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
