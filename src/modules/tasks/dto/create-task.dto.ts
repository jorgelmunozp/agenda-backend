import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsString()
  @IsNotEmpty()
  time: string;
  @IsNotEmpty()
  @IsDate()
  date: string;
  @IsString()
  @IsNotEmpty()
  message: string;
}
