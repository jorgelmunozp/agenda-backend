import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  private readonly filePath = path.join(__dirname, 'data.json');

  private readFile(): any[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }
    const content = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(content);
  }

  private writeFile(data: any[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
  }

  getAll(): any[] {
    return this.readFile();
  }

  create(user: any): any {
    const data = this.readFile();
    user.id = Date.now(); // simple ID
    data.push(user);
    this.writeFile(data);
    return user;
  }

  delete(id: number): boolean {
    let data = this.readFile();
    const originalLength = data.length;
    data = data.filter(u => u.id !== id);
    this.writeFile(data);
    return data.length < originalLength;
  }
}