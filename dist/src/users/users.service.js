"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
let UsersService = class UsersService {
    constructor() {
        this.filePath = path.join(__dirname, 'data.json');
    }
    readFile() {
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, JSON.stringify([]));
        }
        const content = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(content);
    }
    writeFile(data) {
        fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    }
    getAll() {
        return this.readFile();
    }
    create(user) {
        const data = this.readFile();
        user.id = Date.now();
        data.push(user);
        this.writeFile(data);
        return user;
    }
    delete(id) {
        let data = this.readFile();
        const originalLength = data.length;
        data = data.filter(u => u.id !== id);
        this.writeFile(data);
        return data.length < originalLength;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map