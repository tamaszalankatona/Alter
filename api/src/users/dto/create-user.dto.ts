import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'User email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @IsString()
  @Length(3, 255)
  username: string;

  @ApiProperty({
    example: '********',
    description: 'User password',
  })
  @IsString()
  @Length(8, 255)
  password: string;
}
