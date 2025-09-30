import { CreateTaskDto } from './create-task.dto';
export declare class CreateUserDto {
    name: string;
    email: string;
    username: string;
    password: string;
    tasks?: CreateTaskDto[];
}
