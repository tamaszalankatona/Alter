import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';

@Module({
  providers: [PersonaService]
})
export class PersonaModule {}
