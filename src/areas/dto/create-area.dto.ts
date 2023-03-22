import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ProcessCreateDto } from 'src/process/dto/process.dto/process.dto';

export class CreateAreaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  process: ProcessCreateDto[];
}
