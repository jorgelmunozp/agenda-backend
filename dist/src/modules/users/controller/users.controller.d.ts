import { UsersService } from '../service/users.service';
import { ObjectId } from 'mongodb';
import { CreateTaskDto } from '../dto/create-task.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getById(id: string): Promise<import("mongodb").WithId<import("bson").Document>>;
    addUser(body: any): Promise<{
        user: import("../dto/create-user.dto").CreateUserDto;
        message: string;
        _id: ObjectId;
    }>;
    addTaskToUser(id: string, taskDto: CreateTaskDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("mongodb").WithId<import("bson").Document>;
    }>;
    getTaskById(userId: string, taskId: string): Promise<any>;
    recoverPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    private ensureValidObjectId;
}
