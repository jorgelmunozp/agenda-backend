import { CreateTaskDto } from './create-task.dto';

export class CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  tasks?: CreateTaskDto[];
}
