import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

class Task {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  users: Array<{ id: string }>;

  @IsString()
  @IsNotEmpty()
  tag: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsDate()
  @IsNotEmpty()
  expiresIn: Date;
}

export class Process {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsArray()
  tasks: Array<Task>;

  @IsOptional()
  @IsArray()
  subprocess: any; //melhorar
}

export class ProcessCreateDto extends Process {}

export class ProcessOutputDto extends Process {
  id: string;
}
