import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;
}
