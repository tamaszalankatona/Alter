import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      secretOrPrivateKey: process.env.JWT_SECRET,

      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
