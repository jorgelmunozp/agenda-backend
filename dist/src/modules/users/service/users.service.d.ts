import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersService {
    private readonly collectionName;
    getCollection(): Promise<import("mongodb").Collection<import("bson").Document>>;
    getAll(): Promise<import("mongodb").WithId<import("bson").Document>[]>;
    getById(id: string): Promise<import("mongodb").WithId<import("bson").Document>>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        user: {
            user: {
                name: string;
                email: string;
                username: string;
                password: string;
                tasks: import("../../tasks/dto/create-task.dto").CreateTaskDto[];
            };
            _id: ObjectId;
        };
    }>;
    findByEmailOrUsername(email: string, username: string): Promise<{
        email?: boolean;
        username?: boolean;
    } | null>;
}
