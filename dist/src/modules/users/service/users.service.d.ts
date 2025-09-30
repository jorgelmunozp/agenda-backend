import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateTaskDto } from '../dto/create-task.dto';
export declare class UsersService {
    private readonly collectionName;
    private getCollection;
    getAll(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getById(id: string): Promise<import("mongodb").WithId<import("bson").Document>>;
    create(createUserDto: CreateUserDto): Promise<{
        user: CreateUserDto;
        message: string;
        _id: ObjectId;
    }>;
    addTask(userId: string, task: CreateTaskDto): Promise<{
        message: string;
        user?: undefined;
    } | {
        message: string;
        user: import("mongodb").WithId<import("bson").Document>;
    }>;
    findByEmailOrUsername(email: string, username: string): Promise<{
        email?: boolean;
        username?: boolean;
    } | null>;
    sendPasswordRecoveryEmail(email: string): Promise<{
        message: string;
    }>;
}
