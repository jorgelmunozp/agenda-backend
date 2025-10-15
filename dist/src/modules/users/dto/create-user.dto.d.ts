import { CreateTaskDto } from '../../tasks/dto/create-task.dto';
export declare class CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
    tasks?: CreateTaskDto[];
}
