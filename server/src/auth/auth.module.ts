
import {
  Module,
} from '@nestjs/common';

import {
  ConfigModule,
  ConfigService,
} from '@nestjs/config';

import {
  JwtModule,
  JwtSignOptions,
} from '@nestjs/jwt';

import {
  PassportModule,
} from '@nestjs/passport';

import {
  UserModule,
} from '../user/user.module.js';

import {
  AuthController,
} from './auth.controller.js';

import {
  AuthService,
} from './auth.service.js';

import {
  JwtStrategy,
} from './strategies/jwt.strategy.js';

@Module({

  imports: [

    UserModule,

    PassportModule,

    JwtModule.registerAsync({

      imports: [
        ConfigModule,
      ],

      inject: [
        ConfigService,
      ],

      useFactory: (
        configService: ConfigService,
      ) => ({

        secret:
          configService.getOrThrow<string>(
            'jwt.secret',
          ),

        signOptions: {
          expiresIn:
            configService.get<string>(
              'jwt.expiresIn',
            ) as JwtSignOptions['expiresIn'],
        },

      }),

    }),

  ],

  controllers: [
    AuthController,
  ],

  providers: [
    AuthService,
    JwtStrategy,
  ],

  exports: [
    AuthService,
  ],
})
export class AuthModule {}