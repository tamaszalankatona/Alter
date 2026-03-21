import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PersonaController } from './persona/persona.controller';
import { PersonaModule } from './persona/persona.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UsersModule, PersonaModule],
  controllers: [AppController, PersonaController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
