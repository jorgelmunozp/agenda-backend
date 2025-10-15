import { CreateTaskDto } from '../../tasks/dto/create-task.dto';

export class CreateUserDto {
  name: string;
  email: string;
  username: string;
  password: string;
  tasks?: CreateTaskDto[];
}
