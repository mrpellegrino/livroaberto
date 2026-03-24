import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { RegisterUserUseCase } from './use-cases/register-user.usecase';
import { LoginUseCase } from './use-cases/login.usecase';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../../common/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: (configService.get<string>('JWT_EXPIRES_IN') ??
            '1d') as any,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUseCase, JwtStrategy],
  exports: [JwtModule],
})
export class AuthModule {}
