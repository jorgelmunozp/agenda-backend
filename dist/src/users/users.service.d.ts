export declare class UsersService {
    private readonly filePath;
    private readFile;
    private writeFile;
    getAll(): any[];
    create(user: any): any;
    delete(id: number): boolean;
}
