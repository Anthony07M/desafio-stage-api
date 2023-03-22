import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class Task {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tag: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsOptional()
  @IsBoolean()
  done: boolean;

  @IsNotEmpty()
  @IsDate()
  expiresIn: Date;
}

export class TaskCreateDto extends Task {
  users: Array<{ id: string }>;
}

export class TaskOutputDto extends Task {
  id: string;
}
