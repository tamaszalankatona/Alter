import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({
    example: 'u12345f6-789a-4bcd-ef01-23456789abcd',
    description: 'Unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'johndoe4',
    description: 'Username of registered person',
  })
  username: string;

  @ApiProperty({
    example: '**********',
    description: 'Password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address associated with the user account',
  })
  email: string;

  @ApiProperty({
    example: '2025-10-12T07:38:10.403Z',
    description: 'The timestamp when the user account was created',
  })
  created_at: string;

  @ApiProperty({
    example: '2025-10-12T07:38:10.403Z',
    description: 'The timestamp when the user account was last updated',
  })
  updated_at: string;

  @ApiProperty({
    example: '2025-10-12T07:38:10.403Z',
    description: 'The timestamp when the user last logged into the account',
  })
  last_login: string;

  @ApiProperty({
    example:
      'https://qwertyzxbnals.supabase.co/storage/v1/object/public/profile-images/personas/7b1f4b8a-2e9d-4d73-a2e7-9f8c4c6b8f21/avatar.jpg',
    description:
      'Public URL of the user profile picture stored in Supabase Storage.',
  })
  profile_picture_url: string;
  //personas Personas
}
