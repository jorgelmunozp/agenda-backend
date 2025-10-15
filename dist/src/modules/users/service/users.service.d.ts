import { ObjectId } from 'mongodb';
import { CreateUserDto } from '../dto/create-user.dto';
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
    findByEmailOrUsername(email: string, username: string): Promise<{
        email?: boolean;
        username?: boolean;
    } | null>;
    sendPasswordRecoveryEmail(email: string): Promise<{
        message: string;
    }>;
}
