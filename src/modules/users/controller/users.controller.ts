import { Controller, Get, Post, Put, Patch, Delete, Param, Body, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import * as dotenv from "dotenv";
import { ObjectId } from 'mongodb';

import jwtEncode from "jwt-encode";
const jwtSecretKey = process.env.JWT_SECRET ?? '';

dotenv.config();                  // Load environment variables
const db = 'users';               // Database route for this controller

@Controller(db)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//************************** USERS *************************************/
  @Get()
  async getAllUsers() {
    return this.usersService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    this.ensureValidObjectId(id);
    return this.usersService.getById(id);
  }

  @Post()
  async addUser(@Body() body: any) {
    // Validaciones mínimas
    if (!body.name) throw new BadRequestException('Name is required');
    if (!body.email) throw new BadRequestException('Email is required');
    if (!body.username) throw new BadRequestException('Username is required');
    if (!body.password) throw new BadRequestException('Password is required');

    // Construcción explícita del objeto user
    const userData = {
      name: body.name,
      email: body.email,
      username: jwtEncode(body.username, jwtSecretKey),
      password: jwtEncode(body.password, jwtSecretKey),
      tasks: Array.isArray(body.tasks) ? body.tasks : []
    };

    // Valida si ya existe un usuario con el mismo email o username
    const existingData = await this.usersService.findByEmailOrUsername(body.email, body.username);

    if (existingData) {
      let message = 'The following fields already exist: ';
      if (existingData.email) message += 'email ';
      if (existingData.username) message += 'username';
      throw new BadRequestException(message.trim());
    }
  
    console.log("User successfully registered:", userData);
    return this.usersService.create(userData);
  }

//************************** PASSWORD RECOVERY *************************************/
  // Service: Send password recovery email
  @Post('recover-password')
  async recoverPassword(@Body() body: { email: string }) {
    if (!body.email) throw new BadRequestException('Email is mandatory');
    return this.usersService.sendPasswordRecoveryEmail(body.email);
  }

  // Helper privado para validar ObjectId
  private ensureValidObjectId(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new BadRequestException(`The provided id is not a valid ObjectId: ${id}`);
    }
  }
}