import { OmitType } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class User {
  @IsNotEmpty({ message: 'campo name não pode ser vazio' })
  @IsString({ message: 'campo name deve ser do tipo string' })
  name: string;

  @IsNotEmpty({ message: 'campo email não pode ser vazio' })
  @IsEmail()
  email: string;

  @IsOptional()
  @IsUrl()
  avatarUrl: string;

  @IsNotEmpty({ message: 'campo password não pode ser vazio' })
  @IsString({ message: 'campo password deve ser do tipo string' })
  password: string;
}

export class UserCreateDto extends User {}

export class UserOutputDto extends OmitType(User, ['password'] as const) {
  @IsString()
  id: string;

  @IsArray()
  Task: any;
}
