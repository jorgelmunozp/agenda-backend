export declare class UsersController {
    private dataFile;
    private readData;
    private writeData;
    getAllUsers(limit?: string): any;
    getById(id: string): any;
    addUser(body: any): {
        message: string;
        user: {
            user: {
                name: any;
                id: number;
            };
            id: number;
        };
    };
    deleteUser(id: string): {
        message: string;
        user: any;
    };
    patchUser(id: string, body: any): {
        message: string;
        user: any;
    };
    updateUser(id: string, body: any): {
        message: string;
        user: any;
    };
}
