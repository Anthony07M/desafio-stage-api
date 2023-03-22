import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Task {
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

export class Subprocess {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray({ message: 'Você precisa informar uma array de tarefas' })
  tasks: Task[];
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
  tasks: Task[];

  @IsOptional()
  @IsArray()
  subprocess: Process[];
}

export class ProcessCreateDto extends Process {}

export class ProcessOutputDto extends Process {
  id: string;
}
