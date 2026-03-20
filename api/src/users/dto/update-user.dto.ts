import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'Username',
  })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  username?: string;

  @ApiPropertyOptional({
    example: '*******',
    description: 'User password',
  })
  @IsOptional()
  @IsString()
  @Length(6)
  password?: string;

  @ApiPropertyOptional({
    example: 'johndoe@example.com',
    description: 'User email address',
  })
  @IsOptional()
  @IsString()
  email?: string;
}
