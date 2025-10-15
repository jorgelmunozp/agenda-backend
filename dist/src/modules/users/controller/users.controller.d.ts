import { UsersService } from '../service/users.service';
import { ObjectId } from 'mongodb';
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
    recoverPassword(body: {
        email: string;
    }): Promise<{
        message: string;
    }>;
    private ensureValidObjectId;
}
